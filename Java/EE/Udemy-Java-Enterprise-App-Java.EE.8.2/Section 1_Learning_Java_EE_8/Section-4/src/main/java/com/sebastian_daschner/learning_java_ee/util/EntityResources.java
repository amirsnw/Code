package com.sebastian_daschner.learning_java_ee.util;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * 
 * @author s_tayari
 *
 */
@ApplicationScoped
public class EntityResources {

    @PersistenceContext(unitName = "primary")
    private EntityManager em;

    @Produces
    public EntityManager produceEntityManager() {
        return em;
    }
}
