package ir.tamin.insurance.technical.business.insuranceAgreement;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.core.util.DateUtils;
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
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.business.baseinfo.BranchManager;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.service.InsuranceAgreementRequestService;
import ir.tamin.insurance.technical.business.user.UserBean;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.function.insuranceAgreement.workshopRelation.WorkshopRelation;
import ir.tamin.insurance.technical.function.insuranceAgreement.workshopRelation.WorkshopRelationInput;
import ir.tamin.insurance.technical.function.insuranceAgreement.workshopRelation.WorkshopRelationValue;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceStatus;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceType;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.model.insuranceAgreement.*;
import ir.tamin.insurance.technical.model.primaryKeyClass.RegInsuranceSpecPK;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.util.DateConvert;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateless
@Named("InsuranceAgreementRequestManager")
public class InsuranceAgreementRequestManager extends AbstractEntityProxy implements EntityProxy {

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
    private InsuranceAgreementRequestService insuranceAgreementRequestService;

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

    @Inject
    private InsuranceAgreementRequestSabaSync insuranceAgreementRequestSabaSync;

    private final static String WORKSHOPID_NEZAMPEZESHKI_CODE = "9930999";
    private final static String WORKSHOPID_MADAHAN_CODE = "9920999";
    private final static String WORKSHOPID_IRANGARDI_CODE = "9000999";

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
                && !roles.contains("HEAD USER TECHNICAL")) {
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
                if (filter.getProperty().equalsIgnoreCase("createDate")) {
                    filter.setValue(dateConvert.getCodedDate(ir.tamin.insurance.technical.util.DateUtils.getPersian8Char(new Date(Long.parseLong(filter.getValue())))));
                }
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

        InsuranceRegisteration searchInsuranceRegisteration = null;
        String currentDate = DateUtils.format(new Date(), "yyyyMMdd");

        try {
            InsuranceAgreementRequest request = (InsuranceAgreementRequest) clientObject;
            //paramsValidationRequest(request);
            //duplicateValidationRequest(request);
            //هویتی
            if (!request.getPerson().getId().isEmpty() && !request.getPerson().getBrchCode().isEmpty()) {
                RegInsuranceSpecPK insuranceSpecPK = new RegInsuranceSpecPK(request.getPerson().getId(), request.getPerson().getBrchCode());
                searchInsuranceRegisteration = em.find(InsuranceRegisteration.class, insuranceSpecPK);
                if (searchInsuranceRegisteration != null) {
                    request.setPerson(searchInsuranceRegisteration);
                } else {
                    request.setPerson(null);
                }
            }
            //اطلاعات سن و سابقه
            String ageDays = insuranceAgreementRequestService.calcAgeDays(
                    searchInsuranceRegisteration.getDateOfBirth(),
                    (request.getIntroductionLetterDate() != null ? DateUtils.format(request.getIntroductionLetterDate(), "yyyyMMdd") : currentDate));
            request.setAgeYear(Long.valueOf(ageDays.substring(0, 2)));
            request.setAgeMonth(Long.valueOf(ageDays.substring(2, 4)));
            request.setAgeDay(Long.valueOf(ageDays.substring(4, 6)));

            request.setGender(searchInsuranceRegisteration.getGender());

            if (request.getCategoryType().getCategoryTypeCode().equalsIgnoreCase("3")
                    && request.getSpecialGroupType().getSpecialGroupCode().equalsIgnoreCase("18")) {
                request.setHistoryDay(insuranceAgreementRequestService.calcHistDaysSenfi(request.getPerson().getId(), request.getPerson().getNationalId()).longValue());
                String query = "select techins.AGREEMENT_SEQ.nextval from dual";
                String seq =  entityManager.createNativeQuery(query).getSingleResult().toString();
                request.setRequestNumber(seq);
            } else {
                request.setHistoryDay(insuranceAgreementRequestService.calcHistDays(request.getPerson().getId(), request.getPerson().getNationalId()).longValue());
            }

            if (!specialgroupValidationRequest(request)) {
                throw new ProxyProcessingException(checkResultMessage, new String[0]);
            }
            //شعبه
            if (!request.getBranch().getBranchCode().isEmpty()) {
                Branch searchBranch = new Branch();
                searchBranch.setBranchCode(request.getBranch().getBranchCode());
                if (!searchBranch.getBranchCode().equals("") && !searchBranch.getBranchCode().equals("")) {
                    Branch branch = (Branch) super.get(searchBranch);
                    request.setBranch(branch);
                } else {
                    request.setBranch(null);
                }
            }
            //کارگاه
            //گروههای خاص بیمه ای
            if (request.getCategoryType() != null && request.getCategoryType().getCategoryTypeCode().equalsIgnoreCase("3")) {

                String SpecialGroupType = SpecialGroupEnum.find(request.getSpecialGroupType().getSpecialGroupCode()).name();
                switch (SpecialGroupType) {
                    case "NEZAMPEZESHKI":
                        request.getWorkshop().setWorkshopId(request.getBranch().getBranchCode().substring(0, 3) + WORKSHOPID_NEZAMPEZESHKI_CODE);
                        break;
                    case "MADAHAN":
                        request.getWorkshop().setWorkshopId(request.getBranch().getBranchCode().substring(0, 3) + WORKSHOPID_MADAHAN_CODE);
                        break;
                    case "IRANGARDI":
                        request.getWorkshop().setWorkshopId(request.getBranch().getBranchCode().substring(0, 3) + WORKSHOPID_IRANGARDI_CODE);
                        break;
                    default:
                        break;
                }
            }
//            if (!request.getWorkshop().getWorkshopId().isEmpty() && !request.getPerson().getBrchCode().isEmpty()) {
//                Workshop searchWorkshop = new Workshop();
//                searchWorkshop.setWorkshopId(request.getWorkshop().getWorkshopId());
//                searchWorkshop.setBranchCode(request.getPerson().getBrchCode());
//                if (!searchWorkshop.getWorkshopId().equals("") && !searchWorkshop.getBranchCode().equals("")) {
//                    Workshop workshop = (Workshop) super.get(searchWorkshop);
//                    request.setWorkshop(workshop);
//                } else {
//                    request.setWorkshop(null);
//                }
//            }
            //وضعیت بیمه
            if (!request.getInsuranceStatus().getInsuranceStatCode().isEmpty()) {
                InsuranceStatus searchInsuranceStatus = new InsuranceStatus();
                searchInsuranceStatus.setInsuranceStatCode(request.getInsuranceStatus().getInsuranceStatCode());
                if (!searchInsuranceStatus.getInsuranceStatCode().equals("")) {
                    InsuranceStatus insuranceStatus = (InsuranceStatus) super.get(searchInsuranceStatus);
                    request.setInsuranceStatus(insuranceStatus);
                } else {
                    request.setInsuranceStatus(null);
                }
            }
            //نوع بیمه
            if (!request.getInsuranceType().getInsuranceTypeCode().isEmpty()) {
                InsuranceType searchInsuranceType = new InsuranceType();
                searchInsuranceType.setInsuranceTypeCode(request.getInsuranceType().getInsuranceTypeCode());
                if (!searchInsuranceType.getInsuranceTypeCode().equals("")) {
                    InsuranceType insuranceType = (InsuranceType) super.get(searchInsuranceType);
                    request.setInsuranceType(insuranceType);
                } else {
                    request.setInsuranceType(null);
                }
            }
            //نوع دسته بندی بیمه
            if (!request.getCategoryType().getCategoryTypeCode().isEmpty()) {
                CategoryType searchCategoryType = new CategoryType();
                searchCategoryType.setCategoryTypeCode(request.getCategoryType().getCategoryTypeCode());
                if (!searchCategoryType.getCategoryTypeCode().equals("")) {
                    CategoryType categoryType = (CategoryType) super.get(searchCategoryType);
                    request.setCategoryType(categoryType);
                } else {
                    request.setCategoryType(null);
                }
                if (request.getCategoryType() != null) {
                    switch (request.getCategoryType().getCategoryTypeCode()) {
                        case "2":
                            //گروههای توافقی
                            if (!request.getAgreementCategoryType().getAgreementCategoryId().isEmpty()) {
                                AgreementCategoryType searchAgreementCategoryType = new AgreementCategoryType();
                                searchAgreementCategoryType.setAgreementCategoryId(request.getAgreementCategoryType().getAgreementCategoryId());
                                if (!searchAgreementCategoryType.getAgreementCategoryId().equals("")) {
                                    AgreementCategoryType agreementCategoryType = (AgreementCategoryType) super.get(searchAgreementCategoryType);
                                    request.setAgreementCategoryType(agreementCategoryType);
                                } else {
                                    request.setAgreementCategoryType(null);
                                }
                            }
                            break;
                        case "3":
                            //گروههای خاص بیمه ای
                            if (!request.getSpecialGroupType().getSpecialGroupCode().isEmpty()) {
                                SpecialGroupType searchSpecialGroupType = new SpecialGroupType();
                                searchSpecialGroupType.setSpecialGroupCode(request.getSpecialGroupType().getSpecialGroupCode());
                                if (!searchSpecialGroupType.getSpecialGroupCode().equals("")) {
                                    SpecialGroupType specialGroupType = (SpecialGroupType) super.get(searchSpecialGroupType);
                                    request.setSpecialGroupType(specialGroupType);
                                } else {
                                    request.setSpecialGroupType(null);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            request.setFlag("1");
            request.setStatus("0");
            request.setCreateUserId(user.getUserName());
            request.setCreateDate(dateConvert.getCodedDate(DateUtils.format(new Date(), "yyyyMMdd")));
            //TODO
//            String ageDays = insuranceAgreementRequestService.calcAgeDays(
//                    searchInsuranceRegisteration.getDateOfBirth(),
//                    (request.getIntroductionLetterDate() != null ? DateUtils.format(request.getIntroductionLetterDate(), "yyyyMMdd") : currentDate));
//            request.setAgeYear(Long.valueOf(ageDays.substring(0, 2)));
//            request.setAgeMonth(Long.valueOf(ageDays.substring(2, 4)));
//            request.setAgeDay(Long.valueOf(ageDays.substring(4, 6)));
//
//            request.setGender(searchInsuranceRegisteration.getGender());
//            request.setHistoryDay(insuranceAgreementRequestService.calcHistDays(request.getPerson().getId(), request.getPerson().getNationalId()).longValue());

            if (request.getCategoryType() != null
                    && (request.getCategoryType().getCategoryTypeCode().equalsIgnoreCase("2")
                    || request.getCategoryType().getCategoryTypeCode().equalsIgnoreCase("3"))) {
                request.setInsuranceRate(BigDecimal.valueOf(27.0));
            }

            if (request.getCategoryType().getCategoryTypeCode().equalsIgnoreCase("3")
                    && SpecialGroupEnum.find(request.getSpecialGroupType().getSpecialGroupCode()).name().equalsIgnoreCase("RANANDEGAN")) {
                String result = insuranceAgreementRequestService.existHistory88(request.getBranch().getBranchCode(), request.getInsuranceId());
                if (request.getInsuranceAgreementRequestDetailList() != null && request.getInsuranceAgreementRequestDetailList().size() != 0) {
                    for (InsuranceAgreementRequestDetail iard : request.getInsuranceAgreementRequestDetailList()) {
                        if (result.equalsIgnoreCase("1")) {
                            iard.setDescription1("2");
                        } else {
                            iard.setDescription1("1");
                        }
                    }
                }
            }
            if (request.getCategoryType().getCategoryTypeCode().equalsIgnoreCase("3")
                    && SpecialGroupEnum.find(request.getSpecialGroupType().getSpecialGroupCode()).name().equalsIgnoreCase("KARVARZAN")) {
                if (request.getInsuranceAgreementRequestDetailList() != null && request.getInsuranceAgreementRequestDetailList().size() != 0) {
                    for (InsuranceAgreementRequestDetail iard : request.getInsuranceAgreementRequestDetailList()) {
                        iard.setType6("1");
                        iard.setType7("2");
                    }
                }
            }
            try {
                validatorBean.validate(request);
            } catch (ValidationException e) {
                System.err.println("AGREEMNET-DEBUG: RequestSpecProxy.save." + e.getStackTrace()[0]);
                throw e;
            }

//            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
//            Validator validator = factory.getValidator();
//            for (SoldierDuration dur : master.getSoldierDurations()) {
//                try {
//                    validatorBean.validate(master.getSoldierDurations());
//                } catch (ValidationException e) {
//                    System.err.println("REFUND-DEBUG: MasterDurationProxy.save." + e.getStackTrace()[0]);
//                    throw new ProxyProcessingException(e);
//                }
//                Set<ConstraintViolation<SoldierDuration>> constraintViolations = validator.validate(dur);
//                if (constraintViolations.size() > 0) {
//                    Iterator<ConstraintViolation<SoldierDuration>> iterator = constraintViolations.iterator();
//                    while (iterator.hasNext()) {
//                        ConstraintViolation<SoldierDuration> cv = iterator.next();
//                        System.err.println(cv.getRootBeanClass().getName() + "." + cv.getPropertyPath() + " " + cv.getMessage());
//                    }
//                }
//            }
            //TODO
            Resource resource = super.save(request);

            InsuranceAgreementRequest requestNew = (InsuranceAgreementRequest) resource;

            if (requestNew.getInsuranceAgreementRequestDetailList() != null) {
                List<InsuranceAgreementRequestDetail> agreementRequestDetailList = requestNew.getInsuranceAgreementRequestDetailList();
                for (InsuranceAgreementRequestDetail agreementRequestDetail : agreementRequestDetailList) {
                    agreementRequestDetail.setInsuranceAgreementRequest(requestNew);
                    super.edit(agreementRequestDetail, agreementRequestDetail);
                }
            }
            if (requestNew.getInsuranceAgreementRequestMedical() != null) {
                InsuranceAgreementRequestMedical agreementRequestMedical = requestNew.getInsuranceAgreementRequestMedical();
                agreementRequestMedical.setInsuranceAgreementRequest(requestNew);
                super.edit(agreementRequestMedical, agreementRequestMedical);
            }

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

    @Override
    @ProxyMethod
    public Resource edit(Resource clientObject, Resource domainObject) throws ProxyProcessingException {

        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());

        if (user != null && roles != null
                && !roles.contains("GENERAL USER TECHNICAL")
                && !roles.contains("HEAD USER TECH")) {
            throw new UserNotAllowedException();
        }
        InsuranceAgreementRequest requestNew = (InsuranceAgreementRequest) clientObject;
        InsuranceAgreementRequest requestOld = (InsuranceAgreementRequest) domainObject;
        String operation = requestNew.getOperation();
        Resource resource = null;
        String[] p = null;
        if (operation != null) {
            switch (operation) {
                //تایید مسئول فنی
                //عدم تایید مسول فنی
                case "techConfirm":
                    requestOld.setStatus(requestNew.getStatus());
                    break;
                //تایید نهایی
                case "finalConfirm":
                    requestOld.setStatus(requestNew.getStatus());
                    break;
                default:
                    //break;
            }
        } else {
            if (requestOld.getInsuranceAgreementRequestDetailList().size() > 0) {
                InsuranceAgreementRequestDetail iard = requestNew.getInsuranceAgreementRequestDetailList().get(0);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDescription1(iard.getDescription1() != null ? iard.getDescription1() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDescription2(iard.getDescription2() != null ? iard.getDescription2() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDescription4(iard.getDescription4() != null ? iard.getDescription4() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentDate1(iard.getDocumentDate1() != null ? iard.getDocumentDate1() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentDate2(iard.getDocumentDate2() != null ? iard.getDocumentDate2() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentDate3(iard.getDocumentDate3() != null ? iard.getDocumentDate3() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentStartDate(iard.getDocumentStartDate() != null ? iard.getDocumentStartDate() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentEndDate(iard.getDocumentEndDate() != null ? iard.getDocumentEndDate() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentNumber1(iard.getDocumentNumber1() != null ? iard.getDocumentNumber1() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentNumber2(iard.getDocumentNumber2() != null ? iard.getDocumentNumber2() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentNumber3(iard.getDocumentNumber3() != null ? iard.getDocumentNumber3() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentNumber4(iard.getDocumentNumber4() != null ? iard.getDocumentNumber4() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentNumber5(iard.getDocumentNumber5() != null ? iard.getDocumentNumber5() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentNumber6(iard.getDocumentNumber6() != null ? iard.getDocumentNumber6() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentNumber7(iard.getDocumentNumber7() != null ? iard.getDocumentNumber7() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setDocumentNumber8(iard.getDocumentNumber8() != null ? iard.getDocumentNumber8() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setType1(iard.getType1() != null ? iard.getType1() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setType2(iard.getType2() != null ? iard.getType2() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setType3(iard.getType3() != null ? iard.getType3() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setType4(iard.getType4() != null ? iard.getType4() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setType5(iard.getType5() != null ? iard.getType5() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setType6(iard.getType6() != null ? iard.getType6() : null);
                requestOld.getInsuranceAgreementRequestDetailList().get(0).setType7(iard.getType7() != null ? iard.getType7() : null);
            }

            requestOld.setWage(requestNew.getWage());
            requestOld.setWorkshop(requestNew.getWorkshop());

            if (!insuranceAgreementRequestService.checkLowHighWage(requestOld)) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.agreement.wageNotValid"), new String[0]);
            }
        }
        try {
            resource = super.edit(requestOld, requestOld);
            //insuranceAgreementRequestSabaSync.buildInsuranceAgreementRequest(requestOld, "agreement_requests");
        } catch (Exception ex) {
            ex.printStackTrace();
            Logger.getLogger(InsuranceAgreementRequest.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            throw new ProxyProcessingException("خطا در ذخیره اطلاعات", p);
        }
        return resource;
    }

    @Override
    @ProxyMethod
    public void remove(Resource clientObject) throws ProxyProcessingException {

        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());

        if (user != null && roles != null
                && !roles.contains("GENERAL USER TECHNICAL")
                && !roles.contains("HEAD USER TECH")) {
            throw new UserNotAllowedException();
        }

        InsuranceAgreementRequest insuranceAgreementRequest = (InsuranceAgreementRequest) clientObject;
        insuranceAgreementRequest.setOperation("delete");
        super.remove(insuranceAgreementRequest);
    }

    public Boolean specialgroupValidationRequest(InsuranceAgreementRequest request) throws SQLException, ProxyProcessingException {
        Boolean checkResult = true;
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        Date currentDate = new Date();

        if (request != null
                && request.getCategoryType() != null) {
            //شماره بیمه دائم باشد
            if (!request.getInsuranceId().substring(0, 2).equalsIgnoreCase("00")) {
                checkResultMessage = bundle.getProperty("insurance.technical.agreement.insuranceIdNotValid");
                checkResult = false;
            }
            if (request.getCategoryType().getCategoryTypeCode().equalsIgnoreCase("3")) {
                String SpecialGroupType = SpecialGroupEnum.find(request.getSpecialGroupType().getSpecialGroupCode()).name();

                switch (SpecialGroupType) {
                    case "DAMPEZESHKI":
                        if (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.DAMPEZESHKIDATE.getCode(), "yyyyMMdd")) /*|| request.getIntroductionLetterDate().before(DateUtils.parse(moveCurrentDate.getFirstStartDate(), "yyyyMMdd"))*/) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        if (!request.getWorkshop().getWorkshopId().substring(3, 6).equalsIgnoreCase("816")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopDamPezeshkiNotValid");
                            break;
                        }
                        checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                            break;
                        }
                        break;
                    case "NEZAMPEZESHKI":
                        if (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.NEZAMPEZESHKIDATE.getCode(), "yyyyMMdd"))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.nezamPezeshkiCardDateNotValid");
                            break;
                        }
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                            break;
                        }
                        break;
                    case "BASIJIAN":
                        if (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.BASIJIANDATE.getCode(), "yyyyMMdd"))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                        }
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1().before(request.getIntroductionLetterDate())
                                || request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.dabirLetterDateNotValid");
                            break;
                        }
                        break;
                    case "RANANDEGAN":
                        String driverType = SpecialGroupEnum.find(request.getInsuranceAgreementRequestDetailList().get(0).getType3()).name();
                        checkResult = getActiveContract(request.getInsuranceId(), request.getSpecialGroupType().getSpecialGroupCode(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.activeContractNotValid");
                            break;
                        }
                        //درون شهری
                        if (driverType != null && driverType.equalsIgnoreCase("RANANDEGANDAROON")) {
                            checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                            if (!checkResult) {
                                checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                                break;
                            }
                            if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate().after(currentDate)) {
                                checkResult = false;
                                checkResultMessage = "تاريخ مجوز پايان قرارداد نبايد از تاريخ روز بزرگتر باشد";
                                break;
                            }
                            if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate().after(request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate())) {
                                checkResult = false;
                                checkResultMessage = "تاريخ شروع اعتبار نمي تواند بزرگتر از تاريخ پايان اعتبار باشد.";
                                break;
                            }
                            if (!request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber3().equalsIgnoreCase("01")) {
                                checkResult = false;
                                checkResultMessage = "پیام وضعيت بيمه شده راننده درون شهري بايد غيرآزمايشي باشد";
                                break;
                            }
                            if (request.getIntroductionLetterDate().after(currentDate)
                                    || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.RANANDEGANDAROON.getCode(), "yyyyMMdd"))) {
                                checkResult = false;
                                checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                                break;
                            }
                        }
                        //برون شهری
                        if (driverType != null && driverType.equalsIgnoreCase("RANANDEGANBOROON")) {

                            checkResult = getDriverInsurance(request.getNationalCode(), user.getOrganization().getParent().getCode());
                            if (!checkResult) {
                                checkResultMessage = "کنترل وجود بيمه شده در فايل تجميعي به دليل عدم داشتن کد ملي امکان پذير نمي باشد!  ";
                                break;
                            }
                        }
                        break;
                    case "HONARMANDAN":
                        if (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.HONARMANDANDATE.getCode(), "yyyyMMdd"))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        if (request.getHistoryDay() == 0) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.historyNotValid");
                            break;
                        }
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                            break;
                        }
                        break;
                    case "BOOTAN":
                        if (request.getIntroductionLetterDate().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        if (request.getHistoryDay() == 0) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.historyNotValid");
                            break;
                        }
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        if (!request.getWorkshop().getWorkshopId().substring(3, 6).equalsIgnoreCase("667")
                                || !request.getWorkshop().getActivity().getActivityCode().equalsIgnoreCase("66715")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopBootanNotValid");
                            break;
                        }
                        checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                            break;
                        }
                        break;
                    case "MADAHAN":
                        //.تاريخ صدور معرفي نامه نبايد بزرگتر از تاريخ روز باشد
                        //تاريخ صدور معرفي نامه نبايد کوچکتر از تاريخ 84/12/01 باشد
                        if (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.MADAHANDATE.getCode(), "yyyyMMdd"))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        //تاريخ ثبت دبيرخانه نمي تواند کوچکتر از تاريخ صدور معرفي نامه باشد
                        //تاريخ ثبت دبيرخانه نمي تواند بزرگتر از تاريخ روز باشد
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1().before(request.getIntroductionLetterDate())
                                || request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.dabirLetterDateNotValid");
                            break;
                        }
                        // قرارداد فعال از همین نوع
                        checkResult = getActiveContract(request.getInsuranceId(), request.getSpecialGroupType().getSpecialGroupCode(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.activeContractNotValid");
                            break;
                        }
                        break;
                    case "JANBAZAN":
                        //تاريخ صدور كارت نبايد از تاريخ روز بزرگتر باشد
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.janbazanCardDateNotValid");
                            break;
                        }
                        //کارگاه غیردولتی باشد
                        //تاريخ معرفي نامه نبايد از تاريخ روز بزرگتر باشد
                        //شماره معرفي نامه را بايد پر باشد
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getType1().equalsIgnoreCase("0")
                                && (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterNumber().isEmpty())) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        //درصـــد جانبازي نبايد صفر باشد
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getType3().equalsIgnoreCase("0")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.janbazanPercentNotValid");
                            break;
                        }
                        //اگر درصد جانبازی کمتر از 25 باشد واز کسری ساعت کار استفاده نماید
                        if (Integer.valueOf(request.getInsuranceAgreementRequestDetailList().get(0).getType3()) < 25
                                && request.getInsuranceAgreementRequestDetailList().get(0).getType2().equalsIgnoreCase("1")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.janbazanWorkHoursNotValid");
                            break;
                        }
                        String result1 = getWorkshopRelation(request.getInsuranceId(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (result1 != null && !result1.equalsIgnoreCase("1")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopRelationNotValid");
                            break;
                        }
                        //کنترل  وضعیت پیمانکاری  کارگاه
                        checkResult = getPeymanWorkshop(request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopJanbazanNotValid");
                            break;
                        }
                        // قرارداد فعال از همین نوع
                        checkResult = getActiveContract(request.getInsuranceId(), request.getSpecialGroupType().getSpecialGroupCode(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.activeContractNotValid");
                            break;
                        }
                        break;
                    case "BARBARAN":
                        break;
                    case "BIMEHIRAN":
                        if (!request.getWorkshop().getWorkshopId().substring(3, 6).equalsIgnoreCase("826")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopBimehIranNotValid");
                            break;
                        }
                        if (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.BIMEHIRANDATE.getCode(), "yyyyMMdd"))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        if (request.getHistoryDay() == 0) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.historyNotValid");
                            break;
                        }
                        // قرارداد فعال از همین نوع
                        checkResult = getActiveContract(request.getInsuranceId(), request.getSpecialGroupType().getSpecialGroupCode(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.activeContractNotValid");
                            break;
                        }
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                            break;
                        }
                        break;
                    case "IRANGARDI":
                        if (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.IRANGARDIDATE.getCode(), "yyyyMMdd"))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                            break;
                        }
                        break;
                    case "BIMEHMOALEM":
                        //کارگاه مربوط به کارگاه انجمن صنفي نمايندگان بيمه معلم نمي باشد
                        if (!request.getWorkshop().getWorkshopId().substring(3, 6).equalsIgnoreCase("824")
                                || !request.getWorkshop().getActivity().getActivityCode().equalsIgnoreCase("82452")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopBimehMoalemNotValid");
                            break;
                        }
                        //تاريخ ثبت معرفي نامه بايد بين  1387/03/01تا تاريخ امروز باشد
                        if (request.getIntroductionLetterDate().after(currentDate)
                                || request.getIntroductionLetterDate().before(DateUtils.parse(DateEnum.BIMEHMOALEMDATE.getCode(), "yyyyMMdd"))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        // قرارداد فعال از همین نوع
                        checkResult = getActiveContract(request.getInsuranceId(), request.getSpecialGroupType().getSpecialGroupCode(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.activeContractNotValid");
                            break;
                        }
                        break;
                    case "VOKALA":
                        //کارگاه مربوط به کارگاه مرکزامورمشاوران حقوقي، وکلا و کارشناسان قوه قضاييه نمي باشد
                        if (!request.getWorkshop().getWorkshopId().substring(3, 6).equalsIgnoreCase("825")
                                || !request.getWorkshop().getActivity().getActivityCode().equalsIgnoreCase("82517")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopVokalaNotValid");
                            break;
                        }
                        if (request.getIntroductionLetterDate().after(DateUtils.parse(DateEnum.VOKALADATE.getCode(), "yyyyMMdd"))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                            break;
                        }
                        break;
                    case "GHALIBAFAN":
                        //تاريخ شروع اعتبار   نمي تواند بزرگتر از تاريخ پايان اعتبار باشد
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate().after(
                                request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate())) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.startDateEndDateNotValid");
                            break;
                        }
                        break;
                    case "BEHZISTI":
                        break;
                    case "SAYADAN":
                        Sayadan sayadanTemp1 = em.find(Sayadan.class, request.getInsuranceId());
                        if (sayadanTemp1 == null) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.sayadanInsuranceIdNotValid");
                            break;
                        }
                        FilterWrapper fw = new FilterWrapper();
                        fw.setFilters(new HashSet<Filter>());
                        fw.addFilter("workshopId", Filter.Operator.EQUAL, request.getWorkshop().getWorkshopId());
                        Resource sayadanTemp2 = super.getByFilter(Sayadan.class, fw);
                        if (sayadanTemp2 == null) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopSayadanNotValid");
                            break;
                        }
                        break;
                    case "KARVARZAN":
                        //کنترل  وضعیت پیمانکاری  کارگاه
                        checkResult = getPeymanWorkshop(request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopKarvarzanNotValid");
                            break;
                        }
                        //کنترل بیمه شده درفايل مشمولين طرح کارورزي وزارت رفاه
                        checkResult = getKarvarzanInsurance(request.getNationalCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.karvarazanAggregateFileNotValid");
                            break;
                        }
                        //تاريخ معرفي نامه نبايد از تاريخ روز بزرگتر باشد
                        if (request.getIntroductionLetterDate().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        //تاريخ شروع کارورزي نمي تواند خالي باشد.
                        //تاريخ شروع کارورزي نبايد از تاريخ روز بزرگتر باشد.
                        //تاريخ شروع کارورزي  بايد کوچکتر از تاريخ معرفي نامه باشد
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate() == null
                                || request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate().after(currentDate)
                                || request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate().after(request.getIntroductionLetterDate())) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.startDateNotValid");
                            break;
                        }
                        //تاريخ پايان کارورزي نمي تواند خالي باشد.
                        //تاريخ پايان کارورزي نبايد از تاريخ روز بزرگتر باشد.
                        // تاريخ پايان کارورزي نبايد  کوچکتر از تاريخ شروع کاورزي باشد.
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate() == null
                                || request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate().after(currentDate)
                                || request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate().before(request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate())) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.endDateNotValid");
                            break;
                        }
                        //اگر educationcode <"20" باشد
                        if (!request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber2().equalsIgnoreCase("20")
                                && request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber2().equalsIgnoreCase("21")
                                && !request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber2().equalsIgnoreCase("22")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.educationNotValid");
                            break;
                        }
                        // قرارداد فعال از همین نوع در کارگاه دیگری
                        checkResult = getActiveContractDiffrentWorkshop(request.getInsuranceId(), request.getSpecialGroupType().getSpecialGroupCode(), request.getWorkshop().getWorkshopId());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.activeContractBranchNotValid");
                            break;
                        }
                        // قرارداد فعال از همین نوع در همین کارگاه
                        checkResult = getActiveContract(request.getInsuranceId(), request.getSpecialGroupType().getSpecialGroupCode(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.activeContractNotValid");
                            break;
                        }
                        //مدت دوره به ماه
                        BigDecimal months = insuranceAgreementRequestService.calcMonthsBetween(
                                DateUtils.format(request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate(), "yyyyMMdd"),
                                DateUtils.format(request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate(), "yyyyMMdd"));
                        //طول دوره کارورزي براي مناطق محروم حداقل 1 ماه و حداکثر 9 ماه مي تواند  باشد
                        if (Arrays.asList("05", "08", "13", "18", "20", "21", "24").contains(request.getInsuranceAgreementRequestDetailList().get(0).getType5())) {
                            if (months.intValue() < 1 || months.intValue() > 9) {
                                checkResult = false;
                                checkResultMessage = bundle.getProperty("insurance.technical.agreement.karvarazanDurationMahroomNotValid");
                                break;
                            }
                        } else {
                            //طول دوره کارورزي  حداقل 1 ماه و حداکثر 6 ماه مي تواند  باشد
                            if (months.intValue() < 1 || months.intValue() > 6) {
                                checkResult = false;
                                checkResultMessage = bundle.getProperty("insurance.technical.agreement.karvarazanDurationNotValid");
                                break;
                            }
                        }
                        //تاريخ درخواست نمي تواند کوچکتر از تاريخ معرفي نامه باشدد.
                        //تاريخ درخواست بايد در ماه جاري يا يک ماه قبل از ماه جاري باشد.
                        String currentMonth = DateUtils.format(currentDate, "yyyyMMdd").substring(4, 6);
                        String requestMonth = DateUtils.format(request.getRequestDate(), "yyyyMMdd").substring(4, 6);
                        Long currentMonthLong = Long.valueOf(currentMonth) - 1;
                        Long requestMonthLong = Long.valueOf(requestMonth);

                        if (request.getRequestDate().before(request.getIntroductionLetterDate())
                                || (!requestMonth.equalsIgnoreCase(currentMonth)
                                && !(Objects.equals(requestMonthLong, currentMonthLong)))) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.requestDateNotValid");
                            break;
                        }
                        break;
                    case "SENFI":
                        //کنترل ارتباط کارگاهی
                        String result2 = getWorkshopRelation(request.getInsuranceId(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (result2 == null || !result2.equalsIgnoreCase("1")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopRelationNotValid");
                            break;
                        }
                        // کنترل سن و سابقه
                        checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                            break;
                        }
                        //آخرین روز مهلت معاینه//TODO
                        String moveMonthDate = insuranceAgreementRequestService.moveMonth(DateUtils.format(request.getRequestDate(), "yyyyMMdd"), 3L);
                        //if (currentDate.after(DateUtils.parse(moveMonthDate, "yyyyMMdd"))) {
                        //    checkResult = false;
                        //    //checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                        //    break;
                        //}
                        //کنترل اصفهان
                        String edKolProvince = insuranceAgreementRequestService.getProvinceByBranchCode(request.getBranch().getBranchCode());
                        if (edKolProvince != null && !edKolProvince.equalsIgnoreCase("8600") && request.getSelfIsuTypeCode().equalsIgnoreCase("32")) {
                            checkResult = false;
                            //checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        //کنترل معاینات-درصورتی که 1  باشد  نیازی به ورود اطلاعات اولیه نمیباشد  و بیمه شده معاف از معاینات میباشد -ورکورد معاینات باید ذخیره شود
                        String medicalValid = insuranceAgreementRequestService.controlMedicalValidation(request.getInsuranceId(), request.getNationalCode(), DateUtils.format(request.getRequestDate(), "yyyyMMdd"));
                        //     if (medicalValid != null && medicalValid.equalsIgnoreCase("1") && request.getInsuranceAgreementRequestMedical() == null) {
                        //        checkResult = false;
                        //checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                        //        break;
                        //    }
                        //کنترل دستمزد-سابقه
                        if (request.getHistoryDay() >= 365 * 10) {
                            //دستمزد  قابل ویرایش نمیباشد.
                            try {
                                checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                            } catch (ProxyProcessingException pe) {
                                String resultWage = pe.getMessage();
                                if (!Objects.equals(request.getWage(), Long.valueOf(resultWage))) {
                                    checkResult = false;
                                }
                            }
                        } else {
                            //دستمزد توسط کاربر وارد میشود
                            checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                        }
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                        }

                        break;

                    case "SHAHID"://if result3 ==null || (result3!= null && !result3.equalsIgnoreCase("1"))
                        String result3 = getWorkshopRelation(request.getInsuranceId(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (result3 != null && !result3.equalsIgnoreCase("1")) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopRelationNotValid");
                            break;
                        }
                        //تاريخ راي کميسيون ماده 16 بنياد شهيد نبايد از تاريخ روز بزرگتر باشد
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate2().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.shahidBonyadDateNotValid");
                            break;
                        }
                        //تاريخ دادنامه ديوان عدالت اداري نبايد از تاريخ روز بزرگتر باشد
                        if (request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate3().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.shahidDivanDateNotValid");
                            break;
                        }
                        //تاريخ معرفي نامه(ثبت دفتر شعبه) نبايد از تاريخ روز بزرگتر باشد
                        if (request.getIntroductionLetterDate().after(currentDate)) {
                            checkResult = false;
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.introductionLetterDateNotValid");
                            break;
                        }
                        // قرارداد فعال از همین نوع
                        checkResult = getActiveContract(request.getInsuranceId(), request.getSpecialGroupType().getSpecialGroupCode(), request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.activeContractNotValid");
                            break;
                        }
                        //کنترل  وضعیت پیمانکاری  کارگاه
                        checkResult = getPeymanWorkshop(request.getWorkshop().getWorkshopId(), request.getBranch().getBranchCode());
                        if (!checkResult) {
                            checkResultMessage = bundle.getProperty("insurance.technical.agreement.workshopPeymanRelationNotValid");
                            break;
                        }
                        break;
                    default:
                        break;
                }
            } else if (request.getCategoryType().getCategoryTypeCode().equalsIgnoreCase("2")) {
                // کنترل دستمزد
                checkResult = insuranceAgreementRequestService.checkLowHighWage(request);
                if (!checkResult) {
                    checkResultMessage = bundle.getProperty("insurance.technical.agreement.wageNotValid");
                }
                // کنترل سن و سابقه
                checkResult = ageHistoryValidationRequest(request.getAgeYear(), request.getAgeMonth(), request.getAgeDay(), request.getHistoryDay());
                if (!checkResult) {
                    checkResultMessage = bundle.getProperty("insurance.technical.agreement.ageNotValid");
                }
            }
        }
        //TODO change status
        return checkResult;
    }

    public void duplicateValidationRequest(InsuranceAgreementRequest request) throws SQLException, ProxyProcessingException {
        //چک ثبت درخواست تکراری بصورت متمرکز
        if (request != null && request.getNationalCode() != null) {
            List<InsuranceAgreementRequest> resultList = entityManager.createNamedQuery("InsuranceAgreementRequest.getByNationalCode")
                    .setParameter("nationalCode", request.getNationalCode())
                    .getResultList();
            if (resultList.size() > 0) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.REQUESTDATE_ISEMPTY"), new String[0]);
            }
        }
    }

    public void paramsValidationRequest(InsuranceAgreementRequest request) throws SQLException, ProxyProcessingException {

        //چک خالی نبودن تاریخ درخواست
        //if (request.getRequestDate() == null) {
        //    throw new ProxyProcessingException(bundle.getProperty("insurance.technical.REQUESTDATE_ISEMPTY"), new String[0]);
        //}
        //چک تاریخ درخواست بزرگتر از تاریخ روز
        //if (changeFormatDate(request.getRequestDate()).after(changeFormatDate(new Date()))) {
        //    throw new ProxyProcessingException(bundle.getProperty("insurance.technical.REQUESTDATE_ISNOTVALID"), new String[0]);
        //}
        //چک خالی نبودن شماره درخواست
        if (request.getRequestNumber() == null
                || request.getRequestNumber().equalsIgnoreCase("")
                || request.getRequestNumber().isEmpty()) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.REQUESTNUMBRE_ISEMPTY"), new String[0]);
        }
        //چک خالی نبودن تاریخ معرفینامه
        if (request.getIntroductionLetterDate() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.INTRODUCEDATE_ISEMPTY"), new String[0]);
        }
        // چک خالی نبودن شماره معرفینامه
        if (request.getIntroductionLetterNumber() == null
                || request.getIntroductionLetterNumber().equalsIgnoreCase("")
                || request.getIntroductionLetterNumber().isEmpty()) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.INTRODUCELETTERNUMBER_ISEMPTY"), new String[0]);
        }
        // چک خالی نبودن شماره بیمه
        if (request.getPerson() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.INSURANCEREGISTRATIONID_ISEMPTY"), new String[0]);
        }
        // چک خالی نبودن شماره کارگاه
        if (request.getWorkshop() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.WORKSHOP_ISEMPTY"), new String[0]);
        }
        //چک خالی نبودن کد شعبه
        if (request.getBranch() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.BRANCHCODE_ISEMPTY)"), new String[0]);
        }
        // چک خالی نبودن گرو بیمه
        if (request.getCategoryType() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.AGREEMENTCATEGORY_ISEMPTY)"), new String[0]);
        }
        // چک خالی نبودن گرو بیمه
        if (request.getSpecialGroupType() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.AGREEMENTCATEGORY_ISEMPTY)"), new String[0]);
        }
        // چک خالی نبودن سن بیمه شده
