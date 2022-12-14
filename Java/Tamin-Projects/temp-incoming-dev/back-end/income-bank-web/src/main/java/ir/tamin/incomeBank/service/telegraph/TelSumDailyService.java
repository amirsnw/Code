package ir.tamin.incomeBank.service.telegraph;

import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.dao.telegraph.TelSumDailyDAOService;
import ir.tamin.incomeBank.model.financialDoc.FinancialDocSummery;
import ir.tamin.incomeBank.model.receipt.ReceiptPaper;
import ir.tamin.incomeBank.model.receipt.ReceiptPaperSummery;
import ir.tamin.incomeBank.model.telegraph.TelSumDaily;
import ir.tamin.incomeBank.ws.rest.receipt.ReceiptPaperRestService;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.StreamingOutput;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateless
public class TelSumDailyService {

    @Inject
    EntityManager em;

    @Inject
    TelSumDailyDAOService telSumDailyDAOService;

    public Map<String, Object> getAll (FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        try {
            map.put("list", telSumDailyDAOService.search(filterWrapper, start, limit, sort));
            map.put("total", telSumDailyDAOService.getCount(filterWrapper));
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }

        return map;
    }

    public BigDecimal getSummery (FilterWrapper filterWrapper) {

        try {
            return telSumDailyDAOService.getSummaryPrice(filterWrapper);
        } catch (Exception ex) {
            Logger.getLogger(ReceiptPaperRestService.class.getName()).log(Level.SEVERE, null, ex);
            throw ex;
        }
    }

    public StreamingOutput loadExcel(FilterWrapper filterWrapper) throws Exception {
        List<TelSumDaily> telSumDailyList = null;
        TelSumDaily summery = new TelSumDaily();

        try {
            telSumDailyList = (List<TelSumDaily>) this.getAll(filterWrapper, 0, Integer.MAX_VALUE, null).get("list");
            summery.setSumAmount(telSumDailyDAOService.getSummaryPrice(filterWrapper));
            telSumDailyList.add(summery);
        } catch (Exception ex) {
            throw ex;
        }

        try {
            HSSFWorkbook workbook = new HSSFWorkbook();
            HSSFSheet sheet = workbook.createSheet("sheet 1");
            HSSFCellStyle style = workbook.createCellStyle();
            HSSFCellStyle style2 = workbook.createCellStyle();
            HSSFFont font = workbook.createFont();

            font.setFontName("Arial");
            font.setBoldweight(Font.BOLDWEIGHT_BOLD);
            font.setColor(HSSFColor.BLACK.index);

            style.setFont(font);
            style.setBorderBottom(CellStyle.BORDER_THIN);
            style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            style.setBorderLeft(CellStyle.BORDER_THIN);
            style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            style.setBorderRight(CellStyle.BORDER_THIN);
            style.setRightBorderColor(IndexedColors.BLACK.getIndex());
            style.setBorderTop(CellStyle.BORDER_THIN);
            style.setTopBorderColor(IndexedColors.BLACK.getIndex());

            HSSFColor lightGray = setColor(workbook, (byte) 230, (byte) 230, (byte) 230);

            style.setFillForegroundColor(lightGray.getIndex());
            style.setFillPattern(CellStyle.SOLID_FOREGROUND);
            style.setAlignment(CellStyle.ALIGN_CENTER);
            HSSFFont font2 = workbook.createFont();
            font2.setFontName("Arial");
            font2.setColor(HSSFColor.BLACK.index);
            style2.setFont(font2);
            style2.setBorderBottom(CellStyle.BORDER_THIN);
            style2.setBottomBorderColor(IndexedColors.BLACK.getIndex());
            style2.setBorderLeft(CellStyle.BORDER_THIN);
            style2.setLeftBorderColor(IndexedColors.BLACK.getIndex());
            style2.setBorderRight(CellStyle.BORDER_THIN);
            style2.setRightBorderColor(IndexedColors.BLACK.getIndex());
            style2.setBorderTop(CellStyle.BORDER_THIN);
            style2.setTopBorderColor(IndexedColors.BLACK.getIndex());
            style2.setFillPattern(CellStyle.SOLID_FOREGROUND);
            style2.setAlignment(CellStyle.ALIGN_CENTER);
            HSSFColor white = setColor(workbook, (byte) 255, (byte) 255, (byte) 255);
            style2.setFillForegroundColor(white.getIndex());
            sheet.setRightToLeft(true);
            Row firstRow = sheet.createRow(0);
            Cell cell0 = firstRow.createCell(0);
            cell0.setCellStyle(style);
            cell0.setCellValue("کد شعبه");

            Cell cell1 = firstRow.createCell(1);
            cell1.setCellStyle(style);
            cell1.setCellValue("نام شعبه");

            Cell cell2 = firstRow.createCell(2);
            cell2.setCellStyle(style);
            cell2.setCellValue("کد اداره کل");

            Cell cell3 = firstRow.createCell(3);
            cell3.setCellStyle(style);
            cell3.setCellValue("نام اداره کل");

            Cell cell4 = firstRow.createCell(4);
            cell4.setCellStyle(style);
            cell4.setCellValue("تاریخ وصول");

            Cell cell5 = firstRow.createCell(5);
            cell5.setCellStyle(style);
            cell5.setCellValue("مبلغ وصول");

            for (int i = 0; i <= telSumDailyList.size() - 1; i++) {
                Row row = sheet.createRow(i + 1);
                for (int c = 0; c < firstRow.getPhysicalNumberOfCells(); c++) {
                    Cell cell = row.createCell(c);
                    cell.setCellStyle(style2);
                    if (c == 0) {
                        cell.setCellValue(telSumDailyList.get(i).getBrhCode());
                    } else if (c == 1) {
                        cell.setCellValue(telSumDailyList.get(i).getBrhName());
                    } else if (c == 2) {
                        cell.setCellValue(telSumDailyList.get(i).getEdareCode());
                    } else if (c == 3) {
                        cell.setCellValue(telSumDailyList.get(i).getEdareName());
                    } else if (c == 4) {
                        cell.setCellValue(telSumDailyList.get(i).getOrderDate());
                    } else if (c == 5) {
                        cell.setCellValue(telSumDailyList.get(i).getSumAmount().toString());
                    }
                }

            }

            return output -> workbook.write(output);
        } catch (Exception ex) {
            Logger.getLogger(TelSumDailyService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            return null;
        }
    }

    public HSSFColor setColor(HSSFWorkbook workbook, byte r, byte g, byte b) {
        HSSFPalette palette = workbook.getCustomPalette();
        HSSFColor hssfColor = null;
        try {
            hssfColor = palette.findColor(r, g, b);
            if (hssfColor == null) {
                palette.setColorAtIndex(HSSFColor.LAVENDER.index, r, g, b);
                hssfColor = palette.getColor(HSSFColor.LAVENDER.index);
            }
        } catch (Exception e) {
            //logger.error(e);
        }

        return hssfColor;
    }
}
