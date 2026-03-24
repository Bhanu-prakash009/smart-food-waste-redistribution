package com.example.server.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donation_requests")
public class DonationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_item_id", nullable = false)
    private FoodItem foodItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ngo_id", nullable = false)
    private User ngo;

    @Column(nullable = false)
    private LocalDateTime requestTime;

    // e.g., PENDING, ACCEPTED, COMPLETED
    @Column(nullable = false)
    private String status;

    public DonationRequest() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public FoodItem getFoodItem() { return foodItem; }
    public void setFoodItem(FoodItem foodItem) { this.foodItem = foodItem; }
    
    public User getNgo() { return ngo; }
    public void setNgo(User ngo) { this.ngo = ngo; }
    
    public LocalDateTime getRequestTime() { return requestTime; }
    public void setRequestTime(LocalDateTime requestTime) { this.requestTime = requestTime; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
