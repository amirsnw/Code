/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.pension.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author s_maknooni روش پرداخت در مستمری مانند : بانک بنیاد شهید پست و ...
 *
 */
public enum PensionPayModelEnum {

    BANK("بانک", "2"),
    BONYAD_SHAHID("بنیاد شهید (ملی)", "3");

    private String code;
    private String name;

    private PensionPayModelEnum(String name, String code) {
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
        for (PensionPayModelEnum item : PensionPayModelEnum.values()) {
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
        for (PensionPayModelEnum item : PensionPayModelEnum.values()) {
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

    public static PensionPayModelEnum find(String code) {
        for (PensionPayModelEnum payType : PensionPayModelEnum.values()) {
            if (payType.getCode().equals(code)) {
                return payType;
            }
        }
        return null;
    }

}
