package ir.tamin.insurance.technical.business.guardian;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.RemovableEntity;
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
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.business.baseinfo.BranchManager;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserBean;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.function.general.getProv.GetProv;
import ir.tamin.insurance.technical.function.general.getProv.GetProvInput;
import ir.tamin.insurance.technical.function.general.getProv.GetProvValue;
import ir.tamin.insurance.technical.function.general.updateLsu.UpdateLsuStatus;
import ir.tamin.insurance.technical.function.general.updateLsu.UpdateLsuStatusInput;
import ir.tamin.insurance.technical.function.general.updateLsu.UpdateLsuStatusValue;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.guardian.*;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.model.user.BranchUser;
import ir.tamin.insurance.technical.model.user.OrgUser;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.util.*;

@Stateless
@Named("GuardianSpecProxy")
public class GuardianSpecProxy extends AbstractEntityProxy implements EntityProxy {

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
    @Named("GuardianTranslogProxy")
    private EntityProxy GuardianTranslogProxy;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;

//    @Inject
//    @Named("ProcedureManager")
//    private ProcedureManager procedureManager;
    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedureManager;
    @Inject
    private BranchManager branchManager;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        OrgUser currentUser = um.getUserByName(tokenContext.getCurrentUser().getUsername());
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());
        String org = currentUser.getOrganization().getCode();
        CollectionData collectionDataGuradian = null;
        List<Guardian> guardianArrayList = null;
        List<String> branchCodes = branchManager.getBranches(org);
        String subOrgString = null;

        if (!checkRole(currentUser, roles)) {
            throw new UserNotAllowedException();
        }

        if (branchCodes.size() > 0) {
            for (String subOrgTemp : branchCodes) {
                subOrgString = subOrgString == null ? subOrgTemp : subOrgString + ',' + subOrgTemp;
            }
        }

        if (fw == null) {
            if (!org.equals("0000") && branchCodes.size() == 0) {
                FilterWrapper filterWrapper = FilterWrapper.createWrapperWithFilter("branchResponder", Filter.Operator.EQUAL, org);
                fw = filterWrapper;

            } else if (!org.equals("0000") && branchCodes.size() > 0) {
                FilterWrapper filterWrapper = FilterWrapper.createWrapperWithFilter("branchResponder", Filter.Operator.IN, subOrgString);
                fw = filterWrapper;
            }
        } else {
            String flagBranch = null;
            if (!org.equals("0000") && branchCodes.size() == 0) {
                if (fw != null && fw.getFilters() != null) {
                    for (Filter filter : fw.getFilters()) {
                        if (filter.getProperty().equals("flagBranch")) {
                            flagBranch = filter.getValue();
                        }
                    }
                    if (flagBranch.equals("1")) {
                        fw.removeFilter("flagBranch", Filter.Operator._EQUAL);
                        fw.removeFilter("branchResponder", Filter.Operator._EQUAL);
                        fw.addFilter("branchCode", Filter.Operator.EQUAL, org);
                        fw.addFilter("branchResponder", Filter.Operator.NOT_EQUAL, org);
                    } else {
                        fw.removeFilter("flagBranch", Filter.Operator._EQUAL);
                    }
                }
            } else if (!org.equals("0000") && branchCodes.size() > 0) {
                if (fw != null && fw.getFilters() != null) {
                    fw.removeFilter("flagBranch", Filter.Operator._EQUAL);
                    fw.removeFilter("branchResponder", Filter.Operator._EQUAL);
                    fw.addFilter("branchResponder", Filter.Operator.IN, subOrgString);
                }
            } else if (org.equals("0000")) {
                fw.removeFilter("flagBranch", Filter.Operator._EQUAL);
            }
        }
        collectionDataGuradian = super.search(clazz, fw, sw, start, limit, includeCount);

        if (collectionDataGuradian != null) {
            guardianArrayList = new ArrayList<>(collectionDataGuradian.getList().size());
            for (Object request : collectionDataGuradian.getList()) {
                Guardian guardian = (Guardian) request;
                Timestamp transDate = null;
                String transDateStr = null;
                if (!guardian.getBranchCode().equalsIgnoreCase(guardian.getBranchResponder())) {
                    try {
                        transDate = (Timestamp) em.createNamedQuery("GuardianTranslog.getRecordByBranchReciver")
                                .setParameter("reqSerial", guardian.getReqSerial())
                                .setParameter("branchReciver", guardian.getBranchResponder())
                                .getSingleResult();
                    } catch (Exception e) {
                        e.getMessage();
                    }
                    if (transDate != null) {
                        transDateStr = ir.tamin.insurance.technical.util.DateUtils.getSimpleStringDate(transDate);
                        guardian.setReferDate(transDateStr);
                    }
                }
                guardianArrayList.add(guardian);
            }
        }
        return new CollectionData(guardianArrayList, collectionDataGuradian.getTotal());
    }

    @Override
    @ProxyMethod
    public Resource save(Resource clientObject) throws ProxyProcessingException {
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());

