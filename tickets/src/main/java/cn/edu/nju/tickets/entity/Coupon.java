package cn.edu.nju.tickets.entity;

import cn.edu.nju.tickets.constant.CouponStatus;
import cn.edu.nju.tickets.constant.CouponStrategy;
import cn.edu.nju.tickets.entity.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "coupons")
public class Coupon extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated
    @Column(length = 60)
    private CouponStatus couponStatus;

    private int couponCost;

    private double discount;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Coupon() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CouponStatus getCouponStatus() {
        return couponStatus;
    }

    public void setCouponStatus(CouponStatus couponStatus) {
        this.couponStatus = couponStatus;
    }

    public int getCouponCost() {
        return couponCost;
    }

    public void setCouponCost(int couponCost) {
        this.couponCost = couponCost;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
