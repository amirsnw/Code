package ir.tamin.insurance.technical.business.refund;

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
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.function.refund.*;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.refund.Refund;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.util.DateUtils;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.math.BigDecimal;
import java.util.*;

@Stateless
@Named("RefundSpecProxy")
public class RefundSpecProxy extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private UserManager userManager;

    @Inject
    private UserManager um;

    @Inject
    RestServices restServices;

    @Inject
    private TokenContext tokenContext;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Inject
    private ValidatorBean validatorBean;

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dBFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedure;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        OrgUser currentUser = um.getUserByName(tokenContext.getCurrentUser().getUsername());
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());
        String org = currentUser.getOrganization().getCode();
        Optional<Filter> brchCodeFilter = null;

        if (!checkRole(currentUser, roles)) {
            throw new UserNotAllowedException();
        }

        if (fw != null) {
            brchCodeFilter = fw.getFilters().stream()
                    .filter(item -> item.getProperty().equalsIgnoreCase("branchCode"))
                    .findFirst();
        }

        if (org != null) {
            if (!org.equals("0000")) {
                if (fw == null) {
                    fw = FilterWrapper.createWrapperWithFilter("branchCode",
                            Filter.Operator.EQUAL, org);
                } else if (brchCodeFilter.isPresent()) {
                    brchCodeFilter.get().setValue(org);
                }
            }
        }

        try {
            return super.search(clazz, fw, sw, start, limit, includeCount);
        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundSpecProxy.search." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    @ProxyMethod
    public Resource save(Resource clientObject) throws ProxyProcessingException {

        Refund refund = (Refund) clientObject;
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        validateCreateRequest(refund);
        try {
            refund.setCreateUserId(user.getUserName());
            refund.setCreateDate(new Date());
            refund.setRegBranchCode(user.getOrganization().getCode());
            refund.setStatus("0");

            try {
                checkConstraintsErrors(refund);
            } catch (ValidationException e) {
                System.err.println("REFUND-DEBUG: RefundSpecProxy.save." + e.getStackTrace()[0]);
                throw e;
            }

            return super.save(refund);
        } catch (ResourceAlreadyExistsException e) {
            System.err.println("REFUND-DEBUG: RefundSpecProxy.save." + e.getStackTrace()[0]);
            throw e;
        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundSpecProxy.save." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public Resource edit(Resource clientObject, Resource domainObject) throws ProxyProcessingException {

        Resource resource = null;
        RefundReduceHistValue refundReduceHistValue = null;
        OrgUser user = null;
        try {

            user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
            Refund oldObject = (Refund) domainObject;
            Refund newObject = (Refund) clientObject;

            if (newObject.getActionType() != null) {
                switch (newObject.getActionType()) {
                    case "TechOpinion":
                        validateEditRequest(oldObject, newObject);
                        oldObject.setTechConfirmDate(new Date());
                        oldObject.setTechConfirmUserId(user.getNationalCode());
                        oldObject.setStatus(newObject.getStatus());
                        resource = super.edit(oldObject, oldObject);
                        break;
                    case "BranchOpinion":
                        validateEditRequest(oldObject, newObject);
                        oldObject.setBossUserId(user.getNationalCode());
                        oldObject.setBossDate(new Date());
                        oldObject.setStatus("3");
                        refundReduceHistValue = refundReduceHist(oldObject.getNationalId(), oldObject.getBranchCode(), user.getNationalCode(),
                                oldObject.getInsuranceId(), oldObject.getPaymentRefrenceId(), null,
                                DateUtils.format(oldObject.getIsuStartDate(), "yyyyMMdd"),
                                DateUtils.format(oldObject.getIsuEndDate(), "yyyyMMdd"), oldObject.getIsuDays(),
                                null);

                        if (refundReduceHistValue.getResult().equals(new BigDecimal(0))) {
                            throw new ProxyProcessingException(refundReduceHistValue.getMessage(), new String[0]);
                        }
                        resource = super.edit(oldObject, oldObject);
                        break;
                    case "CancelRequest":
                        validateEditRequest(oldObject, newObject);
                        oldObject.setCancelUserId(user.getNationalCode());
                        oldObject.setCanceldate(new Date());
                        oldObject.setStatus(newObject.getStatus());
                        resource = super.edit(oldObject, oldObject);
                        break;
                }
            } else {
                validateEditRequest(oldObject, newObject);

                oldObject.setEditUserId(user.getUserName());
                oldObject.setEditDate(new Date());
                oldObject.setRefundReason(newObject.getRefundReason());
                oldObject.setIsuStartDate(newObject.getIsuStartDate());
                oldObject.setIsuEndDate(newObject.getIsuEndDate());
                oldObject.setIsuDays(newObject.getIsuDays());
                oldObject.setIsuAmount(newObject.getIsuAmount());
                oldObject.setIsuDebitTypeCode(newObject.getIsuDebitTypeCode());
                oldObject.setDarmanStartDate(newObject.getDarmanStartDate());
                oldObject.setDarmanEndDate(newObject.getDarmanEndDate());
                oldObject.setDarmanDays(newObject.getDarmanDays());
                oldObject.setDarmanAmount(newObject.getDarmanAmount());
                oldObject.setDarmanDebitTypeCode(newObject.getDarmanDebitTypeCode());
                resource = super.edit(oldObject, oldObject);
            }
        } catch (UserNotAllowedException e) {
            System.err.println("REFUND-DEBUG: RefundSpecProxy.edit." + e.getStackTrace()[0]);
            throw new UserNotAllowedException();
        } catch (ProxyProcessingException e) {
            System.err.println("REFUND-DEBUG: RefundSpecProxy.edit." + e.getStackTrace()[0]);
            throw e;
        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundSpecProxy.edit." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
        return resource;
    }

    private void validateHistory(Refund refund) throws ProxyProcessingException {

        RefundHistoryValue refundHistoryValue = refundHistoryActive(
                refund.getInsuranceId(),
                refund.getNationalId(),
                refund.getIsuTypeCode(),
                refund.getCategoryTypeCode(),
                DateUtils.format(refund.getIsuStartDate(), "yyyyMMdd"),
                DateUtils.format(refund.getIsuEndDate(), "yyyyMMdd")
        );
        if (refundHistoryValue != null
                && refundHistoryValue.getResult().equalsIgnoreCase("0")) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.noActiveReg"), new String[0]);
        }
    }

    private void validateBankAccount(Refund refund) throws ProxyProcessingException {

        String bankAccountNumber = restServices.getBankAccount(refund.getNationalId());
        if (bankAccountNumber == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.noActiveBankAccount"), new String[0]);
        }
    }

    private void validateCreateRequest(Refund refund) throws ProxyProcessingException {

        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        String org = user.getOrganization().getCode();
        if (refund.getBranchCode() == null || refund.getBranchCode().equals("")) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.notAllowed"), new String[0]);
        }
        if (!refund.getBranchCode().equals(org)) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.NotAllowedBranch"), new String[0]);
        }
    }

    private void validateEditRequest(Refund oldObject, Refund newObject) throws ProxyProcessingException {

        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        String org = user.getOrganization().getCode();
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());

        if (newObject.getActionType() != null) {
            switch (newObject.getActionType()) {
                case "TechOpinion":
                    if (oldObject.getBossUserId() != null || !Arrays.asList("0", "1", "2").contains(oldObject.getStatus())) {
                        throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.notAllowed"), new String[0]);
                    }
                    if (!oldObject.getBranchCode().equals(org)) {
                        throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.NotAllowedBranch"), new String[0]);
                    }
                    validateHistory(newObject);
                    validateBankAccount(newObject);
                    break;
                case "BranchOpinion":
                    if (oldObject.getBossUserId() != null || !oldObject.getStatus().equals("1")) {
                        throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.notAllowed"), new String[0]);
                    }
                    if ((user != null && roles != null && !roles.contains(Roles.MANAGER_USER_TECH))) {
                        throw new UserNotAllowedException();
                    }
                    if ((!oldObject.getBranchCode().equals(org))) {
                        throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.NotAllowedBranch"), new String[0]);
                    }
                    break;
                case "CancelRequest":
                    if (!Arrays.asList("0", "1", "2", "7").contains(oldObject.getStatus())) {
                        throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.notAllowed"), new String[0]);
                    }
                    if (!oldObject.getBranchCode().equals(org)) {
                        throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.NotAllowedBranch"), new String[0]);
                    }
                    break;
            }
        } else {
            if (!oldObject.getStatus().equals("0")) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.notAllowed"), new String[0]);
            }
            if (!oldObject.getBranchCode().equals(org)) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.refund.NotAllowedBranch"), new String[0]);
            }
        }
    }

    private RefundHistoryValue refundHistoryActive(String insuranceId, String userId, String isuTypeCode,
                                                   String categoryTypeCode, String isuStartDate, String isuEndDate) {
        dBFunctionProxy.setProcedureManager(procedure);
        try {
            RefundHistoryValue refundHistoryValue = (RefundHistoryValue) dBFunctionProxy.execute(new RefundHistory(),
                    new RefundHistoryInput(insuranceId, userId, isuTypeCode, categoryTypeCode, isuStartDate, isuEndDate));
            return refundHistoryValue;
        } catch (ProxyProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public RefundReduceHistValue refundReduceHist(String pnatid, String pbrch_code, String puserid, String p_risuid,
                                                  String resno, String p_dordno, String p_worsdate, String p_woredate,
                                                  int p_wordays, String p_mazadflg) throws ProxyProcessingException {
        dBFunctionProxy.setProcedureManager(procedure);
        String p_ordno = null;
        try {
            p_ordno = (String) entityManager.createNativeQuery("select dbt.ord_ordno ||'01'" +
                    " from SPECIALINS.clm_orddbt dbt where dbt.cws_dbtno in (select c.cws_dbtno" +
                    " from techins.esis_cntrctdebit c where c.resnum = ? and c.debitcrtreasoncode<>'18')")
                    .setParameter(1, resno)
                    .getSingleResult();
        } catch (Exception e) {
            System.err.println("REFUND-DEBUG: RefundSpecProxy.refundReduceHist." + e.getStackTrace()[0]);
            throw e;
        }

        try {
            RefundReduceHistValue refundReduceHistValue = (RefundReduceHistValue) dBFunctionProxy.execute(new RefundReduceHist(),
                    new RefundReduceHistInput(pnatid, pbrch_code, puserid, p_risuid, p_ordno,
                            p_dordno, p_worsdate, p_woredate, p_wordays, p_mazadflg));
            return refundReduceHistValue;
        } catch (ProxyProcessingException e) {
            StringBuilder exception = new StringBuilder(e.getMessage());
            for (int i = 0; i <= e.getMessage().length() - 1; i++) {
                char character = e.getMessage().charAt(i);
                if ((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') || (character >= '0' && character <= '9')
                        || ((character == ':' || character == '"' || character == '_' || character == ',' || character == '.' || character == '-' || character == '\n'
                        || character == '\t' || character == '\r' || character == '?' || character == '[' || character == ']' || character == '(' || character == ')' || character == '='
                        || character == '>' || character == '<'))) {
                    exception.setCharAt(i, ' ');
                }
            }
            if (exception.toString().isEmpty()) {
                throw new ProxyProcessingException();
            }
            throw new ProxyProcessingException(exception.toString(), new String[0]);
        }
    }

    private void checkConstraintsErrors(Refund refund) throws ProxyProcessingException {

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
            try {
                validatorBean.validate(refund);
            } catch (ValidationException e) {
                System.err.println("REFUND-DEBUG: MasterDurationProxy.save." + e.getStackTrace()[0]);
                throw new ProxyProcessingException(e);
            }
            Set<ConstraintViolation<Refund>> constraintViolations = validator.validate(refund);
            if (constraintViolations.size() > 0) {
                Iterator<ConstraintViolation<Refund>> iterator = constraintViolations.iterator();
                while (iterator.hasNext()) {
                    ConstraintViolation<Refund> cv = iterator.next();
                    System.err.println(cv.getRootBeanClass().getName() + "." + cv.getPropertyPath() + " " + cv.getMessage());
                }
            }
    }

    private Boolean checkRole(OrgUser curentUser, List roles) {
        boolean result = true;
        if (curentUser != null
                && roles != null
                && !roles.contains(Roles.GENERAL_USER_TECH)
                && !roles.contains(Roles.HEAD_USER_TECH)
                && !roles.contains(Roles.INSPECTOR_USER_TECH)
                && !roles.contains(Roles.PROV_HEAD_USER_TECH)
                && !roles.contains(Roles.EDAREKOL_FANI_USER)
                && !roles.contains(Roles.MANAGER_USER_TECH)) {
            result = false;;
        }
        return result;
    }

}