//        if (user != null && roles != null && !roles.contains("GENERAL USER TECHNICAL")) {
//            throw new UserNotAllowedException();
//        }
        try {
            Guardian guardian = (Guardian) clientObject;
            if (guardian.getBranchCode() != null || guardian.getBranchCode() != "") {
                guardian.setBranchResponder(guardian.getBranchCode());
                guardian.setReqDate(new Date());
//              guardian.setInsuranceId(guardian.getInsuranceId());
//              guardian.setBranchCode(guardian.getBranchCode());
//              guardian.setReqNo(guardian.getReqNo());
                guardian.setCreateUserId(user.getUserName());
                guardian.setCreateDate(new Date());
                if (guardian.getRequesterType() != null && !guardian.getRequesterType().equals('2')) {
                    validateDataDuplicate(guardian);
                }
                if ((guardian.getGuardianType().equals('4') && guardian.getGuardianForeignCode() != null && guardian.getGuardianForeignCode2() != null)
                    || (!guardian.getGuardianType().equals('4') && guardian.getGuardianForeignCode() != null)) {
                    guardian.setPensionFundsCode("NO");
                }
                validateData(guardian);
            }
            return super.save(guardian);
        } catch (ResourceAlreadyExistsException e) {
            System.out.println(e.toString());
            throw new ResourceAlreadyExistsException(e);
        } catch (Exception e) {
            System.out.println(e.toString());
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public Resource edit(Resource clientObject, Resource domainObject) throws ProxyProcessingException {

        String userPortalRole = null;

        try {
            OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
            List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());

            Guardian oldObject = (Guardian) domainObject;
            Guardian newObject = (Guardian) clientObject;

            switch (newObject.getActionType()) {
                case "otherBranch":
                    if (newObject.getBranchResponder() != null) {
                        try {
                            Branch branchTmp = branchManager.get(newObject.getBranchResponder());
                        } catch (Exception e) {
                            e.printStackTrace();
                            throw new ProxyProcessingException(e);
                        }
                    }
                    newObject.setBranchInspRespLetterDate(new Date());

                    //OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
                    GuardianTranslog guardianTranslog = new GuardianTranslog();
                    guardianTranslog.setBrchOwner(newObject.getBranchCode());
                    guardianTranslog.setBrchSender(user.getOrganization().getCode());
                    guardianTranslog.setBrchReciver(newObject.getBranchResponder());
                    guardianTranslog.setReqSerial(newObject.getReqSerial());
                    guardianTranslog.setOpuId(tokenContext.getCurrentUser().getUsername());
                    guardianTranslog.setTransDate(new Timestamp(new Date().getTime()));
                    em.persist(guardianTranslog);
//                    GuardianTranslogProxy.save(guardianTranslog);

                    updateOtherBranch(oldObject, newObject);
                    break;
                case "techReport":
                    updateTechReport(oldObject, newObject);
                    if (newObject.geteRequestId() != null && !newObject.geteRequestId().equalsIgnoreCase("") && newObject.getInspectorConfirm().equals('5')) {
                        restServices.updateEguardianRequest(newObject.geteRequestId(), newObject.getInspectorNote(), "5", "0021");
                    }
                    break;

                case "techOpinion":

                    if (user != null && roles != null && !roles.contains("HEAD USER TECHNICAL")) {
                        throw new UserNotAllowedException();
                    }
                    updateTechOpinion(oldObject, newObject);

                    if (newObject.geteRequestId() != null && !newObject.geteRequestId().equalsIgnoreCase("")) {
                        if (newObject.getStatus().equals('1')) {
                            restServices.updateEguardianRequest(newObject.geteRequestId(), newObject.getInspectorNote(), "1", "0034");
                        } else if (newObject.getStatus().equals('2')) {
                            restServices.updateEguardianRequest(newObject.geteRequestId(), newObject.getInspectorNote(), "2", "0035");
                        } else if (newObject.getStatus().equals('6')) {
                            restServices.updateEguardianRequest(newObject.geteRequestId(), newObject.getInspectorNote(), "6", "0038");
                        } else if (newObject.getStatus().equals('7')) {
                            restServices.updateEguardianRequest(newObject.geteRequestId(), newObject.getInspectorNote(), "7", "0039");
                        }
                    }
                    break;

                case "comOpinion":

                    if (user != null && roles != null && !roles.contains("HEAD USER TECHNICAL")) {
                        throw new UserNotAllowedException();
                    }

                    updateComOpinion(oldObject, newObject);

                    if (newObject.geteRequestId() != null && !newObject.geteRequestId().equalsIgnoreCase("")) {
                        if (newObject.getStatus().equals('1')) {
                            restServices.updateEguardianRequest(newObject.geteRequestId(), newObject.getInspectorNote(), "1", "0034");
                        } else if (newObject.getStatus().equals('2')) {
                            restServices.updateEguardianRequest(newObject.geteRequestId(), newObject.getInspectorNote(), "2", "0035");
                        }
                    }
                    break;

                case "provOpinion":
                    if (user != null && roles != null && !roles.contains("PROV HEAD USER TECHNICAL")) {
                        throw new UserNotAllowedException();
                    }
                    updateProvOpinion(oldObject, newObject);
                    break;

                default:
                    validateData(newObject);
                    newObject.setEditUserId(user.getUserName());
                    newObject.setEditDate(new Date());
                    break;
            }
            Resource resource = super.edit(newObject, oldObject);

            if ((newObject.getActionType().equalsIgnoreCase("techOpinion")
                    || newObject.getActionType().equalsIgnoreCase("comOpinion"))
                    && (newObject.getTechConfStatus().equals('1') || ((newObject.getTechConfStatus().equals('2') || newObject.getTechConfStatus().equals('7')) && newObject.getRequesterType().equals('2'))
                    || (newObject.getTechConfStatus().equals('6') && newObject.getCommitteeConfirm() != null && newObject.getCommitteeConfirm().equals('1')))
                    && !newObject.getStatus().equals('9')) {
                //پدرو مادر
                if (!newObject.getGuardianType().equals('4') && !newObject.getGuardianType().equals('6')) {
                    if (newObject.getRequestType().equals('2')) {
                        sendCancelRegisterationData(newObject);
                    } else {
                        if (newObject.getRequesterType() == '2') {
                            sendPensionData(newObject);
                        } else {
                            sendRegisterationData(newObject);
                        }
                    }
                } else if (newObject.getGuardianType().equals('6') && newObject.getRequesterType() == '2') {
                    sendPensionData(newObject);
                } else if (newObject.getGuardianType().equals('4')) {
                    if (newObject.getGuardianNationalCode() != null
                            && newObject.getGuardianNationalCode2() != null) {
                        newObject.setGuardianType('1');
                        //sendRegisterationData(newObject);
                        if (newObject.getRequesterType() == '2') {
                            sendPensionData(newObject);
                        } else {
                            sendRegisterationData(newObject);
                        }
                        Guardian motherObject = (Guardian) clientObject;

                        motherObject.setGuardianNationalCode(newObject.getGuardianNationalCode2());
                        motherObject.setGuardianNationalCode2(null);
                        motherObject.setGuarExpCityCode(newObject.getGuarExpCityCode2());
                        motherObject.setGuarExpCityCode2(null);
                        motherObject.setGuardianFullName(newObject.getGuardianFullName2());
                        motherObject.setGuardianFullName2(null);
                        motherObject.setGuarBirthCityCode(newObject.getGuarBirthCityCode2());
                        motherObject.setGuarBirthCityCode2(null);
                        motherObject.setGuardianBirthDate(newObject.getGuardianBirthDate2());
                        motherObject.setGuardianBirthDate2(null);
                        motherObject.setGuardianType('2');

                        //sendRegisterationData(motherObject);
                        if (newObject.getRequesterType() == '2') {
                            sendPensionData(motherObject);
                        } else {
                            sendRegisterationData(motherObject);
                        }
                    }
                }
            }
//            return super.edit(newObject, oldObject);
            return resource;
        } catch (UserNotAllowedException ue) {
            throw new UserNotAllowedException();
        } catch (ProxyProcessingException pe) {
            throw pe;
        } catch (Exception e) {
            System.out.println(e.toString());
            throw new ProxyProcessingException(e);
        }
    }

    private void validateDataDuplicate(Guardian guardian) throws ProxyProcessingException {
        List<Guardian> guardianListTemp = null;
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());

        try {
            guardianListTemp = em.createNamedQuery("Guardian.findByBranchCode")
                    .setParameter("nationalCode", guardian.getNationalCode())
                    .setParameter("branchCode", guardian.getBranchCode())
                    .setParameter("guardianType", guardian.getGuardianType())
                    .setParameter("guardianNationalCode", guardian.getGuardianNationalCode())
                    .setParameter("requestType", guardian.getRequestType())
                    .setParameter("requesterType", guardian.getRequesterType())
                    .getResultList();
        } catch (Exception e) {
            e.getMessage();
        }

        if (guardianListTemp != null
                && !guardianListTemp.isEmpty()
                && guardianListTemp.get(0).getStatus() != '1'
                && guardianListTemp.get(0).getStatus() != '3'
                && guardianListTemp.get(0).getStatus() != '4') {
            throw new ResourceAlreadyExistsException(bundle.getProperty("insurance.technical.guardian.DataDuplicated"), new String[0]);
        }

    }

    private void validateData(Guardian guardian) throws ProxyProcessingException {
        Character one = '1';
        Character two = '2';
        Character four = '4';

        if (one.equals(guardian.getRequestType()) && guardian.getRequesterType() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        }

//        if (one.equals(guardian.getRequesterType()) && guardian.getIsuDeadDate() == null)
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        if (two.equals(guardian.getRequesterType()) && guardian.getReasonFanni() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        }

        if (one.equals(guardian.getHaveMedicalDoc())
                && (guardian.getDoctorName() == null || guardian.getDoctorName().equals("")
                || guardian.getDoctorCode() == null || guardian.getDoctorCode().equals(""))) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        }

        if (four.equals(guardian.getGuardianType())
                && (guardian.getGuardianFullName2() == null || guardian.getGuardianFullName2().equals("")
                || (guardian.getGuardianNationalCode2() == null || guardian.getGuardianNationalCode2().equals("")
                    && guardian.getGuardianForeignCode2() == null || guardian.getGuardianForeignCode2().equals(""))
                || guardian.getGuardianBirthDate2() == null)) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        }

        if (guardian.getReqDate() == null || guardian.getGuardianBirthDate() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        }

        checkDate(guardian.getBirthDate());
        checkDate(guardian.getInspDate());
        checkDate(guardian.getReqDate());
        checkDate(guardian.getGuardianBirthDate());
        checkDate(guardian.getIsuDeadDate());
        checkDate(guardian.getGuardianBirthDate2());

        guardian.setStatus('0');
        guardian.setCauseAge('1');

        if (!one.equals(guardian.getHaveMedicalDoc())) {
            final long age = guardian.getReqDate().getTime() - guardian.getGuardianBirthDate().getTime();
            switch (guardian.getGuardianType()) {
                case '1':
                case '3':
                    if (age < 60 * 365) {
                        guardian.setStatus('4');
                        guardian.setCauseAge('0');
                    }
                    break;
                case '2':
                    if (age < 55 * 365) {
                        guardian.setStatus('4');
                        guardian.setCauseAge('0');
                    }
                    break;
                case '4':
                    final long age2 = guardian.getReqDate().getTime() - guardian.getGuardianBirthDate2().getTime();
                    if (age < 60 * 365) {
                        guardian.setStatus('4');
                        guardian.setCauseAge('0');
                    }
                    if (age2 < 55 * 365) {
                        guardian.setStatus('4');
                        guardian.setCauseAge('0');
                    }
                    break;
            }
        }
    }

    private void updateTechReport(Guardian guardianOld, Guardian guardianNew) throws ProxyProcessingException, Exception {
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());

        if (guardianOld.getStatus().equals('8')) {
            guardianNew.setProtestInspUserId(user.getUserName());

            if (guardianNew.getProtestInspOpDate() == null) {
                guardianNew.setProtestInspOpDate(new Date());
            }
        } else {
            guardianNew.setInspectorUserId(user.getUserName());

            if (guardianNew.getInspectedDate() == null) {
                guardianNew.setInspectedDate(new Date());
            }
        }

        guardianOld.setInspDate(guardianNew.getInspDate());
        guardianOld.setInspectorNote(guardianNew.getInspectorNote());
        guardianOld.setInspectorConfirm(guardianNew.getInspectorConfirm());
        guardianOld.setInspectorName(guardianNew.getInspectorName());
        guardianOld.setInspectedDate(guardianNew.getInspDate());
