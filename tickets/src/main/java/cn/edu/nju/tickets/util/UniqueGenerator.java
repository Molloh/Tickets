package cn.edu.nju.tickets.util;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UniqueGenerator {

    public String generateStadiumId() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().substring(0, 7);
    }

    public String generateNoise() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("-", "");
    }

}
