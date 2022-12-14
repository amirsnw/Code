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
 * @author s_maknooni وضعیت پرداخت در جدول GL_INDIVIDUAL_PAY
 *
 */
public enum IndividualPayTypeEnum {

    AUTOMATIC("ارسال خودکار", "1"),
    MANUALLY("ارسال دستی", "2");

    private String code;
    private String name;

    private IndividualPayTypeEnum(String name, String code) {
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
        for (IndividualPayTypeEnum item : IndividualPayTypeEnum.values()) {
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

    public static IndividualPayTypeEnum find(String code) {
        for (IndividualPayTypeEnum payType : IndividualPayTypeEnum.values()) {
            if (payType.getCode().equals(code)) {
                return payType;
            }
        }
        return null;
    }

}
