package com.example.server.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "donation_request_id", nullable = false)
    private DonationRequest donationRequest;

    @ManyToOne
    @JoinColumn(name = "volunteer_id")
    private User volunteer;

    // e.g. PENDING_PICKUP, IN_TRANSIT, DELIVERED, CANCELLED
    @Column(nullable = false)
    private String status;

    private LocalDateTime pickupTime;
    private LocalDateTime deliveryTime;
    
    private String liveLocation; // Current lat,long of volunteer

    public Delivery() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public DonationRequest getDonationRequest() { return donationRequest; }
    public void setDonationRequest(DonationRequest donationRequest) { this.donationRequest = donationRequest; }

    public User getVolunteer() { return volunteer; }
    public void setVolunteer(User volunteer) { this.volunteer = volunteer; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getPickupTime() { return pickupTime; }
    public void setPickupTime(LocalDateTime pickupTime) { this.pickupTime = pickupTime; }

    public LocalDateTime getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(LocalDateTime deliveryTime) { this.deliveryTime = deliveryTime; }

    public String getLiveLocation() { return liveLocation; }
    public void setLiveLocation(String liveLocation) { this.liveLocation = liveLocation; }
}
