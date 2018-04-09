package cn.edu.nju.tickets.service;

import cn.edu.nju.tickets.entity.Coupon;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.CouponPayload;

import java.util.Set;

public interface CouponService {

    ApiResponse buyACoupon(String username, CouponPayload couponPayload);

    Set<Coupon> getCoupons(String username);
}
