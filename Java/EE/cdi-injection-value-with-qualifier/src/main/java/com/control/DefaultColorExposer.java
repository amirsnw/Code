package com.control;

import com.entity.Color;

import javax.enterprise.inject.Produces;
import javax.inject.Named;

public class DefaultColorExposer {

    @Produces
    @Named("defaultColor")
    public Color exposeDefaultColor() {
        return Color.BLACK;
    }

}
