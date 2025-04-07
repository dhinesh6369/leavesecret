package com.user.service;

import org.springframework.stereotype.Service;

import com.user.model.AdminModel;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;

@Service
public class AdminService {

    private final AdminModel predefinedAdmin = new AdminModel(
        1L, "admin", "admin@company.com", "Admin@123"
    );

    public boolean login(String username, String password) {
        return predefinedAdmin.getUsername().equals(username) &&
               predefinedAdmin.getPassword().equals(password);
    }

    public AdminModel getAdminDetails() {
        return predefinedAdmin;
    }
}
