package com.control;

import com.entity.Car;
import com.entity.Specification;

import javax.transaction.Transactional;
import java.util.UUID;

public class CarFactory {

    @Transactional(rollbackOn = CarStorageException.class)
    public Car createCar(Specification specification) {
        Car car = new Car();
        car.setIdentifier(UUID.randomUUID().toString());
        car.setColor(specification.getColor());
        car.setEngineType(specification.getEngineType());
        return car;
    }

}
