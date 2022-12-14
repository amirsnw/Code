/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.service.baseinfo;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.model.baseinfo.BranchTree;
import ir.tamin.insurance.technical.model.baseinfo.City;
import ir.tamin.insurance.technical.model.baseinfo.Province;
import ir.tamin.insurance.technical.model.user.OrgUser;
import org.jose4j.json.internal.json_simple.JSONObject;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author p_pourjahani
 */
public class OrganizationService {

    @Inject
    private EntityManager em;

    public Map<String, Object> getBranches(FilterWrapper filter, int start, int limit) {

        List<Branch> w = null;
        Long qcount = 0l;
        Map<String, Object> dataPage = new HashMap<>();
        String q = "select b from Branch b where b.branchKind in ('1', '2') ";
        String qc = "select count(b) from Branch b where b.branchKind in ('1', '2') ";
        if (filter != null && filter.getFilters() != null) {
            for (Filter item : filter.getFilters()) {
                Object value = item.getValue();
                q = q + " and (b.branchCode LIKE '" + value.toString().replace("*", "%") + "' or b.branchName LIKE '" + value.toString().replace("*", "%") + "'" + ")";
                qc = qc + " and (b.branchCode LIKE '" + value.toString().replace("*", "%") + "' or b.branchName LIKE '" + value.toString().replace("*", "%") + "'" + ")";
            }
        }
        q = q + " order by  b.branchCode";
        qc = qc + " order by  b.branchCode";
        w = (List<Branch>) em.createQuery(q)
                .setFirstResult(start)
                .setMaxResults(limit)
                .getResultList();
        qcount = ((Long) em.createQuery(qc)
                .getSingleResult());
        dataPage.put("total", qcount);
        dataPage.put("list", w);
        return dataPage;
    }

    public Map<String, Object> getItemPage(String code, FilterWrapper filter, Long start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();

        if (code == null) {
            map.put("filter", filter);
            map.put("start", start);
            map.put("limit", limit);
            map.put("sort", sortWrapper);
            return map;
        }
        if (limit == null) {
            limit = 10;
        }

        FilterWrapper searchFilterWrapper = new FilterWrapper();
        searchFilterWrapper.setFilters(new HashSet<Filter>());
        if (filter != null) {
            searchFilterWrapper.getFilters().addAll(filter.getFilters());
        }

        Filter fltr2 = new Filter();
        fltr2.setOperator(Filter.Operator.BEFORE);
        fltr2.setValue(code);
        fltr2.setProperty("title");
        searchFilterWrapper.getFilters().add(fltr2);

        Long countResult = getPageNumber(code);

        Long pageNumber = countResult / limit;
        start = pageNumber * limit;
        map.put("filter", filter);
        map.put("start", start);
        map.put("limit", limit);
        map.put("sort", sortWrapper);
        return map;

    }

    private Long getPageNumber(String id) {
        Long countResult = (Long) em.createQuery("select count(p) from Branch p where  p.code<=:code ")
                .setParameter("code", id)
                .getSingleResult();
        return countResult;
    }

    public Map<String, Object> getBranchesByFilter(FilterWrapper filter, int start, int limit, SortWrapper sw) {
        try {
            List<Branch> w = null;
            Long qcount = 0l;
            Map<String, Object> dataPage = new HashMap<>();
            String q = "select w from Branch w where w.status=:status";
            String qc = "select count(w) from Branch w  where w.status=:status";
            if (filter != null && filter.getFilters() != null) {
                for (Filter item : filter.getFilters()) {
                    Object value = item.getValue().trim();
                    Object name = item.getProperty().trim();
                    if (value.toString().startsWith("*")) {
                        value = value.toString().substring(1, value.toString().length() - 1);
                    }
                    if (name.toString().equalsIgnoreCase("provinceCode")) {
                        q = q + " and  w.cityCode in (select c.cityCode from City c where c.provinceCode='" + value.toString() + "') ";
                        qc = qc + " and  w.cityCode in (select c.cityCode from City c where c.provinceCode='" + value.toString() + "')";
                    } else if (name.toString().equalsIgnoreCase("branchCode")) {
                        q = q + " and w.branchCode LIKE '" + value.toString() + "%' ";
                        qc = qc + " and w.branchCode LIKE '" + value.toString() + "%' ";;
                    } else if (name.toString().equalsIgnoreCase("branchKind")) {
                        q = q + " and w.branchKind='" + value.toString() + "' ";
                        qc = qc + " and w.branchKind='" + value.toString() + "' ";
                    } else if (name.toString().equalsIgnoreCase("pBranchCode")) {
                        q = q + " and w.branchCode in (select t.branchCode from BranchTree t where t.pBranchCode='" + value.toString() + "') ";
                        qc = qc + " and w.branchCode in (select t.branchCode from BranchTree t where t.pBranchCode='" + value.toString() + "') ";
                    } else {
                        q = q + " and  (w.branchCode LIKE '" + value + "%' or w.branchName LIKE '%" + value.toString() + "%'" + ")";
                        qc = qc + " and (w.branchCode LIKE '" + value + "%' or w.branchName LIKE '%" + value.toString() + "%'" + ")";
                    }
                }
            }
            q = q + " order by  w.branchCode";
            qc = qc + " order by  w.branchCode";
            w = (List<Branch>) em.createQuery(q)
                    .setParameter("status", "1")
                    .setFirstResult(start).setMaxResults(limit).getResultList();
            qcount = ((Long) em.createQuery(qc)
                    .setParameter("status", "1")
                    .getSingleResult());
            dataPage.put("total", qcount);
            dataPage.put("list", w);
            return dataPage;
        } catch (Exception e) {
            e.printStackTrace();
            Logger.getLogger(OrganizationService.class.getName()).log(Level.SEVERE, null, e);
            return null;
        }
    }

    public JSONObject getBranchDetailInfo(OrgUser user) throws ProxyProcessingException {

        JSONObject info = new JSONObject();
        try {
            Branch branch = (Branch) em.find(Branch.class, user.getOrganization().getCode());
            BranchTree branchTree = (BranchTree) em.find(BranchTree.class, branch.getBranchCode());
            Branch parentBranch = (Branch) em.find(Branch.class, branchTree.getpBranchCode());
            City city = (City) em.find(City.class, branch.getCityCode());
            Province province = (Province) em.find(Province.class, city.getProvinceCode());

            // branchKind => setad = 7, ostan = 2, shobe = 1, kargozari = 5
            if (branch.getBranchKind().equals("1")) {
                info.put("branch", branch);
                info.put("broker", null);
            } else if (parentBranch.getBranchKind().equals("1") && branch.getBranchKind().equals("5")) {
                info.put("branch", parentBranch);
                info.put("broker", branch);
            } else if (branch.getBranchKind().equals("2")) {
                info.put("branch", null);
                info.put("broker", null);
            }
            info.put("province", province);
            info.put("branchKind", branch.getBranchKind());
        } catch (Exception e) {
            throw new ProxyProcessingException(e);
        }
        return info;
    }
}
