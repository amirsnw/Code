package ir.tamin.incomeBank.service.shortterm.excelbankAccount;

import ir.tamin.incomeBank.model.centralPayment.GlPayDetail;
import ir.tamin.incomeBank.model.centralPayment.enums.PayStepEnum;
import ir.tamin.incomeBank.model.shortterm.NationalityEnum;
import ir.tamin.incomeBank.model.shortterm.PayDetailResult;
import ir.tamin.incomeBank.service.RestServices;
import ir.tamin.incomeBank.service.centralPayment.PayDetailService;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.io.*;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.glassfish.jersey.internal.util.Base64;
import org.json.JSONObject;

/**
 * @author a_alaiemousavi
 */
@Stateless
public class UplodBankAccountService {

    @Inject
    EntityManager entityManager;

    @Inject
    RestServices restServices;

    @Inject
    @WebProperties
    Bundle webProperties;

    @Inject
    PayDetailService detailService;

    @Inject
    private StoredProcedure procedure;

    public Map<String, Object> readExcelFile(byte[] stream, String formatExcel, String headId, String payStep) {
        Map<String, Object> map = new HashMap<>();
        List<GlPayDetail> recordList = null;

        recordList = fetchNatAccListFromExcel(formatExcel, stream, headId);

        map.put("list", recordList);
        map.put("total", recordList.size());

        return (map);
    }

    public Map<String, Object> deleteFile(byte[] stream, String reasonCode, String userName, String formatExcel, String headId, String payStep, String systemId) throws SQLException {

        List<GlPayDetail> recordList = null;
        Map<String, Object> map = new HashMap<>();
        List<GlPayDetail> notBack = new ArrayList<>();
        String result;

        recordList = fetchNatAccListFromExcel(formatExcel, stream, headId);

        if (PayStepEnum.SEHATSANJI.getCode().toString().equals(payStep)) {//اگر در مرحله صحت سنجی بود پاک میکنه

            for (GlPayDetail request : recordList) {
                try {
                    result = detailService.deleteWithReason(request.getPayDetailId().toString(), reasonCode, userName, true);

                    if (webProperties.getProperty("system.shortterm.id").equals(systemId)) { // کوتاه مدت
                        if (!result.equals("1")) {
                            request.setMessage(result);
                            notBack.add(request);
                        }
                    }
                } catch (Exception ex) {
                    if (webProperties.getProperty("system.shortterm.id").equals(systemId)) { // کوتاه مدت
                        request.setMessage("رکورد با شناسه سند " + request.getPayDocno() + " در سیستم کوتاه مدت بازگشت داده نشد!");
                        notBack.add(request);
                    } else if (webProperties.getProperty("system.pension.id").equals(systemId)) { // مستمری
                        request.setMessage("رکورد با شناسه سند " + request.getPayDocno() + " در سیستم مستمری بازگشت داده نشد!");
                        notBack.add(request);
                    } else if (webProperties.getProperty("system.asnad.id").equals(systemId)) { // اسناد پزشکی
                        String subSystemId = null;
                        if (request.getPayHead().getSubSystem() != null) {
                            subSystemId = request.getPayHead().getSubSystem().getSubSystemId().toString();
                        }
                        if (webProperties.getProperty("asnad.khesarat.id").equals(subSystemId)) { // خسارت متفرقه
                            request.setMessage("رکورد با شناسه سند " + request.getPayDocno() + " در سیستم خسارت بازگشت داده نشد!");
                            notBack.add(request);
                        } else {
                            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("مکانیزم برگشت در سیستم اسناد هنوز پیاده سازی نشده است !").build();
                            throw new WebApplicationException(response);
                        }
                    }
                }
            }

        } else {//اگر در مرحله سند صادر شده یا پرداخت شده بود فقط برگشت میزنه
            for (GlPayDetail request : recordList) {

                try {

                    result = detailService.returnWithReason(request.getPayDetailId().toString(), reasonCode, userName, true);

                    if (webProperties.getProperty("system.shortterm.id").equals(systemId)) { // کوتاه مدت
                        if (!result.equals("1")) {
                            request.setMessage(result);
                            notBack.add(request);
                        } else if (webProperties.getProperty("system.asnad.id").equals(systemId)) { // اسناد پزشکی
                            String subSystemId = request.getPayHead().getSubSystem().getSubSystemId().toString();
                            if (webProperties.getProperty("asnad.khesarat.id").equals(subSystemId)) { // خسارت
                                if (request.getStatus().equals('3')) {
                                    request.setMessage("این سند قبلا برگشت داده شده است.");
                                    notBack.add(request);
                                }
                            } else {
                                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("مکانیزم برگشت در سیستم اسناد هنوز پیاده سازی نشده است !").build();
                                throw new WebApplicationException(response);
                            }
                        }
                    }
                } catch (Exception ex) {
                    if (webProperties.getProperty("system.shortterm.id").equals(systemId)) { // کوتاه مدت
                        request.setMessage("رکورد با شناسه سند " + request.getPayDocno() + " در سیستم کوتاه مدت بازگشت داده نشد!");
                        notBack.add(request);
                    } else if (webProperties.getProperty("system.pension.id").equals(systemId)) { // مستمری
                        request.setMessage("رکورد با شناسه سند " + request.getPayDocno() + " در سیستم مستمری بازگشت داده نشد!");
                        notBack.add(request);
                    } else if (webProperties.getProperty("system.asnad.id").equals(systemId)) { // اسناد پزشکی
                        String subSystemId = request.getPayHead().getSubSystem().getSubSystemId().toString();
                        if (webProperties.getProperty("asnad.khesarat.id").equals(subSystemId)) { // خسارت
                            request.setMessage("رکورد با شناسه سند " + request.getPayDocno() + " در سیستم خسارت بازگشت داده نشد!");
                            notBack.add(request);
                        } else {
                            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("مکانیزم برگشت در سیستم اسناد هنوز پیاده سازی نشده است !").build();
                            throw new WebApplicationException(response);
                        }
                    }
                }
            }
        }

        map.put("list", notBack);
        map.put("total", notBack.size());
        return map;
    }

