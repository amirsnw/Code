/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.asnad;

import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import ir.tamin.incomeBank.model.asnad.OrganizationModel;
import java.util.Arrays;
import javax.ejb.Stateless;

/**
 *
 * @author h_riazat
 */
@Stateless
public class VwAsnadPaymentListService {

    @Inject
    private EntityManager entityManager;

    public Map<String, Object> getAllHealthOrganization(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        List<Object> list = entityManager.createNamedQuery("VwAsnadPaymentList.getAllHealthOrganization", Object.class).getResultList();
        List<OrganizationModel> organizationList = new ArrayList<>();
        for (Object item : list) {
            OrganizationModel organizationModel = new OrganizationModel();
            Object[] record = (Object[]) item;
            String vahedCode = (String) record[0];
            String vahedName = (String) record[1];
            organizationModel.setVahedCode(vahedCode);
            organizationModel.setVahedName(vahedName);
            organizationList.add(organizationModel);
        }
        Map<String, Object> map = new HashMap<>();
        map.put("list", organizationList);
        map.put("total", list.size());
        return map;
    }

    public Map<String, Object> getAllCustType(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        String wwwStatus = null;
        List<String> custOwnerships = null;
        List<String> parTypes = null;
        String custName = null;
        String fromYearMonth = null;
        String toYearMonth = null;
        List<String> custTypes = null;
        List<String> bankCodes = null;
        if (filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {
                if (filter.getProperty().contains("wwwStatus")) {
                    wwwStatus = filter.getValue();
                }
                if (filter.getProperty().contains("custName")) {
                    custName = filter.getValue();
                }
                if (filter.getProperty().contains("custOwnerships")) {
                    String[] custOwnershipsArray = filter.getValue().split(",");
                    custOwnerships = Arrays.asList(custOwnershipsArray);
                }
                if (filter.getProperty().contains("parTypes")) {
                    String[] parTypesArray = filter.getValue().split(",");
                    parTypes = Arrays.asList(parTypesArray);
                }
                if (filter.getProperty().contains("fromYearMonth")) {
                    fromYearMonth = filter.getValue();
                }
                if (filter.getProperty().contains("toYearMonth")) {
                    toYearMonth = filter.getValue();
                }
                if (filter.getProperty().contains("custTypes")) {
                    String[] custTypesArray = filter.getValue().split(",");
                    custTypes = Arrays.asList(custTypesArray);
                }
                if (filter.getProperty().contains("bankCodes")) {
                    String[] bankCodesArray = filter.getValue().split(",");
                    bankCodes = Arrays.asList(bankCodesArray);
                }
            }
        }
        if (custName != null) {
            custName = "%" + custName + "%";
        }
        List<Object> list = entityManager.createNamedQuery("VwAsnadPaymentList.getAllCustType", Object.class)
                .setParameter("wwwStatus", wwwStatus)
                .setParameter("custOwnerships", custOwnerships)
                .setParameter("parTypes", parTypes)
                .setParameter("custName", custName)
                .setParameter("fromYearMonth", fromYearMonth)
                .setParameter("toYearMonth", toYearMonth)
                .setParameter("custTypes", custTypes)
                .setParameter("bankCodes", bankCodes)
                .getResultList();
        List<OrganizationModel> organizationList = new ArrayList<>();
        for (Object item : list) {
            OrganizationModel organizationModel = new OrganizationModel();
            Object[] record = (Object[]) item;
            String vahedCode = (String) record[0];
            String vahedName = (String) record[1];
            String custNo = (String) record[2];
            custName = (String) record[3];
            organizationModel.setVahedCode(vahedCode);
            organizationModel.setVahedName(vahedName);
            organizationModel.setCustNo(custNo);
            organizationModel.setCustName(custName);
            organizationList.add(organizationModel);
        }
        Map<String, Object> map = new HashMap<>();
        map.put("list", organizationList);
        map.put("total", list.size());
        return map;
    }

}
