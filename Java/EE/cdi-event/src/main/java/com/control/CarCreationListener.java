package com.control;

import com.entity.CarCreated;

import javax.enterprise.event.Observes;

public class CarCreationListener {

    public void onCarCreation(@Observes CarCreated carCreated) {
        // ...
        System.out.println("new car created with id " + carCreated.getIdentifier());
    }

}
