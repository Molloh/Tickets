package cn.edu.nju.tickets.service.impl;

import cn.edu.nju.tickets.constant.RegisterStatus;
import cn.edu.nju.tickets.entity.User;
import cn.edu.nju.tickets.entity.UserProfile;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.UserProfilePayload;
import cn.edu.nju.tickets.repository.UserProfileRepository;
import cn.edu.nju.tickets.repository.UserRepository;
import cn.edu.nju.tickets.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserProfileRepository userProfileRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @Override
    public UserProfile getUserProfile(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null)
            return null;

        return user.getUserProfile();

    }

    @Override
    public ApiResponse updateProfile(UserProfilePayload userProfilePayload) {
        String username = userProfilePayload.getUsername();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null)
            return new ApiResponse(false, "user does not exist!");

        userProfileRepository.deleteByUser_Username(username);

        UserProfile userProfile = new UserProfile(userProfilePayload.getGender(), userProfilePayload.getPhoneNumber());
        userProfile.setUser(user);
        user.setUserProfile(userProfile);

        userRepository.save(user);
        return new ApiResponse(true, "successfully updated user's profile!");
    }

    @Override
    public ApiResponse abolishUser(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null)
            return new ApiResponse(false, "user does not exist!");

        user.setRegisterStatus(RegisterStatus.STATUS_ABOLISHED);
        return new ApiResponse(true, "successfully abolish a user!");
    }


}
