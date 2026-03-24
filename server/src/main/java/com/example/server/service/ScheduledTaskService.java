package com.example.server.service;

import com.example.server.model.FoodItem;
import com.example.server.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScheduledTaskService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private NotificationService notificationService;

    // Run every minute to check for expired food
    @Scheduled(fixedRate = 60000)
    public void checkExpiredFood() {
        List<FoodItem> availableFood = foodItemRepository.findByStatus("AVAILABLE");
        LocalDateTime now = LocalDateTime.now();

        for (FoodItem item : availableFood) {
            if (item.getExpiryTime().isBefore(now)) {
                item.setStatus("EXPIRED");
                foodItemRepository.save(item);
                
                // Notify the donor
                notificationService.notify(item.getDonor(), 
                    "Your listing '" + item.getName() + "' has expired and was removed from radar.", 
                    "EXPIRY");
            }
        }
    }
}
