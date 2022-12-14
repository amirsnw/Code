package ir.tamin.incomeBank.service.financialDoc;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.dao.financialDoc.FinancialDocDAOService;
import ir.tamin.incomeBank.model.financialDoc.ElmDetail;
import ir.tamin.incomeBank.model.financialDoc.ElmHeader;
import ir.tamin.incomeBank.model.financialDoc.FinancialDoc;
import ir.tamin.incomeBank.model.financialDoc.FinancialDocSummery;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.incomeBank.ws.rest.receipt.ReceiptPaperRestService;
import ir.tamin.incomeBank.ws.soap.*;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class FinancialDocService {

    @Inject
    private EntityManager em;

    @Inject
    private FinancialDocDAOService financialDAOService;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    @WebProperties
    Bundle webBundle;

    public Map<String, Object> getAll (FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        try {
            map.put("list", financialDAOService.search(filterWrapper, start, limit, sort));
            map.put("total", financialDAOService.getCount(filterWrapper));
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }

        return map;
    }

    public FinancialDocSummery getSummery (FilterWrapper filterWrapper) {

        try {
            return financialDAOService.getSummaryPrice(filterWrapper);
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }
    }

    public String sendDataToTemp(FilterWrapper filterWrapper) {

        ServiceResult serviceResult;
        Response response;
        String result = null;
        ElmService elmService = new ElmService();
        ElmHeader elmHeader = new ElmHeader();
        List<ElmDetail> elmDetailList = new ArrayList<>();
        List<String> messageList = new ArrayList<>();
        Optional<Filter> yearFilter = null;
        Optional<Filter> monthFilter = null;

        if (filterWrapper == null) {
            response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("financialDoc.filterIsEmpty")).build();
            throw new WebApplicationException(response);
        }
        yearFilter = filterWrapper.getFilters().stream()
                .filter(item -> item.getProperty().equals("daramadYear"))
                .findFirst();
        monthFilter = filterWrapper.getFilters().stream()
                .filter(item -> item.getProperty().equals("daramadMonth"))
                .findFirst();
        if (!(yearFilter.isPresent() && monthFilter.isPresent())) {
            response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("financialDoc.filterIsEmpty")).build();
            throw new WebApplicationException(response);
        }
        List<FinancialDoc> financialDocList = financialDAOService.search(filterWrapper, null, null, null);

        if (financialDocList.size() == 0) {
            response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("financialDoc.docNotSent")).build();
            throw new WebApplicationException(response);
        }
        elmHeader.setVahedCode(webBundle.getProperty("financialDoc.sendDataToTemp.vahedCode"));
        elmHeader.setFaDate(DateUtils.format(new Date(), "yyyyMMdd"));
        elmHeader.setDetailDesc(messageBundle.getProperty("financialDoc.headerDetailDesc")
                .replace("{month}", monthFilter.get().getValue())
                .replace("{year}", yearFilter.get().getValue()));
        elmHeader.setSysType("2");
        elmHeader.setYear(yearFilter.get().getValue());

        financialDocList.forEach(item -> {
            elmDetailList.add(new ElmDetail(webBundle.getProperty("financialDoc.sendDataToTemp.vahedCode"),
                    item.getAccountCode().substring(0, 2),
                    item.getAccountCode().substring(2, 4),
                    item.getAccountCode().substring(4, 10),
                    "", "",
                    item.getAccountDesc(),
                    item.getDebtAmount(),
                    item.getCreditAmount(),
                    "2", "", "",
                    item.getDaramadYear()));

        });

        AccVoucherEntity accVoucherEntity = new AccVoucherEntity();
        accVoucherEntity.setHeader(new HeadEntity(elmHeader));
        accVoucherEntity.setDetails(new ArrayOfDetailEntity(elmDetailList));

        serviceResult = elmService.getServiceSoap().sendDataToTemp(accVoucherEntity, false);
        if (serviceResult.getGetServiceErrorList().getString().size() != 0) {
            throw new WebApplicationException();
        }
        messageList = serviceResult.getGetServiceMessageList().getString();
        result = messageList.get(messageList.size() - 1).replaceAll("[^0-9]", "");

        return result;
    }

    public Object exportFinancialDocs(String year, String month) throws SQLException {

        String result = null;
        try {
            result = financialDAOService.financialIssuance(year, month);
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }
        return result;
    }
}
