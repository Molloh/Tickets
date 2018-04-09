package cn.edu.nju.tickets.service.impl;

import cn.edu.nju.tickets.constant.CouponStatus;
import cn.edu.nju.tickets.entity.Coupon;
import cn.edu.nju.tickets.entity.User;
import cn.edu.nju.tickets.entity.UserProfile;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.CouponPayload;
import cn.edu.nju.tickets.repository.UserRepository;
import cn.edu.nju.tickets.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CouponServiceImpl implements CouponService {
    private final UserRepository userRepository;

    @Autowired
    public CouponServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ApiResponse buyACoupon(String username, CouponPayload couponPayload) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return new ApiResponse(false, "user does not exist");
        }
        UserProfile userProfile = user.getUserProfile();
        int integration = userProfile.getIntegration();
        if (integration < couponPayload.getCouponCost())
            return new ApiResponse(false, "积分不够！");

        Coupon coupon = new Coupon();
        coupon.setCouponStatus(CouponStatus.STATUS_UNUSED);
        coupon.setCouponCost(couponPayload.getCouponCost());
        coupon.setDiscount(couponPayload.getDiscount());
        coupon.setUser(user);
        user.addCoupon(coupon);

        userProfile.setIntegration(integration - coupon.getCouponCost());
        userProfile.setUser(user);
        user.setUserProfile(userProfile);
        userRepository.save(user);
        return new ApiResponse(true, "successfully buy a coupon!");
    }

    @Override
    public Set<Coupon> getCoupons(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null)
            return new HashSet<>();

        Set<Coupon> coupons = user.getCoupons();
        if (coupons == null)
            return new HashSet<>();
        else
            return coupons;
    }
}
