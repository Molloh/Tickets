package cn.edu.nju.tickets.service.impl;

import cn.edu.nju.tickets.constant.CouponStatus;
import cn.edu.nju.tickets.constant.OrderStatus;
import cn.edu.nju.tickets.entity.*;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.OrderPayload;
import cn.edu.nju.tickets.payload.TicketPayload;
import cn.edu.nju.tickets.repository.*;
import cn.edu.nju.tickets.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final TicketRepository ticketRepository;
    private final CouponRepository couponRepository;
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final PayPalRepository payPalRepository;
    private final StadiumRepository stadiumRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, CouponRepository couponRepository, UserRepository userRepository, ScheduleRepository scheduleRepository, PayPalRepository payPalRepository, StadiumRepository stadiumRepository, TicketRepository ticketRepository) {
        this.orderRepository = orderRepository;
        this.couponRepository = couponRepository;
        this.userRepository = userRepository;
        this.scheduleRepository = scheduleRepository;
        this.payPalRepository = payPalRepository;
        this.stadiumRepository = stadiumRepository;
        this.ticketRepository = ticketRepository;
    }

    @Override
    public ApiResponse placeAnOrderSelectSeat(OrderPayload orderPayload) {
        Schedule schedule = scheduleRepository.findById(orderPayload.getScheduleId()).orElse(null);
        User user = userRepository.findByUsername(orderPayload.getUsername()).orElse(null);

        if (schedule == null || user == null) {
            return new ApiResponse(false, "something wrong!");
        }

        Coupon coupon = couponRepository.findById(orderPayload.getCouponId()).orElse(null);
        double discount = 1;
        if (coupon != null) {
            discount = coupon.getDiscount();
            coupon.setCouponStatus(CouponStatus.STATUS_USED);
            couponRepository.save(coupon);
        }
        Order order = new Order(OrderStatus.STATUS_RESERVED, orderPayload.getPriceSum() * discount);
        Set<Ticket> tickets = new HashSet<>();
        Set<TicketPayload> ticketPayloads = orderPayload.getTicketPayloads();
        for (TicketPayload item: ticketPayloads) {
            Ticket ticket = new Ticket(item.getRow(), item.getColumn(), item.getPrice());
            ticket.setOrder(order);
            tickets.add(ticket);
        }

        if (tickets.size() > 6) {
            return new ApiResponse(false, "最多选六张！");
        }

        order.setUser(user);
        order.setSchedule(schedule);
        order.setTickets(tickets);

        // sold tickets
        schedule.setTicketsNum(schedule.getTicketsNum() - tickets.size());
        schedule.addOrder(order);
        user.addOrder(order);

        Order res = orderRepository.save(order);
        userRepository.save(user);
        scheduleRepository.save(schedule);

        return new ApiResponse(true, res.getId().toString());
    }

    @Override
    public Order getAnOrder(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    @Override
    public ApiResponse confirmAnOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            return new ApiResponse(false, "wrong!");
        }
        order.setOrderStatus(OrderStatus.STATUS_COMPLETED);
        orderRepository.save(order);
        return new ApiResponse(true, "已确认！");
    }

    @Override
    public ApiResponse placeAnOrder(OrderPayload orderPayload) {
        Schedule schedule = scheduleRepository.findById(orderPayload.getScheduleId()).orElse(null);
        User user = userRepository.findByUsername(orderPayload.getUsername()).orElse(null);
        if (schedule == null || user == null) {
            return new ApiResponse(false, "something wrong!");
        }

        Coupon coupon = couponRepository.findById(orderPayload.getCouponId()).orElse(null);
        double discount = 1;
        if (coupon != null) {
            discount = coupon.getDiscount();
            coupon.setCouponStatus(CouponStatus.STATUS_USED);
            couponRepository.save(coupon);
        }
        if (user.getUserProfile().getLevel() > 5)
            discount *= 0.8;

        Order order = new Order(OrderStatus.STATUS_RESERVED_NO_SEAT, orderPayload.getPriceSum() * discount);
        Set<Ticket> tickets = new HashSet<>();
        Set<TicketPayload> ticketPayloads = orderPayload.getTicketPayloads();
        for (TicketPayload item: ticketPayloads) {
            Ticket ticket = new Ticket(item.getRow(), item.getColumn(), item.getPrice());
            ticket.setOrder(order);
            tickets.add(ticket);
        }

        order.setUser(user);
        order.setSchedule(schedule);
        order.setTickets(tickets);

        // sold tickets
        schedule.setTicketsNum(schedule.getTicketsNum() - tickets.size());
        schedule.addOrder(order);
        user.addOrder(order);

        Order res = orderRepository.save(order);
        userRepository.save(user);
        scheduleRepository.save(schedule);

        return new ApiResponse(true, res.getId().toString());
    }

    @Override
    @Transactional
    public ApiResponse deleteAnOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null)
            return new ApiResponse(false, "order does not exist!");

        OrderStatus status = order.getOrderStatus();

        if (status.equals(OrderStatus.STATUS_PAID)) {
            PayPal payPal = payPalRepository.findByAccount(order.getPayAccount()).orElse(null);
            if (payPal == null)
                return new ApiResponse(false, "payer's account does not exist!");


            User user = order.getUser();
            UserProfile userProfile = user.getUserProfile();
            userProfile.setIntegration(userProfile.getIntegration() - (int)order.getPriceSum());
            userProfile.setTotalPay(userProfile.getTotalPay() - order.getPriceSum());
            userProfile.setLevel((int) userProfile.getTotalPay() / 1000);
            user.setUserProfile(userProfile);
            userProfile.setUser(user);

            payPal.setBalance(payPal.getBalance() + order.getPriceSum());
            payPalRepository.save(payPal);
            userRepository.save(user);
        }

        order.setOrderStatus(OrderStatus.STATUS_CANCELED);
        order.setTickets(null);
        ticketRepository.deleteByOrder_Id(orderId);
        orderRepository.save(order);
        return new ApiResponse(true, "成功取消订单！");
    }

    @Override
    public Set<Order> getUserOrders(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null)
            return null;

        return user.getOrders();
    }

    @Override
    public Set<Order> getStadiumOrders(String stadiumCode) {
        Stadium stadium = stadiumRepository.findByStadiumCode(stadiumCode).orElse(null);
        if (stadium == null)
            return null;

        Set<Order> orders = new HashSet<>();
        for (Schedule e: stadium.getSchedules()) {
            orders.addAll(e.getOrders());
        }

        return orders;
    }

    @Override
    public ApiResponse dealAnOrder(Long orderId, String account, String password) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null)
            return new ApiResponse(false, "order does not exist!");

        PayPal payPal = payPalRepository.findByAccount(account).orElse(null);
        if (payPal == null)
            return new ApiResponse(false, "account does not exist!");

        if (!payPal.getPassword().equals(password))
            return new ApiResponse(false, "wrong password!");

        double balance = payPal.getBalance() - order.getPriceSum();
        if (balance < 0)
            return new ApiResponse(false, "balance is not enough!");

        User user = order.getUser();
        UserProfile userProfile = user.getUserProfile();
        userProfile.setIntegration(userProfile.getIntegration() + (int)order.getPriceSum());
        userProfile.setTotalPay(userProfile.getTotalPay() + order.getPriceSum());
        userProfile.setLevel((int) userProfile.getTotalPay() / 1000);
        user.setUserProfile(userProfile);
        userProfile.setUser(user);

        payPal.setBalance(balance);
        if (order.getOrderStatus() == OrderStatus.STATUS_RESERVED)
            order.setOrderStatus(OrderStatus.STATUS_PAID);
        else
            order.setOrderStatus(OrderStatus.STATUS_PAID_NO_SEAT);
        order.setPayAccount(account);
        order.setUser(user);

        payPalRepository.save(payPal);
        orderRepository.save(order);
        userRepository.save(user);
        return new ApiResponse(true, "successfully paid!");
    }

    @Override
    public ApiResponse dealAnOrderOffline(OrderPayload orderPayload) {
        Schedule schedule = scheduleRepository.findById(orderPayload.getScheduleId()).orElse(null);
        User user = userRepository.findByUsername(orderPayload.getUsername()).orElse(null);

        if (schedule == null || user == null) {
            return new ApiResponse(false, "something wrong!");
        }

        Coupon coupon = couponRepository.findById(orderPayload.getCouponId()).orElse(null);
        double discount = 1;
        if (coupon != null)
            discount = coupon.getDiscount();

        Order order = new Order(OrderStatus.STATUS_PAID, orderPayload.getPriceSum() * discount);
        Set<Ticket> tickets = new HashSet<>();
        Set<TicketPayload> ticketPayloads = orderPayload.getTicketPayloads();
        for (TicketPayload item: ticketPayloads) {
            Ticket ticket = new Ticket(item.getRow(), item.getColumn(), item.getPrice());
            ticket.setOrder(order);
            tickets.add(ticket);
        }

        if (tickets.size() > 6) {
            return new ApiResponse(false, "最多选六张！");
        }

        order.setUser(user);
        order.setSchedule(schedule);
        order.setTickets(tickets);

        // sold tickets
        schedule.setTicketsNum(schedule.getTicketsNum() - tickets.size());
        schedule.addOrder(order);
        user.addOrder(order);

        Order res = orderRepository.save(order);
        userRepository.save(user);
        scheduleRepository.save(schedule);

        return new ApiResponse(true, res.getId().toString());

    }
}
