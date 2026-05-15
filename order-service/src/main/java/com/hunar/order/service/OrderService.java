package com.hunar.order.service;

import com.hunar.order.client.ProductClient;
import com.hunar.order.dto.OrderItemRequest;
import com.hunar.order.dto.OrderRequest;
import com.hunar.order.dto.ProductResponse;
import com.hunar.order.model.Order;
import com.hunar.order.model.OrderItem;
import com.hunar.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductClient productClient;

    @Transactional
    public String placeOrder(OrderRequest orderRequest) {
        List<OrderItem> orderItems = orderRequest.getOrderItems()
                .stream()
                .map(this::mapToOrderItem)
                .collect(Collectors.toList());

        BigDecimal totalAmount = orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .userId(orderRequest.getUserId())
                .orderItems(orderItems)
                .totalAmount(totalAmount)
                .status("PLACED")
                .build();

        // Deduct stock for each item
        for (OrderItemRequest itemRequest : orderRequest.getOrderItems()) {
            productClient.deductStock(itemRequest.getProductId(), itemRequest.getQuantity());
        }

        orderRepository.save(order);
        return "Order placed successfully";
    }

    private OrderItem mapToOrderItem(OrderItemRequest itemRequest) {
        ProductResponse product = productClient.getProductById(itemRequest.getProductId());
        
        if (product.getStockQuantity() < itemRequest.getQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + product.getTitle());
        }

        return OrderItem.builder()
                .productId(itemRequest.getProductId())
                .price(product.getPrice())
                .quantity(itemRequest.getQuantity())
                .build();
    }
}
