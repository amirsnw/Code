/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import java.io.InputStream;
import java.util.ArrayList;
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
import ir.tamin.incomeBank.model.daramadBank.ReturnChequesView;
import ir.tamin.incomeBank.util.DateUtils;
import java.util.Date;

/**
 *
 * @author e_shoghi
 */
@Stateless
public class ReturnChequesReportService {

    @Inject
    private EntityManager em;

    @Inject
    private org.slf4j.Logger logger;

    public byte[] loadReport(String branchCode, String dateFrom, String dateTo, SecurityContext security) throws Exception {//is BETWEEN :from AND :to
        InputStream reportStream = null;
        List<ReturnChequesView> records = new ArrayList<>();
        records = (List<ReturnChequesView>) em.createQuery("select t from ReturnChequesView t where t.branchCode = :branchCode and t.chequeDate >= :from and t.chequeDate <= :to")
                .setParameter("branchCode", branchCode)
                .setParameter("from", DateUtils.format(new Date(Long.parseLong(dateFrom)), "yyyyMMdd"))
                .setParameter("to", DateUtils.format(new Date(Long.parseLong(dateTo)), "yyyyMMdd"))
                .getResultList();
        try {
            Map<String, Object> params = new HashMap<>();
            try {
                params.put("dateFrom", DateUtils.format(new Date(Long.parseLong(dateFrom)), "yyyy/MM/dd"));
                params.put("dateTo", DateUtils.format(new Date(Long.parseLong(dateTo)), "yyyy/MM/dd"));
                params.put("recordDate", DateUtils.format(new Date(),"yyyy/MM/dd"));
            } catch (NoResultException e) {
                params = null;
            }
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(records);
            reportStream = ReturnChequesReportService.class.getResourceAsStream("/reports/daramadBank/ReturnChequesReport.jasper");
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
