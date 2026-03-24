package com.example.server.repository;

import com.example.server.model.DonationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRequestRepository extends JpaRepository<DonationRequest, Long> {
    List<DonationRequest> findByNgoId(Long ngoId);
    List<DonationRequest> findByFoodItemId(Long foodItemId);
}
