package ir.tamin.insurance.technical.service.report;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.insurance.technical.function.guardian.guardianInspectorReport.GuardianInspectorReport;
import ir.tamin.insurance.technical.function.guardian.guardianInspectorReport.GuardianInspectorReportInput;
import ir.tamin.insurance.technical.function.guardian.guardianInspectorReport.GuardianInspectorReportValue;
import ir.tamin.insurance.technical.function.guardian.guardianReport.GuardianReport;
import ir.tamin.insurance.technical.function.guardian.guardianReport.GuardianReportInput;
import ir.tamin.insurance.technical.function.guardian.guardianReport.GuardianReportValue;
import ir.tamin.insurance.technical.model.guardian.Guardian;
import ir.tamin.insurance.technical.service.GuardianService;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.web.servlets.ReportServlet;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateless
public class GuardianReportService {


    @Inject
    private GuardianService guardianService ;

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dbFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    protected ProcedureManager procedureManager;

    public byte[] loadGuardianCalcReport(String requestNo) throws IOException, JRException{
        InputStream reportStream = null;
        try {
            Map<String, Object> params = new HashMap<>();
            Guardian guardian = guardianService.getGuardianOverBranch(requestNo);
            if (guardian == null)
                throw new IOException("Error finding data from database");

            String inspRespLetterDate = "";

            if (guardian.getBranchInspRespLetterDate() != null) {
                inspRespLetterDate = DateUtils.format(guardian.getBranchInspRespLetterDate(), "yyyyMMdd");
                inspRespLetterDate = inspRespLetterDate.substring(0, 4) + "/" + inspRespLetterDate.substring(4, 6) + "/" + inspRespLetterDate.substring(6, 8);
            }

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
            params.put("inspectorNote", guardian.getProtestInspNote() != null ? guardian.getProtestInspNote() : guardian.getInspectorNote());
            params.put("cmtConfirm", guardian.getCommitteeConfirm() == null ? "" : guardian.getCommitteeConfirm().toString());
            params.put("brhIntroLetNo", guardian.getBrhIntRoleLetterNo());
            if (guardian.getRequestType().equals('1')) {
                params.put("techConfirm", guardian.getTechConfStatus() == null ? "" : guardian.getTechConfStatus().toString());
                params.put("techIgnConfirm", "0");
            } else {
                params.put("techIgnConfirm", guardian.getTechConfStatus() == null ? "" : guardian.getTechConfStatus().toString());
                params.put("techConfirm", "0");
            }

            String brhIntroLetDate = "";
            if (guardian.getBrhIntRoleDate() != null){
                brhIntroLetDate = DateUtils.format(guardian.getBrhIntRoleDate(), "yyyyMMdd");
                brhIntroLetDate = brhIntroLetDate.substring(0, 4) + "/" + brhIntroLetDate.substring(4, 6) + "/" + brhIntroLetDate.substring(6, 8);
            }

            params.put("brhIntroLetDate", brhIntroLetDate);

            ArrayList<Guardian> guardians = new ArrayList<>();
            guardians.add(guardian);
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(guardians);
            reportStream = GuardianReportService.class.getResourceAsStream("/reports/GuardianCalcReport.jasper");

            return JasperRunManager.runReportToPdf(reportStream, params, ds);

        } catch (IOException e){

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    public byte[] loadGuardianReports(String branchCode, Date startDate, Date endDate) throws IOException, JRException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        InputStream reportStream = null;
        try {

            Map<String, Object> params = new HashMap<>();

            String sDate = DateUtils.format(startDate, "yyyyMMdd");
            String eDate = DateUtils.format(endDate, "yyyyMMdd");

            BigDecimal fatherTotal = BigDecimal.ZERO;
            BigDecimal motherTotal = BigDecimal.ZERO;
            BigDecimal husbandTotal = BigDecimal.ZERO;
            BigDecimal parentsTotal = BigDecimal.ZERO;
            BigDecimal boysTotal = BigDecimal.ZERO;
            BigDecimal girlsTotal = BigDecimal.ZERO;
            BigDecimal totalTotal = BigDecimal.ZERO;

            List<GuardianReportValue> values = (List<GuardianReportValue>) dbFunctionProxy.execute(
                    new GuardianReport(), new GuardianReportInput(branchCode, sDate, eDate));

            params.put("brhIntroLetNo", "");

            sDate = sDate.substring(0, 4) + "/" + sDate.substring(4, 6) + "/" + sDate.substring(6, 8);
            params.put("startDate", sDate);

            eDate = eDate.substring(0, 4) + "/" + eDate.substring(4, 6) + "/" + eDate.substring(6, 8);
            params.put("endDate", eDate);

            if (values.size() == 0)
                values.add(new GuardianReportValue());
            else {
                for (GuardianReportValue value:
                     values) {
                    fatherTotal = fatherTotal.add(value.getFather());
                    motherTotal = motherTotal.add(value.getMother());
                    husbandTotal = husbandTotal.add(value.getHusband());
                    parentsTotal = parentsTotal.add(value.getParents());
                    boysTotal = boysTotal.add(value.getBoys());
                    girlsTotal = girlsTotal.add(value.getGirls());
                    totalTotal = totalTotal.add(value.getTotal());
                }
            }

            params.put("fatherTotal", fatherTotal);
            params.put("motherTotal", motherTotal);
            params.put("husbandTotal", husbandTotal);
            params.put("parentsTotal", parentsTotal);
            params.put("boysTotal", boysTotal);
            params.put("girlsTotal", girlsTotal);
            params.put("totalTotal", totalTotal);

            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(values);
            reportStream = GuardianReportService.class.getResourceAsStream("/reports/GuardianReports.jasper");

            return JasperRunManager.runReportToPdf(reportStream, params, ds);

        } catch (Exception e){

            Logger.getLogger(ReportServlet.class.getName()).log(Level.SEVERE, null, e);
            throw e;
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }
    
    public byte[] loadGuardianInspectorReports(String branchCode, Date startDate, Date endDate) throws IOException, JRException, ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        InputStream reportStream = null;
        try {

            Map<String, Object> params = new HashMap<>();

            String sDate = DateUtils.format(startDate, "yyyyMMdd");
            String eDate = DateUtils.format(endDate, "yyyyMMdd");
            String currentDate = DateUtils.format(new Date(), "yyyyMMdd");

            List<GuardianInspectorReportValue> values = (List<GuardianInspectorReportValue>) dbFunctionProxy.execute(
                    new GuardianInspectorReport(), new GuardianInspectorReportInput(branchCode, sDate, eDate));

            sDate = sDate.substring(0, 4) + "/" + sDate.substring(4, 6) + "/" + sDate.substring(6, 8);
            params.put("startDate", sDate);

            eDate = eDate.substring(0, 4) + "/" + eDate.substring(4, 6) + "/" + eDate.substring(6, 8);
            params.put("endDate", eDate);
            
            currentDate = currentDate.substring(0, 4) + "/" + currentDate.substring(4, 6) + "/" + currentDate.substring(6, 8);
            params.put("currentDate", currentDate);

            if (values.size() == 0) {
                values.add(new GuardianInspectorReportValue());
            }
            
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(values);
            reportStream = GuardianReportService.class.getResourceAsStream("/reports/GuardianInspectorReport.jasper");

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
}
