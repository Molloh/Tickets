package cn.edu.nju.tickets.controller;



import cn.edu.nju.tickets.entity.Coupon;
import cn.edu.nju.tickets.payload.CouponPayload;
import cn.edu.nju.tickets.service.CouponService;
import cn.edu.nju.tickets.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/coupon")
public class CouponController {
    private final CouponService couponService;

    @Autowired
    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @PostMapping("/{username}")
    public ResponseEntity<?> buyACoupon(@PathVariable String username, @RequestBody CouponPayload couponPayload) {
        return ResponseUtil.returnResponse(couponService.buyACoupon(username, couponPayload));
    }

    @GetMapping("/{username}")
    public Set<Coupon> getCoupons(@PathVariable String username) {
        return couponService.getCoupons(username);
    }
}
