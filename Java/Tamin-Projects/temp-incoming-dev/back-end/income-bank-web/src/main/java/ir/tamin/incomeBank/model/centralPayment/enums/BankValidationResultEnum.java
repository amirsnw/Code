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
 * @author s_maknooni نتایج بانک برای صحت سنجی اطلاعات حساب مورد استفاده در
 * جداول CP_BANK_ACCOUNT_CONTROL CP_BANK_ACCOUNT_CONTROL_HIS
 *
 */
public enum BankValidationResultEnum {

    VALID("معتبر", "1"),
    INVALID("نامعتبر", "2");

    private String code;
    private String name;

    private BankValidationResultEnum(String name, String code) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static List<Map> getEnum() {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (BankValidationResultEnum item : BankValidationResultEnum.values()) {
            map = new HashMap<>();
            map.put("code", item.getCode());
            map.put("name", item.getName());
            list.add(map);
        }

        return list;
    }

    public static List<Map> getEnum(String value) {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (BankValidationResultEnum item : BankValidationResultEnum.values()) {
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

    public static BankValidationResultEnum find(String code) {
        for (BankValidationResultEnum payType : BankValidationResultEnum.values()) {
            if (payType.getCode().equals(code)) {
                return payType;
            }
        }
        return null;
    }

}
