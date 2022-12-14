/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import com.healthmarketscience.jackcess.ColumnBuilder;
import com.healthmarketscience.jackcess.Database;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.Table;
import com.healthmarketscience.jackcess.TableBuilder;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import ir.tamin.incomeBank.model.daramadBank.ComperrVw4;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.File;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import oracle.jdbc.OracleTypes;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author f_fotuhi
 */
public class ComperrVw4Service {

    @Inject
    private StoredProcedure procedure;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws IOException, SQLException {

        String brchCode = null;
        String yearMonth = null;
        Map<String, Object> map = new HashMap<>();

        Object[] filterArray = filterWrapper.getFilters().toArray();
        for (int i = 0; i < filterArray.length; i++) {
            Filter filter = (Filter) filterArray[i];
            String field = filter.getProperty();
            Object value = filter.getValue();

            if (field.equals("compMdate")) {
                yearMonth = value.toString();
            }
            if (field.equals("brhCode")) {
                brchCode = value.toString();
            }
        }

        procedure.query("{?=call pckdrmdview.getVWDRMDPAYERR4(?,?,?,?)}");
        procedure.setOutParameter(1, OracleTypes.CURSOR);
        procedure.setInParameter(2, brchCode);
        procedure.setInParameter(3, yearMonth);
        procedure.setInParameter(4, null);
        procedure.setInParameter(5, null);
        procedure.execute();
        ResultSet rs = (ResultSet) procedure.getOutParameter(1);

        int totalSize = 0;
        while (rs.next()) {
            totalSize++;
        }

        procedure.query("{?=call pckdrmdview.getVWDRMDPAYERR4(?,?,?,?)}");
        procedure.setOutParameter(1, OracleTypes.CURSOR);
        procedure.setInParameter(2, brchCode);
        procedure.setInParameter(3, yearMonth);
        procedure.setInParameter(4, start != null && limit != null ? start / limit : null);
        procedure.setInParameter(5, limit);
        procedure.execute();
        rs = (ResultSet) procedure.getOutParameter(1);
        List<ComperrVw4> comperrList = new ArrayList<>();
        while (rs.next()) {
            ComperrVw4 comperrModel = new ComperrVw4();

            comperrModel.setId(rs.getString("row_id"));
            comperrModel.setCardRadif(rs.getString("card_radif"));
            comperrModel.setOrdDocDat(rs.getString("ord_docdat"));
            comperrModel.setRcvDate(rs.getString("rcv_date"));
            comperrModel.setRcvDesc(rs.getString("rcv_desc"));
            comperrModel.setRcvNo(rs.getString("rcv_no"));
            comperrModel.setCardOrdPay(rs.getString("card_ordpay"));
            comperrModel.setCardDate(rs.getString("card_date"));
            comperrModel.setCardPrice(rs.getString("card_price"));

            comperrList.add(comperrModel);
        }

        rs.close();
        map.put("list", comperrList);
        map.put("total", totalSize);

        return map;

    }

