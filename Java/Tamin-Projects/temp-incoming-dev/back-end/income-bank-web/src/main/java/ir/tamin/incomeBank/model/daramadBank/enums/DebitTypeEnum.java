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
 * @author m_salami
 */
public enum DebitTypeEnum {
    ZIHESABI("ذیحسابی", "037");

    private String code;
    private String name;
    private String codeName;

    private DebitTypeEnum(String name, String code) {

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
        for (RcvTypeEnum item : RcvTypeEnum.values()) {
            map = new HashMap<>();
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

    public static RcvTypeEnum find(String code) {
        for (RcvTypeEnum status : RcvTypeEnum.values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        return null;
    }
}
