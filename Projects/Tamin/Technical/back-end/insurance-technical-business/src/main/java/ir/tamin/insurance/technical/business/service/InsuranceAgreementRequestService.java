package ir.tamin.insurance.technical.business.service;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.function.baseinfo.GeneralFunctionResult;
import ir.tamin.insurance.technical.function.general.CalcAge.CalcAge;
import ir.tamin.insurance.technical.function.general.CalcAge.CalcAgeInput;
import ir.tamin.insurance.technical.function.general.CalcAge.CalcAgeValue;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDates;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDatesInput;
import ir.tamin.insurance.technical.function.general.calcDaysBetweenTwoDates.CalcDaysBetweenTwoDatesValue;
import ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates.CalcMonthsBetweenTwoDates;
import ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates.CalcMonthsBetweenTwoDatesInput;
import ir.tamin.insurance.technical.function.general.calcMonthsBetweenTwoDates.CalcMonthsBetweenTwoDatesValue;
import ir.tamin.insurance.technical.function.general.getMinMaxWage.GetMinMaxWage;
import ir.tamin.insurance.technical.function.general.getMinMaxWage.GetMinMaxWageInput;
import ir.tamin.insurance.technical.function.general.getMinMaxWage.GetMinMaxWageValue;
import ir.tamin.insurance.technical.function.general.getProv.GetProv;
import ir.tamin.insurance.technical.function.general.getProv.GetProvInput;
import ir.tamin.insurance.technical.function.general.getProv.GetProvValue;
import ir.tamin.insurance.technical.function.general.moveMonth.MoveMonth;
import ir.tamin.insurance.technical.function.general.moveMonth.MoveMonthInput;
import ir.tamin.insurance.technical.function.general.moveMonth.MoveMonthValue;
import ir.tamin.insurance.technical.function.general.typeOfIsu.TypeOfIsu;
import ir.tamin.insurance.technical.function.general.typeOfIsu.TypeOfIsuInput;
import ir.tamin.insurance.technical.function.general.typeOfIsu.TypeOfIsuValue;
import ir.tamin.insurance.technical.function.insuranceAgreement.existHistory88.ExistHistory88;
import ir.tamin.insurance.technical.function.insuranceAgreement.existHistory88.ExistHistory88Input;
import ir.tamin.insurance.technical.function.insuranceAgreement.existHistory88.ExistHistory88Value;
import ir.tamin.insurance.technical.function.insuranceAgreement.medicalValidation.MedicalValidation;
import ir.tamin.insurance.technical.function.insuranceAgreement.medicalValidation.MedicalValidationInput;
import ir.tamin.insurance.technical.function.insuranceAgreement.medicalValidation.MedicalValidationValue;
import ir.tamin.insurance.technical.function.insuranceAgreement.retdastmozdday.RetDastmozdDay;
import ir.tamin.insurance.technical.function.insuranceAgreement.retdastmozdday.RetDastmozdDayInput;
import ir.tamin.insurance.technical.function.insuranceAgreement.retdastmozdday.RetDastmozdDayValue;
import ir.tamin.insurance.technical.function.insuranceAgreement.wageValidation.WageValidation;
import ir.tamin.insurance.technical.function.insuranceAgreement.wageValidation.WageValidationInput;
import ir.tamin.insurance.technical.function.insuranceAgreement.wageValidation.WageValidationValue;
import ir.tamin.insurance.technical.function.occur.GetWorkshopAddres;
import ir.tamin.insurance.technical.function.occur.GetWorkshopAddresInput;
import ir.tamin.insurance.technical.model.agreement.AgreementInfo;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceType;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.model.insuranceAgreement.CategoryType;
import ir.tamin.insurance.technical.model.insuranceAgreement.InsuranceAgreementRequest;
import ir.tamin.insurance.technical.model.insuranceAgreement.SpecialGroupType;
import ir.tamin.insurance.technical.model.primaryKeyClass.RegInsuranceSpecPK;
import ir.tamin.insurance.technical.model.primaryKeyClass.WorkshopPK;
import ir.tamin.insurance.technical.model.workshop.Workshop;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

