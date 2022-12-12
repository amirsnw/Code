///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
package ir.tamin.insurance.technical.business.user;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author l_eivazi
 */
public enum OrganizationTypeEnum {

    CENTERAL("7"),
    PROVINCE("2"),
    BRANCH("1"),
    KARGOZARI("5"),
    AGHMARI("A");

    private String code;

    private OrganizationTypeEnum(String code) {
        this.code = code;
    }

    public static OrganizationTypeEnum getEnumByCode(String code) {
        for (OrganizationTypeEnum organizationType : OrganizationTypeEnum.values()) {
            if (organizationType.getCode().equals(code)) {
                return organizationType;
            }
        }
        return null;
    }

    public static OrganizationTypeEnum getSupremeType(List<String> codes) {
        if (codes != null) {
            List<OrganizationTypeEnum> types = new ArrayList<OrganizationTypeEnum>();
            for (String code : codes) {
                types.add(getEnumByCode(code));
            }
            if (types.contains(CENTERAL)) {
                return CENTERAL;
            } else if (types.contains(PROVINCE)) {
                return PROVINCE;
            } else if (types.contains(BRANCH)) {
                return BRANCH;
            }
        }
        return null;
    }

    public String getCode() {
        return code;
    }
}
