package cn.edu.nju.tickets.service.impl;

import cn.edu.nju.tickets.entity.*;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.StadiumPayload;
import cn.edu.nju.tickets.repository.StadiumRepository;
import cn.edu.nju.tickets.service.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StadiumServiceImpl implements StadiumService {
    private final StadiumRepository stadiumRepository;

    @Autowired
    public StadiumServiceImpl(StadiumRepository stadiumRepository) {
        this.stadiumRepository = stadiumRepository;
    }

    @Override
    public StadiumProfile getStadiumProfile(String stadiumCode) {
        Stadium stadium = stadiumRepository.findByStadiumCode(stadiumCode).orElse(null);
        if (stadium == null)
            return null;

        return stadium.getStadiumProfile();
    }

    @Override
    public ApiResponse updateProfile(StadiumPayload stadiumPayload) {
        Stadium stadium = stadiumRepository.findByStadiumCode(stadiumPayload.getStadiumCode()).orElse(null);
        if (stadium == null)
            return new ApiResponse(false, "stadium does not exist: " + stadiumPayload.getStadiumCode());

        StadiumProfile stadiumProfile = new StadiumProfile(
                stadiumPayload.getStadiumName(),
                stadiumPayload.getAddress(),
                stadiumPayload.getPhoneNumber()
            );

        stadium.setStadiumProfile(stadiumProfile);
        stadiumProfile.setStadium(stadium);

        stadiumRepository.save(stadium);
        return new ApiResponse(true, "successfully updated!");
    }

}