/**
 *
 * @author s_naghavi
 */
@Stateless
public class InsuranceAgreementRequestService {

    @Inject
    protected EntityManager entityManager;

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dbFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    protected ProcedureManager procedureManager;

    public String controlMedicalValidation(String insuranceCode, String nationalCode, String requestDate) {

        MedicalValidationValue medicalValidationValue = new MedicalValidationValue();
        dbFunctionProxy.setProcedureManager(procedureManager);
        try {
            medicalValidationValue = (MedicalValidationValue) dbFunctionProxy.execute(new MedicalValidation(), new MedicalValidationInput(insuranceCode, nationalCode, requestDate));
        } catch (Exception e) {
            e.printStackTrace();
            // throw new ProxyProcessingException("در اجرای فرایند کنترل ارتباط کارگاهی خطا رخ داده است" , new String[0]);
        }
        return medicalValidationValue.getResult();
    }

    public String getProvinceByBranchCode(String branchCode) {
        dbFunctionProxy.setProcedureManager(procedureManager);
        GetProvValue provValue = new GetProvValue();
        try {
            provValue = (GetProvValue) dbFunctionProxy.execute(new GetProv(), new GetProvInput(branchCode));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return provValue.getProvinceCode();
    }

    public GetMinMaxWageValue getMinMaxWage(String reqDate) throws ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        return (GetMinMaxWageValue) dbFunctionProxy.execute(new GetMinMaxWage(),
                new GetMinMaxWageInput(reqDate.substring(0, 4), reqDate.substring(4, 6)));
    }

