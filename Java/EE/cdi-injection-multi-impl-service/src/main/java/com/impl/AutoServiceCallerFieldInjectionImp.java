package com.impl;

import com.api.AutoService;
import com.api.AutoServiceCaller;

import javax.inject.Inject;
import javax.inject.Named;

public class AutoServiceCallerFieldInjectionImp implements AutoServiceCaller {

    @Inject
    @Named("bmwAutoService")
    private AutoService bmwAutoService;

    @Inject
    @Named("hondaAutoService")
    private AutoService hondaAutoService;

    @Inject
    @Named("fordAutoService")
    private AutoService fordAutoService;

    @Override
    public void callAutoService() {
        // get bmw's auto service
        bmwAutoService.getService();

        // get ford's auto service
        fordAutoService.getService();

        // get honda's auto service
        hondaAutoService.getService();
    }
}
