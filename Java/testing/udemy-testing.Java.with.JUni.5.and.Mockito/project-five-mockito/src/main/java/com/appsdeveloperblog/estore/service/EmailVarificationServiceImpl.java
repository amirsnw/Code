package com.appsdeveloperblog.estore.service;

import com.appsdeveloperblog.estore.model.User;

public class EmailVarificationServiceImpl implements EmailVarificationService {
    @Override
    public void scheduleEmailConfirmation(User user) {
        // Put user details into email queue
        System.out.println("scheduleEmailConfirmation is called");
    }
}
