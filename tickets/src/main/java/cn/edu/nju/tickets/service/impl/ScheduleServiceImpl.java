package cn.edu.nju.tickets.service.impl;

import cn.edu.nju.tickets.constant.ScheduleStatus;
import cn.edu.nju.tickets.entity.Order;
import cn.edu.nju.tickets.entity.Schedule;
import cn.edu.nju.tickets.entity.Stadium;
import cn.edu.nju.tickets.entity.Ticket;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.ScheduleRequest;
import cn.edu.nju.tickets.repository.ScheduleRepository;
import cn.edu.nju.tickets.repository.StadiumRepository;
import cn.edu.nju.tickets.service.ScheduleService;
import cn.edu.nju.tickets.util.StringtoDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final StadiumRepository stadiumRepository;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, StadiumRepository stadiumRepository) {
        this.scheduleRepository = scheduleRepository;
        this.stadiumRepository = stadiumRepository;
    }

    @Override
    public ApiResponse publishSchedule(ScheduleRequest scheduleRequest) {
        String stadiumCode = scheduleRequest.getStadiumCode();

        Schedule schedule = new Schedule(scheduleRequest.getUnitPrice(),
                    scheduleRequest.getDiscription(),
                    scheduleRequest.getScheduleName(),
                    scheduleRequest.getTicketsNum(),
                    StringtoDateUtil.parseStringToDate(scheduleRequest.getStartDate()),
                    StringtoDateUtil.parseStringToDate(scheduleRequest.getEndDate()),
                    ScheduleStatus.STATUS_PREPARING
                );

        Optional<Stadium> stadium = stadiumRepository.findByStadiumCode(scheduleRequest.getStadiumCode());

        if (stadium.isPresent()) {
            Stadium item = stadium.get();
            item.addSchedule(schedule);
            schedule.setStadium(item);
            stadiumRepository.save(item);
            return new ApiResponse(true,"发布成功！");
        }
        else
            return new ApiResponse(false, "The stadium does not exist!");

    }

    @Override
    public ApiResponse updateSchedule(ScheduleRequest scheduleRequest) {
        String scheduleName = scheduleRequest.getScheduleName();

        Optional<Schedule> scheduleOptional = scheduleRepository.findByScheduleNameAndStadium_StadiumCode(scheduleName, scheduleRequest.getStadiumCode());
        if (scheduleOptional.isPresent()) {
            Schedule schedule = scheduleOptional.get();
            schedule.setDiscription(scheduleRequest.getDiscription());
            schedule.setEndDate(StringtoDateUtil.parseStringToDate(scheduleRequest.getEndDate()));
            schedule.setStartDate(StringtoDateUtil.parseStringToDate(scheduleRequest.getStartDate()));
            schedule.setScheduleName(scheduleRequest.getScheduleName());
            schedule.setUnitPrice(scheduleRequest.getUnitPrice());
            schedule.setTicketsNum(scheduleRequest.getTicketsNum());

            scheduleRepository.save(schedule);
            return new ApiResponse(true,"successfully update a schedule");
        } else
            return new ApiResponse(false, "The schedule has conflict with others: " + scheduleName);
    }

    @Override
    public ApiResponse deleteSchedule(Long schedule_id) {
        Schedule schedule = scheduleRepository.findById(schedule_id).orElse(null);
        if (schedule == null)
            return new ApiResponse(false, "schedule does not exist");

        if (schedule.getScheduleStatus() == ScheduleStatus.STATUS_PREPARING) {
            scheduleRepository.deleteById(schedule_id);
            return new ApiResponse(true, "successfully deleted a schedule");
        } else
            return new ApiResponse(false, "schedule cannot be deleted");
    }

    @Override
    public Set<Schedule> getAllSchedules(String stadiumCode) {
        Stadium stadium = stadiumRepository.findByStadiumCode(stadiumCode).orElse(null);
        if (stadium == null)
            return null;

        return stadium.getSchedules();
    }

    @Override
    public List<Schedule> getSchedules() {
        return scheduleRepository.findByScheduleStatus(ScheduleStatus.STATUS_PREPARING);
    }

    @Override
    public List<Schedule> searchSchedules(String scheduleName) {
        if (scheduleName.equals("")) {
            return this.getSchedules();
        }
        return scheduleRepository.findByScheduleName(scheduleName);
    }

    @Override
    public Schedule getScheduleById(Long scheduleId) {
        return scheduleRepository.findById(scheduleId).orElse(new Schedule());
    }

    @Override
    public Set<Ticket> getReservedTickets(Long scheduleId) {
        Set<Ticket> tickets = new HashSet<>();
        Schedule schedule = scheduleRepository.findById(scheduleId).orElse(null);
        if (schedule == null)
            return tickets;

        for (Order o: schedule.getOrders()) {
            tickets.addAll(o.getTickets());
        }

        return tickets;
    }
}
