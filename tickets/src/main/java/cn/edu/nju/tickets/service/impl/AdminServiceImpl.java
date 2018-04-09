package cn.edu.nju.tickets.service.impl;

import cn.edu.nju.tickets.constant.RegisterStatus;
import cn.edu.nju.tickets.constant.ScheduleStatus;
import cn.edu.nju.tickets.entity.Schedule;
import cn.edu.nju.tickets.entity.Stadium;
import cn.edu.nju.tickets.entity.User;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.repository.ScheduleRepository;
import cn.edu.nju.tickets.repository.StadiumRepository;
import cn.edu.nju.tickets.repository.UserRepository;
import cn.edu.nju.tickets.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final StadiumRepository stadiumRepository;

    @Autowired
    public AdminServiceImpl(UserRepository userRepository, ScheduleRepository scheduleRepository, StadiumRepository stadiumRepository) {
        this.userRepository = userRepository;
        this.scheduleRepository = scheduleRepository;
        this.stadiumRepository = stadiumRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findByRegisterStatus(RegisterStatus.STATUS_AWAKE);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findByScheduleStatus(ScheduleStatus.STATUS_END);
    }

    public List<Stadium> getStadiumsAcvated() {
        return stadiumRepository.findByRegisterStatus(RegisterStatus.STATUS_SILENT);
    }

    public ApiResponse abolishUser(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return new ApiResponse(false, "user does not exist!");
        }
        user.setRegisterStatus(RegisterStatus.STATUS_ABOLISHED);
        userRepository.save(user);
        return new ApiResponse(true, "abolish a user");
    }

    @Override
    public ApiResponse activateStadium(String stadiumCode) {
        Stadium stadium = stadiumRepository.findByStadiumCode(stadiumCode).orElse(null);
        if (stadium == null)
            return new ApiResponse(false, "wrong");

        stadium.setRegisterStatus(RegisterStatus.STATUS_AWAKE);
        stadiumRepository.save(stadium);
        return new ApiResponse(true, "账户通过审核！");
    }

    @Override
    public ApiResponse checkSchedule(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElse(null);
        if (schedule == null)
            return new ApiResponse(false, "wrong!");

        schedule.setScheduleStatus(ScheduleStatus.STATUS_CHECKED);
        scheduleRepository.save(schedule);
        return new ApiResponse(true, "结算成功！");
    }
}
