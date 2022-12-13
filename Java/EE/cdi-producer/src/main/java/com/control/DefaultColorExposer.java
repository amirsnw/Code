package com.control;

import com.entity.Color;

import javax.enterprise.inject.Produces;

public class DefaultColorExposer {

    @Produces
    @Diesel
    public Color exposeDefaultColor() {
        // ...
        return Color.RED;
    }

}
