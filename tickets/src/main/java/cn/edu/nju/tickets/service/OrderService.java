package cn.edu.nju.tickets.service;

import cn.edu.nju.tickets.entity.Order;
import cn.edu.nju.tickets.payload.ApiResponse;
import cn.edu.nju.tickets.payload.OrderPayload;

import java.util.Set;

public interface OrderService {

    ApiResponse placeAnOrder(OrderPayload orderPayload);

    ApiResponse deleteAnOrder(Long orderId);

    Set<Order> getUserOrders(String username);

    Set<Order> getStadiumOrders(String stadiumCode);

    ApiResponse dealAnOrder(Long orderId, String account, String password);

    ApiResponse dealAnOrderOffline(OrderPayload orderPayload);

    ApiResponse placeAnOrderSelectSeat(OrderPayload orderPayload);

    Order getAnOrder(Long orderId);

    ApiResponse confirmAnOrder(Long orderId);

}
