package ir.tamin.insurance.technical.business.insuranceAgreement;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.baseinfo.BranchManager;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserBean;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.insuranceAgreement.AgreementCategoryType;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.util.Set;

@Stateless
@Named("AgreementCategoryTypeManager")
public class AgreementCategoryTypeManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private UserManager userManager;

    @Inject
    private UserBean userBean;

    @Inject
    private UserManager um;

    @Inject
    EntityManager em;

    @Inject
    RestServices restServices;

    @Inject
    private TokenContext tokenContext;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedureManager;

    @Inject
    private BranchManager branchManager;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        if (fw != null) {
            Set<Filter> filters = fw.getFilters();
        }

        CollectionData collectionData = super.search(clazz, fw, sw, start, limit, includeCount);

        //if (collectionData != null ) {
            collectionData.getList().forEach(item -> {
                AgreementCategoryType identity = (AgreementCategoryType) item;
                if (identity.getAgreementCategoryId() != null) {
                    String activityCode =(String) entityManager.createNamedQuery("AgreementCategory.getByCategoryId")
                            .setParameter("agreementCategoryId", identity.getAgreementCategoryId())
                            .getSingleResult();
                    identity.setActivityCode(activityCode);
                }
            });
       // }
        return collectionData;
    }

}
