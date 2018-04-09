package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.constant.OrderStatus;
import cn.edu.nju.tickets.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderStatus(OrderStatus orderStatus);
}
