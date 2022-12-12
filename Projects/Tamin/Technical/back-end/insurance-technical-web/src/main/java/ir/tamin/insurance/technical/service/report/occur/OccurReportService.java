package ir.tamin.insurance.technical.service.report.occur;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.insurance.technical.function.occur.occurReport.*;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceType;
import ir.tamin.insurance.technical.model.guardian.Guardian;
import ir.tamin.insurance.technical.service.GuardianService;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.web.servlets.ReportServlet;
import org.json.JSONObject;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Stateless
public class OccurReportService {


    @Inject
    private GuardianService guardianService;

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dbFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    protected ProcedureManager procedureManager;
    @Inject
    private EntityManager em;

    public byte[] loadGuardianCalcReport(String requestNo) throws IOException, JRException {
        InputStream reportStream = null;
        try {
            Map<String, Object> params = new HashMap<>();
            Guardian guardian = guardianService.getGuardianOverBranch(requestNo);
            if (guardian == null)
                throw new IOException("Error finding data from database");

            String inspRespLetterDate = DateUtils.format(guardian.getBranchInspRespLetterDate(), "yyyyMMdd");
            inspRespLetterDate = inspRespLetterDate.substring(0, 4) + "/" + inspRespLetterDate.substring(4, 6) + "/" + inspRespLetterDate.substring(6, 8);
            params.put("inspRespLetDate", inspRespLetterDate);

            params.put("inspRespLetNO", guardian.getBranchInspRespLetterNo());
            String gType = "";
            switch (guardian.getGuardianType()) {
                case '1':
                    gType = "پدر";
                    break;
                case '2':
                    gType = "مادر";
                    break;
                case '3':
                    gType = "شوهر";
                    break;
                case '4':
                    gType = "پدر و مادر";
                    break;
                case '5':
                    gType = "فرزند ذکور";
                    break;
                case '6':
                    gType = "فرزند اناث";
            }
            params.put("guardTypeDesc", gType);
            params.put("inspectorNote", guardian.getInspectorNote());
            params.put("techConfirm", guardian.getTechConfStatus().toString());
            params.put("cmtConfirm", guardian.getCommitteeConfirm().toString());
            params.put("brhIntroLetNo", guardian.getBrhIntRoleLetterNo());

            String brhIntroLetDate = DateUtils.format(guardian.getBrhIntRoleDate(), "yyyyMMdd");
            brhIntroLetDate = brhIntroLetDate.substring(0, 4) + "/" + brhIntroLetDate.substring(4, 6) + "/" + brhIntroLetDate.substring(6, 8);

            params.put("brhIntroLetDate", brhIntroLetDate);

            ArrayList<Guardian> guardians = new ArrayList<>();
            guardians.add(guardian);
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(guardians);
            reportStream = OccurReportService.class.getResourceAsStream("/reports/GuardianCalcReport.jasper");

            return JasperRunManager.runReportToPdf(reportStream, params, ds);

        } catch (IOException e) {

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    public byte[] loadOccurListReports(String branchCode, Date startDate, Date endDate) throws IOException, JRException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        InputStream reportStream = null;
        try {
            String sDate = DateUtils.format(startDate, "yyyyMMdd");
            String eDate = DateUtils.format(endDate, "yyyyMMdd");
            String today = DateUtils.format(endDate, "yyyyMMdd");

            Map<String, Object> params = new HashMap<>();


            List<OccurListReportValue> values = (List<OccurListReportValue>) dbFunctionProxy.execute(
                    new OccurListReport(), new OccurListReportInput(branchCode, sDate, eDate));

            params.put("brhIntroLetNo", "");

            sDate = sDate.substring(0, 4) + "/" + sDate.substring(4, 6) + "/" + sDate.substring(6, 8);
            params.put("sDate", sDate);

            eDate = eDate.substring(0, 4) + "/" + eDate.substring(4, 6) + "/" + eDate.substring(6, 8);
            params.put("toDate", eDate);

            today = today.substring(0, 4) + "/" + today.substring(4, 6) + "/" + today.substring(6, 8);
            params.put("today", today);


            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(values);
            reportStream = OccurReportService.class.getResourceAsStream("/reports/OccurListReport.jasper");

            return JasperRunManager.runReportToPdf(reportStream, params, ds);

        } catch (Exception e) {

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    public byte[] loadOccurOwnerReports(String branchCode, Date startDate, Date endDate) throws IOException, JRException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        InputStream reportStream = null;
        try {

            Map<String, Object> params = new HashMap<>();

            String sdate = DateUtils.format(startDate, "yyyyMMdd");
            String edate = DateUtils.format(endDate, "yyyyMMdd");
            List<OccurOwnerReportValue> values = (List<OccurOwnerReportValue>) dbFunctionProxy.execute(
                    new OccurOwnerReport(), new OccurOwnerReportInput(branchCode, sdate, edate));
            sdate = sdate.substring(0, 4) + "/" + sdate.substring(4, 6) + "/" + sdate.substring(6, 8);
            params.put("sdate", sdate);

            edate = edate.substring(0, 4) + "/" + edate.substring(4, 6) + "/" + edate.substring(6, 8);
            params.put("edate", edate);
            BigDecimal cntTotal = BigDecimal.ZERO;
            ;
            for (OccurOwnerReportValue value :
                    values) {
                cntTotal = cntTotal.add(value.getCnt());

            }
            params.put("cntTotal", cntTotal);
        /*    params.put("brhIntroLetNo", "");

            sDate = sDate.substring(0, 4) + "/" + sDate.substring(4, 6) + "/" + sDate.substring(6, 8);
            params.put("startDate", sDate);

            eDate = eDate.substring(0, 4) + "/" + eDate.substring(4, 6) + "/" + eDate.substring(6, 8);
            params.put("endDate", eDate);*/


            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(values);
            reportStream = OccurReportService.class.getResourceAsStream("/reports/RepOccurOwner.jasper");

            return JasperRunManager.runReportToPdf(reportStream, params, ds);

        } catch (Exception e) {

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    public byte[] loadOccurCauseReports(String branchCode, Date startDate, Date endDate) throws IOException, JRException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        InputStream reportStream = null;
        try {

            Map<String, Object> params = new HashMap<>();

            String sdate = DateUtils.format(startDate, "yyyyMMdd");
            String edate = DateUtils.format(endDate, "yyyyMMdd");


            List<OccurCauseReportValue> values = (List<OccurCauseReportValue>) dbFunctionProxy.execute(
                    new OccurCauseReport(), new OccurCauseReportInput(branchCode, sdate, edate));


            sdate = sdate.substring(0, 4) + "/" + sdate.substring(4, 6) + "/" + sdate.substring(6, 8);
            params.put("sdate", sdate);

            edate = edate.substring(0, 4) + "/" + edate.substring(4, 6) + "/" + edate.substring(6, 8);
            params.put("edate", edate);

            BigDecimal cntTotal = BigDecimal.ZERO;

            for (OccurCauseReportValue value :
                    values) {
                cntTotal = cntTotal.add(value.getCnt());

            }
            params.put("cntTotal", cntTotal);


            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(values);
            reportStream = OccurReportService.class.getResourceAsStream("/reports/OccurCause.jasper");

            return JasperRunManager.runReportToPdf(reportStream, params, ds);

        } catch (Exception e) {

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    public byte[] loadOccurPartReports(String branchCode, Date startDate, Date endDate) throws IOException, JRException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        InputStream reportStream = null;
        try {

            Map<String, Object> params = new HashMap<>();

            String sdate = DateUtils.format(startDate, "yyyyMMdd");
            String edate = DateUtils.format(endDate, "yyyyMMdd");


            List<OccurPartReportValue> values = (List<OccurPartReportValue>) dbFunctionProxy.execute(
                    new OccurPartReport(), new OccurPartReportInput(branchCode, sdate, edate));
            BigDecimal cntTotal = BigDecimal.ZERO;
            BigDecimal isuTotal = BigDecimal.ZERO;

            for (OccurPartReportValue value :
                    values) {
                isuTotal = isuTotal.add(value.getIsu_cnt());
                cntTotal = isuTotal.add(value.getPart_cnt());
            }
            params.put("cntTotal", cntTotal);
            params.put("isuTotal", isuTotal);

            sdate = sdate.substring(0, 4) + "/" + sdate.substring(4, 6) + "/" + sdate.substring(6, 8);
            params.put("sdate", sdate);

            edate = edate.substring(0, 4) + "/" + edate.substring(4, 6) + "/" + edate.substring(6, 8);
            params.put("edate", edate);


            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(values);
            reportStream = OccurReportService.class.getResourceAsStream("/reports/OccurPart.jasper");

            return JasperRunManager.runReportToPdf(reportStream, params, ds);

        } catch (Exception e) {

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    public byte[] loadOccurTypeReports(String branchCode, Date startDate, Date endDate) throws IOException, JRException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        InputStream reportStream = null;
        try {

            Map<String, Object> params = new HashMap<>();

            String sdate = DateUtils.format(startDate, "yyyyMMdd");
            String edate = DateUtils.format(endDate, "yyyyMMdd");


            List<OccurTypeReportValue> values = (List<OccurTypeReportValue>) dbFunctionProxy.execute(
                    new OccurTypeReport(), new OccurTypeReportInput(branchCode, sdate, edate));
            BigDecimal cntTotal = BigDecimal.ZERO;


            for (OccurTypeReportValue value :
                    values) {
                cntTotal = cntTotal.add(value.getCnt());

            }
            params.put("cntTotal", cntTotal);


            sdate = sdate.substring(0, 4) + "/" + sdate.substring(4, 6) + "/" + sdate.substring(6, 8);
            params.put("sdate", sdate);

            edate = edate.substring(0, 4) + "/" + edate.substring(4, 6) + "/" + edate.substring(6, 8);
            params.put("edate", edate);


            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(values);
            reportStream = OccurReportService.class.getResourceAsStream("/reports/OccurTypeReport.jasper");

            return JasperRunManager.runReportToPdf(reportStream, params, ds);

        } catch (Exception e) {

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    public byte[] loadOccurEserviceReport(JSONObject input) throws IOException, JRException, ProxyProcessingException, Exception {
        InputStream reportStream = null;
        Map<String, Object> params = new HashMap<>();
        List<Map<String, Object>> array = new ArrayList<>();
        InsuranceType insuranceType;
        dbFunctionProxy.setProcedureManager(procedureManager);
        try {
            /*String sdate = DateUtils.format(startDate, "yyyyMMdd");
            String edate = DateUtils.format(endDate, "yyyyMMdd");

            sdate = sdate.substring(0, 4) + "/" + sdate.substring(4, 6) + "/" + sdate.substring(6, 8);
            params.put("sdate", sdate);*/

            convertDateToReadableFormat("birthDate", input.get("birthDate"), params);
            convertDateToReadableFormat("employeeDate", input.get("employeeDate"), params);
            convertDateToReadableFormat("occurrenceDate", input.get("occurrenceDate"), params);
            convertDateToReadableFormat("currentDate", String.valueOf(new Date().getTime()), params);

            params.put("workshopTelephone",input.get("workshopTelephone"));
            params.put("workshopAddress",input.get("workshopAddress"));
            params.put("workshopCode",input.get("workshopCode"));
            params.put("workshopPostalCode",input.get("workshopPostalCode"));
            params.put("workshopName",input.get("workshopName")); //
            params.put("workshopBranchCode",input.get("workshopBranchCode"));
            params.put("pFirstName",input.get("pFirstName"));
            params.put("occurrenceAddress",input.get("occurrenceAddress"));
            params.put("reportJobLocation",input.get("reportJobLocation"));
            params.put("gender",input.get("gender"));
            params.put("occurJobdesc",input.get("jobDesc"));
            params.put("occurrenceTime",input.get("occurrenceTime"));
            params.put("reportAddress",input.get("reportAddress"));
            params.put("bossMobileNumber",input.get("bossMobileNumber"));
            params.put("reporterType",input.get("reporterType"));
            params.put("reportRefrenceNumber",input.get("reportRefrenceNumber"));
            params.put("bossFullName",input.get("bossFullName"));
            params.put("reportDate",input.get("reportDate"));
            params.put("pNationalCode",input.get("pNationalCode"));
            params.put("insuranceId",input.get("insuranceId"));
            params.put("pLastName",input.get("pLastName"));
            params.put("nationCode",input.get("nationCode"));
            params.put("reportPostalCode",input.get("reportPostalCode"));
            params.put("marriageStatusCode",input.get("marriageStatusCode"));
            params.put("occurrenceDesc",input.get("occurrenceDesc"));
            params.put("reportId",input.get("reportId"));
            params.put("userId",input.get("userId"));
            params.put("branchCode",input.get("branchCode"));
            params.put("reportTelephone",input.get("reportTelephone"));
            params.put("occurrenceResult",input.get("occurrenceResult"));
            params.put("rwworkstart",input.get("rwworkstart"));
            params.put("rwworkfinish",input.get("rwworkfinish"));
            params.put("vehicle",input.get("vehicle"));
            params.put("status",input.get("status"));

            insuranceType = em.find(InsuranceType.class, input.getString("isuTypecode"));
            params.put("isuTypeDesc", insuranceType != null ? insuranceType.getInsuranceTypeDesc() : "");
            params = params.entrySet().stream()
                    .filter(item -> !"null".equals(item.getValue().toString()))
                    .collect(Collectors.toMap(item -> item.getKey(), item -> item.getValue()));
            array.add(params);
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(array);
            reportStream = OccurReportService.class.getResourceAsStream("/reports/OccurEserviceReport.jasper");
            return JasperRunManager.runReportToPdf(reportStream, params, ds);
        } catch (Exception e) {

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    private void convertDateToReadableFormat(String paramName, Object date, Map<String, Object> params) {
        if (!date.toString().equals("null")) {
            String Cdate = DateUtils.format(new Date(Long.parseLong(date.toString())), "yyyyMMdd");
            Cdate = Cdate.substring(0, 4) + "/" + Cdate.substring(4, 6) + "/" + Cdate.substring(6, 8);
            params.put(paramName, Cdate);
        }
    }
}
