package util;

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