    public Workbook writeToExcel(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws IOException {

        XSSFWorkbook wb = new XSSFWorkbook();

        Sheet sheet = wb.createSheet();
        sheet.setRightToLeft(true);

        Font font = wb.createFont();

        CellStyle headerStyle = wb.createCellStyle();

        font.setFontName("Arial");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        font.setColor(HSSFColor.BLACK.index);

        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
        headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
        headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderRight(CellStyle.BORDER_THIN);
        headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderTop(CellStyle.BORDER_THIN);
        headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setFont(font);

        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        CellStyle detailStyle = wb.createCellStyle();
        detailStyle.setBorderBottom(CellStyle.BORDER_THIN);
        detailStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderLeft(CellStyle.BORDER_THIN);
        detailStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderRight(CellStyle.BORDER_THIN);
        detailStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderTop(CellStyle.BORDER_THIN);
        detailStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

        Row row = sheet.createRow(0);

        Cell cell0 = row.createCell(0);
        cell0.setCellValue("ردیف");
        cell0.setCellStyle(headerStyle);

        Cell cell1 = row.createCell(1);
        cell1.setCellValue("ردیف بانک در کارت بانک");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("شماره برگ پرداخت");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("تاریخ صدور");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("تاریخ وصولی");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("نوع واریزی");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("شماره واریزی");
        cell6.setCellStyle(headerStyle);

        Cell cell7 = row.createCell(7);
        cell7.setCellValue("مبلغ");
        cell7.setCellStyle(headerStyle);

        try {
            Map<String, Object> map = getAll(filterWrapper, null, null, null);
            List<ComperrVw4> comperrList = (List<ComperrVw4>) map.get("list");
            int rownum = 1;
            for (ComperrVw4 item : comperrList) {
                String cardRadif = item.getCardRadif();
                String cardOrdPay = item.getCardOrdPay();
                String ordDocDat = (item.getOrdDocDat() != null ? item.getOrdDocDat().substring(0, 4) + "/" + item.getOrdDocDat().substring(4, 6) + "/" + item.getOrdDocDat().substring(6, 8) : " ");
                String cardDate = (item.getCardDate() != null ? item.getCardDate().substring(0, 4) + "/" + item.getCardDate().substring(4, 6) + "/" + item.getCardDate().substring(6, 8) : " ");
                String rcvDesc = item.getRcvDesc();
                String rcvNo = item.getRcvNo();
                Long cardPrice = (item.getCardPrice() != null ? Long.valueOf(item.getCardPrice()) : null);

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardRadif);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardOrdPay);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(ordDocDat);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rcvDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rcvNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardPrice);

            }

        } catch (SQLException ex) {
            Logger.getLogger(ComperrVw4Service.class.getName()).log(Level.SEVERE, null, ex);
        }
        return wb;
    }

    public String writeToXml(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws IOException {
        try {

            Map<String, Object> map = getAll(filter, null, null, null);
            List<ComperrVw4> comperrList = (List<ComperrVw4>) map.get("list");
            XStream xStream = new XStream(new DomDriver());
            String xml = xStream.toXML(comperrList);
            return xml;
        } catch (Exception ex) {
            Logger.getLogger(ComperrVw4Service.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database writeToAccess(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws ClassNotFoundException, SQLException, IOException, NumberFormatException {

        String file = "comperrReport4.accdb";
        Map<String, Object> map = getAll(filter, null, null, null);
        List<ComperrVw4> comperrList = (List<ComperrVw4>) map.get("list");

        try {
            Database db = (DatabaseBuilder.create(Database.FileFormat.V2010, new File(file)));
            String comperrReport4 = "comperrReport4";
            Table table = new TableBuilder(comperrReport4) // Creating table
                    .addColumn(new ColumnBuilder("CARD_RADIF").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARD_ORDPAY").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ORD_DOCDAT").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARD_DATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RCV_DESC").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RCV_NO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARD_PRICE").setSQLType(Types.NUMERIC).toColumn())
                    .toTable(db);
            for (ComperrVw4 item : comperrList) {

                String cardRadif = item.getCardRadif();
                String cardOrdPay = item.getCardOrdPay();
                String ordDocDat = (item.getOrdDocDat() != null ? item.getOrdDocDat().substring(0, 4) + "/" + item.getOrdDocDat().substring(4, 6) + "/" + item.getOrdDocDat().substring(6, 8) : " ");
                String cardDate = (item.getCardDate() != null ? item.getCardDate().substring(0, 4) + "/" + item.getCardDate().substring(4, 6) + "/" + item.getCardDate().substring(6, 8) : " ");
                String rcvDesc = item.getRcvDesc();
                String rcvNo = item.getRcvNo();
                Long cardPrice = (item.getCardPrice() != null ? Long.valueOf(item.getCardPrice()) : null);
                table.addRow(cardRadif, cardOrdPay, ordDocDat, cardDate, rcvDesc, rcvNo, cardPrice);//Inserting values into the table
            }
            db.close();
            return db;
        } catch (Exception ex) {
            Logger.getLogger(ComperrVw4Service.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
}
