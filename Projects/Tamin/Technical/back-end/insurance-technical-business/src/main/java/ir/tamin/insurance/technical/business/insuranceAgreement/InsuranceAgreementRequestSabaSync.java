package ir.tamin.insurance.technical.business.insuranceAgreement;

import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.model.insuranceAgreement.InsuranceAgreementRequest;
import ir.tamin.insurance.technical.model.insuranceAgreement.ScriptMessage;

import javax.annotation.Resource;
import javax.ejb.EJBContext;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author m_hoseini
 */
@Stateless
public class InsuranceAgreementRequestSabaSync {

    @Inject
    private RestServices restServices;

    @Resource
    private EJBContext context;
    //sabaSyncMedicalCommitteeService.buildCommitteeRequest(committeeRequest, "ecommission_requests");

    public void buildInsuranceAgreementRequest(InsuranceAgreementRequest insuranceAgreementRequest, String operationDesc) throws Exception {

        List<ScriptMessage> scriptMessages = new ArrayList<>();
        String SpecialGroupType = SpecialGroupEnum.find(insuranceAgreementRequest.getSpecialGroupType().getSpecialGroupCode()).name();
        switch (SpecialGroupType) {
            case "DAMPEZESHKI":
                scriptMessages.add(getDampezeshkiRequestScript(insuranceAgreementRequest));
                break;
            case "NEZAMPEZESHKI":
                scriptMessages.add(getNezampezeshkiRequestScript(insuranceAgreementRequest));
                break;
            case "BASIJIAN":
                scriptMessages.add(getBasijianRequestScript(insuranceAgreementRequest));
                break;
            case "RANANDEGAN":
                scriptMessages.add(getRanandeganRequestScript(insuranceAgreementRequest));
                break;
            case "HONARMANDAN":
                scriptMessages.add(getHonarmandanRequestScript(insuranceAgreementRequest));
                break;
            case "BOOTAN":
                scriptMessages.add(getBootanRequestScript(insuranceAgreementRequest));
                break;
            case "MADAHAN":
                scriptMessages.add(getMadahanRequestScript(insuranceAgreementRequest));
                break;
            case "JANBAZAN":
                scriptMessages.add(getJanbazanRequestScript(insuranceAgreementRequest));
                break;
            case "BARBARAN":
                scriptMessages.add(getBarbaranRequestScript(insuranceAgreementRequest));
                break;
            case "BIMEHIRAN":
                scriptMessages.add(getBimehiranRequestScript(insuranceAgreementRequest));
                break;
            case "IRANGARDI":
                scriptMessages.add(getIrangardiRequestScript(insuranceAgreementRequest));
                break;
            case "BIMEHMOALEM":
                scriptMessages.add(getBimehmoalemRequestScript(insuranceAgreementRequest));
                break;
            case "VOKALA":
                scriptMessages.add(getVokalaRequestScript(insuranceAgreementRequest));
                break;
            case "GHALIBAFAN":
                scriptMessages.add(getGhalibafanRequestScript(insuranceAgreementRequest));
                break;
            case "BEHZISTI":
                scriptMessages.add(getBehzistiRequestScript(insuranceAgreementRequest));
                break;
            case "SAYADAN":
                scriptMessages.add(getSayadanRequestScript(insuranceAgreementRequest));
                break;
            case "KARVARZAN":
                scriptMessages.add(getKarvarzanRequestScript(insuranceAgreementRequest));
                break;
            case "SENFI":
                scriptMessages.add(getSenfiRequestScript(insuranceAgreementRequest));
                break;
            case "SHAHID":
                scriptMessages.add(getShahidRequestScript(insuranceAgreementRequest));
                break;
            default:
                break;
        }

        try {
            Logger.getLogger(getClass().getName()).log(Level.INFO, "11");
            String result = null; // restServices.sabaService(scriptMessages, insuranceAgreementRequest.getBranch().getBranchCode(), operationDesc, insuranceAgreementRequest.getRequestId() + "-" + insuranceAgreementRequest.getRequestNumber() + "-" + insuranceAgreementRequest.getCreateUserId(), "Technical");
            Logger.getLogger(getClass().getName()).log(Level.INFO, "22" + result);
            String str = null; // restServices.sabaServiceConfirm(insuranceAgreementRequest.getBranch().getBranchCode(), operationDesc, insuranceAgreementRequest.getRequestId() + "-" + insuranceAgreementRequest.getRequestNumber() + "-" + insuranceAgreementRequest.getCreateUserId(), "Technical");
            Logger.getLogger(getClass().getName()).log(Level.INFO, "33" + str);

            if (result != null) {
                context.setRollbackOnly();
                throw new Exception(result);
            }
        } catch (Exception ex) {
            Logger.getLogger(getClass().getName()).log(Level.INFO, "Exceptionnnnnnn" + ex.getMessage());
            context.setRollbackOnly();
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
            throw new Exception(ex);
        }
    }

