package com.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.user.model.AdminModel;
import com.user.service.AdminService;
//import com.user.service.EmailService;


@RestController
@RequestMapping("/api/admin")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://15.168.114.125:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;
//    @Autowired
//    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminModel request) {
        if (adminService.login(request.getUsername(), request.getPassword())) {
            return new ResponseEntity<>("Admin login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid admin credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/details")
    public ResponseEntity<AdminModel> getAdminDetails() {
        return new ResponseEntity<>(adminService.getAdminDetails(), HttpStatus.OK);
    }
//    @PostMapping("/approve")
//    public String approveLeave(@RequestParam String employeeEmail, @RequestParam boolean isApproved) {
//        // Logic to update leave status in database...
//
//        String subject = isApproved ? "Leave Request Approved" : "Leave Request Rejected";
//        String body = isApproved
//            ? "Your leave request has been approved."
//            : "Your leave request has been rejected.";
//
//        emailService.sendEmail(employeeEmail, subject, body);
//        return "Leave status updated and employee notified!";
//    }

}
