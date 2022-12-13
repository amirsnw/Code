package com.impl;

import com.api.AutoService;

import javax.inject.Named;

@Named("bmwAutoService")
public class BMWAutoService implements AutoService {

    @Override
    public void getService() {
        System.out.println("You chose BMW auto service");
    }
}
