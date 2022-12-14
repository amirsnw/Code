///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package ir.tamin.incomeBank.service.daramadBank;
//
//import ir.tamin.incomeBank.model.baseinfo.Branch;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.ArrayList;
//import ir.tamin.incomeBank.model.daramadBank.BankTelInfo;
//import ir.tamin.incomeBank.model.daramadBank.DrmdTelInfo;
//import ir.tamin.incomeBank.model.daramadBank.TelInfo;
//import ir.tamin.incomeBank.model.daramadBank.enums.BankTelInfoEnum;
//import ir.tamin.incomeBank.model.daramadBank.enums.MonthEnum;
//import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
//import ir.tamin.incomeBank.util.DateUtils;
//import ir.tamin.framework.ws.rest.json.Filter;
//import ir.tamin.framework.ws.rest.json.FilterWrapper;
//import ir.tamin.framework.ws.rest.json.Sort;
//import ir.tamin.framework.ws.rest.json.SortWrapper;
//import ir.tamin.incomeBank.model.centralPayment.Setting;
//import java.io.IOException;
//import java.io.InputStream;
//import java.sql.SQLException;
//import java.sql.Types;
//import java.util.Collection;
//import java.util.Date;
//import java.util.HashSet;
//import java.util.Iterator;
//import java.util.Set;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//import javax.inject.Inject;
//import javax.persistence.EntityManager;
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Order;
//import javax.persistence.criteria.Root;
//import net.sf.jasperreports.engine.JasperRunManager;
//import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
//
///**
// *
// * @author f_fotuhi
// */
//public class TelInfoService2 {
//
//    @Inject
//    EntityManager entityManager;
//
//    @Inject
//    private StoredProcedure procedure;
//
//    @Inject
//    DrmdTelInfoService drmdTelInfoService;
//
//    public Map<String, Object> getAllBankTelInfo(FilterWrapper filterWrapper, SortWrapper sort) throws SQLException {
//
//        List<BankTelInfo> result = new ArrayList<>();
//        BankTelInfo model;
//        if (filterWrapper == null) {
//            for (BankTelInfoEnum opb : BankTelInfoEnum.values()) {
//                model = new BankTelInfo();
//                model.setRowNumber(opb.getName());
//                model.setDescription(opb.getCode());
//                model.setAmount(0L);
//                result.add(model);
//            }
//        } else {
//
//            String branchCode = null;
//            String year = null;
//            String month = null;
//            String day = "00";
//
//            Object[] filterArray = filterWrapper.getFilters().toArray();
//            for (int i = 0; i < filterArray.length; i++) {
//                Filter filter = (Filter) filterArray[i];
//                String field = filter.getProperty();
//                Object value = filter.getValue();
//
//                if (field.equals("compMdate")) {
//                    year = value.toString().substring(0, 4);
//                    month = value.toString().substring(4, 6);
//                }
//                if (field.equals("brhCode")) {
//                    branchCode = value.toString();
//                }
//                if (field.equals("day")) {
//                    day = value.toString();
//                }
//            }
//
////            procedure.query("{?=call pck_telproc.Getbnktelinfo(?,?,?,?,?,?,?,?,?,?,?)}");
//            //TODO
//            procedure.query("{?=call pck_telproc_core.getbnktelinfo(?,?,?,?,?,?,?,?,?,?,?)}");
//            procedure.setOutParameter(1, Types.NUMERIC)
//                    .setInParameter(2, branchCode)
//                    .setInParameter(3, year)
//                    .setInParameter(4, month)
//                    .setInParameter(5, day)
//                    .setOutParameter(6, Types.NUMERIC)
//                    .setOutParameter(7, Types.NUMERIC)
//                    .setOutParameter(8, Types.NUMERIC)
//                    .setOutParameter(9, Types.NUMERIC)
//                    .setOutParameter(10, Types.NUMERIC)
//                    .setOutParameter(11, Types.NUMERIC)
//                    .setOutParameter(12, Types.CHAR);
//            procedure.execute();
//            Long bankAmount = (procedure.getOutParameter(1) != null ? Long.valueOf(procedure.getOutParameter(1).toString()) : 0L);
//            Long sumAmt_1 = (procedure.getOutParameter(6) != null ? Long.valueOf(procedure.getOutParameter(6).toString()) : 0L);
//            Long cascur = (procedure.getOutParameter(7) != null ? Long.valueOf(procedure.getOutParameter(7).toString()) : 0L);
//            Long havAmt = (procedure.getOutParameter(8) != null ? Long.valueOf(procedure.getOutParameter(8).toString()) : 0L);
//            Long sumAmt_5 = (procedure.getOutParameter(9) != null ? Long.valueOf(procedure.getOutParameter(9).toString()) : 0L);
//            Long moghAmt = (procedure.getOutParameter(10) != null ? Long.valueOf(procedure.getOutParameter(10).toString()) : 0L);
//            String ghaty = (procedure.getOutParameter(12) != null ? procedure.getOutParameter(12).toString() : "");
//            ghaty = (ghaty.contains("1") ? "قطعی" : "برآوردی");
//
//            model = new BankTelInfo();
//            model.setRowNumber(BankTelInfoEnum.BANKAMOUNT.getName());
//            model.setDescription(BankTelInfoEnum.BANKAMOUNT.getCode());
//            model.setAmount(bankAmount);
//            result.add(model);
//
//            model = new BankTelInfo();
//            model.setRowNumber(BankTelInfoEnum.SUMAMT_1.getName());
//            model.setDescription(BankTelInfoEnum.SUMAMT_1.getCode());
//            model.setAmount(sumAmt_1);
//            result.add(model);
//
//            model = new BankTelInfo();
//            model.setRowNumber(BankTelInfoEnum.CASCUR.getName());
//            model.setDescription(BankTelInfoEnum.CASCUR.getCode());
//            model.setAmount(cascur);
//            result.add(model);
//
//            model = new BankTelInfo();
//            model.setRowNumber(BankTelInfoEnum.HAVAMT.getName());
//            model.setDescription(BankTelInfoEnum.HAVAMT.getCode());
//            model.setAmount(havAmt);
//            result.add(model);
//
//            model = new BankTelInfo();
//            model.setRowNumber(BankTelInfoEnum.SUMAMT_5.getName());
//            model.setDescription(BankTelInfoEnum.SUMAMT_5.getCode());
//            model.setAmount(sumAmt_5);
//            result.add(model);
//
//            model = new BankTelInfo();
//            model.setRowNumber(BankTelInfoEnum.MOGHAMT.getName());
//            model.setDescription(BankTelInfoEnum.MOGHAMT.getCode());
//            model.setAmount(moghAmt);
//            result.add(model);
//
//            model = new BankTelInfo();
//            model.setRowNumber("12");
//            model.setDescription(ghaty);
//            model.setAmount(0L);
//            result.add(model);
//        }
//
//        Map<String, Object> map = new HashMap<>();
//        map.put("list", result);
//        map.put("total", BankTelInfoEnum.values().length);
//
//        return map;
//    }
//
//    public Map<String, Object> getAll(FilterWrapper filterWrapper, SortWrapper sort) {
//
//        String branchCode = null;
//        String year = null;
//        String month = null;
//        String day = "00";
//        String flagAmount = null;
//
//        Object[] filterArray = filterWrapper.getFilters().toArray();
//        for (int i = 0; i < filterArray.length; i++) {
//            Filter filter = (Filter) filterArray[i];
//            String field = filter.getProperty();
//            Object value = filter.getValue();
//
//            if (field.equals("compMdate")) {
//                year = value.toString().substring(0, 4);
//                month = value.toString().substring(4, 6);
//            }
//            if (field.equals("brhCode")) {
//                branchCode = value.toString();
//            }
//            if (field.equals("day")) {
//                day = value.toString();
//            }
//            if (field.equals("flagAmount")) {
//                flagAmount = value.toString();
//            }
//        }
//
//        Map<String, Object> map = new HashMap<>();
//        List<Object[]> list;
//        List<TelInfo> finalList = new ArrayList<>();
////      list = entityManager.createNativeQuery("select * from the(select cast (pck_telProc.GetExtTelInfo(?1,?2,?3,?4) as trelinfotype) from dual)")
//        //TODO
//        if ("1".equals(flagAmount)) {
//            list = entityManager.createNativeQuery("select * from the(select cast (pck_TelProc_core.GetExtTelInfo(?1,?2,?3,?4) as  trelinfotype_core) from dual)where flg_amt = ?5")
//                    .setParameter(1, branchCode)
//                    .setParameter(2, year)
//                    .setParameter(3, month)
//                    .setParameter(4, day)
//                    .setParameter(5, flagAmount)
//                    .getResultList();
//        } else {
//            list = entityManager.createNativeQuery("select * from the(select cast (pck_TelProc_core.GetExtTelInfo(?1,?2,?3,?4) as  trelinfotype_core) from dual)")
//                    .setParameter(1, branchCode)
//                    .setParameter(2, year)
//                    .setParameter(3, month)
//                    .setParameter(4, day)
//                    .getResultList();
//        }
//        Long amount = 0L;
//        Long currOldAmt = 0L;
//
////        Iterator iter = list.iterator();
////        Object first = iter.next();
////        Object second = iter.next();
////        Object[] obja = (Object[])second;
////            TelInfo telInfo = new TelInfo();
////            //    if(obja[8] != null) {
////            telInfo.setRowDesc(obja[3] != null ? obja[3].toString() : "");
////            telInfo.setDescribe(obja[4] != null ? obja[4].toString() : "");
////            telInfo.setAmount(obja[5] != null ? Long.valueOf(obja[5].toString()) : 0L);
////            telInfo.setRowType(obja[6] != null ? obja[6].toString() : "");
////            telInfo.setTelType(obja[7] != null ? obja[7].toString() : "");
////            telInfo.setCurrentAmt(obja[8] != null ? Long.valueOf(obja[8].toString()) : 0L);
////            telInfo.setOldAmt(obja[9] != null ? Long.valueOf(obja[9].toString()) : 0L);
////            //TODO    
////            telInfo.setBranchCode(obja[10] != null ? obja[10].toString() : "");
////
////            amount = amount + (obja[5] != null ? Long.valueOf(obja[5].toString()) : 0L);
////            currOldAmt = currOldAmt + (obja[8] != null ? Long.valueOf(obja[8].toString()) : 0L) + (obja[9] != null ? Long.valueOf(obja[9].toString()) : 0L);
////
////            finalList.add(telInfo);
//        for (Object[] obja : list) {
//
//            TelInfo telInfo = new TelInfo();
//            //    if(obja[8] != null) {
//            telInfo.setRowDesc(obja[3] != null ? obja[3].toString() : "");
//            telInfo.setDescribe(obja[4] != null ? obja[4].toString() : "");
//            telInfo.setAmount(obja[5] != null ? Long.valueOf(obja[5].toString()) : 0L);
//            telInfo.setRowType(obja[6] != null ? obja[6].toString() : "");
//            telInfo.setTelType(obja[7] != null ? obja[7].toString() : "");
//            telInfo.setCurrentAmt(obja[8] != null ? Long.valueOf(obja[8].toString()) : 0L);
//            telInfo.setOldAmt(obja[9] != null ? Long.valueOf(obja[9].toString()) : 0L);
//            //TODO    
//            telInfo.setBranchCode(obja[10] != null ? obja[10].toString() : "");
//
//            amount = amount + (obja[5] != null ? Long.valueOf(obja[5].toString()) : 0L);
//            currOldAmt = currOldAmt + (obja[8] != null ? Long.valueOf(obja[8].toString()) : 0L) + (obja[9] != null ? Long.valueOf(obja[9].toString()) : 0L);
//
//            finalList.add(telInfo);
//            //  }           
//
//        }
//        if (!finalList.isEmpty()) {
//            finalList.get(0).setTotalAmount(amount);
//            finalList.get(0).setTotalCurrOldAmount(currOldAmt);
//        }
//
//        map.put("list", finalList);
//        map.put("total", finalList.size());
//        return map;
//    }
//
//    public byte[] doGet(FilterWrapper filterWrappers, SortWrapper sort) throws IOException, SQLException {
//        InputStream reportStream = null;
//        String year = null;
//        String month = null;
//        String branchCode = null;
//        String day = "00";
//        String subject = "مشمول ماده103 برنامه چهارم توسعه";
//
//        Map<String, Object> parameters = new HashMap<>();
//        try {
//            Object[] filterArray = filterWrappers.getFilters().toArray();
//            for (int i = 0; i < filterArray.length; i++) {
//                Filter filter = (Filter) filterArray[i];
//                String field = filter.getProperty();
//                Object value = filter.getValue();
//
//                if (field.equals("compMdate")) {
//                    if (Integer.parseInt(value.toString()) <= 138312) {
//                        subject = "مشمول ماده49 برنامه سوم توسعه";
//                    } else if (Integer.parseInt(value.toString()) >= 139001) {
//                        subject = "مشمول ماده80 برنامه پنجم توسعه";
//                    }
//                    year = value.toString().substring(0, 4);
//                    month = value.toString().substring(4, 6);
//
//                }
//                if (field.equals("brhCode")) {
//                    branchCode = value.toString();
//
//                }
//                if (field.equals("day")) {
//                    day = value.toString();
//                }
//            }
//
//            parameters.put("subject", subject);
//
//            FilterWrapper filterWarpper = new FilterWrapper();
//            Set<Filter> filters = new HashSet<>();
//            Filter filter = new Filter();
//
//            filter.setProperty("drmdTelInfoPK.year");
//            filter.setValue(year);
//            filter.setOperator(Filter.Operator.EQUAL);
//            filters.add(filter);
//
//            filter = new Filter();
//            filter.setProperty("drmdTelInfoPK.month");
//            filter.setValue(month);
//            filter.setOperator(Filter.Operator.EQUAL);
//            filters.add(filter);
//
//            filter = new Filter();
//            filter.setProperty("drmdTelInfoPK.brhCode");
//            filter.setValue(branchCode);
//            filter.setOperator(Filter.Operator.EQUAL);
//            filters.add(filter);
//
//            filter = new Filter();
//
//            filter.setProperty("drmdTelInfoPK.day");
//            filter.setValue(day);
//            filter.setOperator(Filter.Operator.EQUAL);
//            filters.add(filter);
//
//            filterWarpper.setFilters(filters);
//
//            month = MonthEnum.getNameOf(month);
//            Branch branch = entityManager.find(Branch.class, branchCode);
//            branchCode = branch.getBrhName();
//
//            parameters.put("brchCode", branchCode);
//            parameters.put("year", year);
//            parameters.put("month", month);
//
//            List<TelInfo> reportList = (List<TelInfo>) getAll(filterWrappers, sort).get("list");
//            Long totalAmount = reportList.get(0).getTotalAmount();
//            Long totalCurOldAmt = reportList.get(0).getTotalCurrOldAmount();
//            parameters.put("totalAmt", totalAmount);
//            parameters.put("curOldAmt", totalCurOldAmt);
//            parameters.put("date", DateUtils.getJalaliStandard(new Date(), "/"));
//
//            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(reportList);
//            reportStream = TelInfoService.class.getResourceAsStream("/reports/daramadBank/telInfoRep.jasper");
//            parameters.put("dataSource", ds);
//
//            List<DrmdTelInfo> reportDetailDataList = drmdTelInfoService.getList(filterWarpper, null, null, null);
//            JRBeanCollectionDataSource subReportDataSource = new JRBeanCollectionDataSource(reportDetailDataList);
//            JRBeanCollectionDataSource part3DataSource = new JRBeanCollectionDataSource(reportDetailDataList);
//            parameters.put("subReportDataSource", subReportDataSource);
//            parameters.put("part3DataSource", part3DataSource);
//
//            List<BankTelInfo> bankTelInfoList = (List<BankTelInfo>) getAllBankTelInfo(filterWrappers, sort).get("list");
//            bankTelInfoList.remove(bankTelInfoList.size() - 1);
//            JRBeanCollectionDataSource part4DataSource = new JRBeanCollectionDataSource(bankTelInfoList);
//            parameters.put("part4DataSource", part4DataSource);
//
//            JRBeanCollectionDataSource part5DataSource = new JRBeanCollectionDataSource(reportDetailDataList);
//            parameters.put("part5DataSource", part5DataSource);
//
//            JRBeanCollectionDataSource part6DataSource = new JRBeanCollectionDataSource(reportDetailDataList);
//            parameters.put("part6DataSource", part6DataSource);
//
//            JRBeanCollectionDataSource part7DataSource = new JRBeanCollectionDataSource(reportDetailDataList);
//            parameters.put("part7DataSource", part7DataSource);
//
//            parameters.put("SUBREPORT_DIR", "/reports/daramadBank/");
//
//            byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, parameters, ds);
//            return byteStream;
//
//        } catch (Exception ex) {
//            Logger.getLogger(TelInfoService.class.getName()).log(Level.SEVERE, null, ex);
//        } finally {
//            if (reportStream != null) {
//                reportStream.close();
//            }
//        }
//
//        return null;
//    }
//
//}
