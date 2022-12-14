///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package ir.tamin.incomeBank.service.schedulers.treasury;
//
//import ir.tamin.incomeBank.model.schedulers.treasury.TrsDocsData;
//import ir.tamin.incomeBank.model.schedulers.treasury.TrsFileInfo;
//import ir.tamin.incomeBank.service.common.FTPService;
//import ir.tamin.incomeBank.util.DateUtils;
//import ir.tamin.incomeBank.util.TextUtils;
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.Iterator;
//import java.util.List;
//import javax.ejb.Schedule;
//import javax.ejb.Singleton;
//import javax.inject.Inject;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.ss.usermodel.Sheet;
//import org.apache.poi.util.IOUtils;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
///**
// *
// * @author s_maknooni Get Treasury documents from Melli Bank
// */
//@Singleton
//public class ScheduledGetTreasuryDocFromMelliBank {
//
//    @Inject
//    private TrsFileInfoService fileInfoService;
//
//    @Inject
//    private FTPService fTPService;
//
//    @Inject
//    private TrsDocsDataService docsDataService;
//
//    public static final String EXCEL_EXTENTION = ".xlsx";
//
//    private final static Logger logger = LoggerFactory.getLogger(ScheduledGetTreasuryDocFromMelliBank.class);
//
//    /**
//     * *
//     * Sunday : 0 or 7 Monday : 1 Tuesday : 2 Wednesday : 3 Thursday : 4 Friday
//     * : 5 Saturday : 6
//     */
//    @Schedule(second = "0", minute = "0,1", hour = "8-23", dayOfWeek = "0", month = "*", year = "*", info = "Sundays (0 or 7 )- Every 1 hour", persistent = false)
//    public void treasuryDocsTimer() {
//        TrsFileInfo fileInfo;
//        Date start = new Date();
//        String today = DateUtils.getJalaliStandard(start, "");
//        String today6 = DateUtils.format(start, "yyMMdd");
//        logger.info("**********getTreasuryDocsTimer start at : " + start);
//        XSSFWorkbook workbook = null;
//        InputStream inputStream = null;
//        try {
//            //1 - Have a file downloaded today?
//            fileInfo = fileInfoService.getFileInfoByDate(today);
//            if (fileInfo == null) {
//                // 2 - Is the file on the path you are looking for?
//                String fileName = "taminEj_" + today6 + EXCEL_EXTENTION;
//
//                inputStream = fTPService.returnFileStream(fileName);
//
//                fileInfo = new TrsFileInfo();
//                if (inputStream != null) { // File is ready to read
//                    // 3 - Read the file 
//                    List<TrsDocsData> dataList = new ArrayList<>();
//                    workbook = new XSSFWorkbook(inputStream);
//                    Sheet sheet = workbook.getSheetAt(1);
//
//                    Iterator<Row> iterator = sheet.iterator();
//                    if (iterator.hasNext()) {
//                        iterator.next();
//                        if (iterator.hasNext()) {
//                            Row nextRow;
//                            TrsDocsData docsData;
//                            while (iterator.hasNext()) {
//                                nextRow = iterator.next();
//                                docsData = convertToModel(nextRow);
//                                docsData.setFileInfo(fileInfo);
//                                dataList.add(docsData);
//                            }
//                        }
//                    }
//
//                    // 4 - Insert into table
//                    fileInfo.setFileDate(today);
//                    fileInfo.setCreateDate(new Date());
//                    fileInfo.setDataList(dataList);
//                    fileInfoService.save(fileInfo);
//
//                }// there in no file
//            }// else : File previously downloaded
//            // finish the job
//            Date end = new Date();
//            logger.info("**********SadadParserTimer Pars Excel file finished successfully at " + end + ", took " + (new Date(end.getTime() - start.getTime()).getTime()) / 1000);
//
//        } catch (Exception e) {
//            Date end = new Date();
//            logger.error("Unknown error occurred at " + end, e);
//        } finally {
//            IOUtils.closeQuietly(inputStream);
//        }
//    }
//
//    public void treasuryDocsTimer(String customDate8) {
//        TrsFileInfo fileInfo;
//        Date start = new Date();
//        logger.info("**********getTreasuryDocsTimer start at : " + start);
//        XSSFWorkbook workbook = null;
//        InputStream inputStream = null;
//        try {
//            //1 - Have a file downloaded today?
//            fileInfo = fileInfoService.getFileInfoByDate(customDate8);
//            if (fileInfo == null) {
//                // 2 - Is the file on the path you are looking for?
//                String fileName = "taminEj_" + customDate8.substring(2) + EXCEL_EXTENTION;
////                String fileName = "taminEj_" + date6 + " - AllData" + EXCEL_EXTENTION;
//                inputStream = fTPService.returnFileStream(fileName);
//
//                fileInfo = new TrsFileInfo();
//                if (inputStream != null) { // File is ready to read
//                    // 3- Insert head
//                    fileInfo.setFileDate(customDate8);
//                    fileInfo.setCreateDate(new Date());
//                    fileInfoService.save(fileInfo);
//
//                    // 4 - Read the file 
////                    List<TrsDocsData> dataList = new ArrayList<>();
//                    workbook = new XSSFWorkbook(inputStream);
//                    Sheet sheet = workbook.getSheetAt(1);
//
//                    Iterator<Row> iterator = sheet.iterator();
//                    if (iterator.hasNext()) {
//                        iterator.next();
//                        if (iterator.hasNext()) {
//                            Row nextRow;
//                            TrsDocsData docsData;
//                            while (iterator.hasNext()) {
//                                nextRow = iterator.next();
//                                docsData = convertToModel(nextRow);
//                                docsData.setFileInfo(fileInfo);
////                                dataList.add(docsData);
//                                docsDataService.save(docsData);
//                            }
//                        }
//                    }
//
////                    // 4 - Insert data into table
////                    fileInfo.setFileDate(today);
////                    fileInfo.setCreateDate(new Date());
////                    fileInfo.setDataList(dataList);
////                    fileInfoService.save(fileInfo);
//                }// there in no file
//            }// else : File previously downloaded
//            // finish the job
//            Date end = new Date();
//            logger.info("**********SadadParserTimer Pars Excel file finished successfully at " + end + ", took " + (new Date(end.getTime() - start.getTime()).getTime()) / 1000);
//
//        } catch (Exception e) {
//            Date end = new Date();
//            logger.error("Unknown error occurred at " + end, e);
//        } finally {
//            IOUtils.closeQuietly(inputStream);
//        }
//    }
//
//    private TrsDocsData convertToModel(Row nextRow) {
//        TrsDocsData data = new TrsDocsData();
//        // ArticleId : کد رهگیری
//        data.setArticleId(((Double) nextRow.getCell(0).getNumericCellValue()).intValue());
//        // LevelName : عنوان اوراق
//        try {
//            String billsName = nextRow.getCell(1).getStringCellValue();
//            data.setBillsName(TextUtils.convertToEnglishDigits(billsName));
//        } catch (Exception e) {
//            Integer billsName = ((Double) nextRow.getCell(1).getNumericCellValue()).intValue();
//            data.setBillsName(TextUtils.convertToEnglishDigits(billsName.toString()));
//        }
//        // OrganizationName : نام دستگاه اجرایی
//        String organizationName = TextUtils.convertToEnglishDigits(nextRow.getCell(2).getStringCellValue());
//        data.setOrganizationName(organizationName);
//        // OrganizationIdentifier : کد دستگاه اجرایی
//        try {
//            Integer organizationIdentifier = ((Double) nextRow.getCell(3).getNumericCellValue()).intValue();
//            data.setOrganizationIdentifier(organizationIdentifier.toString());
//        } catch (Exception e) {
//            String organizationIdentifier = nextRow.getCell(3).getStringCellValue();
//            data.setOrganizationIdentifier(organizationIdentifier);
//        }
//        // Amount : تعداد
//        data.setBillsNumber(((Double) nextRow.getCell(4).getNumericCellValue()).intValue());
//        // Price :  مبلغ
//         try {
//             Long billsAmount = ((Double) nextRow.getCell(5).getNumericCellValue()).longValue();
//              data.setBillsAmount(billsAmount);
//        } catch (Exception e) {
//            String billsAmount = nextRow.getCell(5).getStringCellValue();
//            data.setBillsAmount(Long.valueOf(billsAmount));
//        }
//       
//        // UsanceDate : تاریخ سررسید
//        String dueDate = nextRow.getCell(6).getStringCellValue();
//        data.setDueDate(dueDate.replaceAll("/", ""));
//        // CreateDate : تاریخ صدور (چاپ)
//        String issueApprovalDate = (nextRow.getCell(7).getStringCellValue()).trim();
//        data.setIssueApprovalDate(DateUtils.convertPersianDateTimeStringToDate(issueApprovalDate.substring(0, 10), issueApprovalDate.substring(10)));
//        // UpdateDate : تاریخ آخرین اقدام
//        String lastModifiedDate = nextRow.getCell(8).getStringCellValue();
//        data.setLastModifiedDate(DateUtils.convertPersianDateTimeStringToDate(lastModifiedDate.substring(0, 10), lastModifiedDate.substring(10)));
//        // EdareOmoorCode : کد اداره امور
//        Integer edareomoorCode = ((Double) nextRow.getCell(9).getNumericCellValue()).intValue();
//        data.setEdareomoorCode(edareomoorCode.toString());
//        // EdareOmoorName : نام اداره امور
//        String edareomoorName = TextUtils.convertToEnglishDigits(nextRow.getCell(10).getStringCellValue());
//        data.setEdareomoorName(edareomoorName);
//        // BranchCode : کد شعبه
//        Integer bnkBrchCode = ((Double) nextRow.getCell(11).getNumericCellValue()).intValue();
//        data.setBnkBrchCode(bnkBrchCode.toString());
//        // BranchName : نام شعبه
//        String bnkBrchName = TextUtils.convertToEnglishDigits(nextRow.getCell(12).getStringCellValue());
//        data.setBnkBrchName(bnkBrchName);
//        // Name : نام مشتری
//        String employerName = TextUtils.convertToEnglishDigits(nextRow.getCell(13).getStringCellValue());
//        data.setEmployerName(employerName);
//        // Identifier : شناسه / کد ملی
//        Integer employerIdentifier = ((Double) nextRow.getCell(14).getNumericCellValue()).intValue();
//        data.setEmployerIdentifier(employerIdentifier.toString());
//        // BankCode : کد بانک
//        Integer bankCode = ((Double) nextRow.getCell(15).getNumericCellValue()).intValue();
//        data.setBankCode(bankCode.toString());
//        // BankName : نام بانک
//        data.setBankName(nextRow.getCell(16).getStringCellValue());
//        // IBAN : شماره شبا        
//        data.setIban(nextRow.getCell(17).getStringCellValue());
//        //  BourceId : کدبورسی
//        String stockCode = nextRow.getCell(18).getStringCellValue();
//        data.setStockCode(TextUtils.convertToEnglishDigits(stockCode));
//        // Status : وضعیت اوراق
//        Integer status = ((Double) nextRow.getCell(19).getNumericCellValue()).intValue();
//        data.setBillsStatus(status.toString());
//        //
//        data.setCreateDate(new Date());
//        return data;
//    }
//
//}
