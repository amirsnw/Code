package com.boundary;

import com.control.CarFactory;
import com.entity.Car;
import com.entity.Specification;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class CarManufacturer {

    @Inject
    CarFactory carFactory;

    public Car manufactureCar(Specification specification) {
        Car car = carFactory.createCar(specification);
        return car;
    }

}
