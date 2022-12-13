package com.impl;

import com.api.AutoService;

import javax.inject.Named;

@Named("fordAutoService")
public class FordAutoService implements AutoService {

    @Override
    public void getService() {
        System.out.println("You chose Ford auto service");
    }
}
