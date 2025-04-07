package com.leave.dto;

public class LeaveStatsDTO {
    private long leavesApplied;
    private long leavesApproved;
    private long leavesPending;
    private long leavesRejected;

    public LeaveStatsDTO(long leavesApplied, long leavesApproved, long leavesPending, long leavesRejected) {
        this.leavesApplied = leavesApplied;
        this.leavesApproved = leavesApproved;
        this.leavesPending = leavesPending;
        this.leavesRejected = leavesRejected;
    }

    public long getLeavesApplied() {
        return leavesApplied;
    }

    public long getLeavesApproved() {
        return leavesApproved;
    }

    public long getLeavesPending() {
        return leavesPending;
    }

    public long getLeavesRejected() {
        return leavesRejected;
    }
}
