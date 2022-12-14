package ir.tamin.insurance.technical.business.util;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Named;
import java.util.Locale;

/**
 * @author s_tayari
 */
public class EjbResources {

    @Produces
    @MessageBundle
    @Named("EjbMessages")
    @ApplicationScoped
    public Bundle produceMessageBundle() {
        return new Bundle("messages/BusinessMessages", new Locale("fa"));
    }

}
