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
 * @author s_maknooni وضعیت پرداخت در جدول GL_PAY_HEAD وضعیت لیست پرداخت
 *
 */
public enum PayStepEnum {

    SEHATSANJI("صحت سنجی", Character.valueOf('1')),
    CHEQUE_ISSUED("چک صادر شده", Character.valueOf('2')),
    FIRST_SIGN("امضا اول", Character.valueOf('6')),
    SECOND_SIGN("امضا دوم", Character.valueOf('7')),
    CONFIRM_CHEQUE("تایید پرداخت", Character.valueOf('3')),
    SANAD_MOVAGHAT("سند موقت", Character.valueOf('4')),
    SANAD_GHATIE("سند قطعی", Character.valueOf('5'));

    private Character code;
    private String name;
    private String codeName;

    private PayStepEnum(String name, Character code) {

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
        for (PayStepEnum item : PayStepEnum.values()) {
            map = new HashMap<String, String>();
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

    public static PayStepEnum find(Character code) {
        for (PayStepEnum step : PayStepEnum.values()) {
            if (step.getCode().equals(code)) {
                return step;
            }
        }
        return null;
    }

}
