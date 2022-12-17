package boundary;

import control.CarCache;
import control.CarFactory;
import entity.Car;
import entity.Specification;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;
import java.util.function.Consumer;

@Stateless
public class CarManufacturer {

    @Inject
    CarFactory carFactory;

    @Inject
    CarCache carCache;

    @Inject
    Consumer<Throwable> fatalLogger;

    public Car manufactureCar(Specification specification) {
        Car car = carFactory.createCar(specification);
        carCache.cache(car);

        try {
            // do something that can fail
        } catch (Exception e) {
            fatalLogger.accept(e);
        }

        return car;
    }

    public List<Car> retrieveCars() {
        return carCache.retrieveCars();
    }

}
