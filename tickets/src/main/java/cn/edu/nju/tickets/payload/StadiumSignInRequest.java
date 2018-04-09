package cn.edu.nju.tickets.payload;

import javax.validation.constraints.NotBlank;

public class StadiumSignInRequest {
    @NotBlank
    private String stadiumCode;

    @NotBlank
    private String password;

    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStadiumCode() {
        return stadiumCode;
    }

    public void setStadiumCode(String stadiumCode) {
        this.stadiumCode = stadiumCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
