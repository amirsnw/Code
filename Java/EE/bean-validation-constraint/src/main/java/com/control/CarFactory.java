package com.control;

import com.entity.Car;
import com.entity.Specification;

import java.util.Random;
import java.util.UUID;

public class CarFactory {

    public Car createCar(Specification specification) {
        if (new Random().nextBoolean())
            throw new CarCreationException("could not create car");
        Car car = new Car();
        car.setIdentifier(UUID.randomUUID().toString());
        car.setColor(specification.getColor());
        car.setEngineType(specification.getEngineType());
        return car;
    }

}
