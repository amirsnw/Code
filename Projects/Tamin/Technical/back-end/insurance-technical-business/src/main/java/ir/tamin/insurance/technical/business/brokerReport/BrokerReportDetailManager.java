package ir.tamin.insurance.technical.business.brokerReport;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.user.UserManager;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

@Stateless
@Named("BrokerReportDetailManager")
public class BrokerReportDetailManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private UserManager um;

    @Inject
    private TokenContext tokenContext;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dBFunctionProxy;

    @Inject
    private EntityManager entityManager;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit,
                                 boolean includeCount) throws ProxyProcessingException {

        if (super.entityManager == null) {
            super.setEntityManager(this.entityManager);
        }
        try {
            return super.search(clazz, fw, sw, start, limit, includeCount);
        } catch (Exception e) {
            System.err.println("BROKER-DEBUG: BrokerReportDetailManager.search." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

}