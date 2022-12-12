/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.baseinfo;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.insurance.baseinfo.model.Branch;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author e_shoghi
 */
@Stateless
public class BranchManager {

    @Inject
    private EntityManager entityManager;

    public Map search(FilterWrapper fw, Integer start, Integer limit) throws ProxyProcessingException {
        List<Branch> w = null;
        Long qcount = 0l;
        Map<String, Object> dataPage = new HashMap<>();
        if (fw != null) {
            Set<Filter> filters = fw.getFilters();
            String value = "";
            for (Filter f : filters) {
                value = f.getValue();
            }
            String q = "select t from Branch t ";
            String qc = "select count(t) from Branch t";
            if (!"".equals(value)) {
                value = value.replace("*", "");
                q = q + " where   (t.branchCode LIKE '%" + value + "%' or t.branchName LIKE '%" + value + "%'" + ")";
                qc = qc + " where (t.branchCode LIKE '%" + value + "%' or t.branchName LIKE '%" + value + "%'" + ")";
            }
            w = (List<Branch>) entityManager.createQuery(q).setFirstResult(start).setMaxResults(limit).getResultList();
            qcount = ((Long) entityManager.createQuery(qc).getSingleResult());
            // return new CollectionData(w, qcount);
        } else {
            w = (List<Branch>) entityManager.createQuery("select t from Branch t").setFirstResult(start).setMaxResults(limit).getResultList();
            qcount = (Long) entityManager.createQuery("select count(t) from Branch t").getSingleResult();
        }
        dataPage.put("total", qcount);
        dataPage.put("list", w);
        return dataPage;
    }

    public Branch get(String organizationId) {
        Branch model = (Branch) entityManager.createQuery("select b from Branch b where b.branchCode=:code")
                .setParameter("code", organizationId)
                .getSingleResult();
        return model;

    }
//    public List<String> getBranches(String organizationId) {
//        List<String> branchList =  entityManager.createQuery(
//                "select b.branchCode  from Branch b  where b.cityCode in (select t.cityCode from Branch t where t.branchKind = '2' and t.branchCode =:code)  and b.branchKind = '1'")
//                .setParameter("code", organizationId)
//                .getResultList();
//        return branchList;
//
//    }
    public List<String> getBranches(String organizationId) {
        List<String> branchList =  entityManager.createQuery(              
                "select b.branchCode  from Branch b  where b.cityCode in (select t.cityCode from City  t where t.provinceCode in (select c.provinceCode  from City c  where c.cityCode  in (select p.cityCode from Branch p where p.branchKind = '2' and p.branchCode =:code)))and b.branchKind = '1'")
                .setParameter("code", organizationId)
                .getResultList();
        return branchList;

    }
}