//        if (!guardianNew.getInspectorConfirm().equals('1')
//                && !guardianNew.getInspectorConfirm().equals('2')) {
//            guardianOld.setStatus(guardianNew.getInspectorConfirm());
//            guardianNew.setStatus(guardianNew.getInspectorConfirm());
//        }        
        if (guardianNew.getInspectorConfirm().equals('5')) {
            guardianOld.setStatus(guardianNew.getInspectorConfirm());
            guardianNew.setStatus(guardianNew.getInspectorConfirm());
        }
    }

    private void updateOtherBranch(Guardian guardianOld, Guardian guardianNew) throws ProxyProcessingException {
//        if (guardianNew.getBranchRequester() == null || guardianNew.getBranchRequester().equals(""))
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);

//        if (guardianNew.getBranchInspLetterDate() == null)
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
//        if (guardianNew.getBranchInspLetterNo() == null || guardianNew.getBranchInspLetterNo().equals(""))
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
//        if (guardianNew.getBranchInspRespLetterDate() == null)
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
//        if (guardianNew.getBranchInspRespLetterNo() == null || guardianNew.getBranchInspRespLetterNo().equals(""))
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());

        if (new Character('2').equals(guardianOld.getBrhReqType())) {
            guardianOld.setBranchRequester(user.getOrganization().code);
        } else {
            guardianOld.setBranchResponder(user.getOrganization().code);
        }

        if (guardianNew.getBranchResponder() == null || guardianNew.getBranchResponder().equals("")) {
            guardianOld.setBranchResponder(guardianOld.getBranchInspLet());
        }

        if (guardianNew.getBranchResponder().equals(guardianNew.getBranchRequester())) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.SameBranchCodes"), new String[0]);
        }

    }

    private void updateTechOpinion(Guardian guardianOld, Guardian guardianNew) throws ProxyProcessingException {
        System.out.println("updateTechOpinion: getGuardianNationalCode" + guardianOld.getGuardianNationalCode());
        System.out.println("updateTechOpinion: getNationalCode" + guardianOld.getNationalCode());
        Character one = '1';
        Character two = '2';
        Character three = '3';
        Character six = '6';
        Character seven = '7';
        Character nine = '9';
        Character ten = 'A';

        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());

        if (guardianOld.getStatus().equals('8')) {
            guardianNew.setProtestTechUserId(user.getUserName());
            guardianNew.setProtestTechOpDate(new Date());
        } else {
            guardianNew.setTechConfUserId(user.getUserName());
        }

        if (guardianOld.getStatus().equals('0')) {
            switch (guardianNew.getTechConfStatus()) {
                case '1':
                    if (guardianOld.getRequestType() != null
                            && guardianOld.getRequestType().equals('2')) {
                        guardianNew.setStatus(three);
                    } else if (!guardianOld.getRequestType().equals('2')
                            && !guardianOld.getRequesterType().equals('1')) {
                        guardianNew.setStatus(two);
                    } else if (guardianOld.getRequesterType().equals('1')) {
                        guardianNew.setStatus(nine);
                        guardianNew.setProvResponseRegLetterDate(new Date());
                    }
                    break;
                case '2':
                    if (guardianOld.getRequestType() != null && guardianOld.getRequestType().equals('2')) {
                        guardianNew.setStatus(ten);
                    } else {
                        guardianNew.setStatus(one);
                    }
                    break;
                case '6':
                    if (guardianOld.getRequesterType().equals('1')) {
                        guardianNew.setStatus(nine);
                        guardianNew.setProvResponseRegLetterDate(new Date());
                    } else {
                        guardianNew.setStatus(six);
                    }
                    break;
                case '7':
                    guardianNew.setStatus(seven);
                    break;
                default:
                    break;
            }
        }
        System.out.println("updateTechOpinion: end" + guardianOld.getNationalCode());
    }

    private void updateComOpinion(Guardian guardianOld, Guardian guardianNew) throws ProxyProcessingException {

        Character one = '1';
        Character two = '2';
        Character six = '6';
        Character seven = '7';
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());

        guardianNew.setCommitteeConfirmOpDate(new Date());
        guardianNew.setCommitteeConfirmUserId(user.getUserName());

        //فقط در صورتی که وضعیت رکورد اصلی تایید معاش و یا عدم تایید معاش باشد نظریه کمیسیون پزشکی ثبت می شود
        if ((six.equals(guardianOld.getStatus())
                || seven.equals(guardianOld.getStatus()))
                && (six.equals(guardianOld.getTechConfStatus())
                || seven.equals(guardianOld.getTechConfStatus()))) {
            if (one.equals(guardianNew.getCommitteeConfirm())) {
                if (six.equals(guardianOld.getTechConfStatus())) {
                    guardianNew.setStatus(two);
                } else if (seven.equals(guardianOld.getTechConfStatus())) {
                    guardianNew.setStatus(one);
                }
            } else if (two.equals(guardianNew.getCommitteeConfirm())) {
                if (six.equals(guardianOld.getTechConfStatus())
                        || seven.equals(guardianOld.getTechConfStatus())) {
                    guardianNew.setStatus(one);
                }
            }
        } else {
            throw new ProxyProcessingException("وضعیت رکورد قابل تغییر نمی باشد", new String[]{});
        }
    }

    private void updateProvOpinion(Guardian guardianOld, Guardian guardianNew) throws ProxyProcessingException {

        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());

        if (guardianNew.getProvApprovalDesc() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        } else {
            guardianOld.setProvApprovalDesc(guardianNew.getProvApprovalDesc());
        }
        if (guardianNew.getProvResponse() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        } else {
            guardianOld.setProvResponse(guardianNew.getProvResponse());
        }

        if (guardianNew.getProvResponseLetterDate() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        } else {
            guardianOld.setProvResponseLetterDate(guardianNew.getProvResponseLetterDate());
        }
