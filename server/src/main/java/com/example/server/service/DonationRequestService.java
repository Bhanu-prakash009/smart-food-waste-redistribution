package com.example.server.service;

import com.example.server.model.DonationRequest;
import com.example.server.model.FoodItem;
import com.example.server.model.User;
import com.example.server.repository.DonationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DonationRequestService {
    @Autowired
    private DonationRequestRepository donationRequestRepository;
    
    @Autowired
    private FoodItemService foodItemService;

    @Autowired
    private UserService userService;

    public DonationRequest createRequest(Long foodItemId, Long ngoId) {
        FoodItem foodItem = foodItemService.getById(foodItemId);
        User ngo = userService.findById(ngoId).orElseThrow(() -> new RuntimeException("NGO not found"));

        if (!"AVAILABLE".equals(foodItem.getStatus())) {
            throw new RuntimeException("Food item is not available");
        }

        DonationRequest request = new DonationRequest();
        request.setFoodItem(foodItem);
        request.setNgo(ngo);
        request.setRequestTime(LocalDateTime.now());
        request.setStatus("ACCEPTED");
        
        foodItemService.updateFoodStatus(foodItemId, "CLAIMED");

        return donationRequestRepository.save(request);
    }
    
    public List<DonationRequest> getNgoRequests(Long ngoId) {
        return donationRequestRepository.findByNgoId(ngoId);
    }
}
