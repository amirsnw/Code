package ir.tamin.incomeBank.model.pension.enums;
/*
 *created by  a_alaiemousavi  6/26/2019
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum PensionTypePersonEnum {
    GHEYR_HAMKAR(" غیر همکار", "0"),
    HAMKAR("همکار", "1");

    private String name;
    private String code;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    PensionTypePersonEnum(String name, String code) {
        this.name = name;
        this.code = code;
    }
    public static PensionTypePersonEnum find(String code) {
        for (PensionTypePersonEnum pensionTypePerson : PensionTypePersonEnum.values()) {
            if (pensionTypePerson.getCode().equals(code)) {
                return pensionTypePerson;
            }
        }
        return null;
    }
    public static List<Map> getEnum() {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (PensionTypePersonEnum item : PensionTypePersonEnum.values()) {
            map = new HashMap<>();
            map.put("code", item.getCode());
            map.put("name", item.getName());
            list.add(map);
        }

        return list;
    }


}
