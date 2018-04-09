package cn.edu.nju.tickets.controller;

import cn.edu.nju.tickets.entity.StadiumProfile;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.StadiumPayload;
import cn.edu.nju.tickets.service.StadiumService;
import cn.edu.nju.tickets.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stadium")
public class StadiumController {
    private final StadiumService stadiumService;

    @Autowired
    public StadiumController(StadiumService stadiumService) {
        this.stadiumService = stadiumService;
    }

    @GetMapping("/{stadiumCode}")
    public StadiumProfile getStadiumProfile(@PathVariable String stadiumCode){
        return stadiumService.getStadiumProfile(stadiumCode);
    }

    @PostMapping()
    public ResponseEntity<?> updateProfile(@RequestBody StadiumPayload stadiumPayload) {
        ApiResponse apiResponse = stadiumService.updateProfile(stadiumPayload);
        return ResponseUtil.returnResponse(apiResponse);
    }

}
