package com.leave.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leave.dto.LeaveStatsDTO;
import com.leave.model.EmployeeModel;
import com.leave.model.LeaveModel;
import com.leave.repository.EmployeeRepository;
import com.leave.repository.LeaveRepository;
import com.leave.service.LeaveService;

@RestController
@RequestMapping("/api/leave")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://15.168.114.125:3000")
public class LeaveController {
	
    @Autowired
    private LeaveService leaveService;

    @Autowired
    private EmployeeRepository employeeRepository; 

    @Autowired
    private LeaveRepository leaveRepository; 
    
    @PostMapping("/apply")
    public ResponseEntity<String> applyLeave(@RequestBody Map<String, String> leaveRequest, @RequestParam String empId) {
        String leaveType = leaveRequest.get("leaveType");
        LocalDate startDate = LocalDate.parse(leaveRequest.get("startDate"));
        LocalDate endDate = LocalDate.parse(leaveRequest.get("endDate"));
        String description = leaveRequest.get("description");

        Optional<EmployeeModel> employee = employeeRepository.findByEmpId(empId);
        if (!employee.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee not found!");
        }

        EmployeeModel emp = employee.get();
        String name = emp.getName();

        LeaveModel leave = new LeaveModel(empId, name, leaveType, startDate, endDate, description);
        leaveService.applyLeave(leave);

        return ResponseEntity.ok("Leave applied successfully!");
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<LeaveModel>> getAllLeaveRequests() {
        List<LeaveModel> leaveRequests = leaveRepository.findAll();
        if (leaveRequests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.ok(leaveRequests);
    }
    
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateLeaveStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<LeaveModel> optionalLeave = leaveRepository.findById(id);

        if (optionalLeave.isPresent()) {
            LeaveModel leave = optionalLeave.get();
            leave.setStatus(status); 
            leaveRepository.save(leave);
            return ResponseEntity.ok("Leave status updated to: " + status);
        } else {
            return ResponseEntity.badRequest().body("Leave request not found!");
        }
    }
    
    @GetMapping("/stats-leave")
    public LeaveStatsDTO getLeaveStats() {
        return leaveService.getLeaveStats();
    }
    
    @GetMapping("/history/{empId}")
    public ResponseEntity<Object> getLeaveHistory(@PathVariable String empId) {
        List<LeaveModel> leaveHistory = leaveRepository.findByEmpId(empId);
        
        if (leaveHistory.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("empId not found");
        }       
        return ResponseEntity.ok(leaveHistory);
    }
}

