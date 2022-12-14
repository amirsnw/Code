/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author s_maknooni وضعیت ارسال و پرداخت رکورد در جدول gl_individual_pay برای
 * رکوردهایی که اتوماتیک به بانک ارسال میشوند و توسط بانک پرداخت میشوند
 *
 */
public enum PayStatusEnum {

    ERSAL_NASHODE("آماده ارسال", "0"),
    SEND_SUCCESSFULLY("با موفقیت ارسال شده", "1"),
    SEND_FAILED("خطا در ارسال به بانک", "2"),
    PAY_SUCCESSFULLY("با موفقیت پرداخت شده", "3"),
    PAY_FAILED("خطا در پرداخت", "4"),
    SODUR_SANAD("صدور سند حسابداری", "5");

    private String code;
    private String name;

    private PayStatusEnum(String name, String code) {

        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static List<Map> getEnum(String value) {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (PayStatusEnum item : PayStatusEnum.values()) {
            map = new HashMap<>();
            if (value.isEmpty()) {
                map.put("code", item.getCode());
                map.put("name", item.getName());
                list.add(map);
            } else {
                if (item.getCode().contains(value) || item.getName().contains(value)) {
                    map.put("code", item.getCode());
                    map.put("name", item.getName());
                    list.add(map);
                }
            }
        }

        return list;
    }

    public static PayStatusEnum find(String code) {
        for (PayStatusEnum status : PayStatusEnum.values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        return null;
    }

}
