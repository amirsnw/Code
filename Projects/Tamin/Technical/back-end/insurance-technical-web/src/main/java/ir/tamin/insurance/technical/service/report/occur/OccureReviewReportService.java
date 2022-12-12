package ir.tamin.insurance.technical.service.report.occur;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.insurance.technical.function.occur.occurReport.OccurReviewReport;
import ir.tamin.insurance.technical.function.occur.occurReport.OccurReviewReportInput;
import ir.tamin.insurance.technical.function.occur.occurReport.OccurReviewReportValue;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.web.servlets.ReportServlet;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccureReviewReportService {
    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dbFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    protected ProcedureManager procedureManager;
    @Inject
    private EntityManager entityManager;

    public byte[] loadOccurReviewReports(String regId) throws IOException, JRException, ProxyProcessingException {

        dbFunctionProxy.setProcedureManager(procedureManager);
        InputStream reportStream = null;
        try {
            Map<String, Object> params = new HashMap<>();

            List<OccurReviewReportValue> values = (List<OccurReviewReportValue>) dbFunctionProxy.execute(
                    new OccurReviewReport(), new OccurReviewReportInput(regId));

            params.put("repno", values.get(0).getRepno() != null ? values.get(0).getRepno() : "");
            params.put("repdate", values.get(0).getRepdate() != null ? values.get(0).getRepdate().substring(0, 4) + "/" + values.get(0).getRepdate().substring(4, 6) + "/" + values.get(0).getRepdate().substring(6, 8) : "");
            params.put("brhname", values.get(0).getBrhname() != null ? values.get(0).getBrhname() : "");
            params.put("brhcode", values.get(0).getBrhcode() != null ? values.get(0).getBrhcode() : "");
            params.put("risuid", values.get(0).getRisuid() != null ? values.get(0).getRisuid() : "");
            params.put("risufname", values.get(0).getRisufname() != null ? values.get(0).getRisufname() : "");
            params.put("risulname", values.get(0).getRisulname() != null ? values.get(0).getRisulname() : values.get(0).getRisulname());
            params.put("risudname", values.get(0).getRisudname() != null ? values.get(0).getRisudname() : "");
            params.put("risubirthdate", values.get(0).getRisubirthdate() != null ? values.get(0).getRisubirthdate().substring(0, 4) + "/" + values.get(0).getRisubirthdate().substring(4, 6) + "/" + values.get(0).getRisubirthdate().substring(6, 8) : "");
            params.put("risuidno", values.get(0).getRisuidno() != null ? values.get(0).getRisuidno() : "");
            params.put("risunatcode", values.get(0).getRisunatcode() != null ? values.get(0).getRisunatcode() : "");
            params.put("expcitydesc", values.get(0).getExpcitydesc() != null ? values.get(0).getExpcitydesc() : "");
            params.put("pnationtype", values.get(0).getPnationtype());
            params.put("diplomadesc", values.get(0).getDiplomadesc() != null ? values.get(0).getDiplomadesc() : "");
            params.put("employeedate", values.get(0).getEmployeedate() != null
                    ? values.get(0).getEmployeedate().substring(0, 4) + "/"
                    + values.get(0).getEmployeedate().substring(4, 6) + "/"
                    + values.get(0).getEmployeedate().substring(6, 8) : "");
            params.put("employeestatdesc", values.get(0).getEmployeestatdesc() != null ? values.get(0).getEmployeestatdesc() : "");

            params.put("vehicledesc", values.get(0).getVehicledesc() != null ? values.get(0).getVehicledesc() : " ");
            params.put("sexdec", values.get(0).getSexdesc() + "(" + values.get(0).getMarrieddesc() + ")");
            params.put("isujoblocation", values.get(0).getIsujoblocation() != null ? values.get(0).getIsujoblocation() : "");
            params.put("daily_wage", values.get(0).getDaily_wage());
            params.put("job_from_date", values.get(0).getJob_from_date() != null ?   values.get(0).getJob_from_date().substring(0, 4) + "/" + values.get(0).getJob_from_date().substring(4, 6) + "/" + values.get(0).getJob_from_date().substring(6, 8) : "");
            params.put("job_until_date", values.get(0).getJob_until_date() != null ?   values.get(0).getJob_until_date().substring(0, 4) + "/" + values.get(0).getJob_until_date().substring(4, 6) + "/" + values.get(0).getJob_until_date().substring(6, 8) : "");
            params.put("morn_starttime", values.get(0).getMorn_starttime() != null ? values.get(0).getMorn_starttime() : "");
            params.put("morn_finishtime", values.get(0).getMorn_finishtime() != null ? values.get(0).getMorn_finishtime() : "");
            params.put("even_starttime", values.get(0).getEven_starttime() != null ? values.get(0).getEven_starttime() : "");
            params.put("even_finishtime", values.get(0).getEven_finishtime() != null ? values.get(0).getEven_finishtime() : "");
            params.put("nigh_starttime", values.get(0).getNigh_starttime() != null ? values.get(0).getNigh_starttime() : "");
            params.put("nigh_finishtime", values.get(0).getNigh_finishtime() != null ? values.get(0).getNigh_finishtime() : "");

            params.put("isuaddr", values.get(0).getIsuaddr() != null ? values.get(0).getIsuaddr() : "");
            params.put("isutel", values.get(0).getIsutel() != null ? values.get(0).getIsutel() : "");
            params.put("rwshname", values.get(0).getRwshname() != null ? values.get(0).getRwshname() : "");
            params.put("activitydesc", values.get(0).getActivitydesc() != null ? values.get(0).getActivitydesc() : "");
            params.put("rwshid", values.get(0).getRwshid() != null ? values.get(0).getRwshid() : "");

            params.put("occur_date", values.get(0).getOccur_date() != null ? values.get(0).getOccur_date().substring(0, 4) + "/" + values.get(0).getOccur_date().substring(4, 6) + "/" + values.get(0).getOccur_date().substring(6, 8) : "");
            params.put("occur_time", values.get(0).getOccur_time() != null ? values.get(0).getOccur_time() : "");
            params.put("occur_addr", values.get(0).getOccur_addr() != null ? values.get(0).getOccur_addr() : "");
            params.put("occur_jobdesc", values.get(0).getOccur_jobdesc() != null ? values.get(0).getOccur_jobdesc() : "");
            params.put("occur_tools", values.get(0).getOccur_tools() != null ? values.get(0).getOccur_tools() : "");
            params.put("occur_equip", values.get(0).getOccur_equip() != null ? values.get(0).getOccur_equip() : "");

            params.put("occur_reasondesc", values.get(0).getOccur_reasondesc() != null ? values.get(0).getOccur_reasondesc() : "");
            params.put("occur_reldesc", values.get(0).getOccur_reldesc() != null ? values.get(0).getOccur_reldesc() : "");
            params.put("occur_resultdesc", values.get(0).getOccur_resultdesc() != null ? values.get(0).getOccur_resultdesc() : "");
            params.put("type_desc", values.get(0).getType_desc() != null ? values.get(0).getType_desc() : "");
            params.put("occur_causedesc", values.get(0).getOccur_causedesc() != null ? values.get(0).getOccur_causedesc() : "");

            params.put("isrw_do90", values.get(0).getIsrw_do90() != null ? values.get(0).getIsrw_do90() : "");
            params.put("istrain", values.get(0).getIstrain() != null ? values.get(0).getIstrain() : "");
            params.put("isrw_do95", values.get(0).getIsrw_do95() != null ? values.get(0).getIsrw_do95() : "");

            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(values);
            reportStream = OccurReportService.class.getResourceAsStream("/reports/Occur_Review.jasper");

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
