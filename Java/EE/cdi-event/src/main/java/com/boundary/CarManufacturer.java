package com.boundary;

import com.control.CarFactory;
import com.entity.Car;
import com.entity.CarCreated;
import com.entity.Specification;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;

@Stateless
public class CarManufacturer {

    @Inject
    CarFactory carFactory;

    @Inject
    Event<CarCreated> carCreated;

    public Car manufactureCar(Specification specification) {
        Car car = carFactory.createCar(specification);
        carCreated.fire(new CarCreated(car.getIdentifier()));
        return car;
    }

}
