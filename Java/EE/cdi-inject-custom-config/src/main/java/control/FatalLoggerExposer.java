package control;

import javax.enterprise.inject.Produces;
import java.util.function.Consumer;

public class FatalLoggerExposer {

    @Produces
    public Consumer<Throwable> exposeFatalLogger() {
        return Throwable::printStackTrace;
    }

}
