package cn.edu.nju.tickets.controller;

import cn.edu.nju.tickets.entity.Schedule;
import cn.edu.nju.tickets.entity.Ticket;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.ScheduleRequest;
import cn.edu.nju.tickets.repository.ScheduleRepository;
import cn.edu.nju.tickets.service.ScheduleService;
import cn.edu.nju.tickets.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<Schedule> getSchedules() {
        return scheduleService.getSchedules();
    }

    @GetMapping("/{stadiumCode}")
    public Set<Schedule> getAllSchedules(@PathVariable String stadiumCode) {
        return scheduleService.getAllSchedules(stadiumCode);
    }

    @GetMapping("/info/{scheduleId}")
    public Schedule getScheduleInfo(@PathVariable Long scheduleId) {
        return scheduleService.getScheduleById(scheduleId);
    }

    @GetMapping("/tickets/{scheduleId}")
    public Set<Ticket> getTickets(@PathVariable Long scheduleId) {
        return scheduleService.getReservedTickets(scheduleId);
    }

    @PostMapping("/publish")
    public ResponseEntity<?> publishSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        ApiResponse apiResponse = scheduleService.publishSchedule(scheduleRequest);
        return ResponseUtil.returnResponse(apiResponse);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        ApiResponse apiResponse = scheduleService.updateSchedule(scheduleRequest);
        return ResponseUtil.returnResponse(apiResponse);
    }

    @PostMapping("/delete/{schedule_id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long schedule_id) {
        ApiResponse apiResponse = scheduleService.deleteSchedule(schedule_id);
        return ResponseUtil.returnResponse(apiResponse);
    }

    @GetMapping("/search/{scheduleName}")
    public List<Schedule> searchScheduleByName(@PathVariable String scheduleName) {
        return scheduleService.searchSchedules(scheduleName);
    }

}