    private ScriptMessage getDampezeshkiRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = " insert into swshvetspec"
                    + " (risuid, rwshid, sabtdat, sabtno, sabegh1, age, wage,isutype, createuid, createdt, edituid, editdt, confirmuid, confirmdt)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date,?request_no ,  ?history, ?age, ?wage,?isuType ,?create_uid ,?create_date ,?edit_uid ,?edit_date ,?confirm_uid ,?confirm_date)";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?wage", "'" + request.getWage() + "'")
                    .replace("?isuType", "'" + request.getInsuranceType().getInsuranceTypeCode() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'");

            String select = "select * from swshvetspec"
                    + "   where risuid = ?risuid and rwshid = ?rwshid  and insdat =?insdat";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getNezampezeshkiRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";
            insert = " insert into swsh_docspec"
                    + " (risuid, rwshid, sabtdat, sabtno, sabegh1, age, wage,isutype, createuid, createdt, edituid, editdt, confirmuid, confirmdt, jobcode,insdat, insno, jobdesc, karstat)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date,?request_no ,  ?history, ?age, ?wage,?isuType ,?create_uid ,?create_date ,?edit_uid ,?edit_date ,?confirm_uid ,?confirm_date ,?jobcode ,?insdat,?insno ,?jobdesc ,?status)";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?wage", "'" + request.getWage() + "'")
                    .replace("?isuType", "'" + request.getInsuranceType().getInsuranceTypeCode() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?jobcode", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType3() + "'")
                    .replace("?insdat", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'")
                    .replace("?insno", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber1() + "'")
                    .replace("?jobdesc", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDescription1() + "'")
                    .replace("?status", "'" + request.getStatus() + "'");

            String select = "select * from swsh_docspec"
                    + "   where risuid = ?risuid and status = ?status  and insdat =?insdat";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?status", "'" + request.getStatus() + "'")
                    .replace("?insdat", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);

            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getBasijianRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = " insert into regbasijspec"
                    + " (risuid, rwshid, insdat, insno, sabtdat, sabtno, sabegh1,sen, cnfuid, cnfdt, createuid, createdt, edituid, editdt, karstat)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date,?request_no , ?doc_no1,?doc_date1, ?history, ?age, ?confirm_uid,?confirm_date ,?create_uid ,?create_date ,?edit_uid ,?edit_date ,?status)";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?doc_no1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber1() + "'")
                    .replace("?doc_date1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?status", "'" + request.getStatus() + "'");

            String select = "select * from regbasijspec"
                    + "   where risuid = ?risuid and karstat = ?status  and insdat =?insdat";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?status", "'" + request.getStatus() + "'")
                    .replace("?insdat", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);

            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getRanandeganRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getHonarmandanRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";
            insert = " insert into regindustspec"
                    + " (risuid, rwshid, sabtdat, sabtno, sabegh1, age, wage, isutype, createuid, createdt, edituid, editdt, confirmuid, confirmdt)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date,?request_no ,  ?history, ?age, ?wage,?isuType ,?create_uid ,?create_date ,?edit_uid ,?edit_date ,?confirm_uid ,?confirm_date )";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?wage", "'" + request.getWage() + "'")
                    .replace("?isuType", "'" + request.getInsuranceType().getInsuranceTypeCode() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'");

            String select = "select * from regindustspec"
                    + "   where risuid = ?risuid ";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getBootanRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = " insert into swshbootanspec"
                    + " (risuid, rwshid, sabtdat, sabtno, sabegh1, age, wage,isutype, createuid, createdt, edituid, editdt, confirmuid, confirmdt, rate)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date,?request_no ,  ?history, ?age, ?wage,?isuType ,?create_uid ,?create_date ,?edit_uid ,?edit_date ,?confirm_uid ,?confirm_date ,?rate )";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?wage", "'" + request.getWage() + "'")
                    .replace("?isuType", "'" + request.getInsuranceType().getInsuranceTypeCode() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?rate", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType1() + "'");

            String select = "select * from swshbootanspec"
                    + "   where risuid = ?risuid and rwshid = ?rwshid ";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getMadahanRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;

            update = "";
            insert = " insert into regmadahspec"
                    + " (risuid, rwshid, insdat,insno, sabtdat, sabtno, sabegh1, sen, cnfuid,cnfdt, createuid, createdt, edituid, editdt, karstat)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date,?request_no ,  ?doc_date1, ?doc_no1, ?history_in_day,?age ,?confirm_uid ,?confirm_date ,?create_uid ,?create_date ,?edit_uid ,?edit_date,?status )";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?doc_date1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'")
                    .replace("?doc_no1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber1() + "'")
                    .replace("?history_in_day", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?status", "'" + request.getStatus() + "'");

            String select = "select * from regmadahspec"
                    + "   where risuid = ?risuid and karstat = ?status and insdat =?request_date ";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?status", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getJanbazanRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;

            update = "";
            insert = "insert into regjanbaz"
                    + "(risuid, rwshid, insdat, insno, janbcod, janbno, janbdat, janbrat, karkind1, karkind2, cnfcu1 ,cnfcd1 ,cnfcu2 , cnfcd2 , createuid , createdt , edituid , editdt)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date, ?request_no, ?doc_no2, ?doc_no1, ?doc_date1, ?type3,?type1 ,?type2 ,?doc_no3 ,?doc_date3 ,?confirm_uid ,?confirm_date ,?create_uid ,?create_date ,?edit_uid ,?edit_date)";

            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?doc_no2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber2() + "'")
                    .replace("?doc_no1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber1() + "'")
                    .replace("?doc_date1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'")
                    .replace("?type3", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType3() + "'")
                    .replace("?type1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType1() + "'")
                    .replace("?type2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType2() + "'")
                    .replace("?doc_no3", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber3() + "'")
                    .replace("?doc_date3", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate3() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'");

            String select = "select * from regjanbaz"
                    + "   where risuid = ?risuid and confirm_uid = ?confirm_uid  and confirm_date =?confirm_date";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?confirm_uid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?confirm_date", "'" + request.getRequestDate() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getBarbaranRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getBimehiranRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";
            insert = " insert into swshirbimespec"
                    + " (risuid, rwshid, sabtdat, sabtno, sabegh1, age, wage,isutype, createuid, createdt, edituid, editdt, confirmuid, confirmdt, degree, karstat)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date,?request_no ,  ?history, ?age, ?wage,?isuType ,?create_uid ,?create_date ,?edit_uid ,?edit_date ,?confirm_uid ,?confirm_date ,?education ,?status)";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?wage", "'" + request.getWage() + "'")
                    .replace("?isuType", "'" + request.getInsuranceType().getInsuranceTypeCode() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?education", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType1() + "'")
                    .replace("?status", "'" + request.getStatus() + "'");

            String select = "select * from swshirbimespec"
                    + "   where risuid = ?risuid and rwshid = ?rwshid and sabtdat = ?request_date";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);

            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getIrangardiRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = " insert into swshtouristspec"
                    + " (risuid, rwshid, sabtdat, sabtno, sabegh1, age, wage,isutype, createuid, createdt, edituid, editdt, confirmuid, confirmdt)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date, ?request_no, ?history, ?age, ?wage,?isuType ,?create_uid ,?create_date ,?edit_uid ,?edit_date ,?confirm_uid ,?confirm_date )";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?wage", "'" + request.getWage() + "'")
                    .replace("?isuType", "'" + request.getInsuranceType().getInsuranceTypeCode() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'");

            String select = "select * from swshtouristspec"
                    + "   where risuid = ?risuid and rwshid = ?rwshid  ";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);

            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getBimehmoalemRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = " insert into swshteacherspec"
                    + " (risuid, rwshid, sabtdat, sabtno, sabegh1, age, wage,isutype, createuid, createdt, edituid, editdt, confirmuid, confirmdt, rate, karstat)"
                    + "values"
                    + "( ?risuid, ?rwshid,?request_date, ?request_no, ?history, ?age, ?wage,?isuType ,?create_uid ,?create_date ,?edit_uid ,?edit_date ,?confirm_uid ,?confirm_date ,?rate,?status)";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?wage", "'" + request.getWage() + "'")
                    .replace("?isuType", "'" + request.getInsuranceType().getInsuranceTypeCode() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?rate", "'" + request.getInsuranceRate() + "'")
                    .replace("?status", "'" + request.getStatus() + "'");

            String select = "select * from swshteacherspec"
                    + "   where risuid = ?risuid and rwshid = ?rwshid  and sabtdat =?sabtdat";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?sabtdat", "'" + request.getRequestDate() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getVokalaRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";
            
            insert = "insert into ssup_lawyerspec"
                    + "(risuid, rwshid, introduction_letter_date, introduction_letter_no, hist_duration_days,hist_duration_start, hist_duration_end, age, isutype, wage,  createuid, createdt,  edituid, editdt, confirmuid, confirmdt, status, isustatcode, int_date, int_let_no, reqno, reqdate)"
                    + "values"
                    + "(?risuid, ?rwshid,?, ?, ?history, ?doc_sdate, ?doc_edate, ?age,?isuType ,?wage ,?create_uid ,?create_date , ?edit_uid ,?edit_date ,?confirm_uid, ?confirm_date, ?status, ?isustat, ?doc_date1,?doc_no1, ?request_no, ?request_date)";

            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?doc_no1", "'" + ""+"'")
                    .replace("?doc_date1", "'" +"" +"'")
                    .replace("?history", "'" + request.getHistoryDay() + "'")
                    .replace("?doc_sdate", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate() + "'")
                    .replace("?doc_edate", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?isuType", "'" + request.getInsuranceType().getInsuranceTypeCode() + "'")
                    .replace("?wage", "'" + request.getWage() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?status", "'" + request.getInsuranceStatus().getInsuranceStatCode() + "'")
                    .replace("?doc_date1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'")
                    .replace("?doc_no1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber1() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'");

            String select = "select * from ssup_lawyerspec"
                    + "   where  risuid = ?risuid and  reqno =?request_no";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getGhalibafanRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = "insert into handmode_spec"
                    + "(rwshid, risuid, hand_cardno, hand_carddat, hand_sdat, hand_edat, confirmuid, confirmdt, createuid, createdt, edituid, editdt, hand_yer)"
                    + "values"
                    + "( ?rwshid, ?risuid,?doc_no1, ?doc_date1, ?doc_sdate, ?doc_edate, ?confirm_uid, ?confirm_date,?create_uid ,?create_date ,?edit_uid ,?edit_date , ?type1)";

            insert = insert
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?doc_no1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber1() + "'")
                    .replace("?doc_date1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'")
                    .replace("?doc_sdate", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate() + "'")
                    .replace("?doc_edate", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?type1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType1() + "'");

            String select = "select * from handmode_spec"
                    + "   where rwshid = ?rwshid  and risuid = ?risuid and  hand_carddat =?doc_date1";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?confirm_uid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?doc_date1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);

            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getBehzistiRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = "insert into baj_behzist"
                    + "(risuid, rwshid, sabtno, sabtdat, kind, createuid, createdt, edituid, editdt, confirmuid, confirmdt ,stat ,enddate )"
                    + "values"
                    + "( ?risuid, ?rwshid,  ?request_no ,?request_date, ?type1, ?create_uid, ?create_date, ?edit_uid,?edit_date ,?confirm_uid ,?confirm_date ,?status , ?currentDate)";

            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?kind", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType1() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?edit_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edit_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?status", "'" + request.getStatus() + "'")
                    .replace("?currentDate", "14010316");

                   //select general.dateutils.GETTODAY from dual
            String select = "select * from baj_behzist"
                    + "   where risuid = ?risuid and rwshid = ?rwshid  and sabtdat =?request_date";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);

            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getSayadanRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = "insert into baj_sayad"
                    + "(risuid, rwshid, sabtno, sabtdat, createuid, createdt, edituid, editdt, confirmuid, confirmdt, stat)"
                    + "values"
                    + "( ?risuid, ?rwshid, ?request_no, ?request_date, ?create_uid, ?create_date, ?create_uid,?create_date ,?confirm_uid ,?confirm_date ,?status)";

            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?status", "'" + request.getStatus() + "'");

            String select = "select * from baj_sayad"
                    + "   where risuid = ?risuid and rwshid = ?rwshid  and sabtdat =?sabtdat";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?sabtdat", "'" + request.getRequestDate() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);

            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getSenfiRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";
            return scriptMessage;
        } else {
            return null;
        }
    }
    

    private ScriptMessage getKarvarzanRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";

            insert = "insert into baj_isdkarvarzi"
                    + "  (rwshid, risuid, ikz_type, ikz_perno, ikz_perdat, ikz_letno, ikz_letdat, ikz_kvazkno,ikz_kvazkdate, ikz_vpazmshen, ikz_cntrshen, ikz_amzmshen, provincecode,citycode, ikz_kvazsdate, ikz_kvazedate, ikz_kvazdoreh, jobcode, educationcode,ikz_eduname, ikz_eduedate, ikz_edumno, ikz_edumdate, ikz_reqstat, ikz_isustat,IKZ_ISUSTATDAT, ikz_sdate, ikz_edate, ikz_solstat, ikz_solkartstat, ikz_solkartno, ikz_solkartdate,ikz_solsdate, ikz_soledate, ikz_age, createuid, createdt, confirmuid, confirmdt, ikz_m71))"
                    + "values"                                         
                    + "  ( ?rwshid, ?risuid, ?karvarzitype, ?introduction_letter_no, ?introduction_letter_date, ?request_no, ?request_date,?doc_no1, ?doc_date1, ?desc1, ?desc2, ?desc3, ?type5, ?doc_no5, ?doc_sdate, ?doc_edate, ?type4, ?doc_no4,?type3, ?desc4, ?doc_date4, ?doc_no2, ?doc_date2, ?status,?type8, ?DOC_DATE5,?DOC_SDATE2, ?DOC_EDATE2, ?type1, ?type2, ?doc_no3, ?doc_date3, ?doc_sdate1, ?doc_edate1,?age, ?create_uid, ?create_date, ?confirm_uid, ?confirm_date, ?karvarzitype71);)";
            insert = insert
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?karvarzitype", "2" )                    
                    .replace("?introduction_letter_no", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate2() + "'")
                    .replace("?introduction_letter_date", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate3() + "'")                   
                    .replace("?request_no", "'" + request.getIntroductionLetterNumber() + "'")                   
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'")                   
                    .replace("?doc_no1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber2() + "'")
                    .replace("?doc_date1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate2() + "'")
                    .replace("?desc1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDescription1() + "'")               
                    .replace("?desc2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDescription2() + "'")
                    .replace("?desc3", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDescription3() + "'")
                    .replace("?type5", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType5() + "'")
                    .replace("?doc_no5", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType2() + "'")
                    .replace("?doc_sdate", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType1() + "'")
                    .replace("?doc_edate", "'" + request.getConfirmUserId() + "'")
                    .replace("?type4", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType4()+ "'")
                    .replace("?doc_no4", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber4() + "'")
                    .replace("?type3", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType3()+ "'")
                    .replace("?desc4", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDescription4()+ "'")
                    .replace("?doc_date4", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate4()+ "'")
                    .replace("?doc_no2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber2()+ "'")
                    .replace("?doc_date2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate2()+ "'")
                    .replace("?status", "'" + request.getStatus() + "'")
                    .replace("?type8", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType8()+ "'")
                    .replace("?DOC_DATE5", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate5() + "'")                    
                    .replace("?DOC_SDATE2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate2() + "'")                   
                    .replace("?DOC_EDATE2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate2() + "'")
                    .replace("?type1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType1() + "'")
                    .replace("?type2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType2() + "'")
                    .replace("?doc_no3", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber3() + "'")
                    .replace("?doc_date3", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate3() + "'")
                    .replace("?doc_sdate1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentStartDate1() + "'")
                    .replace("?doc_edate1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentEndDate1() + "'")
                    .replace("?age", "'" + request.getAgeYear() + request.getAgeMonth() + request.getAgeDay() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?create_date", "'" + request.getCreateDate()+ "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId()+ "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate()+ "'")                  
                    .replace("?karvarzitype71", "1");

            String select = "select * from baj_isdkarvarzi"
                    + "   where risuid = ?risuid and rwshid = ?rwshid and IKZ_LETDAT = ?request_date ";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?request_date", "'" + request.getIntroductionLetterDate() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);
          
            return scriptMessage;
        } else {
            return null;
        }
    }

    private ScriptMessage getShahidRequestScript(InsuranceAgreementRequest request) {
        if (request != null) {
            ScriptMessage scriptMessage = new ScriptMessage();
            String update;
            String insert;
            update = "";
            insert = "insert into swshmartyr"
                    + "  (risuid, rwshid, insno, insdat, martno, martdat, martbno, martbdat, karkind1,karkind2, cnfcu1, cnfcd1, cnfcu2, cnfcd2, createuid, createdt, edituid, editdt)"
                    + "values"
                    + "  ( ?risuid, ?rwshid, ?doc_date2, ?doc_date3, ?doc_no2, ?doc_date2, ?doc_no1,?doc_date1, ?type2, ?type1, ?confirm_uid, ?confirm_date, ?doc_no4, ?doc_date4, ?create_uid, ?create_date, ?edituid, ?editdt)";
            insert = insert
                    .replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'")
                    .replace("?doc_date2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate2() + "'")
                    .replace("?doc_date3", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate3() + "'")
                    .replace("?doc_no2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber2() + "'")
                    .replace("?doc_date2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate2() + "'")
                    .replace("?doc_no1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber1() + "'")
                    .replace("?doc_date1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate1() + "'")
                    .replace("?type2", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType2() + "'")
                    .replace("?type1", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getType1() + "'")
                    .replace("?confirm_uid", "'" + request.getConfirmUserId() + "'")
                    .replace("?confirm_date", "'" + request.getConfirmDate() + "'")
                    .replace("?doc_no4", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentNumber4() + "'")
                    .replace("?doc_date4", "'" + request.getInsuranceAgreementRequestDetailList().get(0).getDocumentDate4() + "'")
                    .replace("?create_date", "'" + request.getCreateDate() + "'")
                    .replace("?create_uid", "'" + request.getCreateUserId() + "'")
                    .replace("?edituid", "'" + request.getCreateUserId() + "'")
                    .replace("?editdt", "'" + request.getCreateUserId() + "'");

            String select = "select * from swshmartyr"
                    + "   where risuid = ?risuid and rwshid = ?rwshid ";
            select = select.replace("?risuid", "'" + request.getInsuranceId() + "'")
                    .replace("?rwshid", "'" + request.getWorkshop().getWorkshopId() + "'");

            scriptMessage.setIfScript(select);
            scriptMessage.setThenScript(update);
            scriptMessage.setElseScript(insert);

            return scriptMessage;
        } else {
            return null;
        }
    }
}
