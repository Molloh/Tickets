package cn.edu.nju.tickets.service;

import cn.edu.nju.tickets.entity.Schedule;
import cn.edu.nju.tickets.entity.Stadium;
import cn.edu.nju.tickets.entity.User;
import cn.edu.nju.tickets.payload.ApiResponse;

import java.util.List;

public interface AdminService {

    List<User> getAllUsers();

    List<Schedule> getAllSchedules();

    List<Stadium> getStadiumsAcvated();

    ApiResponse abolishUser(String username);

    ApiResponse activateStadium(String stadiumCode);

    ApiResponse checkSchedule(Long scheduleId);
}
