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
import ir.tamin.incomeBank.model.daramadBank.ComperrVw11;
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
 * @author m_salami
 */
public class ComperrVw11Service {

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
        procedure.query("{?=call pckdrmdview.getVWDRMDPAYERR11(?,?,?,?)}");
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

        procedure.query("{?=call pckdrmdview.getVWDRMDPAYERR11(?,?,?,?)}");
        procedure.setOutParameter(1, OracleTypes.CURSOR);
        procedure.setInParameter(2, brchCode);
        procedure.setInParameter(3, yearMonth);
        procedure.setInParameter(4, start != null && limit != null ? start / limit : null);
        procedure.setInParameter(5, limit);
        procedure.execute();
        rs = (ResultSet) procedure.getOutParameter(1);
        List<ComperrVw11> vw11List = new ArrayList<>();
        while (rs.next()) {
            ComperrVw11 ComperrVw11Model = new ComperrVw11();

            ComperrVw11Model.setPayId(rs.getString("pay_id"));
            ComperrVw11Model.setOrdDocdat(rs.getString("ord_docdat"));
            ComperrVw11Model.setRcsChqno(rs.getString("rcs_cgqno"));
            ComperrVw11Model.setRcsRcvchqdat(rs.getString("rcs_rcvchqdat"));
            ComperrVw11Model.setRcsChqamt(rs.getLong("rcs_chqamt"));
            ComperrVw11Model.setRcsRcvsubamt(rs.getLong("rcs_rcvsubamt"));
            ComperrVw11Model.setOrpStatdesc(rs.getString("orp_statdesc"));
            ComperrVw11Model.setCardDate(rs.getString("card_date"));

            vw11List.add(ComperrVw11Model);
        }

        rs.close();
        map.put("list", vw11List);
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
        cell1.setCellValue("شماره برگ پرداخت");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("تاریخ صدور");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نوع واریزی");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("شماره واریزی");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("تاریخ واریزی");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("مبلغ");
        cell6.setCellStyle(headerStyle);
        try {
            Map<String, Object> map = getAll(filterWrapper, null, null, null);
            List<ComperrVw11> comperrList = (List<ComperrVw11>) map.get("list");
            int rownum = 1;
            for (ComperrVw11 item : comperrList) {
                String payId = item.getPayId();
                String ordDocdat = (item.getOrdDocdat() != null ? item.getOrdDocdat().substring(0, 4) + "/" + item.getOrdDocdat().substring(4, 6) + "/" + item.getOrdDocdat().substring(6, 8) : " ");
                String rcsChqno = item.getRcsChqno();
                String rcsRcvchqdat = (item.getRcsRcvchqdat() != null ? item.getRcsRcvchqdat().substring(0, 4) + "/" + item.getRcsRcvchqdat().substring(4, 6) + "/" + item.getRcsRcvchqdat().substring(6, 8) : " ");
                String cardDate = (item.getCardDate() != null ? item.getCardDate().substring(0, 4) + "/" + item.getCardDate().substring(4, 6) + "/" + item.getCardDate().substring(6, 8) : " ");
                Long rcsChqamt = item.getRcsChqamt();
                Long rcsRcvsubamt = item.getRcsRcvsubamt();
                String orpStatDesc = item.getOrpStatdesc();

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payId);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(ordDocdat);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rcsChqno);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rcsRcvchqdat);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rcsChqamt);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rcsRcvsubamt);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(orpStatDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardDate);
            }

        } catch (SQLException ex) {
            Logger.getLogger(ComperrVw11Service.class.getName()).log(Level.SEVERE, null, ex);
        }
        return wb;
    }

    public String writeToXml(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws IOException {
        try {

            Map<String, Object> map = getAll(filter, null, null, null);
            List<ComperrVw11> comperrList = (List<ComperrVw11>) map.get("list");
            XStream xStream = new XStream(new DomDriver());
            String xml = xStream.toXML(comperrList);
            return xml;
        } catch (Exception ex) {
            Logger.getLogger(ComperrVw11Service.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database writeToAccess(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws ClassNotFoundException, SQLException, IOException, NumberFormatException {

        String file = "comperrReport11.accdb";
        Map<String, Object> map = getAll(filter, null, null, null);
        List<ComperrVw11> comperrList = (List<ComperrVw11>) map.get("list");

        try {
            Database db = (DatabaseBuilder.create(Database.FileFormat.V2010, new File(file)));
            String comperrReport11 = "comperrReport11";
            Table table = new TableBuilder(comperrReport11) // Creating table
                    .addColumn(new ColumnBuilder("PAYID").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ORDDOCDAT").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RCSCHQNO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RCSRCVCHQDAT").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RCSCHQAMT").setSQLType(Types.NUMERIC).toColumn())
                    .addColumn(new ColumnBuilder("RCSRCVSUBAMT").setSQLType(Types.NUMERIC).toColumn())
                    .addColumn(new ColumnBuilder("ORPSTATDESC").setSQLType(Types.NUMERIC).toColumn())//
                    .addColumn(new ColumnBuilder("CARDDATE").setSQLType(Types.NUMERIC).toColumn())
                    .toTable(db);
            for (ComperrVw11 item : comperrList) {

                String payId = item.getPayId();
                String ordDocdat = (item.getOrdDocdat() != null ? item.getOrdDocdat().substring(0, 4) + "/" + item.getOrdDocdat().substring(4, 6) + "/" + item.getOrdDocdat().substring(6, 8) : " ");
                String rcsChqno = item.getRcsChqno();
                String rcsRcvchqdat = (item.getRcsRcvchqdat() != null ? item.getRcsRcvchqdat().substring(0, 4) + "/" + item.getRcsRcvchqdat().substring(4, 6) + "/" + item.getRcsRcvchqdat().substring(6, 8) : " ");
                Long rcsChqamt = item.getRcsChqamt();
                Long rcsRcvsubamt = item.getRcsRcvsubamt();
                String cardDate = (item.getCardDate() != null ? item.getCardDate().substring(0, 4) + "/" + item.getCardDate().substring(4, 6) + "/" + item.getCardDate().substring(6, 8) : " ");
                
                table.addRow(payId, ordDocdat, rcsChqno, rcsRcvchqdat, rcsChqamt, rcsRcvsubamt,cardDate);//Inserting values into the table
            }
            db.close();
            return db;
        } catch (Exception ex) {
            Logger.getLogger(ComperrVw11Service.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
}
