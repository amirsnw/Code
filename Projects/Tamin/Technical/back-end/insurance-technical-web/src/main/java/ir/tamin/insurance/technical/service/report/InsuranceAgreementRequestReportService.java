package ir.tamin.insurance.technical.service.report;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.data.validation.ValidatorBean;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.business.service.InsuranceAgreementRequestService;
import ir.tamin.insurance.technical.model.insuranceAgreement.InsuranceAgreementRequest;
import ir.tamin.insurance.technical.model.insuranceAgreement.InsuranceAgreementRequestDetail;
import ir.tamin.insurance.technical.util.DateUtils;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.slf4j.Logger;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.io.InputStream;
import java.util.*;

/**
 *
 * @author m_hoseini
 */
public class InsuranceAgreementRequestReportService {
    
    @Inject
    private EntityManager em;

    @Inject
    private Logger logger;

    @Inject
    private ValidatorBean validatorBean;
    
    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dBFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    protected ProcedureManager procedureManager;

    @Inject
    protected InsuranceAgreementRequestService insAgrReqService;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @ProxyMethod
    public byte[] loadReportMedicalInfo(Long reqId) throws Exception, ProxyProcessingException {

        int i = 0;
        InputStream reportStream = null;
        InsuranceAgreementRequest insAgrReq = null;
        InsuranceAgreementRequestDetail insAgrReqDetail = null;
        List<InsuranceAgreementRequestDetail> insAgrReqDetailList = null;
        Map<String, Object> params = new HashMap<>();
        try {
            insAgrReq = (InsuranceAgreementRequest) em.createNamedQuery("InsuranceAgreementRequest.getByRequestId")
                    .setParameter("requestId", reqId.toString())
                    .getSingleResult();
            try {
                insAgrReqDetail = insAgrReq.getInsuranceAgreementRequestDetailList().get(0);
            } catch (Exception e) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.null_REPORT"), new String[0]);
            }

            insAgrReqDetailList = insAgrReq.getInsuranceAgreementRequestDetailList();
            try {
                params.put("no", insAgrReq.getRequestNumber());
                params.put("date", DateUtils.getPersian8Char(insAgrReq.getRequestDate()));
                params.put("id", insAgrReq.getRequestNumber());
                params.put("currentDate", DateUtils.getPersian8Char(new Date()));
                params.put("fullName", insAgrReq.getPerson().getFullName());
                params.put("insuranceType", insAgrReq.getInsuranceType().getInsuranceTypeDesc());
                params.put("fatherName", insAgrReq.getPerson().getFatherName());
                params.put("birthDate", DateUtils.getPersian8Char(insAgrReq.getPerson().getDateOfBirth()));
                params.put("idNumber", insAgrReq.getPerson().getIdCardNumber());
                params.put("nationalCode", insAgrReq.getPerson().getNationalId());
                params.put("maritalStatus", "");
                params.put("insuranceNumber", insAgrReq.getPerson().getId());
                params.put("requestDate", DateUtils.getPersian8Char(insAgrReq.getRequestDate()));
                params.put("branchName", em.find(Branch.class, insAgrReq.getPerson().getBrchCode()).getBranchName());

                params.put("deadline", DateUtils.getPersian8Char(insAgrReqDetail.getDocumentDate2()));
                params.put("phoneNumber", insAgrReqDetail.getDocumentNumber3());
                params.put("type1", insAgrReqDetail.getType1());
                params.put("type2", insAgrReqDetail.getType2());
                params.put("type3", insAgrReqDetail.getType3());
                params.put("type4", insAgrReqDetail.getType4());
                params.put("type5", insAgrReqDetail.getType5());
                params.put("type6", insAgrReqDetail.getType6());
                params.put("type7", insAgrReqDetail.getType7());
                params.put("description4", insAgrReqDetail.getDescription4());
                params.put("documentNumber4", insAgrReqDetail.getDocumentNumber4());
                params.put("documentNumber5", insAgrReqDetail.getDocumentNumber5());
                params.put("documentNumber6", insAgrReqDetail.getDocumentNumber6());
                params.put("documentNumber7", insAgrReqDetail.getDocumentNumber7());
                params.put("documentNumber8", insAgrReqDetail.getDocumentNumber8());

            } catch (NoResultException e) {
                params = null;
            }
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(insAgrReqDetailList);
            reportStream = InsuranceAgreementRequestReportService.class.getResourceAsStream("/reports/repAgreementMedicalAll.jasper");
            byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, params, ds);
            return byteStream;
        } catch (Exception e) {
            logger.error(e.toString());
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
        return null;
    }

    @ProxyMethod
    public byte[] loadReport2(Long reqId) throws Exception {

        InputStream reportStream = null;
        InsuranceAgreementRequest insAgrReq = null;
        List<InsuranceAgreementRequest> agreementInquiryAnswerRep = null;
        List<Object> dsList = new ArrayList<>();
        String workshopAddress = null;

        try {
            Map<String, Object> params = new HashMap<>();

            /*agreementInquiryAnswerRep = em.createNamedQuery("AgreementInquiryAnswerRep.byId")
                    .setParameter("reqId", reqId)
                    .getResultList();*/

            insAgrReq = (InsuranceAgreementRequest) em.createNamedQuery("InsuranceAgreementRequest.getByRequestId")
                    .setParameter("requestId", reqId.toString())
                    .getSingleResult();

            workshopAddress = insAgrReqService.getWorkshopDetail(insAgrReq.getWorkshop().getBranchCode(), insAgrReq.getWorkshop().getWorkshopId());

            try {
                params.put("id", insAgrReq.getRequestNumber());
                params.put("currentDate", DateUtils.getPersian8Char(new Date()));
                params.put("branchName", em.find(Branch.class, insAgrReq.getPerson().getBrchCode()).getBranchName());
                params.put("fullName", insAgrReq.getPerson().getFullName());
                params.put("fatherName", insAgrReq.getPerson().getFatherName());
                params.put("idNumber", insAgrReq.getPerson().getIdCardNumber());
                params.put("birthDate", DateUtils.getPersian8Char(insAgrReq.getPerson().getDateOfBirth()));
                params.put("nationalCode", insAgrReq.getPerson().getNationalId());
                params.put("insuranceNumber", insAgrReq.getPerson().getId());
                params.put("workshopName", insAgrReq.getWorkshop().getWorkshopName());
                params.put("workshopId", insAgrReq.getWorkshop().getWorkshopId());
                params.put("history", insAgrReq.getHistoryDay().toString());
                params.put("address", workshopAddress);
            } catch (NoResultException e) {
                params = null;
            }
            dsList.add(new Object());
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(dsList);
            reportStream = InsuranceAgreementRequestReportService.class.getResourceAsStream("/reports/repAgreementContract.jasper");
            byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, params, ds);
            return byteStream;
        } catch (Exception e) {
            logger.error(e.toString());
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
        return null;
    }
    
    
}
