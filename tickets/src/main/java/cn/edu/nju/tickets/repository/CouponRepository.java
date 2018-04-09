package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.entity.Coupon;
import cn.edu.nju.tickets.payload.CouponPayload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {



}
