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
 * @author s_maknooni
 */
public enum SendToBankStatusEnum {

    ERSAL_NASHODE("ارسال نشده ", 0),
    SEND_SUCCESSFULLY("با موفقیت ارسال شده", 1),
    SEND_FAILED("خطا در ارسال به بانک", 2);

    private Integer code;
    private String name;

    private SendToBankStatusEnum(String name, Integer code) {

        this.code = code;
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static List<Map> getEnum(String value) {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (SendToBankStatusEnum item : SendToBankStatusEnum.values()) {
            map = new HashMap<String, String>();
            if (value.isEmpty()) {
                map.put("code", item.getCode().toString());
                map.put("name", item.getName());
//                map.put("codeName", item.getCodeName());
                list.add(map);
            } else {
                if (item.getCode().toString().contains(value) || item.getName().contains(value)) {
                    map.put("code", item.getCode().toString());
                    map.put("name", item.getName());
//                    map.put("codeName", item.getCodeName());
                    list.add(map);
                }
            }
        }

        return list;
    }

    public static SendToBankStatusEnum find(Integer code) {
        for (SendToBankStatusEnum status : SendToBankStatusEnum.values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        return null;
    }

}
