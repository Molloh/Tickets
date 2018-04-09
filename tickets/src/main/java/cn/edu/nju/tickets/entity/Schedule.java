package cn.edu.nju.tickets.entity;

import cn.edu.nju.tickets.constant.ScheduleStatus;
import cn.edu.nju.tickets.entity.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "schedules")
public class Schedule extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_price")
    private double unitPrice;

    @Column(name = "discription")
    private String discription;

    @Column(name = "schedule_name")
    private String scheduleName;

    @Column(name = "tickets_num")
    private int ticketsNum;

    @Column(name = "start_date")
    private Timestamp startDate;

    @Column(name = "end_date")
    private Timestamp endDate;

    @Enumerated
    private ScheduleStatus scheduleStatus;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stadium_id", nullable = false)
    private Stadium stadium;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REFRESH,
            fetch = FetchType.LAZY,
            mappedBy = "schedule")
    private Set<Order> orders = new HashSet<>();

    public Schedule() {
    }

    public Schedule(double unitPrice, String discription, String scheduleName, int ticketsNum, Timestamp startDate, Timestamp endDate, ScheduleStatus scheduleStatus) {
        this.unitPrice = unitPrice;
        this.discription = discription;
        this.scheduleName = scheduleName;
        this.ticketsNum = ticketsNum;
        this.startDate = startDate;
        this.endDate = endDate;
        this.scheduleStatus = scheduleStatus;
    }

    public void addOrder(Order order) {
        orders.add(order);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ScheduleStatus getScheduleStatus() {
        return scheduleStatus;
    }

    public void setScheduleStatus(ScheduleStatus scheduleStatus) {
        this.scheduleStatus = scheduleStatus;
    }

    public Stadium getStadium() {
        return stadium;
    }

    public void setStadium(Stadium stadium) {
        this.stadium = stadium;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }

    public String getScheduleName() {
        return scheduleName;
    }

    public void setScheduleName(String scheduleName) {
        this.scheduleName = scheduleName;
    }

    public int getTicketsNum() {
        return ticketsNum;
    }

    public void setTicketsNum(int ticketsNum) {
        this.ticketsNum = ticketsNum;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }
}
