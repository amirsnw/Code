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
 * @author f_fotuhi
 */
public enum OnlinePayReportEnum {

    ERSAL_NASHODE("ارسال نشده", (String) "0"),
    ERSAL_SHODE_BANK("ارسال شده به بانک", (String) "1"),
    KHATA_ERSAL("خطا در ارسال", (String) "2"),
    PARDAKHT_SHODE("پرداخت شده", (String) "3"),
    KHATA_PARDAKHT("خطا در پرداخت", (String) "4");
//    KHATA_PARDAKHT_ADAM_MOJODI("خطا در پرداخت(عدم موجودی)", (String) "4"),
//    KHATA_PARDAKHT_OTHERS("خطا در پرداخت(سایر)", (String) "5");

    private String code;
    private String name;
    private String codeName;

    private OnlinePayReportEnum(String name, String code) {

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

    public static String getNameOf(String code) {
        for (OnlinePayReportEnum type : OnlinePayReportEnum.values()) {
            if (type.getCode().equals(code)) {
                return type.getName();
            }
        }

        return "";
    }

    public static List<Map> getEnum(String value) {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (OnlinePayReportEnum item : OnlinePayReportEnum.values()) {
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

}
