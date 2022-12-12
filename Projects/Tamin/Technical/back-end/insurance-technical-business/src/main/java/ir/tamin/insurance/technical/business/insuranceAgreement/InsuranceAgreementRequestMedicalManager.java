package ir.tamin.insurance.technical.business.insuranceAgreement;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.data.validation.ValidationException;
import ir.tamin.framework.data.validation.ValidatorBean;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.Resource;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.domain.proxy.ResourceAlreadyExistsException;
import ir.tamin.framework.domain.proxy.UserNotAllowedException;
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
import ir.tamin.insurance.technical.model.insuranceAgreement.InsuranceAgreementRequestMedical;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.util.DateConvert;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;

//import ir.tamin.framework.core.util.DateUtils;

@Stateless
@Named("InsuranceAgreementRequestMedicalManager")
public class InsuranceAgreementRequestMedicalManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private UserManager userManager;

    @Inject
    private UserBean userBean;

    @Inject
    EntityManager em;

    @Inject
    RestServices restServices;

    @Inject
    private TokenContext tokenContext;

    @Inject
    private ValidatorBean validatorBean;

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

    @Inject
    private DateConvert dateConvert;

    private String checkResultMessage = null;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {

        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());
        String org = user.getOrganization().getCode();
        CollectionData collectionDataInsuranceAgreement = null;
        List<String> branchCodes = branchManager.getBranches(org);
        String subOrgString = null;

        if (user != null && roles != null
                && !roles.contains("GENERAL USER TECHNICAL")
                && !roles.contains("HEAD USER TECH")) {
            throw new UserNotAllowedException();
        }

        if (branchCodes.size() > 0) {
            for (String subOrgTemp : branchCodes) {
                subOrgString = subOrgString == null ? subOrgTemp : subOrgString + ',' + subOrgTemp;
            }
        }

        if (fw == null) {
            if (!org.equals("0000") && branchCodes.isEmpty()) {
                FilterWrapper filterWrapper = FilterWrapper.createWrapperWithFilter("branch.branchCode", Filter.Operator.EQUAL, org);
                fw = filterWrapper;

            } else if (!org.equals("0000") && branchCodes.size() > 0) {
                FilterWrapper filterWrapper = FilterWrapper.createWrapperWithFilter("branch.branchCode", Filter.Operator.IN, subOrgString);
                fw = filterWrapper;
            }
        } else {
            for (Filter filter : fw.getFilters()) {
                fw.addFilter(filter.getProperty(), filter.getOperator(), filter.getValue());
            }
        }
        collectionDataInsuranceAgreement = super.search(clazz, fw, sw, start, limit, includeCount);

//        if ( collectionDataInsuranceAgreement != null) {
//            collectionDataInsuranceAgreement.getList().forEach(item -> {
//                InsuranceRegisteration identity = (InsuranceRegisteration) item;
//                identity.setIsuStat(insuranceRegisterationProxy.getInsuranceStatus(identity.getId(), identity.getNationalId()));
//                identity.setIsuType(insuranceRegisterationProxy.getInsuranceType(identity.getId(), identity.getNationalId()));
//            });
//        }
        return collectionDataInsuranceAgreement;
    }

    @Override
    @ProxyMethod
    public Resource save(Resource clientObject) throws ProxyProcessingException {
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());

        if (user != null && roles != null
                && !roles.contains("GENERAL USER TECHNICAL")
                && !roles.contains("HEAD USER TECH")) {
            throw new UserNotAllowedException();
        }

        try {
            InsuranceAgreementRequestMedical requestMedical = (InsuranceAgreementRequestMedical) clientObject;

            try {
                validatorBean.validate(requestMedical);
            } catch (ValidationException e) {
                System.err.println("AGREEMNET-DEBUG: RequestSpecProxy.save." + e.getStackTrace()[0]);
                throw e;
            }

            //TODO
            Resource resource = super.save(requestMedical);
            return resource;
        } catch (ProxyProcessingException e) {
            throw new ProxyProcessingException(e.getMessageKey(), new String[0]);
        } catch (ResourceAlreadyExistsException e) {
            System.out.println(e.toString());
            throw new ResourceAlreadyExistsException(e);
        } catch (Exception e) {
            System.out.println(e.toString());
            throw new ProxyProcessingException(e);
        }
    }

}
