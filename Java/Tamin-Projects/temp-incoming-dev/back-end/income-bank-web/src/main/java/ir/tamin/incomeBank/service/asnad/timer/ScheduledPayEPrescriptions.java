/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.asnad.timer;

import ir.tamin.incomeBank.model.centralPayment.Setting;
import ir.tamin.incomeBank.model.centralPayment.enums.SendToBankStatusEnum;
import ir.tamin.incomeBank.service.asnad.PaymentTransferSumService;
import ir.tamin.incomeBank.service.centralPayment.SettingService;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author s_maknooni
 */
@Singleton
public class ScheduledPayEPrescriptions {

//    @Inject
//    private RestServices rs;
//    @Inject
//    private CommonService commonService;
    @Inject
    PaymentTransferSumService transferSumService;
    @Inject
    SettingService settingService;
    @Inject
    @WebProperties
    Bundle webBundle;

    private final static Logger logger = LoggerFactory.getLogger(ScheduledPayEPrescriptions.class);

//    @Schedule(minute = "*", dayOfMonth = "*", hour = "*", month = "*", year = "*", second = "00", persistent = false)
//    @Schedule(minute = "35", dayOfMonth = "*", hour = "13", month = "*", year = "*", second = "00", persistent = false)
//    @Schedule(minute = "15", dayOfMonth = "*", hour = "02,11,14", month = "*", year = "*", second = "00", persistent = false)
//    public void epPaymentTimer() {
//        Date start = new Date();
//        logger.info("**********ScheduledPayEPrescriptions start at : " + start);
//
////        ArrayList<String> cellPhones = new ArrayList<>();
////        cellPhones.add("98" + "9123123244");
////        MessageBody messageBody = commonService.getMessageBody(cellPhones, "Start paying at" + new Date());
////        rs.sendSms(messageBody);
//        //TODO : verify setting sign before get
//        Setting setting = settingService.getBySystemId(Integer.valueOf(webBundle.getProperty("system.asnad.id")));
//
//        FilterWrapper filterWrapper = new FilterWrapper();
//        Set<Filter> filterSet = new HashSet<Filter>();
//        Filter filter;
////         Long epMaxValue = 0L;
//        if (setting != null && setting.getEpMaxVal() != null) {
////            epMaxValue = setting.getEpMaxVal();
//            //1 -مبلغ 
//            filter = new Filter();
//            filter.setProperty("alalamount");
//            filter.setValue(setting.getEpMaxVal().toString());
//            filter.setOperator(Filter.Operator.BEFORE);//LessThanOrEqual
//            filterSet.add(filter);
//        }
//
//        //2 -تاریخ
//        Date today = new Date();
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(today);
//        calendar.add(Calendar.DATE, -1);
//        Date yesterday = calendar.getTime();
//        String yesterdayJalali = DateUtils.getJalaliStandard(yesterday, "");
//
//        filter = new Filter();
//        filter.setProperty("effectivedate");
//        filter.setValue(yesterdayJalali);
//        filter.setOperator(Filter.Operator.EQUAL);
//        filterSet.add(filter);
//
//        //3 -وضعیت
//        filter = new Filter();
//        filter.setProperty("status");
//        filter.setValue(SendToBankStatusEnum.ERSAL_NASHODE.getCode().toString());
//        filter.setOperator(Filter.Operator.EQUAL);
//        filterSet.add(filter);
//        filterWrapper.setFilters(filterSet);
//
//        try {
//            transferSumService.sendToRefahBank(filterWrapper);
//            Date end = new Date();
//            logger.info("**********ScheduledPayEPrescriptions Finished processing at " + end + ", took " + (new Date(end.getTime() - start.getTime()).getTime()) / 1000);
//        } catch (Exception e) {
//            Date end = new Date();
//            logger.error("Unknown error occurred at " + end, e);
//        }
//    }

}
