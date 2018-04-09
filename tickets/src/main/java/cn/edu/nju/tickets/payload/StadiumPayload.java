package cn.edu.nju.tickets.payload;

import javax.validation.constraints.Email;
import java.util.HashSet;
import java.util.Set;

public class StadiumPayload {

    private String stadiumCode;

    private String stadiumName;

    private String address;

    private String phoneNumber;

    public StadiumPayload() {}

    public StadiumPayload(
            String stadiumCode,
            String stadiumName,
            String address,
            String phoneNumber
        ) {
        this.stadiumCode = stadiumCode;
        this.stadiumName = stadiumName;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStadiumCode() {
        return stadiumCode;
    }

    public void setStadiumCode(String stadiumCode) {
        this.stadiumCode = stadiumCode;
    }
}
