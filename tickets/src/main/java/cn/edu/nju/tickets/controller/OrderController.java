package cn.edu.nju.tickets.controller;

import cn.edu.nju.tickets.entity.Order;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.OrderPayload;
import cn.edu.nju.tickets.payload.PayPayPayload;
import cn.edu.nju.tickets.service.OrderService;
import cn.edu.nju.tickets.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> placeAnOrder(@Valid @RequestBody OrderPayload orderPayload) {
        ApiResponse apiResponse = orderService.placeAnOrder(orderPayload);
        return ResponseUtil.returnResponse(apiResponse);
    }

    @PostMapping("/{orderId}")
    public ResponseEntity<?> checkAnOrder(@PathVariable Long orderId) {
        return ResponseUtil.returnResponse(orderService.confirmAnOrder(orderId));
    }

    @PostMapping("/select")
    public ResponseEntity<?> placeAnOrderSelect(@Valid @RequestBody OrderPayload orderPayload) {
        ApiResponse apiResponse = orderService.placeAnOrderSelectSeat(orderPayload);
        return ResponseUtil.returnResponse(apiResponse);
    }

    @PostMapping("/cancel/{orderId}")
    public ResponseEntity<?> deleteAnOrder(@PathVariable Long orderId) {
        ApiResponse apiResponse = orderService.deleteAnOrder(orderId);
        return ResponseUtil.returnResponse(apiResponse);
    }

    @PostMapping("/deal/{orderId}")
    public ResponseEntity<?> dealAnOrder(@PathVariable Long orderId, @RequestBody PayPayPayload payPayPayload) {
        ApiResponse apiResponse = orderService.dealAnOrder(orderId, payPayPayload.getAccount(), payPayPayload.getPassword());
        return ResponseUtil.returnResponse(apiResponse);
    }

    @PostMapping("/offline-deal")
    public ResponseEntity<?> dealAnOrderOffline(@RequestBody OrderPayload orderPayload) {
        ApiResponse apiResponse = orderService.dealAnOrderOffline(orderPayload);
        return ResponseUtil.returnResponse(apiResponse);
    }

    @GetMapping("/user/{username}")
    public Set<Order> getUserOrder(@PathVariable String username) {
        return orderService.getUserOrders(username);
    }

    @GetMapping("/stadium/{stadiumCode}")
    public Set<Order> getStadiumOrder(@PathVariable String stadiumCode) {
        return orderService.getStadiumOrders(stadiumCode);
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.getAnOrder(orderId);
    }

}
