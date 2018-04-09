package cn.edu.nju.tickets.service;

import cn.edu.nju.tickets.entity.Schedule;
import cn.edu.nju.tickets.entity.Ticket;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.ScheduleRequest;

import java.util.List;
import java.util.Set;

public interface ScheduleService {

    ApiResponse publishSchedule(ScheduleRequest scheduleRequest);

    ApiResponse updateSchedule(ScheduleRequest scheduleRequest);

    ApiResponse deleteSchedule(Long schedule_id);

    Set<Schedule> getAllSchedules(String stadiumCode);

    List<Schedule> getSchedules();

    List<Schedule> searchSchedules(String scheduleName);

    Schedule getScheduleById(Long scheduleId);

    Set<Ticket> getReservedTickets(Long scheduleId);

}
