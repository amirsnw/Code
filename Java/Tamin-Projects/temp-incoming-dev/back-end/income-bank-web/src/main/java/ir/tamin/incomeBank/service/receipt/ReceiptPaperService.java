/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.receipt;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.dao.receipt.ReceiptPaperDAOService;
import ir.tamin.incomeBank.model.receipt.ReceiptPaper;
import ir.tamin.incomeBank.model.receipt.ReceiptPaperSummery;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.incomeBank.util.ExcelDataProvider;
import ir.tamin.incomeBank.util.ExcelReportHeader;
import ir.tamin.incomeBank.ws.rest.receipt.ReceiptPaperRestService;
import org.apache.poi.ss.usermodel.Workbook;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.StreamingOutput;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author a_khalighi
 */
@Stateless
public class ReceiptPaperService {

    @Inject
    ReceiptPaperDAOService receiptDAOService;

    @Inject
    private ExcelDataProvider excelDataConverter;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    @WebProperties
    Bundle webBundle;

    public Map<String, Object> getAll (FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        try {
            map.put("list", receiptDAOService.search(filterWrapper, start, limit, sort));
            map.put("total", receiptDAOService.getCount(filterWrapper));
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }

        return map;
    }

    public ReceiptPaperSummery getSummery (FilterWrapper filterWrapper) {

        try {
            return receiptDAOService.getSummaryPrice(filterWrapper);
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }
    }

    public StreamingOutput loadExcel(FilterWrapper filterWrapper) throws Exception {

        List<ReceiptPaper> receiptList = null;
        ReceiptPaperSummery receiptSummery = null;

        try {
            receiptList = (List<ReceiptPaper>) this.getAll(filterWrapper, 0, Integer.MAX_VALUE, null).get("list");
        } catch (Exception ex) {
            throw ex;
        }

        receiptSummery = receiptDAOService.getSummaryPrice(filterWrapper);
        ReceiptPaper summery = new ReceiptPaper();
        summery.setOrderAmount(receiptSummery.getOrderAmount());
        summery.setGovernmentAmount(receiptSummery.getGovernmentAmount());
        summery.setCountIsu(receiptSummery.getCountIsu());

        receiptList.add(summery);

        List<List<String>> rowsForExcel = prepareDataForExcel(receiptList);
        ExcelReportHeader reportHeader = createReportHeaderDetails();

        StreamingOutput streamingOutPut = new StreamingOutput() {
            final Workbook workbook = excelDataConverter.provideExcelFrom(reportHeader, rowsForExcel);
            @Override
            public void write(OutputStream output) throws IOException, WebApplicationException {
                workbook.write(output);
            }
        };

        return streamingOutPut;
    }

    private List<List<String>> prepareDataForExcel(List<ReceiptPaper> receiptList) {
        List<List<String>> rows = new ArrayList<>();
        rows.add(Arrays.asList(
                "ردیف",
                "شماره برگه",
                "تاریخ وصول",
                "شماره شعبه",
                "نام شعبه",
                "شماره کارگاه",
                "نام کارگاه",
                "مبلغ وصول",
                "کد بانک",
                "نام بانک",
                "مبلغ کمک دولت",
                "تعداد بیمه پرداز",
                "تاریخ ایجاد رکورد"
        ));
        int rowCounter = 1;
        for (ReceiptPaper receipt : receiptList) {
            List<String> row = new ArrayList<>();
            row.add(rowCounter == receiptList.size() ? "مجموع" : String.valueOf(rowCounter));
            row.add(receipt.getOrderNo() != null ? receipt.getOrderNo() : "-");
            row.add(receipt.getOrderDate() != null ? DateUtils.stringDateToStringSlashedDate(receipt.getOrderDate()) : "-");
            row.add(receipt.getBranchCode() != null ? receipt.getBranchCode() : "-");
            row.add(receipt.getBranchName() != null ? receipt.getBranchName() : "-");
            row.add(receipt.getCustomerId() != null ? receipt.getCustomerId() : "-");
            row.add(receipt.getCustomerName() != null ? receipt.getCustomerName() : "-");
            row.add(receipt.getOrderAmount() != null ? String.valueOf(receipt.getOrderAmount()) : "-");
            row.add(receipt.getBankCode() != null ? receipt.getBankCode() : "-");
            row.add(receipt.getBankName() != null ? receipt.getBankName() : "-");
            row.add(receipt.getGovernmentAmount() != null ? String.valueOf(receipt.getGovernmentAmount()) : "-");
            row.add(receipt.getCountIsu() != null ? String.valueOf(receipt.getCountIsu()) : "-");
            row.add(receipt.getAddDate() != null ? DateUtils.stringDateToStringSlashedDate(receipt.getAddDate().substring(0, 8)) : "-");
            rows.add(row);
            rowCounter++;
        }
        return rows;
    }

    private ExcelReportHeader createReportHeaderDetails() {
        ExcelReportHeader reportHeader = new ExcelReportHeader();
        reportHeader.setTitle("گزارش برگه های وصولی");
        reportHeader.setReportDate(DateUtils.format(new Date(), "yyyy/MM/dd - hh:mm"));
        return reportHeader;
    }
}
