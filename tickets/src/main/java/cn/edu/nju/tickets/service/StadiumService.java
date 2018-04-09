package cn.edu.nju.tickets.service;

import cn.edu.nju.tickets.entity.StadiumProfile;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.StadiumPayload;

public interface StadiumService {

    StadiumProfile getStadiumProfile(String stadiumCode);

    ApiResponse updateProfile(StadiumPayload stadiumPayload);

}
