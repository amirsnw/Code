/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author f_fotuhi
 */
public enum MonthEnum {

    FARVARDIN("فروردین", (String) "01"),
    ORDIBEHESHT("اردیبهشت", (String) "02"),
    KHORDAD("خرداد", (String) "03"),
    TIR("تیر", (String) "04"),
    MORDAD("مرداد", (String) "05"),
    SHAHRIVAR("شهریور", (String) "06"),
    MEHR("مهر", (String) "07"),
    ABAN("آبان", (String) "08"),
    AZAR("آذر", (String) "09"),
    DAY("دی", (String) "10"),
    BAHMAN("بهمن", (String) "11"),
    ESFAND("اسفند", (String) "12");
    ;

    private String code;
    private String name;
    private String codeName;

    private MonthEnum(String name, String code) {

        this.code = code;
        this.name = name;
    }

    public String getCode() {
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
        for (MonthEnum item : MonthEnum.values()) {
            map = new HashMap<String, String>();
            if (value.isEmpty()) {
                map.put("code", item.getCode());
                map.put("name", item.getName());
                map.put("codeName", item.getCodeName());
                list.add(map);
            } else {
                if (item.getCode().contains(value) || item.getName().contains(value)) {
                    map.put("code", item.getCode());
                    map.put("name", item.getName());
                    map.put("codeName", item.getCodeName());
                    list.add(map);
                }
            }
        }

        return list;
    }
    
     public static String getNameOf(String code) {
        for (MonthEnum type : MonthEnum.values()) {
            if (type.getCode().equals(code)) {
                return type.getName();
            }
        }

        return "";
    }

}
