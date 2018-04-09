package cn.edu.nju.tickets.controller;

import cn.edu.nju.tickets.entity.Schedule;
import cn.edu.nju.tickets.entity.Stadium;
import cn.edu.nju.tickets.entity.User;
import cn.edu.nju.tickets.service.impl.AdminServiceImpl;
import cn.edu.nju.tickets.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminServiceImpl adminService;

    @Autowired
    public AdminController(AdminServiceImpl adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/schedules")
    List<Schedule> getAllSchedules() {
        return adminService.getAllSchedules();
    }

    @GetMapping("/stadiums")
    List<Stadium> getStadiumsAcvated() {
        return adminService.getStadiumsAcvated();
    }

    @PostMapping("/user/{username}")
    ResponseEntity<?> abolishUser(@PathVariable String username) {
        return ResponseUtil.returnResponse(adminService.abolishUser(username));
    }

    @PostMapping("/stadium/{stadiumCode}")
    ResponseEntity<?> activateStadium(@PathVariable String stadiumCode) {
        return ResponseUtil.returnResponse(adminService.activateStadium(stadiumCode));
    }

    @PostMapping("/schedule/{scheduleId}")
    ResponseEntity<?> checkSchedule(@PathVariable Long scheduleId) {
        return ResponseUtil.returnResponse(adminService.checkSchedule(scheduleId));
    }

}
