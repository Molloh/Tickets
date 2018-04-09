package cn.edu.nju.tickets.service;

import cn.edu.nju.tickets.entity.UserProfile;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.UserProfilePayload;

public interface UserService {

    UserProfile getUserProfile(String username);

    ApiResponse updateProfile(UserProfilePayload userProfilePayload);

    ApiResponse abolishUser(String username);
}
