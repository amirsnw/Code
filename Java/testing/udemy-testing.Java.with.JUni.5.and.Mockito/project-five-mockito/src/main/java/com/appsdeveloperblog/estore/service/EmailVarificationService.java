package com.appsdeveloperblog.estore.service;

import com.appsdeveloperblog.estore.model.User;

public interface EmailVarificationService {
    void scheduleEmailConfirmation(User user);
}
