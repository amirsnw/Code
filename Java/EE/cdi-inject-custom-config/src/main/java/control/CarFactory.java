package control;

import entity.Car;
import entity.Specification;

import javax.inject.Inject;
import java.util.UUID;

public class CarFactory {

    @Inject
    @Config("identifier.prefix")
    String identifierPrefix;

    public Car createCar(Specification specification) {
        Car car = new Car();
        car.setIdentifier(identifierPrefix + "-" + UUID.randomUUID().toString());
        car.setColor(specification.getColor());
        car.setEngineType(specification.getEngineType());
        return car;
    }

}
