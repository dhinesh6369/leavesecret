package com.leave.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "leaves")
public class LeaveModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empId; // Employee ID (Automatically stored)
    private String name;  // Employee Name (Automatically stored)
    private String leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;

    private String status = "Pending"; // Default status is Pending

    // ✅ Default Constructor (No Arguments)
    public LeaveModel() {
    }

    public LeaveModel(String empId, String name, String leaveType, LocalDate startDate, LocalDate endDate, String description) {
        this.empId = empId;
        this.name = name;
        this.leaveType = leaveType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.status = "Pending"; // New leave requests are "Pending" by default
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "LeaveModel{" +
                "id=" + id +
                ", empId='" + empId + '\'' +
                ", name='" + name + '\'' +
                ", leaveType='" + leaveType + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