//
//        if (guardianNew.getProvResponseLetterNo() == null) {
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
//        } else {
//            guardianOld.setProvResponseLetterNo(guardianNew.getProvResponseLetterNo());
//        }
//
//        if (guardianNew.getProvResponseRegLetterNo() == null) {
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
//        } else {
//            guardianOld.setProvResponseRegLetterNo(guardianNew.getProvResponseRegLetterNo());
//        }
//
        if (guardianNew.getProvResponseRegLetterDate() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        } else {
            guardianOld.setProvResponseRegLetterDate(guardianNew.getProvResponseRegLetterDate());
        }

        guardianOld.setProvUserId(user.getUserName());
        guardianOld.setProvCode(getProvinceCode(guardianNew.getBranchResponder()));

    }

    private String getProvinceCode(String branchCode) throws ProxyProcessingException {

        GetProvInput provInput = new GetProvInput(branchCode);
        dbFunctionProxy.setProcedureManager(procedureManager);
        GetProvValue provValue = new GetProvValue();
        try {
            provValue = (GetProvValue) dbFunctionProxy.execute(new GetProv(), provInput);
        } catch (Exception e) {

        }
        return provValue.getProvinceCode();
    }

    private void checkDate(Date date) throws ProxyProcessingException {
        if (date != null && date.after(new Date())) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.DataIncomplete"), new String[0]);
        }
    }

    private FilterWrapper addCommonFilters(FilterWrapper fw, Class clazz) {
        if (fw == null) {
            fw = new FilterWrapper();
            fw.setFilters(new HashSet<Filter>());
        }

        if (RemovableEntity.class.isAssignableFrom(clazz)) {
            Filter removeFilter = new Filter();
            removeFilter.setProperty("deleted");
            removeFilter.setValue("0");
            removeFilter.setOperator(Filter.Operator.EQUAL);
            fw.getFilters().add(removeFilter);
        }

        return fw;
    }

    private void sendRegisterationData(Guardian guardian) throws ProxyProcessingException, Exception {
        System.out.println("sendRegisterationData: start" + guardian.getGuardianNationalCode());
        String result = checkGuardian(guardian);
        if (!result.trim().equals("0")) {
            System.out.println("این فرد در حال حاضر تحت کفالت شما می باشد :" + guardian.getGuardianNationalCode());
            throw new ProxyProcessingException("این فرد در حال حاضر تحت کفالت شما می باشد", new String[]{});
        }
        OrgUser curentUser = um.getUserByName(tokenContext.getCurrentUser().getUsername());
        String org = curentUser.getOrganization().getCode();

        Personal personalParent = restServices.getPersonalParent(guardian.getNationalCode());
        Personal personalSubdominant = restServices.getPersonalSubdominant(guardian.getGuardianNationalCode(), DateUtils.format(guardian.getGuardianBirthDate(), "yyyyMMdd"), guardian.getNationalCode());

        if (personalParent == null || personalSubdominant == null) {
            System.out.println("ارتباط با سیستم نامنویسی متمرک" + guardian.getGuardianNationalCode());
            throw new ProxyProcessingException("در ارتباط با سیستم نامنویسی متمرکز خطا رخ داده است،لطفا از طریق سامانه نامنویسی متمرکز اقدام گردد", new String[]{});
        }
        try {
            String baseTypeCode = null;
            String baseBailTypeCode = null;
            String dependencyTypeCode = null;

            switch (guardian.getGuardianType()) {
                //پدر
                case '1':
                    baseTypeCode = "05";
                    baseBailTypeCode = "02";
                    dependencyTypeCode = "05";
                    break;
                //مادر
                case '2':
                    baseTypeCode = "06";
                    baseBailTypeCode = "03";
                    dependencyTypeCode = "06";
                    break;
                //همسر
                case '3':
                    baseTypeCode = "02";
                    baseBailTypeCode = "21";
                    dependencyTypeCode = "02";
                    break;
                //فرزند ذکور
                case '5':
                    baseTypeCode = "03";
                    baseBailTypeCode = "12";
                    dependencyTypeCode = "03";
                    break;
            }

            if (personalParent != null && personalSubdominant != null) {

                String userBranchNatcode = createBranchUser(guardian.getBranchCode());

                personalSubdominant.setParentId(personalParent);
                personalSubdominant.setCityOfBirthId(guardian.getGuarBirthCityCode());
                personalSubdominant.setCityOfIssueId(guardian.getGuarExpCityCode());

                //TB_DEPPERRELTYPE
                BaseDependentType baseDependentType = new BaseDependentType();
                baseDependentType = em.find(BaseDependentType.class, baseTypeCode);
                personalSubdominant.setDependentType(baseDependentType);

                //TB_PORFTYPE
                BaseBailType baseBailType = new BaseBailType();
                baseBailType = em.find(BaseBailType.class, baseBailTypeCode);
                personalSubdominant.setBailType(baseBailType);

                //REG_BASEDEPENDENCY
                Dependency dependency = new Dependency();
                dependency = em.find(Dependency.class, Long.valueOf(dependencyTypeCode));
                personalSubdominant.setDependency(dependency);

                personalSubdominant.setNation("01");
                personalSubdominant.setCountryId("0001");
                personalSubdominant.setLastModifiedBy(curentUser.getNationalCode());
                personalSubdominant.setCreatedBy(curentUser.getNationalCode());
                personalSubdominant.setCreationTime(new Timestamp(new Date().getTime()));
                personalSubdominant.setLastModificationTime(new Timestamp(new Date().getTime()));
                personalSubdominant.setUser(userBranchNatcode);
                //personalSubdominant.setOrganizationId(userBranchNatcode);
                personalSubdominant.setOrganizationId(guardian.getBranchCode());
                if (guardian.geteRequestId() != null) {
                    personalSubdominant.setPortalRequestId(Long.valueOf(guardian.geteRequestId()));
                } else {
                    personalSubdominant.setPortalRequestId(null);
                }

                SendModel model = new SendModel();
                model.setParent(personalParent);
                model.setPersonal(personalSubdominant);
                System.out.println("SendToCentral: start" + model.getPersonal().getNationalId());
                restServices.SendToCentral(model);
                System.out.println("SendToCentral: end" + model.getPersonal().getNationalId());
            }
        } catch (Exception e) {
            throw new ProxyProcessingException("خطا در نامنویسی فرد تبعی، لطفا از طریق سامانه نامنویسی متمرکز اقدام گردد.", new String[]{});
        }
    }

    private void sendCancelRegisterationData(Guardian guardian) throws ProxyProcessingException, Exception {

        String username = createBranchUser(guardian.getBranchCode());

        FilterWrapper filter = new FilterWrapper();
        filter.setFilters(new HashSet<Filter>());

        filter.addFilter("insuranceId",
                Filter.Operator.EQUAL,
                "");
        filter.addFilter("parentInsuranceId",
                Filter.Operator.EQUAL,
                guardian.getInsuranceId());
        filter.addFilter("nationalId",
                Filter.Operator.EQUAL,
                guardian.getGuardianNationalCode());
        filter.addFilter("expireReason",
                Filter.Operator.EQUAL,
                "29");
        filter.addFilter("enddate",
                Filter.Operator.EQUAL,
                String.valueOf(new Date().getTime()));
        //DateUtils.format(new Date(), "yyyy/MM/dd").replace("/", ""));
        filter.addFilter("organization",
                Filter.Operator.EQUAL,
                guardian.getBranchCode());
        filter.addFilter("userName",
                Filter.Operator.EQUAL,
                username);
        try {
            String result = restServices.SendToCentralCancelation(filter, username);
        } catch (Exception e) {
            throw new ProxyProcessingException("خطا در ابطال کفالت فرد تبعی، لطفا از طریق سامانه نامنویسی متمرکز اقدام گردد.", new String[]{});
        }
    }

    //بیمه شده ی تبعی در حال حاضر تحت کفالت بیمه شده ی اصلی نباشد 
    private String checkGuardian(Guardian guardian) throws ProxyProcessingException, Exception {
        String parentNID = guardian.getNationalCode();
        Map<String, Object> dataPage = restServices.getBySubFilter(parentNID, guardian.getGuardianNationalCode());
        String total = dataPage.get("total").toString();
        if (!total.trim().equals("0")) {
            System.out.println("total not 0:این فرد در حال حاضر تحت کفالت شما می باشد " + guardian.getGuardianNationalCode());
            throw new ProxyProcessingException("این فرد در حال حاضر تحت کفالت شما می باشد", new String[]{});
        }
        if (parentNID.trim().equals(guardian.getGuardianNationalCode().trim())) {
            System.out.println("total not 0:ما مجار به ثبت این فرد تبعی نمی باشیدد " + guardian.getGuardianNationalCode());
            throw new ProxyProcessingException("شما مجار به ثبت این فرد تبعی نمی باشید.", new String[]{});
        }
        System.out.println("total :" + total);
        return total;
    }

    //کنترل زنده بودن فرد تبعی
    //private void checkAlive(String nationalCode) throws ProxyProcessingException {
    //}
    //تولید کاربر واسط شعبه
    private String createBranchUser(String branchCode) throws ProxyProcessingException, Exception {
        List<BranchUser> BranchUser = (List<BranchUser>) em.createNamedQuery("BranchUser.getByBranch")
                .setParameter("branchCode", branchCode)
                .getResultList();
        if (BranchUser.isEmpty()) {
            //Logger.getLogger(PersonalManager.class.getName()).log(Level.INFO, "userbranch:" + branchCode, branchCode);
            throw new ProxyProcessingException("خطا در بررسی شعبه ی بیمه شده", new String[]{});
        }
        String branchUser = BranchUser.get(0).getNationalId().trim();// "0066969271";//
        //User parentUser = new User();
        OrgUser parentUser = new OrgUser();
        try {
            //Logger.getLogger(SubdominantService.class.getName()).log(Level.INFO, "userbranch:" + branchUser, branchUser);
            // parentUser = userManager.getUserByName(branchUser);//tokenContext.getCurrentUser().getUsername() ;
            parentUser = userManager.getCurrentUser(branchUser);
            if (parentUser != null) {
                //Logger.getLogger(SubdominantService.class.getName()).log(Level.INFO, parentUser.getNationalCode(), branchUser);
            } else {
                //Logger.getLogger(SubdominantService.class.getName()).log(Level.INFO, "parentuser is null", branchUser);
                throw new ProxyProcessingException("خطا در بررسی شعبه ی بیمه شده", new String[]{});
            }
        } catch (Exception e) {
            //Logger.getLogger(SubdominantService.class.getName()).log(Level.INFO, "userbranch:" + requestId.toString(), e.getMessage());
            throw new ProxyProcessingException("خطا در بررسی شعبه ی بیمه شده", new String[]{});
        }
        //Logger.getLogger(SubdominantService.class.getName()).log(Level.INFO, "beforeSendTocentral:" + branchUser, branchUser);
        return branchUser;
    }

    //ارسال نتیجه بازرسی برای درخواست های سیستم مستمری 
    private void sendPensionData(Guardian guardian) throws ProxyProcessingException, Exception {
        System.out.println("sendPensionData: start" + guardian.getGuardianNationalCode());

        UpdateLsuStatusInput lsuStatusInput = new UpdateLsuStatusInput();
        if (guardian != null) {
            lsuStatusInput.setReqNo(guardian.getReqNo() != null ? guardian.getReqNo() : "");
            lsuStatusInput.setBranchCode(guardian.getBranchCode() != null ? guardian.getBranchCode() : "");
            lsuStatusInput.setRisuid(guardian.getInsuranceId() != null ? guardian.getInsuranceId() : "");
            lsuStatusInput.setInspOpinion(guardian.getInspectorNote() != null ? guardian.getInspectorNote() : "");
            //2 یعنی تایید 1 یعنی عدم تایید
            lsuStatusInput.setStatusCode(guardian.getStatus().toString() != null ? guardian.getStatus().toString() : "");
        }
        dbFunctionProxy.setProcedureManager(procedureManager);
        UpdateLsuStatusValue valueResult = new UpdateLsuStatusValue();
        try {
            valueResult = (UpdateLsuStatusValue) dbFunctionProxy.execute(new UpdateLsuStatus(), lsuStatusInput);
        } catch (Exception e) {
            StringBuilder exception = new StringBuilder(e.getMessage());
            for (int i = 0; i <= e.getMessage().length() - 1; i++) {
                char character = e.getMessage().charAt(i);
                if ((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') || (character >= '0' && character <= '9')
                        || (character == ':') || (character == '"') || (character == '_') || (character == ',') || (character == '.') || (character == '-') || (character == '\n')
                        || (character == ')') || (character == '(') || (character == '?') || (character == '=') || (character == '$') || (character == '>') || (character == '<')
                        || (character == ']') || (character == '[') || (character == '!') || (character == '*') || (character == '|')) {
                    exception.setCharAt(i, ' ');
                }
            }
            throw new Exception(exception.toString().replace("  ", ""));
        }
        if (!valueResult.getResult().equalsIgnoreCase("1")) {
            throw new ProxyProcessingException("خطا در بروزرسانی وضعیت در سیستم مستمری", new String[]{});
        }
    }

    private Boolean checkRole(OrgUser currentUser, List roles) {
        boolean result = true;
        if (currentUser != null
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

    @Override
    public Resource getByFilter(Class clazz, FilterWrapper fw) throws ProxyProcessingException {

        Guardian guardian = null;

        try {
            guardian = (Guardian) super.getByFilter(clazz, fw);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurManager.getByFilter." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
        return guardian;
    }
}
