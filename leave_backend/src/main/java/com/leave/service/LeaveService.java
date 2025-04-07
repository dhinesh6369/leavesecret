package com.leave.service;

import com.leave.dto.LeaveStatsDTO;
import com.leave.model.LeaveModel;
import com.leave.repository.LeaveRepository;
import org.springframework.stereotype.Service;

@Service
public class LeaveService {

    private final LeaveRepository leaveRepository;

    public LeaveService(LeaveRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    public LeaveModel applyLeave(LeaveModel leave) {
        return leaveRepository.save(leave);
    }
    
    public LeaveStatsDTO getLeaveStats() {
        long totalApplied = leaveRepository.count(); // All leave requests
        long totalApproved = leaveRepository.countByStatus("Approved");
        long totalRejected = leaveRepository.countByStatus("Rejected");
        long totalPending = totalApplied - (totalApproved + totalRejected);

        return new LeaveStatsDTO(totalApplied, totalApproved, totalPending, totalRejected);
    }

}
