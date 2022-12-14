/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.YearDocsStatusView;
import ir.tamin.incomeBank.util.DateUtils;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.ws.rs.core.SecurityContext;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

/**
 *
 * @author e_shoghi
 */
@Stateless
public class YearDocsStatusService {

    @Inject
    private EntityManager em;

    @Inject
    private org.slf4j.Logger logger;

    public byte[] loadReport(String branchCode, String year, SecurityContext security) throws Exception {       
        InputStream reportStream = null;
        List<YearDocsStatusView> records = new ArrayList<>();
        records = (List<YearDocsStatusView>) em.createQuery("select t from YearDocsStatusView t where t.year = :year and t.branchCode = :branchCode")
                .setParameter("year", year)
                .setParameter("branchCode", branchCode)
                .getResultList();
        try {
            Map<String, Object> params = new HashMap<>();
            try {
                params.put("recordDate", DateUtils.format(new Date(), "yyyy/MM/dd"));
            } catch (NoResultException e) {
                params = null;
            }
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(records);
            reportStream = YearDocsStatusService.class.getResourceAsStream("/reports/daramadBank/YearDocsStatusReport.jasper");
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
