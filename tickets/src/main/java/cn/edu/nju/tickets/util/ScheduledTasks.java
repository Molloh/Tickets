package cn.edu.nju.tickets.util;

import cn.edu.nju.tickets.constant.OrderStatus;
import cn.edu.nju.tickets.entity.Order;
import cn.edu.nju.tickets.entity.Schedule;
import cn.edu.nju.tickets.entity.Ticket;
import cn.edu.nju.tickets.repository.OrderRepository;
import cn.edu.nju.tickets.repository.ScheduleRepository;
import cn.edu.nju.tickets.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.Temporal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Component
public class ScheduledTasks {
    private final OrderRepository orderRepository;
    private final ScheduleRepository scheduleRepository;
    @Autowired
    private TicketRepository ticketRepository;

    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Autowired
    public ScheduledTasks(OrderRepository orderRepository, ScheduleRepository scheduleRepository) {
        this.orderRepository = orderRepository;
        this.scheduleRepository = scheduleRepository;
    }

    private SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");


    @Transactional
    @Scheduled(fixedRate = 60000)
    public void scheduleTaskWithFixedRate() {
        System.out.println("现在时间：" + dateFormat.format(new Date()));

        List<Order> orders = orderRepository.findByOrderStatus(OrderStatus.STATUS_RESERVED);
        List<Order> another = orderRepository.findByOrderStatus(OrderStatus.STATUS_RESERVED_NO_SEAT);
        orders.addAll(another);
        if (orders.isEmpty()) return;
        for (Order order: orders) {
            Instant instant = Instant.now();
            if (Duration.between(order.getCreatedAt(), instant).toMinutes() > 1) {
                orderRepository.delete(order);
            }
        }
    }

//    @Scheduled(fixedRate = 100)
    @Scheduled(cron = "0 0 3 * * ?")
    public void scheduleTickets() {
        List<Order> orders = orderRepository.findByOrderStatus(OrderStatus.STATUS_PAID_NO_SEAT);
        if (orders.isEmpty()) return;
        for (Order order: orders) {
            Schedule schedule = order.getSchedule();
            Instant instant = Instant.now();
            Date date = new Date();
            Timestamp timestamp = schedule.getStartDate();
            if (Duration.between((Temporal) schedule.getStartDate(), instant).toDays() <= 1000000) {
                Set<Ticket> tickets = order.getTickets();
                for (Ticket item: tickets) {
                    for (int i = 1; i <= 10; i ++) {
                        item.setrow(i);
                        for (int j = 1; j <= 10; j ++) {
                            item.setcolumn(j);
                            Ticket tmp = ticketRepository.findByRowAndColumn(i, j).orElse(
                                    null
                            );
                            if (tmp == null) {
                                return;
                            }
                        }
                    }
                }
            }
        }
    }

}
