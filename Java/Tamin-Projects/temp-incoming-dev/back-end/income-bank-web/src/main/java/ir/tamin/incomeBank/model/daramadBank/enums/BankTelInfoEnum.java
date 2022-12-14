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
public enum BankTelInfoEnum {

    BANKAMOUNT("جمع موجودی طبق صورتحساب بانک درامد", "4"),
    SUMAMT_1("جمع ردیف های 1-1 الی 4-1", "5"),
    CASCUR("نقدی های جاری شناسایی نشده", "6"),
    HAVAMT("حواله های جاری شناسایی نشده", "7"),
    SUMAMT_5("جمع ردیف های 5و6و7", "8"),
    MOGHAMT("مغایرت", "9");

    private String code;
    private String name;

    private BankTelInfoEnum(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
    
      public static String getNameOf(String code) {
        for (BankTelInfoEnum type : BankTelInfoEnum.values()) {
            if (type.getCode().equals(code)) {
                return type.getName();
            }
        }

        return "";
    }
      
         public static List<Map> getEnum(String value) {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (BankTelInfoEnum item : BankTelInfoEnum.values()) {
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
}
