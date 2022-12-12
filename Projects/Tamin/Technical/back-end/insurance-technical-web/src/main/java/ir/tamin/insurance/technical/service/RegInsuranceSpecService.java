package ir.tamin.insurance.technical.service;

import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by na_chabok on 11/20/2019.
 */
public class RegInsuranceSpecService {
    @Inject
    private EntityManager em;
    @Inject
    private RestServices restService;

    @Inject
    private UserManager um;

    public Map<String, Object> getRegInsuranceSpecWithNationaCode(String nationalCode) throws SQLException {

        Map<String, Object> map = new HashMap<>();

        InsuranceRegisteration bs = restService.getLastInsuranceRelation(null, null, null, nationalCode);
        if (bs != null && bs.getBrchCode() != null) {
            map.put("branchCode", bs.getBrchCode());
            map.put("id", bs.getId());
            map.put("firstName", bs.getFirstName());
            map.put("lastName", bs.getLastName());
            map.put("birthDate", bs.getDoB());
            map.put("idNo", bs.getIdCardNumber());
        }
        return map;
    }

    public Map<String, Object> getRegInsuranceSpecWithInsuranceId(String nationalCode) throws SQLException {

        Map<String, Object> map = new HashMap<>();

        InsuranceRegisteration bs = restService.getLastInsuranceRelation(null, null, null, nationalCode);
        if (bs != null && bs.getBrchCode() != null) {
            map.put("branchCode", bs.getBrchCode());
            map.put("id", bs.getId());
            map.put("firstName", bs.getFirstName());
            map.put("lastName", bs.getLastName());
            map.put("birthDate", bs.getDoB());
            map.put("idNo", bs.getIdCardNumber());
        }
        return map;
    }

    public Map<String, Object> getRegInsuranceSpecWithForeignCode(String foreignCode) throws SQLException {
        Map<String, Object> map = new HashMap<>();

        InsuranceRegisteration bs = restService.getLastForeignRelation(null, null, null, foreignCode);
        if (bs != null && bs.getBrchCode() != null) {
            map.put("branchCode", bs.getBrchCode());
            map.put("id", bs.getId());
            map.put("firstName", bs.getFirstName());
            map.put("lastName", bs.getLastName());
            map.put("birthDate", bs.getDoB());
            map.put("idNo", bs.getIdCardNumber());
        }
        return map;
    }

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort, String username) {
        Map<String, Object> map = new HashMap<>();
        return map;
    }

}
