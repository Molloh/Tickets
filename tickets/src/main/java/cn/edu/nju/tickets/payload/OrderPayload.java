package cn.edu.nju.tickets.payload;

import java.util.HashSet;
import java.util.Set;

public class OrderPayload {

    private Long couponId;

    private String username;

    private Long scheduleId;

    private double priceSum;

    public OrderPayload() {}

    private Set<TicketPayload> ticketPayloads = new HashSet<>();

    public Long getCouponId() {
        return couponId;
    }

    public void setCouponId(Long couponId) {
        this.couponId = couponId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public double getPriceSum() {
        return priceSum;
    }

    public void setPriceSum(double priceSum) {
        this.priceSum = priceSum;
    }

    public Set<TicketPayload> getTicketPayloads() {
        return ticketPayloads;
    }

    public void setTicketPayloads(Set<TicketPayload> ticketPayloads) {
        this.ticketPayloads = ticketPayloads;
    }
}
