package cn.edu.nju.tickets.controller;

import cn.edu.nju.tickets.entity.UserProfile;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.UserProfilePayload;
import cn.edu.nju.tickets.service.UserService;
import cn.edu.nju.tickets.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        return userService.getUserProfile(username);
    }

    @PostMapping
    ResponseEntity<?> updateProfile(@RequestBody UserProfilePayload userProfilePayload) {
        ApiResponse apiResponse = userService.updateProfile(userProfilePayload);
        return ResponseUtil.returnResponse(apiResponse);
    }

    @PostMapping("/{username}")
    ResponseEntity<?> abolishUser(@PathVariable String username) {
        ApiResponse apiResponse = userService.abolishUser(username);
        return ResponseUtil.returnResponse(apiResponse);
    }

}
