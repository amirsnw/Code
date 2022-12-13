package com.impl;

import com.api.AutoService;
import com.api.AutoServiceCaller;

import javax.inject.Inject;
import javax.inject.Named;

public class AutoServiceCallerConstructorInjectionImp implements AutoServiceCaller{

    private AutoService bmwAutoService;
    private AutoService hondaAutoService;
    private AutoService fordAutoService;

    @Inject
    public AutoServiceCallerConstructorInjectionImp(@Named("bmwAutoService") AutoService bmwAutoService,
                                @Named("hondaAutoService") AutoService hondaAutoService,
                                @Named("fordAutoService") AutoService fordAutoService) {

        this.bmwAutoService = bmwAutoService;
        this.fordAutoService = fordAutoService;
        this.hondaAutoService = hondaAutoService;
    }

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