    public HSSFWorkbook writeToExcelPension(String resultJson) {

        JSONObject object = new JSONObject(resultJson);
        PayDetailResult payDetailResult = new PayDetailResult();
        String data = object.getString("path").replaceAll(" ", "+");
        payDetailResult.setPath(data);
        payDetailResult.setFormateExcel(object.getString("formateExcel"));
        payDetailResult.setHeadId(object.getString("headId"));
        payDetailResult.setPayStep(object.getString("payStep"));
        String excelFile = "";

        if ("xls".equals(payDetailResult.getFormateExcel())) {
            excelFile = payDetailResult.getPath().replace("data:application/vnd.ms-excel;base64,", "");
        } else {
            excelFile = payDetailResult.getPath().replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
        }

        byte[] byteExcelFile = Base64.decode(excelFile.getBytes());

        List<GlPayDetail> result = null;

        result = fetchNatAccListFromExcel(payDetailResult.getFormateExcel(), byteExcelFile, payDetailResult.getHeadId());

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("sheet 1");
        sheet.setRightToLeft(true);
        HSSFCellStyle headerStyle = workbook.createCellStyle();
        HSSFFont font = workbook.createFont();
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

        short index = HSSFColor.LAVENDER.index;
        HSSFColor headersColor = setColor(workbook, (byte) 0xE0, (byte) 0xE0, (byte) 0xE0, ++index);
        headerStyle.setFillForegroundColor(headersColor.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        HSSFCellStyle detailStyle = workbook.createCellStyle();
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
        cell1.setCellValue("کد ملی");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("شماره حساب");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نام");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("نام خانوادگی");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("شماره بیمه");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("شماره مستمری");
        cell6.setCellStyle(headerStyle);

        Cell cell7 = row.createCell(7);
        cell7.setCellValue("حرف الفبا");
        cell7.setCellStyle(headerStyle);

        Cell cell8 = row.createCell(8);
        cell8.setCellValue("ملیت");
        cell8.setCellStyle(headerStyle);

        Cell cell9 = row.createCell(9);
        cell9.setCellValue("نوع پرداخت");
        cell9.setCellStyle(headerStyle);

        Cell cell10 = row.createCell(10);
        cell10.setCellValue("همکار/غیرهمکار");
        cell10.setCellStyle(headerStyle);

        Cell cell24 = row.createCell(11);
        cell24.setCellValue("کد استان");
        cell24.setCellStyle(headerStyle);

        Cell cell11 = row.createCell(12);
        cell11.setCellValue("نام استان");
        cell11.setCellStyle(headerStyle);

        Cell cell12 = row.createCell(13);
        cell12.setCellValue("کد شعبه");
        cell12.setCellStyle(headerStyle);

        Cell cell13 = row.createCell(14);
        cell13.setCellValue("نام شعبه");
        cell13.setCellStyle(headerStyle);

        Cell cell14 = row.createCell(15);
        cell14.setCellValue("مبلغ");
        cell14.setCellStyle(headerStyle);

        Cell cell15 = row.createCell(16);
        cell15.setCellValue("شناسه سند");
        cell15.setCellStyle(headerStyle);

        Cell cell16 = row.createCell(17);
        cell16.setCellValue("شروع دوره محاسبه");
        cell16.setCellStyle(headerStyle);

        Cell cell17 = row.createCell(18);
        cell17.setCellValue("پایان دوره محاسبه");
        cell17.setCellStyle(headerStyle);

        Cell cell18 = row.createCell(19);
        cell18.setCellValue("تایید مسئول مستمری");
        cell18.setCellStyle(headerStyle);

        Cell cell19 = row.createCell(20);
        cell19.setCellValue("تاریخ تایید مسئول مستمری");
        cell19.setCellStyle(headerStyle);

        Cell cell20 = row.createCell(21);
        cell20.setCellValue("تایید مسئول مالی");
        cell20.setCellStyle(headerStyle);

        Cell cell21 = row.createCell(22);
        cell21.setCellValue("تاریخ تایید مسئول مالی");
        cell21.setCellStyle(headerStyle);

        Cell cell22 = row.createCell(23);
        cell22.setCellValue("تایید رئیس شعبه");
        cell22.setCellStyle(headerStyle);

        Cell cell23 = row.createCell(24);
        cell23.setCellValue("تاریخ تایید رئیس شعبه");
        cell23.setCellStyle(headerStyle);

        try {
            int rownum = 1;
            for (GlPayDetail item : result) {
                String natcode = item.getNatcode();
                String accountNo = item.getAccountNo();
                String firstName = item.getFirstName();
                String lastName = item.getLastName();
                String risuid = item.getRisuid();
                String alphabet = item.getAlphabet();
                String pensionId = item.getPensionerId();
                String subsystem = item.getSubSystem().getTitle();
                String branchCode = item.getBranchCode();
                String branchName = item.getBranch().getBrhName();
                String provinceCode = item.getBranch().getCity().getProvince().getProvinceCode();
                String provinceName = item.getBranch().getCity().getProvince().getProvinceName();
                Long payAmount = item.getPayAmount();
                String payDocNo = item.getPayDocno();
                String isHamkar = item.getIsHamkarDesc();

                String nationality = (item.getNationality().equals("01") ? "01" : "02");
                nationality = NationalityEnum.find(nationality).getName();
                String calcStartDate = (item.getCalcStartDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
                calcStartDate = (!calcStartDate.isEmpty() ? calcStartDate.substring(0, 4) + "/" + calcStartDate.substring(4, 6) + "/" + calcStartDate.substring(6) : "");
                String calcEndDate = (item.getCalcEndDate() != null ? (String.valueOf(item.getCalcEndDate())).trim() : "");
                calcEndDate = (!calcEndDate.isEmpty() ? calcEndDate.substring(0, 4) + "/" + calcEndDate.substring(4, 6) + "/" + calcEndDate.substring(6) : "");
                String firstConfirmUserDesc = (item.getFirstConfirmUser() != null ? String.valueOf(item.getFirstConfirmUser()) : "");
                String firstConfirmDate = (item.getFirstConfirmDate() != null ? String.valueOf(item.getFirstConfirmDate()) : "");
                firstConfirmDate = (!firstConfirmDate.isEmpty() ? firstConfirmDate.substring(0, 4) + "/" + firstConfirmDate.substring(4, 6) + "/" + firstConfirmDate.substring(6) : "");
                String secondConfirmUserDesc = (item.getSecondConfirmUser() != null ? String.valueOf(item.getSecondConfirmUser()) : "");
                String secondConfirmDate = (item.getSecondConfirmDate() != null ? String.valueOf(item.getSecondConfirmDate()) : "");
                secondConfirmDate = (!secondConfirmDate.isEmpty() ? secondConfirmDate.substring(0, 4) + "/" + secondConfirmDate.substring(4, 6) + "/" + secondConfirmDate.substring(6) : "");
                String sendToMaliUserDesc = (item.getSendToMaliUser() != null ? String.valueOf(item.getSendToMaliUser()) : "");
                String sendToMaliDate = (item.getSendToMaliDate() != null ? String.valueOf(item.getSendToMaliDate()) : "");
                sendToMaliDate = (!sendToMaliDate.isEmpty() ? sendToMaliDate.substring(0, 4) + "/" + sendToMaliDate.substring(4, 6) + "/" + sendToMaliDate.substring(6) : "");

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(natcode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accountNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(lastName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuid);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(pensionId);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(alphabet);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(nationality);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(subsystem);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(isHamkar);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(provinceCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(provinceName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payAmount);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payDocNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcStartDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcEndDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliDate);

            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return workbook;
    }

    public HSSFWorkbook writeToExcelShortterm(String resultJson) {

        JSONObject object = new JSONObject(resultJson);
        PayDetailResult payDetailResult = new PayDetailResult();
        String data = object.getString("path").replaceAll(" ", "+");
        payDetailResult.setPath(data);
        payDetailResult.setFormateExcel(object.getString("formateExcel"));
        payDetailResult.setHeadId(object.getString("headId"));
        payDetailResult.setPayStep(object.getString("payStep"));
        String excelFile = "";

        if ("xls".equals(payDetailResult.getFormateExcel())) {
            excelFile = payDetailResult.getPath().replace("data:application/vnd.ms-excel;base64,", "");
        } else {
            excelFile = payDetailResult.getPath().replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
        }

        byte[] byteExcelFile = Base64.decode(excelFile.getBytes());

        List<GlPayDetail> result = null;

        result = fetchNatAccListFromExcel(payDetailResult.getFormateExcel(), byteExcelFile, payDetailResult.getHeadId());

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("sheet 1");
        sheet.setRightToLeft(true);
        HSSFCellStyle headerStyle = workbook.createCellStyle();
        HSSFFont font = workbook.createFont();
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

        short index = HSSFColor.LAVENDER.index;
        HSSFColor headersColor = setColor(workbook, (byte) 0xE0, (byte) 0xE0, (byte) 0xE0, ++index);
        headerStyle.setFillForegroundColor(headersColor.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        HSSFCellStyle detailStyle = workbook.createCellStyle();
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
        cell1.setCellValue("کد ملی");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("شماره حساب");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نام");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("نام خانوادگی");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("شماره بیمه");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("ملیت");
        cell6.setCellStyle(headerStyle);

        Cell cell7 = row.createCell(7);
        cell7.setCellValue("نوع تعهد");
        cell7.setCellStyle(headerStyle);

        Cell cell8 = row.createCell(8);
        cell8.setCellValue("کد استان");
        cell8.setCellStyle(headerStyle);

        Cell cell9 = row.createCell(9);
        cell9.setCellValue("نام استان");
        cell9.setCellStyle(headerStyle);

        Cell cell10 = row.createCell(10);
        cell10.setCellValue("کد شعبه");
        cell10.setCellStyle(headerStyle);

        Cell cell11 = row.createCell(11);
        cell11.setCellValue("نام شعبه");
        cell11.setCellStyle(headerStyle);

        Cell cell12 = row.createCell(12);
        cell12.setCellValue("مبلغ");
        cell12.setCellStyle(headerStyle);

        Cell cell13 = row.createCell(13);
        cell13.setCellValue("شماره سند");
        cell13.setCellStyle(headerStyle);

        Cell cell14 = row.createCell(14);
        cell14.setCellValue("شروع دوره محاسبه");
        cell14.setCellStyle(headerStyle);

        Cell cell15 = row.createCell(15);
        cell15.setCellValue("پایان دوره محاسبه");
        cell15.setCellStyle(headerStyle);

        Cell cell16 = row.createCell(16);
        cell16.setCellValue("تایید کننده اول");
        cell16.setCellStyle(headerStyle);

        Cell cell17 = row.createCell(17);
        cell17.setCellValue("تاریخ تایید اول");
        cell17.setCellStyle(headerStyle);

        Cell cell18 = row.createCell(18);
        cell18.setCellValue("تایید کننده دوم");
        cell18.setCellStyle(headerStyle);

        Cell cell19 = row.createCell(19);
        cell19.setCellValue("تاریخ تایید دوم");
        cell19.setCellStyle(headerStyle);

        Cell cell20 = row.createCell(20);
        cell20.setCellValue("ارسا کننده به مالی");
        cell20.setCellStyle(headerStyle);

        Cell cell21 = row.createCell(21);
        cell21.setCellValue("تاریخ ارسال");
        cell21.setCellStyle(headerStyle);

        Cell cell22 = row.createCell(22);
        cell22.setCellValue("کد حساب");
        cell22.setCellStyle(headerStyle);

        try {
            int rownum = 1;
            for (GlPayDetail item : result) {
                String natcode = item.getNatcode();
                String accountNo = item.getAccountNo();
                String firstName = item.getFirstName();
                String lastName = item.getLastName();
                String risuid = item.getRisuid();
                String subsystem = item.getSubSystem().getTitle();
                String branchCode = item.getBranchCode();
                String branchName = item.getBranch().getBrhName();
                String provinceCode = item.getBranch().getCity().getProvince().getProvinceCode();
                String provinceName = item.getBranch().getCity().getProvince().getProvinceName();
                Long payAmount = item.getPayAmount();
                String payDocNo = item.getPayDocno();

                String nationality = (item.getNationality().equals("01") ? "01" : "02");
                nationality = NationalityEnum.find(nationality).getName();
                String calcStartDate = (item.getCalcStartDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
                calcStartDate = (!calcStartDate.isEmpty() ? calcStartDate.substring(0, 4) + "/" + calcStartDate.substring(4, 6) + "/" + calcStartDate.substring(6) : "");
                String calcEndDate = (item.getCalcEndDate() != null ? (String.valueOf(item.getCalcEndDate())).trim() : "");
                calcEndDate = (!calcEndDate.isEmpty() ? calcEndDate.substring(0, 4) + "/" + calcEndDate.substring(4, 6) + "/" + calcEndDate.substring(6) : "");
                String firstConfirmUserDesc = (item.getFirstConfirmUser() != null ? String.valueOf(item.getFirstConfirmUser()) : "");
                String firstConfirmDate = (item.getFirstConfirmDate() != null ? String.valueOf(item.getFirstConfirmDate()) : "");
                firstConfirmDate = (!firstConfirmDate.isEmpty() ? firstConfirmDate.substring(0, 4) + "/" + firstConfirmDate.substring(4, 6) + "/" + firstConfirmDate.substring(6) : "");
                String secondConfirmUserDesc = (item.getSecondConfirmUser() != null ? String.valueOf(item.getSecondConfirmUser()) : "");
                String secondConfirmDate = (item.getSecondConfirmDate() != null ? String.valueOf(item.getSecondConfirmDate()) : "");
                secondConfirmDate = (!secondConfirmDate.isEmpty() ? secondConfirmDate.substring(0, 4) + "/" + secondConfirmDate.substring(4, 6) + "/" + secondConfirmDate.substring(6) : "");
                String sendToMaliUserDesc = (item.getSendToMaliUser() != null ? String.valueOf(item.getSendToMaliUser()) : "");
                String sendToMaliDate = (item.getSendToMaliDate() != null ? String.valueOf(item.getSendToMaliDate()) : "");
                sendToMaliDate = (!sendToMaliDate.isEmpty() ? sendToMaliDate.substring(0, 4) + "/" + sendToMaliDate.substring(4, 6) + "/" + sendToMaliDate.substring(6) : "");
                String accCode = item.getAccCode();

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(natcode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accountNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(lastName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuid);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(nationality);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(subsystem);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(provinceCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(provinceName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payAmount);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payDocNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcStartDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcEndDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(secondConfirmDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accCode);

            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return workbook;
    }

    public HSSFWorkbook writeToExcelAsnad(String resultJson) {

        JSONObject object = new JSONObject(resultJson);
        PayDetailResult payDetailResult = new PayDetailResult();
        String data = object.getString("path").replaceAll(" ", "+");
        payDetailResult.setPath(data);
        payDetailResult.setFormateExcel(object.getString("formateExcel"));
        payDetailResult.setHeadId(object.getString("headId"));
        payDetailResult.setPayStep(object.getString("payStep"));
        String excelFile = "";

        if ("xls".equals(payDetailResult.getFormateExcel())) {
            excelFile = payDetailResult.getPath().replace("data:application/vnd.ms-excel;base64,", "");
        } else {
            excelFile = payDetailResult.getPath().replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
        }

        byte[] byteExcelFile = Base64.decode(excelFile.getBytes());

        List<GlPayDetail> result = null;

        result = fetchNatAccListFromExcel(payDetailResult.getFormateExcel(), byteExcelFile, payDetailResult.getHeadId());

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("sheet 1");
        sheet.setRightToLeft(true);
        HSSFCellStyle headerStyle = workbook.createCellStyle();
        HSSFFont font = workbook.createFont();
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

        short index = HSSFColor.LAVENDER.index;
        HSSFColor headersColor = setColor(workbook, (byte) 0xE0, (byte) 0xE0, (byte) 0xE0, ++index);
        headerStyle.setFillForegroundColor(headersColor.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        HSSFCellStyle detailStyle = workbook.createCellStyle();
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
        cell1.setCellValue("کد ملی");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("شماره حساب");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نام");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("نام خانوادگی");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("شماره بیمه");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("ملیت");
        cell6.setCellStyle(headerStyle);

        Cell cell7 = row.createCell(7);
        cell7.setCellValue("نام استان");
        cell7.setCellStyle(headerStyle);

        Cell cell8 = row.createCell(8);
        cell8.setCellValue("کد دفتر اسناد");
        cell8.setCellStyle(headerStyle);

        Cell cell9 = row.createCell(9);
        cell9.setCellValue("نام دفتر اسناد");
        cell9.setCellStyle(headerStyle);

        Cell cell10 = row.createCell(10);
        cell10.setCellValue("مبلغ");
        cell10.setCellStyle(headerStyle);

        Cell cell11 = row.createCell(11);
        cell11.setCellValue("شناسه سند");
        cell11.setCellStyle(headerStyle);

        Cell cell12 = row.createCell(12);
        cell12.setCellValue("تاریخ سند");
        cell12.setCellStyle(headerStyle);

        Cell cell13 = row.createCell(13);
        cell13.setCellValue("شروع دوره محاسبه");
        cell13.setCellStyle(headerStyle);

        Cell cell14 = row.createCell(14);
        cell14.setCellValue("پایان دوره محاسبه");
        cell14.setCellStyle(headerStyle);

        Cell cell15 = row.createCell(15);
        cell15.setCellValue("ارسا کننده به مالی");
        cell15.setCellStyle(headerStyle);

        Cell cell16 = row.createCell(16);
        cell16.setCellValue("تاریخ ارسال");
        cell16.setCellStyle(headerStyle);

        try {
            int rownum = 1;
            for (GlPayDetail item : result) {
                String natcode = item.getNatcode();
                String accountNo = item.getAccountNo();
                String firstName = item.getFirstName();
                String lastName = item.getLastName();
                String risuid = item.getRisuid();
                String branchCode = item.getBranchCode();
                String branchName = (item.getBranch() != null ? item.getBranch().getBrhName() : "");
                String provinceName = (item.getBranch() != null ? item.getBranch().getCity().getProvince().getProvinceName() : "");
                Long payAmount = item.getPayAmount();
                String payDocNo = item.getPayDocno();
                String payDocDate = item.getPayDocDate();

                String nationality = (item.getNationality().equals("01") ? "01" : "02");
                nationality = NationalityEnum.find(nationality).getName();
                String calcStartDate = (item.getCalcStartDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
                calcStartDate = (!calcStartDate.isEmpty() ? calcStartDate.substring(0, 4) + "/" + calcStartDate.substring(4, 6) + "/" + calcStartDate.substring(6) : "");
                String calcEndDate = (item.getCalcEndDate() != null ? (String.valueOf(item.getCalcEndDate())).trim() : "");
                calcEndDate = (!calcEndDate.isEmpty() ? calcEndDate.substring(0, 4) + "/" + calcEndDate.substring(4, 6) + "/" + calcEndDate.substring(6) : "");
                String sendToMaliUserDesc = (item.getSendToMaliUser() != null ? String.valueOf(item.getSendToMaliUser()) : "");
                String sendToMaliDate = (item.getSendToMaliDate() != null ? String.valueOf(item.getSendToMaliDate()) : "");
                sendToMaliDate = (!sendToMaliDate.isEmpty() ? sendToMaliDate.substring(0, 4) + "/" + sendToMaliDate.substring(4, 6) + "/" + sendToMaliDate.substring(6) : "");

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(natcode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accountNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(lastName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuid);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(nationality);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(provinceName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchCode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(branchName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payAmount);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payDocNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(payDocDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcStartDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(calcEndDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliUserDesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(sendToMaliDate);

            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return workbook;
    }

    public HSSFColor setColor(HSSFWorkbook workbook, byte r, byte g, byte b, short index) {
        HSSFPalette palette = workbook.getCustomPalette();
        HSSFColor hssfColor = null;
        try {
            hssfColor = palette.findColor(r, g, b);
            if (hssfColor == null) {
                palette.setColorAtIndex(index, r, g, b);
                hssfColor = palette.getColor(index);
            }
        } catch (Exception e) {
        }
        return hssfColor;
    }

    private List<GlPayDetail> fetchNatAccListFromExcel(String formatExcel, byte[] stream, String headId) {
        List<Long> nationList = new ArrayList<>();
        List<Long> bankNoList = new ArrayList<>();
        List<GlPayDetail> result = new ArrayList<>();

        if ("xls".equals(formatExcel)) {
            try {
                InputStream myInputStream = new ByteArrayInputStream(stream);
                HSSFWorkbook workbook = new HSSFWorkbook(myInputStream);
                Sheet firstSheet = workbook.getSheetAt(0);
                Iterator<Row> iterator = firstSheet.iterator();
                Iterator<Row> firstItrator = firstSheet.iterator();
                if (!(firstItrator.hasNext())) {
                    Response response = Response.status(Response.Status.BAD_REQUEST).entity("فایل ارسالی خالی میباشد.").build();
                    throw new WebApplicationException(response);
                }
                if (firstItrator.hasNext()) {
                    Row nextRow = firstItrator.next();
                    if (nextRow.getCell(0) == null || nextRow.getCell(1) == null) {
                        Response response = Response.status(Response.Status.BAD_REQUEST).entity("فرمت فایل مناسب نیست.").build();
                        throw new WebApplicationException(response);
                    }
                }
                iterator.next();
                while (iterator.hasNext()) {
                    Row nextRow = iterator.next();
                    Cell nationCell = nextRow.getCell(0);
                    Cell bankNoCell = nextRow.getCell(1);
                    if (!(nationCell == null || bankNoCell == null)) {
                        String natCode;
                        switch (nationCell.getCellType()) {
                            case Cell.CELL_TYPE_NUMERIC:
//
                                Response response = Response.status(Response.Status.BAD_REQUEST).entity("فرمت فایل ارسالی مناسب نیست لطفا مطابق راهنما عمل نمایید.").build();
                                throw new WebApplicationException(response);

                            case Cell.CELL_TYPE_STRING:

//                                natCode = nationCell.getStringCellValue();
//                                natCode = natCode.replaceAll(" ", "");
//                                natCode = natCode.replaceAll("\n", "");
//                                if (natCode.length() < 10) {
//                                    natCode = String.format("%010d", Integer.parseInt(natCode));
//                                }
//                                nationList.add(natCode);
                                natCode = nationCell.getStringCellValue();
                                natCode = natCode.replaceAll(" ", "");
                                natCode = natCode.replaceAll("\n", "");
                                nationList.add(new Long(natCode));

                                break;
                        }
                        String accNo;
                        switch (bankNoCell.getCellType()) {
                            case Cell.CELL_TYPE_NUMERIC:
                                Response response = Response.status(Response.Status.BAD_REQUEST).entity("فرمت فایل ارسالی مناسب نیست لطفا مطابق راهنما عمل نمایید.").build();
                                throw new WebApplicationException(response);

                            case Cell.CELL_TYPE_STRING:
                                accNo = bankNoCell.getStringCellValue();
                                accNo = accNo.replaceAll(" ", "");
                                accNo = accNo.replaceAll("\n", "");
                                bankNoList.add(new Long(accNo));
                                break;
                        }
                        myInputStream.close();
                    }
                }
            } catch (IOException ex) {
                ex.printStackTrace();
                return result;
            }
        } else {
            try {
                InputStream myInputStream = new ByteArrayInputStream(stream);
                XSSFWorkbook workbook = new XSSFWorkbook(myInputStream);
                Sheet firstSheet = workbook.getSheetAt(0);
                Iterator<Row> iterator = firstSheet.iterator();
                Iterator<Row> firstItrator = firstSheet.iterator();
                if (!firstItrator.hasNext()) {
                    Response response = Response.status(Response.Status.BAD_REQUEST).entity("فایل ارسالی خالی میباشد.").build();
                    throw new WebApplicationException(response);
                }
                if (firstItrator.hasNext()) {
                    Row nextRow = firstItrator.next();
                    if (nextRow.getCell(0) == null || nextRow.getCell(1) == null) {
                        Response response = Response.status(Response.Status.BAD_REQUEST).entity("فرمت فایل مناسب نیست.").build();
                        throw new WebApplicationException(response);
                    }
                }
                iterator.next();
                while (iterator.hasNext()) {
                    Row nextRow = iterator.next();
                    Cell nationCell = nextRow.getCell(0);
                    Cell bankNoCell = nextRow.getCell(1);
                    if (!(nationCell == null || bankNoCell == null)) {
                        String natCode;
                        switch (nationCell.getCellType()) {
                            case Cell.CELL_TYPE_NUMERIC:

                                Response response = Response.status(Response.Status.BAD_REQUEST).entity("فرمت فایل ارسالی مناسب نیست لطفا مطابق راهنما عمل نمایید.").build();
                                throw new WebApplicationException(response);
                            case Cell.CELL_TYPE_STRING:
                                natCode = nationCell.getStringCellValue();
                                natCode = natCode.replaceAll(" ", "");
                                natCode = natCode.replaceAll("\n", "");
                                nationList.add(new Long(natCode));
                        }
                        String accNo;
                        switch (bankNoCell.getCellType()) {
                            case Cell.CELL_TYPE_NUMERIC:

                                Response response = Response.status(Response.Status.BAD_REQUEST).entity("فرمت فایل ارسالی مناسب نیست لطفا مطابق راهنما عمل نمایید.").build();
                                throw new WebApplicationException(response);
                            case Cell.CELL_TYPE_STRING:
                                accNo = bankNoCell.getStringCellValue();
                                accNo = accNo.replaceAll(" ", "");
                                accNo = accNo.replaceAll("\n", "");
                                bankNoList.add(new Long(accNo));
                                break;
                        }
                        myInputStream.close();
                    }
                }
            } catch (IOException ex) {
                ex.printStackTrace();
                return result;

            }
        }

        result = entityManager.createNamedQuery("GlPayDetail.bankAccount", GlPayDetail.class
        )
                .setParameter("bankNo", bankNoList)
                .setParameter("nationCode", nationList)
                .setParameter("payHeadId", BigDecimal.valueOf(Long.parseLong(headId)))
                .getResultList();

        return result;

    }

    public HSSFWorkbook writeToExcelForNotReturnRecords(String resultJson, String systemId) {

        JSONArray array = new JSONArray(resultJson);
        List<PayDetailResult> result = new ArrayList<>();
        if (webProperties.getProperty("system.asnad.id").equals(systemId)) {
            for (int i = 0; i < array.length(); i++) {
                result.add(new PayDetailResult(array.getJSONObject(i).getString("risuid"),
                        array.getJSONObject(i).getString("natcode"),
                        array.getJSONObject(i).getString("accountNo"),
                        array.getJSONObject(i).getString("firstName"),
                        array.getJSONObject(i).getString("lastName"),
                        array.getJSONObject(i).getString("title"),
                        array.getJSONObject(i).getString("branchCode"),
                        array.getJSONObject(i).getJSONObject("branch").getString("brhName"),
                        array.getJSONObject(i).getJSONObject("branch").getJSONObject("city").getJSONObject("province").getString("provinceCode"),
                        array.getJSONObject(i).getJSONObject("branch").getJSONObject("city").getJSONObject("province").getString("provinceName"),
                        array.getJSONObject(i).getLong("payAmount"),
                        array.getJSONObject(i).getString("payDocno"),
                        array.getJSONObject(i).getString("nationality"),
                        array.getJSONObject(i).getString("calcStartDate"),
                        array.getJSONObject(i).getString("calcEndDate"),
                        array.getJSONObject(i).getString("sendToMaliDate"),
                        array.getJSONObject(i).getString("message"),
                        array.getJSONObject(i).getString("sendToMaliUser")
                ));

            }
        } else if (webProperties.getProperty("system.pension.id").equals(systemId)) {
            for (int i = 0; i < array.length(); i++) {
                result.add(new PayDetailResult(array.getJSONObject(i).getString("risuid"),
                        array.getJSONObject(i).getString("natcode"),
                        array.getJSONObject(i).getString("accountNo"),
                        array.getJSONObject(i).getString("firstName"),
                        array.getJSONObject(i).getString("lastName"),
                        array.getJSONObject(i).getString("branchCode"),
                        array.getJSONObject(i).getJSONObject("branch").getString("brhName"),
                        array.getJSONObject(i).getJSONObject("branch").getJSONObject("city").getJSONObject("province").getString("provinceCode"),
                        array.getJSONObject(i).getJSONObject("branch").getJSONObject("city").getJSONObject("province").getString("provinceName"),
                        array.getJSONObject(i).getLong("payAmount"),
                        array.getJSONObject(i).getString("payDocno"),
                        array.getJSONObject(i).getString("nationality"),
                        array.getJSONObject(i).getString("calcStartDate"),
                        array.getJSONObject(i).getString("calcEndDate"),
                        array.getJSONObject(i).getString("firstConfirmDate"),
                        array.getJSONObject(i).getString("secondConfirmDate"),
                        array.getJSONObject(i).getString("sendToMaliDate"),
                        array.getJSONObject(i).getString("message"),
                        array.getJSONObject(i).getString("firstConfirmUser"),
                        array.getJSONObject(i).getString("secondConfirmUser"),
                        array.getJSONObject(i).getString("sendToMaliUser"),
                        array.getJSONObject(i).getString("title"),
                        array.getJSONObject(i).getString("pensionerId"),
                        array.getJSONObject(i).getString("alphabet"),
                        array.getJSONObject(i).getString("payDocDate"),
                        array.getJSONObject(i).getString("isHamkarDesc")
                ));
            }
        } else {
            for (int i = 0; i < array.length(); i++) {
                result.add(new PayDetailResult(array.getJSONObject(i).getString("risuid"),
                        array.getJSONObject(i).getString("natcode"),
                        array.getJSONObject(i).getString("accountNo"),
                        array.getJSONObject(i).getString("firstName"),
                        array.getJSONObject(i).getString("lastName"),
                        array.getJSONObject(i).getString("title"),
                        array.getJSONObject(i).getString("branchCode"),
                        array.getJSONObject(i).getJSONObject("branch").getString("brhName"),
                        array.getJSONObject(i).getJSONObject("branch").getJSONObject("city").getJSONObject("province").getString("provinceCode"),
                        array.getJSONObject(i).getJSONObject("branch").getJSONObject("city").getJSONObject("province").getString("provinceName"),
                        array.getJSONObject(i).getLong("payAmount"),
                        array.getJSONObject(i).getString("payDocno"),
                        array.getJSONObject(i).getString("nationality"),
                        array.getJSONObject(i).getString("calcStartDate"),
                        array.getJSONObject(i).getString("calcEndDate"),
                        array.getJSONObject(i).getString("firstConfirmDate"),
                        array.getJSONObject(i).getString("secondConfirmDate"),
                        array.getJSONObject(i).getString("sendToMaliDate"),
                        array.getJSONObject(i).getString("accCode"),
                        array.getJSONObject(i).getString("message"),
                        array.getJSONObject(i).getString("firstConfirmUser"),
                        array.getJSONObject(i).getString("secondConfirmUser"),
                        array.getJSONObject(i).getString("sendToMaliUser")
                ));

            }
        }
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("sheet 1");
        sheet.setRightToLeft(true);
        HSSFCellStyle headerStyle = workbook.createCellStyle();
        HSSFFont font = workbook.createFont();
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

        short index = HSSFColor.LAVENDER.index;
        HSSFColor headersColor = setColor(workbook, (byte) 0xE0, (byte) 0xE0, (byte) 0xE0, ++index);
        headerStyle.setFillForegroundColor(headersColor.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        HSSFCellStyle detailStyle = workbook.createCellStyle();
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
        cell1.setCellValue("کد ملی");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("شماره حساب");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("نام");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("نام خانوادگی");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("شماره بیمه");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("ملیت");
        cell6.setCellStyle(headerStyle);

        if (webProperties.getProperty("system.asnad.id").equals(systemId)) {

            Cell cell8 = row.createCell(7);
            cell8.setCellValue("کد استان");
            cell8.setCellStyle(headerStyle);

            Cell cell9 = row.createCell(8);
            cell9.setCellValue("نام استان");
            cell9.setCellStyle(headerStyle);

            Cell cell10 = row.createCell(9);
            cell10.setCellValue("کد دفتر اسناد");
            cell10.setCellStyle(headerStyle);

            Cell cell11 = row.createCell(10);
            cell11.setCellValue("نام دفتر اسناد");
            cell11.setCellStyle(headerStyle);

            Cell cell12 = row.createCell(11);
            cell12.setCellValue("مبلغ");
            cell12.setCellStyle(headerStyle);

            Cell cell13 = row.createCell(12);
            cell13.setCellValue("شناسه سند");
            cell13.setCellStyle(headerStyle);

            Cell cell14 = row.createCell(13);
            cell14.setCellValue("شروع دوره محاسبه");
            cell14.setCellStyle(headerStyle);

            Cell cell15 = row.createCell(14);
            cell15.setCellValue("پایان دوره محاسبه");
            cell15.setCellStyle(headerStyle);

            Cell cell16 = row.createCell(15);
            cell16.setCellValue("ارسا کننده به مالی");
            cell16.setCellStyle(headerStyle);

            Cell cell17 = row.createCell(16);
            cell17.setCellValue("تاریخ ارسال");
            cell17.setCellStyle(headerStyle);

            Cell cell18 = row.createCell(17);
            cell18.setCellValue("علت عدم برگشت");
            cell18.setCellStyle(headerStyle);
        } else if (webProperties.getProperty("system.pension.id").equals(systemId)) {
            Cell cell7 = row.createCell(7);
            cell7.setCellValue("شماره مستمری");
            cell7.setCellStyle(headerStyle);

            Cell cell8 = row.createCell(8);
            cell8.setCellValue("حرف الفبا");
            cell8.setCellStyle(headerStyle);

            Cell cell9 = row.createCell(9);
            cell9.setCellValue("نوع پرداخت");
            cell9.setCellStyle(headerStyle);

            Cell cell26 = row.createCell(10);
            cell26.setCellValue("همکار/غیرهمکار");
            cell26.setCellStyle(headerStyle);

            Cell cell10 = row.createCell(11);
            cell10.setCellValue("کد استان");
            cell10.setCellStyle(headerStyle);

            Cell cell11 = row.createCell(12);
            cell11.setCellValue("نام استان");
            cell11.setCellStyle(headerStyle);

            Cell cell12 = row.createCell(13);
            cell12.setCellValue("کد شعبه");
            cell12.setCellStyle(headerStyle);

            Cell cell13 = row.createCell(14);
            cell13.setCellValue("نام شعبه");
            cell13.setCellStyle(headerStyle);

            Cell cell14 = row.createCell(15);
            cell14.setCellValue("مبلغ");
            cell14.setCellStyle(headerStyle);

            Cell cell15 = row.createCell(16);
            cell15.setCellValue("شناسه سند");
            cell15.setCellStyle(headerStyle);

            Cell cell16 = row.createCell(17);
            cell16.setCellValue("تاریخ سند");
            cell16.setCellStyle(headerStyle);

            Cell cell17 = row.createCell(18);
            cell17.setCellValue("شروع دوره محاسبه");
            cell17.setCellStyle(headerStyle);

            Cell cell18 = row.createCell(19);
            cell18.setCellValue("پایان دوره محاسبه");
            cell18.setCellStyle(headerStyle);

            Cell cell19 = row.createCell(20);
            cell19.setCellValue("تایید مسئول مستمری");
            cell19.setCellStyle(headerStyle);

            Cell cell20 = row.createCell(21);
            cell20.setCellValue("تاریخ تایید مسئول مستمری");
            cell20.setCellStyle(headerStyle);

            Cell cell21 = row.createCell(22);
            cell21.setCellValue("تایید مسئول مالی");
            cell21.setCellStyle(headerStyle);

            Cell cell22 = row.createCell(23);
            cell22.setCellValue("تاریخ تایید مسئول مالی");
            cell22.setCellStyle(headerStyle);

            Cell cell23 = row.createCell(24);
            cell23.setCellValue("تایید ریس شعیه");
            cell23.setCellStyle(headerStyle);

            Cell cell24 = row.createCell(25);
            cell24.setCellValue("تاریخ تایید ریس شعیه");
            cell24.setCellStyle(headerStyle);

            Cell cell25 = row.createCell(26);
            cell25.setCellValue("علت عدم برگشت");
            cell25.setCellStyle(headerStyle);

        } else if (webProperties.getProperty("system.shortterm.id").equals(systemId)) {
            Cell cell7 = row.createCell(7);
            cell7.setCellValue("نوع تعهد");
            cell7.setCellStyle(headerStyle);

            Cell cell8 = row.createCell(8);
            cell8.setCellValue("کد استان");
            cell8.setCellStyle(headerStyle);

            Cell cell9 = row.createCell(9);
            cell9.setCellValue("نام استان");
            cell9.setCellStyle(headerStyle);

            Cell cell10 = row.createCell(10);
            cell10.setCellValue("کد شعبه");
            cell10.setCellStyle(headerStyle);

            Cell cell11 = row.createCell(11);
            cell11.setCellValue("نام شعبه");
            cell11.setCellStyle(headerStyle);

            Cell cell12 = row.createCell(12);
            cell12.setCellValue("مبلغ");
            cell12.setCellStyle(headerStyle);

            Cell cell13 = row.createCell(13);
            cell13.setCellValue("شماره سند");
            cell13.setCellStyle(headerStyle);

            Cell cell14 = row.createCell(14);
            cell14.setCellValue("شروع دوره محاسبه");
            cell14.setCellStyle(headerStyle);

            Cell cell15 = row.createCell(15);
            cell15.setCellValue("پایان دوره محاسبه");
            cell15.setCellStyle(headerStyle);

            Cell cell16 = row.createCell(16);
            cell16.setCellValue("تایید کننده اول");
            cell16.setCellStyle(headerStyle);

            Cell cell17 = row.createCell(17);
            cell17.setCellValue("تاریخ تایید اول");
            cell17.setCellStyle(headerStyle);

            Cell cell18 = row.createCell(18);
            cell18.setCellValue("تایید کننده دوم");
            cell18.setCellStyle(headerStyle);

            Cell cell19 = row.createCell(19);
            cell19.setCellValue("تاریخ تایید دوم");
            cell19.setCellStyle(headerStyle);

            Cell cell20 = row.createCell(20);
            cell20.setCellValue("ارسا کننده به مالی");
            cell20.setCellStyle(headerStyle);

            Cell cell21 = row.createCell(21);
            cell21.setCellValue("تاریخ ارسال");
            cell21.setCellStyle(headerStyle);

            Cell cell22 = row.createCell(22);
            cell22.setCellValue("کد حساب");
            cell22.setCellStyle(headerStyle);

            Cell cell23 = row.createCell(23);
            cell23.setCellValue("علت عدم برگشت");
            cell23.setCellStyle(headerStyle);
        }

        try {
            int rownum = 1;
            String firstConfirmUserDesc = null;
            String firstConfirmDate = null;
            String secondConfirmUserDesc = null;
            String secondConfirmDate = null;
            String accCode = null;

            for (PayDetailResult item : result) {
                String natcode = (item.getNatcode() != null ? (String.valueOf(item.getNatcode())).trim() : "");
                String accountNo = (item.getAccountNo() != null ? (String.valueOf(item.getAccountNo())).trim() : "");
                String firstName = item.getFirstName();
                String lastName = item.getLastName();
                String risuid = item.getRisuid();
                String title = item.getTitle();
                String branchCode = item.getBranchCode();
                String branchName = item.getBrhName();
                String provinceCode = item.getProvinceCode();
                String provinceName = item.getProvinceName();
                Long payAmount = item.getPayAmount();
                String payDocNo = item.getPayDocNo();
                String message = item.getMessage();
                String pensionId = item.getPensionId();
                String alphabet = item.getAlphabet();
                String isHamkar = item.getIsHamkar();

                String secondConfirmUserDate = (item.getSecondConfirmDate() != null ? (String.valueOf(item.getSecondConfirmDate())).trim() : "");
                secondConfirmUserDate = (!secondConfirmUserDate.isEmpty() ? secondConfirmUserDate.substring(0, 4) + "/" + secondConfirmUserDate.substring(4, 6) + "/" + secondConfirmUserDate.substring(6) : "");

                String firstConfirmUserDate = (item.getFirstConfirmDate() != null ? (String.valueOf(item.getFirstConfirmDate())).trim() : "");
                firstConfirmUserDate = (!firstConfirmUserDate.isEmpty() ? firstConfirmUserDate.substring(0, 4) + "/" + firstConfirmUserDate.substring(4, 6) + "/" + firstConfirmUserDate.substring(6) : "");

                String payDocDate = (item.getPayDocDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
                payDocDate = (!payDocDate.isEmpty() ? payDocDate.substring(0, 4) + "/" + payDocDate.substring(4, 6) + "/" + payDocDate.substring(6) : "");

                String nationality = (item.getNationality().equals("01") ? "01" : "02");
                nationality = NationalityEnum.find(nationality).getName();
                String calcStartDate = (item.getCalcStartDate() != null ? (String.valueOf(item.getCalcStartDate())).trim() : "");
                calcStartDate = (!calcStartDate.isEmpty() ? calcStartDate.substring(0, 4) + "/" + calcStartDate.substring(4, 6) + "/" + calcStartDate.substring(6) : "");
                String calcEndDate = (item.getCalcEndDate() != null ? (String.valueOf(item.getCalcEndDate())).trim() : "");
                calcEndDate = (!calcEndDate.isEmpty() ? calcEndDate.substring(0, 4) + "/" + calcEndDate.substring(4, 6) + "/" + calcEndDate.substring(6) : "");
                String sendToMaliUserDesc = (item.getSendToMaliUser() != null ? String.valueOf(item.getSendToMaliUser()) : "");
                String sendToMaliDate = (item.getSendToMaliDate() != null ? String.valueOf(item.getSendToMaliDate()) : "");
                sendToMaliDate = (!sendToMaliDate.isEmpty() ? sendToMaliDate.substring(0, 4) + "/" + sendToMaliDate.substring(4, 6) + "/" + sendToMaliDate.substring(6) : "");

                if (!(webProperties.getProperty("system.asnad.id").equals(systemId))) {
                    firstConfirmUserDesc = (item.getFirstConfirmUser() != null ? String.valueOf(item.getFirstConfirmUser()) : "");
                    firstConfirmDate = (item.getFirstConfirmDate() != null ? String.valueOf(item.getFirstConfirmDate()) : "");
                    firstConfirmDate = (!firstConfirmDate.isEmpty() ? firstConfirmDate.substring(0, 4) + "/" + firstConfirmDate.substring(4, 6) + "/" + firstConfirmDate.substring(6) : "");
                    secondConfirmUserDesc = (item.getSecondConfirmUser() != null ? String.valueOf(item.getSecondConfirmUser()) : "");
                    secondConfirmDate = (item.getSecondConfirmDate() != null ? String.valueOf(item.getSecondConfirmDate()) : "");
                    secondConfirmDate = (!secondConfirmDate.isEmpty() ? secondConfirmDate.substring(0, 4) + "/" + secondConfirmDate.substring(4, 6) + "/" + secondConfirmDate.substring(6) : "");
                    accCode = item.getAccCode();
                }

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(natcode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(accountNo);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(firstName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(lastName);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(risuid);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(nationality);

                if (webProperties.getProperty("system.asnad.id").equals(systemId)) {

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(provinceCode);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(provinceName);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(branchCode);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(branchName);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(payAmount);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(payDocNo);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(calcStartDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(calcEndDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(sendToMaliUserDesc);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(sendToMaliDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(message);
                } else if (webProperties.getProperty("system.pension.id").equals(systemId)) {

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(pensionId);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(alphabet);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(title);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(isHamkar);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(provinceCode);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(provinceName);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(branchCode);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(branchName);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(payAmount);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(payDocNo);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(payDocDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(calcStartDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(calcEndDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(firstConfirmUserDesc);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(firstConfirmUserDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(secondConfirmUserDesc);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(secondConfirmUserDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(sendToMaliUserDesc);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(sendToMaliDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(message);

                } else {
                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(title);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(provinceCode);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(provinceName);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(branchCode);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(branchName);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(payAmount);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(payDocNo);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(calcStartDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(calcEndDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(firstConfirmUserDesc);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(firstConfirmDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(secondConfirmUserDesc);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(secondConfirmDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(sendToMaliUserDesc);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(sendToMaliDate);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(accCode);

                    cell = row.createCell(cellnum++);
                    cell.setCellStyle(detailStyle);
                    cell.setCellValue(message);
                }

            }
        } catch (Exception ex) {
            Logger.getLogger(UplodBankAccountService.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
        return workbook;
    }

}
