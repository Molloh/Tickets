package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.entity.PayPal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PayPalRepository extends JpaRepository<PayPal, Long> {
    Optional<PayPal> findByAccount(String account);
}
