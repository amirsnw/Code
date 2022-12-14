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
 * @author s_maknooni وضعیت پرداخت در جدول GL_PAY_DETAIL برای رکوردهای پرداخت در
 * لیست
 */
public enum PayDetailStatusEnum {

    READY_FOR_PAY("آماده پرداخت", Character.valueOf('1')),
    PAIED("پرداخت شده", Character.valueOf('2')),
    RETURNED("برگشتی", Character.valueOf('3'));// خطا در پرداخت

    private Character code;
    private String name;
    private String codeName;

    private PayDetailStatusEnum(String name, Character code) {

        this.code = code;
        this.name = name;
    }

    public Character getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getCodeName() {
        return code + " " + name;
    }

    public static List<Map> getEnum(String value) {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (PayDetailStatusEnum item : PayDetailStatusEnum.values()) {
            map = new HashMap<>();
            if (value.isEmpty()) {
                map.put("code", item.getCode().toString());
                map.put("name", item.getName());
                map.put("codeName", item.getCodeName());
                list.add(map);
            } else {
                if (item.getCode().toString().contains(value) || item.getName().contains(value)) {
                    map.put("code", item.getCode().toString());
                    map.put("name", item.getName());
                    map.put("codeName", item.getCodeName());
                    list.add(map);
                }
            }
        }

        return list;
    }



    public static PayDetailStatusEnum find(Character code) {
        for (PayDetailStatusEnum status : PayDetailStatusEnum.values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        return null;
    }

}
