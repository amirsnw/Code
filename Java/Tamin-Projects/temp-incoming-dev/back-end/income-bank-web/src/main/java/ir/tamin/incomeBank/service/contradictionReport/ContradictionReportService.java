package ir.tamin.incomeBank.service.contradictionReport;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.dao.contradictionReport.ContradictionReportDAOService;
import ir.tamin.incomeBank.model.financialDoc.FinancialDocSummery;
import ir.tamin.incomeBank.ws.rest.receipt.ReceiptPaperRestService;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ContradictionReportService {

    @Inject
    private EntityManager em;

    @Inject
    private ContradictionReportDAOService contradictionReportDAOService;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    @WebProperties
    Bundle webBundle;

    public Map<String, Object> getAll (FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        try {
            map.put("list", contradictionReportDAOService.search(filterWrapper, start, limit, sort));
            map.put("total", contradictionReportDAOService.getCount(filterWrapper));
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }

        return map;
    }

    public BigDecimal getSummery (FilterWrapper filterWrapper) {

        try {
            return contradictionReportDAOService.getSummaryPrice(filterWrapper);
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }
    }
}
