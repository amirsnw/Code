package com.control;

import com.entity.Car;
import com.entity.Color;
import com.entity.Specification;

import javax.enterprise.context.Dependent;
import java.util.UUID;

@Dependent
public class CarFactory {

    public Car createCar(Specification specification) {
        Car car = new Car();
        car.setIdentifier(UUID.randomUUID().toString());
        car.setColor(specification.getColor() == null ? Color.BLACK : specification.getColor());
        car.setEngineType(specification.getEngineType());
        return car;
    }

}
