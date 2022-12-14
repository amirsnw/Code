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
 * @author s_maknooni دلایل حذف در جدول : gl_pay_detail_deleted یا دلایل برگشت
 * در جدول : gl_pay_detail
 * views : vw_payrecord_status , vw_bank_account_control , vw_bank_account_control_his
 */
public enum ReturnReasonEnum {

    ACCOUNT_IS_BLOCK("بسته بودن حساب", "01"),
    MISMATCH_ACCOUNT_NATCODE("عدم تطابق شماره حساب و کد ملی", "02"),
    INVALID_BANK("بانک غیرمجاز", "03"),
    NEED_MORE_REVIEW("نیاز به بررسی بیشتر", "04"),
    ELAM_SHOBE("اعلام واحد", "05"),
    INVALID_ACCOUNT("شماره حساب معتبر نمیباشد", "06"),
    INVALID_ACCCODE("کد حساب مالی نامعتبر", "07");

    private String code;
    private String name;
    private String codeName;

    private ReturnReasonEnum(String name, String code) {
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

    public static List<Map> getEnum() {
        List<Map> list = new ArrayList<>();
        Map<String, String> map;
        for (ReturnReasonEnum item : ReturnReasonEnum.values()) {
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
        for (ReturnReasonEnum item : ReturnReasonEnum.values()) {
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

    public static ReturnReasonEnum find(String code) {
        for (ReturnReasonEnum payType : ReturnReasonEnum.values()) {
            if (payType.getCode().equals(code)) {
                return payType;
            }
        }
        return null;
    }

}
