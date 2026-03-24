package com.example.server.service;

import com.example.server.model.FoodItem;
import com.example.server.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    private static final double EARTH_RADIUS = 6371; // Kilometers

    /**
     * Finds nearby food items for a specific NGO or Volunteer.
     */
    public List<FoodItem> findNearbyFood(User user, List<FoodItem> allItems, double radiusKm) {
        if (user.getLatitude() == null || user.getLongitude() == null) {
            return allItems; // If user has no location, return all
        }

        return allItems.stream()
                .filter(item -> item.getLatitude() != null && item.getLongitude() != null)
                .filter(item -> calculateDistance(user.getLatitude(), user.getLongitude(), 
                                                 item.getLatitude(), item.getLongitude()) <= radiusKm)
                .sorted((a, b) -> Double.compare(
                        calculateDistance(user.getLatitude(), user.getLongitude(), a.getLatitude(), a.getLongitude()),
                        calculateDistance(user.getLatitude(), user.getLongitude(), b.getLatitude(), b.getLongitude())))
                .collect(Collectors.toList());
    }

    /**
     * Haversine formula to calculate distance between two points in km.
     */
    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }
}