    public String calcAgeDays(String birthDate, String introductionLetterDate) throws SQLException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        CalcAgeValue calcAgeValue = (CalcAgeValue) dbFunctionProxy.execute(new CalcAge(), new CalcAgeInput(birthDate, introductionLetterDate));
        return calcAgeValue.getAge();
    }

    public BigDecimal calcMonthsBetween(String firstDate, String secondDate) throws SQLException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        CalcMonthsBetweenTwoDatesValue calcMonthsBetweenTwoDatesValue = (CalcMonthsBetweenTwoDatesValue) dbFunctionProxy.execute(new CalcMonthsBetweenTwoDates(), new CalcMonthsBetweenTwoDatesInput(firstDate, secondDate));
        return calcMonthsBetweenTwoDatesValue.getDays();
    }

    public BigDecimal calcHistDays(String insuranceId, String nationalCode) throws SQLException {
        BigDecimal result = null;
        try {
            result = (BigDecimal) entityManager.createNativeQuery("select sum(his_day)  from Table(pck_stmonhist.Tmonhist('"
                    + insuranceId + "', '" + nationalCode + "',Null, 'Esoldier'))").getSingleResult();
        } catch (Exception e) {
            e.printStackTrace();
            result = new BigDecimal("0");
        }
        return  (result == null ? new BigDecimal("0") : result);
    }

    public BigDecimal calcHistDaysSenfi(String insuranceId, String nationalCode) throws SQLException {
        BigDecimal result = null;
        String currentDate = DateUtils.format(new Date(), "yyyyMMdd");
        try {
            result = (BigDecimal) entityManager.createNativeQuery("select pck_specialinscntrct.fnc_rettotalhis('"
                    + insuranceId + "', '" + nationalCode + "', '" + currentDate + "') from dual").getSingleResult();
        } catch (Exception e) {
            e.printStackTrace();
            result = new BigDecimal("0");
        }
        return result;
    }

    public String existHistory88(String branchCode, String insuranceId) throws SQLException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        ExistHistory88Value existHistory88Value = (ExistHistory88Value) dbFunctionProxy.execute(new ExistHistory88(), new ExistHistory88Input(branchCode, insuranceId));
        return existHistory88Value.getResult();
    }

    public String moveMonth(String date, Long count) {
        //Date requestDate1 = DateUtils.convertTimestampStringToDate(requestDate);
        //String requestDate2 = DateUtils.format(requestDate1, "yyyyMMdd");
        MoveMonthValue moveMonthValue = new MoveMonthValue();
        dbFunctionProxy.setProcedureManager(procedureManager);
        try {
            moveMonthValue = (MoveMonthValue) dbFunctionProxy.execute(new MoveMonth(), new MoveMonthInput(date, (float) count));
        } catch (Exception e) {
            e.printStackTrace();
            // throw new ProxyProcessingException("در اجرای فرایند کنترل ارتباط کارگاهی خطا رخ داده است" , new String[0]);
        }
        return moveMonthValue.getFirstStartDate();
    }

    public String checkLowHighWageSenfi(String insuranceId, String nationalCode, String branchCode, String workshopId, String requestDate)
            throws ProxyProcessingException, SQLException {
        Boolean result = false;
        String resultWage = null;
        String currentDate = DateUtils.format(new Date(), "yyyyMMdd");
        InsuranceRegisteration searchInsuranceRegisteration = null;
        Workshop searchWorkshop = null;
        Branch searchBranch = null;
        InsuranceAgreementRequest request = new InsuranceAgreementRequest();
        request.setInsuranceId(insuranceId);
        request.setNationalCode(nationalCode);

        if (branchCode != null) {
            searchBranch = entityManager.find(Branch.class, branchCode);
            if (searchBranch != null) {
                request.setBranch(searchBranch);
            }
        }
        if (insuranceId != null && branchCode != null) {
            RegInsuranceSpecPK insuranceSpecPK = new RegInsuranceSpecPK(insuranceId, branchCode);
            searchInsuranceRegisteration = entityManager.find(InsuranceRegisteration.class, insuranceSpecPK);
            if (searchInsuranceRegisteration != null) {
                request.setPerson(searchInsuranceRegisteration);
            }
        }
        if (workshopId != null && branchCode != null) {
            WorkshopPK workshopPK = new WorkshopPK(workshopId, branchCode);
            searchWorkshop = entityManager.find(Workshop.class, workshopPK);
            if (searchWorkshop != null) {
                request.setWorkshop(searchWorkshop);
            }
        }
        CategoryType categoryType = entityManager.find(CategoryType.class, "3");
        request.setCategoryType(categoryType);
        SpecialGroupType specialGroupType = entityManager.find(SpecialGroupType.class, "18");
        request.setSpecialGroupType(specialGroupType);

        String ageDays = calcAgeDays(
                searchInsuranceRegisteration.getDateOfBirth(),
                (request.getIntroductionLetterDate() != null ? DateUtils.format(request.getIntroductionLetterDate(), "yyyyMMdd") : currentDate));
        request.setAgeYear(Long.valueOf(ageDays.substring(0, 2)));
        request.setAgeMonth(Long.valueOf(ageDays.substring(2, 4)));
        request.setAgeDay(Long.valueOf(ageDays.substring(4, 6)));

        //request.setIntroductionLetterDate(new Date(introductionLetterDate));

        request.setRequestDate(DateUtils.parse(requestDate, "yyyyMMdd"));
        request.setHistoryDay(calcHistDaysSenfi(request.getPerson().getId(), request.getPerson().getNationalId()).longValue());

        try {
            result = checkLowHighWage(request);
        } catch (ProxyProcessingException pe) {
            resultWage= pe.getMessage();
        }

        return resultWage;

    }

    public Boolean checkLowHighWage(InsuranceAgreementRequest request) throws ProxyProcessingException {
        Boolean result = false;
        String parameter2 = null;
        String parameter3 = request.getIntroductionLetterDate() != null ? DateUtils.format(request.getIntroductionLetterDate(), "yyyyMMdd") : "";
        String parameter5 = request.getPerson().getGender();
        String parameter6 = request.getAgeYear().toString();
        parameter6 = (request.getAgeMonth().toString().length() == 1 ? parameter6 + "0" + request.getAgeMonth().toString() : parameter6 + request.getAgeMonth().toString());
        parameter6 = (request.getAgeDay().toString().length() == 1 ? parameter6 + "0" + request.getAgeDay().toString() : parameter6 + request.getAgeDay().toString());

        if (request.getCategoryType() != null) {
            switch (request.getCategoryType().getCategoryTypeCode()) {
                //تولفقی
                case "2":
                    parameter2 = request.getAgreementCategoryType().getAgreementCategoryId();
                    break;
                //خاص
                case "3":
                    parameter2 = request.getSpecialGroupType().getSpecialGroupCode();
                    if (request.getSpecialGroupType().getSpecialGroupCode().equalsIgnoreCase("06")
                            || request.getSpecialGroupType().getSpecialGroupCode().equalsIgnoreCase("10")) {
                        parameter6 = request.getInsuranceAgreementRequestDetailList().get(0).getType1();
                    }
                    if (request.getSpecialGroupType().getSpecialGroupCode().equalsIgnoreCase("18")) {
                        parameter3 = DateUtils.format(request.getRequestDate(), "yyyyMMdd");
                        parameter5 = request.getWorkshop().getWorkshopId();
                        parameter6 = entityManager.find(Branch.class, request.getBranch().getBranchCode()).getCityCode();
                    }
                    break;
            }
        }
        dbFunctionProxy.setProcedureManager(procedureManager);
        WageValidationValue out = (WageValidationValue) dbFunctionProxy.execute(new WageValidation(),
                new WageValidationInput(
                        request.getCategoryType().getCategoryTypeCode(),
                        parameter2,
                        parameter3,
                        request.getNationalCode(),
                        request.getInsuranceId(),
                        request.getHistoryDay(),
                        parameter5,
                        parameter6));

        if ((out.getResult() != null && !out.getpLowWage().equalsIgnoreCase(out.getpHighWage())) ? out.getResult().equals("1") : false) {
            BigDecimal lowWage = new BigDecimal(out.getpLowWage());
            BigDecimal highWage = new BigDecimal(out.getpHighWage());

            if (new BigDecimal(request.getWage()).compareTo(lowWage) == -1 || new BigDecimal(request.getWage()).compareTo(highWage) == 1) {
                //throw new ProxyProcessingException("حداقل دستمزد در" + "year" + "/" + "month" + " برابر است با: " + lowWage + " و حداکثر دستمزد برابر است با: " + highWage + " و میبایست قبل از ثبت اطلاعات اصلاح شود", new String[0]);
                throw new ProxyProcessingException("حداقل دستمزد برابر است با  " + lowWage + "ریال " + " و حداکثر دستمزد برابر است با " + highWage + "ریال" + " و دستمزد وارد شده میبایست قبل از ثبت اطلاعات اصلاح شود", new String[0]);
            } else {
                result = true;
                return result;
            }
        } else if (
                (out.getResult() != null &&
                        out.getpLowWage().equalsIgnoreCase(out.getpHighWage())  &&
                        !String.valueOf(request.getWage()).equalsIgnoreCase(out.getpLowWage()) ) ? out.getResult().equals("1") : false) {
            throw new ProxyProcessingException("مبلغ دستمزد می بایست معادل" + out.getpLowWage() + "ریال باشد.", new String[0]);
        } else {
            //throw new ProxyProcessingException();
            result = true;
            return result;
        }
    }

    public AgreementInfo getInfoWithInsuranceId(String insuranceCode, String introducedDate, String branchCode, String dateOfBirth, String reqDate, String nationalCode) throws Exception, ProxyProcessingException {

        try {
            AgreementInfo agreementInfo = new AgreementInfo();
            String sqlQuery = "Select Nvl(Sum(His_day),0) from (Select * From table(pck_stmonhist.Tmosthist(?,?, 1))) where his_year  || his_mon <= substr(?,1,6)";

            BigDecimal historyDurationDays = (BigDecimal) entityManager.createNativeQuery(sqlQuery)
                    .setParameter(1, insuranceCode)
                    .setParameter(2, branchCode)
                    .setParameter(3, introducedDate).getSingleResult();
            agreementInfo.setHistoryDurationDays(historyDurationDays.intValue());
            if (historyDurationDays.compareTo(BigDecimal.ZERO) == 1) {
                sqlQuery = "Select max(his_year || his_mon) max_ ,  min(his_year || his_mon) min_ From (Select * from table (pck_stmonhist.Tmosthist(?,?, 1))) where his_year || his_mon <= substr(?,1,6)";
                List<Object[]> objs = entityManager.createNativeQuery(sqlQuery)
                        .setParameter(1, insuranceCode)
                        .setParameter(2, branchCode)
                        .setParameter(3, introducedDate).getResultList();

                for (Object[] obj : objs) {
                    agreementInfo.setHistDurationEnd(obj[0].toString());
                    agreementInfo.setHistDurationStart(obj[1].toString());
                }

            }

            String[] insuranceStatus = getInsuranceStatus(insuranceCode, introducedDate);
            agreementInfo.setInsuranceStatusDesc(insuranceStatus[0]);
            agreementInfo.setInsuranceStatusCode(insuranceStatus[1]);

            InsuranceType insuranceType = getInsuranceType(insuranceCode, introducedDate, branchCode);
            if (insuranceCode != null) {
                agreementInfo.setInsuranceType(insuranceType);
            }

            CalcAgeValue calcAgeValue;
            calcAgeValue = (CalcAgeValue) dbFunctionProxy.execute(new CalcAge(), new CalcAgeInput(dateOfBirth, reqDate));
            agreementInfo.setAge(calcAgeValue.getAge());

            RetDastmozdDayInput retDastmozdDayInput = new RetDastmozdDayInput(branchCode, insuranceCode, nationalCode, "360", introducedDate);//, "0");
            RetDastmozdDay retDastmozdDay = new RetDastmozdDay();
            retDastmozdDay.setInputResource(retDastmozdDayInput);

            List<RetDastmozdDayValue> retDastmozdDayValues = (List<RetDastmozdDayValue>) dbFunctionProxy.execute(retDastmozdDay, new RetDastmozdDayInput(branchCode, insuranceCode, nationalCode, "360", introducedDate));
            BigDecimal avgWage360 = null;
            if (retDastmozdDayValues.size() > 0) {
                for (RetDastmozdDayValue retDastmozdDayValue : retDastmozdDayValues) {
                    if (retDastmozdDayValue.getHisDay().compareTo(BigDecimal.valueOf(360)) == 0) {
                        avgWage360 = retDastmozdDayValue.getHisWage().divide(retDastmozdDayValue.getHisDay(), 0, RoundingMode.FLOOR);
                    }
                }
            }
            agreementInfo.setAvgWage360(avgWage360);

//        String intruducedDateWithMonthAndYear = null;
//        if (introducedDate != null) {
//            intruducedDateWithMonthAndYear = introducedDate.substring(0, 6);
//        }
//        List<BigDecimal> resultsOfMinWageInYear = null;
//        sqlQuery = "select w1.lowdaywage from tb_lowhighwage w1 where w1.hlfryear || w1.hlfrmonth = (select max(w.hlfryear || w.hlfrmonth) from tb_lowhighwage w where w.hlfryear || w.hlfrmonth <='?')";
//        resultsOfMinWageInYear = entityManager.createNativeQuery(sqlQuery)
//                .setParameter(1, intruducedDateWithMonthAndYear)
//                .getResultList();
//        if (resultsOfMinWageInYear.size() > 0) {
//            agreementInfo.setMinWageInYear(resultsOfMinWageInYear.get(0));
//        }
//        String a = reqDate.substring(0,4);
//        String b = reqDate.substring(4,7);
///تغییر دادم -----
            GetMinMaxWageValue minMaxWageValue = getMinMaxWage(introducedDate);
            if (minMaxWageValue != null) {
                agreementInfo.setMinWageInYear(minMaxWageValue.getMinWage());
                agreementInfo.setMaxWageInYear(minMaxWageValue.getMaxWage());
            }

            CalcDaysBetweenTwoDatesValue calcDaysBetweenTwoDatesValue;
            calcDaysBetweenTwoDatesValue = (CalcDaysBetweenTwoDatesValue) dbFunctionProxy
                    .execute(new CalcDaysBetweenTwoDates(), new CalcDaysBetweenTwoDatesInput(dateOfBirth, reqDate));
            agreementInfo.setDaysOfAge(calcDaysBetweenTwoDatesValue.getDays());

            return agreementInfo;
        } catch (Exception e) {
            throw new Exception(e.getMessage().split(":", 9)[4].split("\n", 2)[0]);
//           throw new  Exception(e.getMessage());
        }

    }

    public String[] getInsuranceStatus(String insuranceCode, String introducedDate) {
        String[] result = {"", ""};
        String sqlQuery = "SELECT s.risurectype, s.Isustatcode,(SELECT Isustatdesc FROM baseinfo.tb_insuredstatus Tisu Where Tisu.Isustatcode = s.Isustatcode) Isustatdesc FROM Regiisustatus s WHERE Risuid = ? AND  Isustatcode NOT IN ('07', '20') AND Risustatsdate <= ? AND Risustatsdate || Risustatopdate = (SELECT MAX(Risustatsdate ||  risustatopdate) FROM Regiisustatus WHERE Risuid = ? AND Isustatcode NOT IN ('07', '20') AND Risustatsdate <= ?) AND Rownum < 2";
        List<Object[]> queryResultList = entityManager.createNativeQuery(sqlQuery)
                .setParameter(1, insuranceCode)
                .setParameter(2, introducedDate)
                .setParameter(3, insuranceCode)
                .setParameter(4, introducedDate)
                .getResultList();

        if (queryResultList.size() > 0) {
            Object[] tempResultList = queryResultList.get(queryResultList.size() - 1);
            if (tempResultList[0].toString().equals("2")) {
                result[0] = tempResultList[2].toString() + "_مختومه";
            } else {
                result[0] = tempResultList[2].toString();
            }
            result[1] = tempResultList[1].toString();
        }
        return result;
    }

    public InsuranceType getInsuranceType(String insuranceCode, String introducedDate, String branchCode) throws ProxyProcessingException {

        dbFunctionProxy.setProcedureManager(procedureManager);
        TypeOfIsuValue typeOfIsuValue;
        typeOfIsuValue = (TypeOfIsuValue) dbFunctionProxy.execute(new TypeOfIsu(), new TypeOfIsuInput(insuranceCode, introducedDate, branchCode));
        if (typeOfIsuValue != null && typeOfIsuValue.getTypeInsuranceCode() != null && typeOfIsuValue.getTypeInsuranceDesc() != null) {
            InsuranceType insuranceType = new InsuranceType();
            insuranceType.setInsuranceTypeCode(typeOfIsuValue.getTypeInsuranceCode());
            InsuranceType searchInsuranceType = entityManager.find(InsuranceType.class, insuranceType.getInsuranceTypeCode());
            return searchInsuranceType;
        }
        return null;
    }

    public String getWorkshopDetail(String branchCode, String prwshid) throws ProxyProcessingException {

        GeneralFunctionResult address = null;
        // Map<String, Object> workshopSpec = null;
        this.dbFunctionProxy.setProcedureManager(procedureManager);

        /* Calling package to get workshop address */
        try {
            address = (GeneralFunctionResult) dbFunctionProxy.execute(new GetWorkshopAddres(),
                    new GetWorkshopAddresInput(branchCode, prwshid, ir.tamin.insurance.technical.util.DateUtils.format(new Date(), "yyyyMMdd")));
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurService.getWorkshopDetail." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }

        return address.getResult();
    }
}
