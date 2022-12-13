package com.impl;

import com.api.AutoService;
import com.api.AutoServiceCaller;

import javax.inject.Inject;
import javax.inject.Named;

public class AutoServiceCallerSetterInjectionImp implements AutoServiceCaller{

    private AutoService bmwAutoService;
    private AutoService hondaAutoService;
    private AutoService fordAutoService;

    @Override
    public void callAutoService() {

        bmwAutoService.getService();
        fordAutoService.getService();
        hondaAutoService.getService();
    }

    @Inject
    public void setBmwAutoService(@Named("bmwAutoService") AutoService bmwAutoService) {
        this.bmwAutoService = bmwAutoService;
    }

    @Inject
    public void setHondaAutoService(@Named("hondaAutoService") AutoService hondaAutoService) {
        this.hondaAutoService = hondaAutoService;
    }

    @Inject
    public void setFordAutoService(@Named("fordAutoService") AutoService fordAutoService) {
        this.fordAutoService = fordAutoService;
    }
}
