package cn.edu.nju.tickets.entity;

import cn.edu.nju.tickets.constant.RegisterStatus;
import cn.edu.nju.tickets.entity.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "stadiums")
public class Stadium extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(max = 15)
    @Column(unique = true)
    private String stadiumCode;

    @NotBlank
    @Size(max = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(length = 60)
    private RegisterStatus registerStatus;

    @NotBlank
    private String noise;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "stadium")
    private StadiumProfile stadiumProfile;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "stadium_roles",
            joinColumns = @JoinColumn(name = "stadium_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "stadium")
    private Set<Schedule> schedules = new HashSet<>();

    public Stadium() {}

    public Stadium(String email, String stadiumCode, String password, RegisterStatus registerStatus, String noise) {
        this.email = email;
        this.stadiumCode = stadiumCode;
        this.password = password;
        this.registerStatus = registerStatus;
        this.noise = noise;
    }

    public void addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNoise() {
        return noise;
    }

    public void setNoise(String noise) {
        this.noise = noise;
    }

    public String getPassword() {
        return password;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RegisterStatus getRegisterStatus() {
        return registerStatus;
    }

    public void setRegisterStatus(RegisterStatus registerStatus) {
        this.registerStatus = registerStatus;
    }

    public StadiumProfile getStadiumProfile() {
        return stadiumProfile;
    }

    public void setStadiumProfile(StadiumProfile stadiumProfile) {
        this.stadiumProfile = stadiumProfile;
    }

    public String getStadiumCode() {
        return stadiumCode;
    }

    public void setStadiumCode(String stadiumCode) {
        this.stadiumCode = stadiumCode;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
