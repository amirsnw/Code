package ir.tamin.insurance.technical.util;

import ir.tamin.framework.cdi.CDIBeanFactory;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.logging.Logger;

/**
 *
 * @author s_tayari
 *
 */
@ApplicationScoped
public class WebResources {

    @Inject
    @WebProperties
    private Bundle webProperties;

    @Inject
    private CDIBeanFactory beanFactory;

    /*@PersistenceContext(unitName = "primary")
    private EntityManager em;*/

    public WebResources() {
    }
/*
    @Produces
    public EntityManager produceEntityManager() {
        return em;
    }*/

    @Produces
    @WebProperties
    // @ProductionConfig
    @ApplicationScoped
    public Bundle produceProdAppProps() {
        return new Bundle(ResourceBundle.getBundle("prod-web"));
    }

    /*@Produces
    @WebProperties
    // @DevelopmentConfig
    @ApplicationScoped
    public Bundle produceDevAppProps() {
        return new Bundle(ResourceBundle.getBundle("test-web"));
    }*/

    @Produces
    @MessageBundle
    @Named("WebMessages")
    @ApplicationScoped
    public Bundle produceMessageBundle() {
        return new Bundle("messages/WebMessages", new Locale(webProperties.getProperty("application.locale")));
    }

//    @Produces
//    public ResourceRepository produceEntityRepository() {
//        EntityRepository repository = new EntityRepository("models", entityManager);
//        repository.setCDIFactory(beanFactory);
//        return repository;
//    }

    /*@Produces
    @ApplicationScoped
    @Named("EntityRepository")
    public ResourceRepository produceEntityRepository() {
        EntityRepository entityRepository = new EntityRepository("models", em);
        entityRepository.setCDIFactory(beanFactory);
        return entityRepository;
    }*/

    @Produces
    public Logger produceLogger() {
        return Logger.getAnonymousLogger();
    }
}
