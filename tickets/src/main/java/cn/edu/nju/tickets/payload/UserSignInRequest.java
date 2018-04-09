package cn.edu.nju.tickets.payload;

import javax.validation.constraints.NotBlank;

public class UserSignInRequest {
    @NotBlank
    private String usernameOrEmail;

    @NotBlank
    private String password;

    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
