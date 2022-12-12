package ir.tamin.insurance.technical.util;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import javax.ejb.Stateless;
import java.util.List;

import javax.ejb.Stateless;


@Stateless
public class ExcelDataProvider {
     public Workbook provideExcelFrom(ExcelReportHeader reportHeader, List<List<String>> rowsForExcel) {
        HSSFWorkbook workbook = initializeWorkbook("main");
        HSSFFont font = createFont(workbook);
        HSSFCellStyle headerStyle = createHeaderStyle(workbook, font);
        HSSFCellStyle detailStyle = createDetailStyle(workbook, font);
        int titleRowIndex = 1;
        int detailRowIndex = 3;
        Sheet sheet = workbook.getSheet("main");
        addCellToRowWithStyles(new ReportTableCellDetail(
                sheet.createRow(titleRowIndex),
                3,
                reportHeader.toString(),
                headerStyle));
        boolean tableHeaderFlag = true;
        for (List<String> row : rowsForExcel) {
            int cellCounter = 0;
            HSSFCellStyle cellStyle;
            if(tableHeaderFlag) {
                cellStyle = headerStyle;
                tableHeaderFlag = false;
            } else {
                cellStyle = detailStyle;
            }
            Row detailsRow = sheet.createRow(detailRowIndex);
            for (String cell : row) {
                addCellToRowWithStyles(new ReportTableCellDetail(
                        detailsRow,
                        cellCounter++,
                        cell,
                        cellStyle));
            }
            detailRowIndex++;
        }
        return workbook;
    }

    private void addCellToRowWithStyles(ReportTableCellDetail reportTableCellDetail) {
        Cell tempCell = reportTableCellDetail.getRow().createCell(reportTableCellDetail.getCellIndex());
        tempCell.setCellStyle(reportTableCellDetail.getCellStyle());
        tempCell.setCellValue(reportTableCellDetail.getText());
    }

    private HSSFCellStyle createDetailStyle(HSSFWorkbook workbook, HSSFFont font) {
        HSSFCellStyle detailStyle = workbook.createCellStyle();
        detailStyle.setBorderBottom(CellStyle.BORDER_THIN);
        detailStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderLeft(CellStyle.BORDER_THIN);
        detailStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderRight(CellStyle.BORDER_THIN);
        detailStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderTop(CellStyle.BORDER_THIN);
        detailStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        return detailStyle;
    }

    private HSSFFont createFont(HSSFWorkbook workbook) {
        HSSFFont font = workbook.createFont();
        font.setFontName("Arial");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        font.setColor(HSSFColor.BLACK.index);
        return font;
    }

    private HSSFCellStyle createHeaderStyle(HSSFWorkbook workbook, HSSFFont font) {
        HSSFCellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
        headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
        headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderRight(CellStyle.BORDER_THIN);
        headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderTop(CellStyle.BORDER_THIN);
        headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setFont(font);
        short index = HSSFColor.LAVENDER.index;
        HSSFColor headersColor = setColor(workbook, (byte) 0xE0, (byte) 0xE0, (byte) 0xE0, ++index);
        headerStyle.setFillForegroundColor(headersColor.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        return headerStyle;
    }

    private HSSFWorkbook initializeWorkbook(String name) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(name);
        sheet.setRightToLeft(true);
        return workbook;
    }

    public HSSFColor setColor(HSSFWorkbook workbook, byte r, byte g, byte b, short index) {
        HSSFPalette palette = workbook.getCustomPalette();
        HSSFColor hssfColor = palette.findColor(r, g, b);
        if (hssfColor == null) {
            palette.setColorAtIndex(index, r, g, b);
            hssfColor = palette.getColor(index);
        }
        return hssfColor;
    }

    private class ReportTableCellDetail {
        private Row row;
        private int cellIndex;
        private String text;
        private HSSFCellStyle cellStyle;

        public ReportTableCellDetail(Row row, int cellIndex, String text, HSSFCellStyle cellStyle) {
            this.row = row;
            this.cellIndex = cellIndex;
            this.text = text;
            this.cellStyle = cellStyle;
        }

        public Row getRow() {
            return row;
        }

        public int getCellIndex() {
            return cellIndex;
        }

        public String getText() {
            return text;
        }

        public HSSFCellStyle getCellStyle() {
            return cellStyle;
        }
    }
}