//        if (agreementRequest.getAge() == null
//                || agreementRequest.getAge().equalsIgnoreCase("")
//                || agreementRequest.getAge().isEmpty()) {
//            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.AGE_ISEMPTY"), new String[0]);
//        }

    }

    public Boolean getPeymanWorkshop(String workshopId, String branchCod) {
        boolean resultCheck = true;
        Contract contractTemp = null;
        FilterWrapper fw = new FilterWrapper();
        fw.setFilters(new HashSet<Filter>());
        fw.addFilter("workshopId", Filter.Operator._EQUAL, workshopId);
        // fw.addFilter("branchCod", Filter.Operator.EQUAL, branchCod);

        try {
            contractTemp = (Contract) super.getByFilter(Contract.class, fw);
        } catch (Exception e) {
        }
        if (contractTemp != null) {
            //TODO correct message
            // "اين بيمه شده قرارداد فعال دارد، امکان ثبت قرارداد ديگري نمي باشد";
            //throw new ProxyProcessingException(bundle.getProperty("insurance.technical.BRANCHCODE_ISEMPTY"), new String[0]);
            resultCheck = false;
        }
        return resultCheck;
    }

    public Boolean getActiveContract(String insuranceId, String specialGroupCode, String workshopId, String branchCode) throws ProxyProcessingException {
        boolean resultCheck = true;
        InsuranceAgreementRequest requestTemp = null;
        FilterWrapper fw = new FilterWrapper();
        fw.setFilters(new HashSet<Filter>());
        fw.addFilter("insuranceId", Filter.Operator.EQUAL, insuranceId);
        fw.addFilter("status", Filter.Operator.IN, "0,1");
        fw.addFilter("specialGroupType.specialGroupCode", Filter.Operator.EQUAL, specialGroupCode);
        fw.addFilter("workshop.workshopId", Filter.Operator.EQUAL, workshopId);
        fw.addFilter("branch.branchCode", Filter.Operator.EQUAL, branchCode);

        try {
            requestTemp = (InsuranceAgreementRequest) super.getByFilter(InsuranceAgreementRequest.class, fw);
        } catch (Exception e) {
            System.err.println("AGREEMENT-DEBUG: agreementrManager.save." + e.getStackTrace()[0]);
            //throw new ProxyProcessingException(e);
        }

        if (requestTemp != null) {
            //TODO correct message
            // "اين بيمه شده قرارداد فعال دارد، امکان ثبت قرارداد ديگري نمي باشد";
            //throw new ProxyProcessingException(bundle.getProperty("insurance.technical.BRANCHCODE_ISEMPTY"), new String[0]);
            resultCheck = false;
        }
        return resultCheck;
    }

    public Boolean getDriverInsurance(String nationalCode, String provinceCode) throws ProxyProcessingException {
        boolean resultCheck = true;
        DriverInsurance requestTemp = null;
        FilterWrapper fw = new FilterWrapper();
        fw.setFilters(new HashSet<Filter>());
        fw.addFilter("nationalCode", Filter.Operator.EQUAL, nationalCode);
        fw.addFilter("provinceCode", Filter.Operator.EQUAL, provinceCode);

        try {
            requestTemp = (DriverInsurance) super.getByFilter(DriverInsurance.class, fw);
        } catch (Exception e) {
            System.err.println("AGREEMENT-DEBUG: agreementrManager.save." + e.getStackTrace()[0]);
            //throw new ProxyProcessingException(e);
        }
        if (requestTemp == null) {
            //TODO correct message
            // "اين بيمه شده قرارداد فعال دارد، امکان ثبت قرارداد ديگري نمي باشد";
            //throw new ProxyProcessingException(bundle.getProperty("insurance.technical.BRANCHCODE_ISEMPTY"), new String[0]);
            resultCheck = false;
        }
        return resultCheck;
    }

    public Boolean getKarvarzanInsurance(String nationalCode) throws ProxyProcessingException {
        boolean resultCheck = true;
        KarvarzanInsurance requestTemp = null;
        FilterWrapper fw = new FilterWrapper();
        fw.setFilters(new HashSet<Filter>());
        fw.addFilter("nationalCode", Filter.Operator._EQUAL, nationalCode);

        try {
            requestTemp = (KarvarzanInsurance) super.getByFilter(KarvarzanInsurance.class, fw);
        } catch (Exception e) {
            System.err.println("AGREEMENT-DEBUG: agreementrManager.save." + e.getStackTrace()[0]);
            //throw new ProxyProcessingException(e);
        }
        if (requestTemp == null) {
            //TODO correct message
            // "اين بيمه شده قرارداد فعال دارد، امکان ثبت قرارداد ديگري نمي باشد";
            //throw new ProxyProcessingException(bundle.getProperty("insurance.technical.BRANCHCODE_ISEMPTY"), new String[0]);
            resultCheck = false;
        }
        return true;
    }

    public Boolean getActiveContractDiffrentWorkshop(String insuranceId, String specialGroupCode, String workshopId) throws ProxyProcessingException {
        boolean resultCheck = true;
        InsuranceAgreementRequest requestTemp = null;
        FilterWrapper fw = new FilterWrapper();
        fw.setFilters(new HashSet<Filter>());
        fw.addFilter("InsuranceId", Filter.Operator.EQUAL, insuranceId);
        fw.addFilter("status", Filter.Operator.IN, "0,1");
        fw.addFilter("specialGroupType.specialGroupCode", Filter.Operator.EQUAL, specialGroupCode);
        fw.addFilter("workshop.sorkdhopId", Filter.Operator.NOT_EQUAL, workshopId);
        fw.addFilter("branch.branchCode", Filter.Operator.EQUAL, workshopId);

        try {
            requestTemp = (InsuranceAgreementRequest) super.getByFilter(InsuranceAgreementRequest.class, fw);
        } catch (Exception e) {
            System.err.println("AGREEMENT-DEBUG: agreementrManager.save." + e.getStackTrace()[0]);
            //throw new ProxyProcessingException(e);
        }
        if (requestTemp != null) {
            //TODO correct message
            // "اين بيمه شده قرارداد فعال دارد، امکان ثبت قرارداد ديگري نمي باشد";
            //throw new ProxyProcessingException(bundle.getProperty("insurance.technical.BRANCHCODE_ISEMPTY"), new String[0]);
            resultCheck = false;
        }
        return resultCheck;
    }

    public Boolean getWorkshopAggregateFile(String nationalCode, String provinceCode) throws ProxyProcessingException {
        boolean resultCheck = true;
        DriverInsurance requestTemp = null;
        FilterWrapper fw = new FilterWrapper();
        fw.setFilters(new HashSet<Filter>());
        fw.addFilter("provinceCode", Filter.Operator.EQUAL, provinceCode);
        fw.addFilter("driverNationalCode", Filter.Operator.EQUAL, nationalCode);

        try {
            requestTemp = (DriverInsurance) super.getByFilter(DriverInsurance.class, fw);
        } catch (Exception e) {
            System.err.println("AGREEMENT-DEBUG: agreementrManager.save." + e.getStackTrace()[0]);
            //throw new ProxyProcessingException(e);
        }
        if (requestTemp == null) {
            //TODO correct message
            // "اين بيمه شده قرارداد فعال دارد، امکان ثبت قرارداد ديگري نمي باشد";
            //throw new ProxyProcessingException(bundle.getProperty("insurance.technical.BRANCHCODE_ISEMPTY"), new String[0]);
            resultCheck = false;
        }
        return true;
    }

    public String getWorkshopRelation(String insuranceNumber, String workshopId, String branchCode) throws ProxyProcessingException {
        String currentDate = DateUtils.format(new Date(), "yyyyMMdd");
        WorkshopRelationInput workshopRelationInput = new WorkshopRelationInput(insuranceNumber, workshopId, currentDate, branchCode);
        dbFunctionProxy.setProcedureManager(procedureManager);
        WorkshopRelationValue workshopRelationValue = new WorkshopRelationValue();
        try {
            workshopRelationValue = (WorkshopRelationValue) dbFunctionProxy.execute(new WorkshopRelation(), workshopRelationInput);
        } catch (Exception e) {
            e.printStackTrace();
            // throw new ProxyProcessingException("در اجرای فرایند کنترل ارتباط کارگاهی خطا رخ داده است" , new String[0]);
        }
        return workshopRelationValue.getResult();
    }

    public Boolean ageHistoryValidationRequest(Long ageYear, Long ageMonth, Long ageDay, Long history) {
        Boolean checkResult = true;
        if ((ageYear.equals(50L) && (ageMonth > 0L || ageDay > 0L))
                || ageYear > 50L) {
            Long ageDays = (ageYear * 365 + ageMonth * 30 + ageDay) - (50 * 365);
            if (ageDays > history) {
                checkResult = false;
            }
        }
        return checkResult;
    }

    public Date changeFormatDate(Date date) {
        Calendar calStart = Calendar.getInstance();
        calStart.setTime(date);
        calStart.set(Calendar.HOUR_OF_DAY, 0);
        calStart.set(Calendar.MINUTE, 0);
        calStart.set(Calendar.SECOND, 0);
        calStart.set(Calendar.MILLISECOND, 0);
        return calStart.getTime();

    }

}

