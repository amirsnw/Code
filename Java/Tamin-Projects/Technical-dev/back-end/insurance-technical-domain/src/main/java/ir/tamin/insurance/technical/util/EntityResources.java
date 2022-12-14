package ir.tamin.insurance.technical.util;


import ir.tamin.framework.cdi.CDIBeanFactory;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.repository.DBFunctionRepository;
import ir.tamin.framework.ws.rest.repository.EntityRepository;
import ir.tamin.framework.ws.rest.repository.ResourceRepository;

import javax.annotation.Resource;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.util.Locale;

/**
 * 
 * @author s_tayari
 *
 */
@ApplicationScoped
public class EntityResources  {

    @Inject
    private CDIBeanFactory beanFactory;

    @PersistenceContext(unitName = "primary")
    private EntityManager em;

    @Produces
    public EntityManager produceEntityManager() {
        return em;
    }

    @Produces
    @ApplicationScoped
    @Named("FunctionRepository")
    public ResourceRepository produceFunctionRepository() {
        DBFunctionRepository dbFunctionRepository = new DBFunctionRepository("functions", "ir.tamin.insurance.technical.function", new ProcedureManager(dataSource));
        dbFunctionRepository.setCDIFactory(beanFactory);
        return dbFunctionRepository;
    }

    @Produces
    @ApplicationScoped
    @Named("EntityRepository")
    public ResourceRepository produceEntityRepository() {
        EntityRepository repository = new EntityRepository("models", em);
        repository.setCDIFactory(beanFactory);
        return repository;
    }

    @Produces
    public DataSource produceDataSource() {
        return dataSource;
    }

    @Resource(lookup = "datasources/TechnicalInsuranceDS")
    private DataSource dataSource;

    @Produces
    @Named("ProcedureManager")
    public ProcedureManager produceProcedureManager() {
        return new ProcedureManager(dataSource);
    }

    @Resource(lookup = "datasources/SpecialinsDS")
    private DataSource dataSourceSpecialIns;

    @Produces
    @Named("ProcedureManagerSpecialIns")
    public ProcedureManager produceProcedureSpecialIns() {
        return new ProcedureManager(dataSourceSpecialIns);
    }
}
