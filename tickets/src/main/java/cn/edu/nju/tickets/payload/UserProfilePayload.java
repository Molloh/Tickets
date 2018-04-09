package cn.edu.nju.tickets.payload;

import cn.edu.nju.tickets.constant.Gender;

import javax.validation.constraints.Email;

public class UserProfilePayload {

    private String username;
    private Gender gender;

    private String phoneNumber;

    public UserProfilePayload() {}

    public UserProfilePayload(String username, Gender gender, String phoneNumber) {
        this.username = username;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
