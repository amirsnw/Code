/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.baseinfo;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceContract;

import javax.ejb.Stateless;
import javax.inject.Named;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author e_shoghi
 */
@Stateless
@Named("InsuranceContractManager")
public class InsuranceContractManager extends AbstractEntityProxy implements EntityProxy {

    @Override
    @ProxyMethod
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        if (fw != null) {
            Set<Filter> filters = fw.getFilters();
            String value = "";
            for (Filter f : filters) {
                value = f.getValue();
            }
            List<InsuranceContract> w = null;
            Long qcount = 0l;
            Map<String, Object> dataPage = new HashMap<>();
            String q = "select t from InsuranceContract t ";
            String qc = "select count(t) from InsuranceContract t";
            if (!"".equals(value)) {
                value = value.replace("*", "");
                q = q + " where   (t.code LIKE '%" + value + "%' or t.description LIKE '%" + value + "%'" + ")";
                qc = qc + " where (t.code LIKE '%" + value + "%' or t.description LIKE '%" + value + "%'" + ")";
            }
            w = (List<InsuranceContract>) entityManager.createQuery(q).setFirstResult(start).setMaxResults(limit).getResultList();
            qcount = ((Long) entityManager.createQuery(qc).getSingleResult());

            dataPage.put("total", qcount);
            dataPage.put("list", w);
            return new CollectionData(w, qcount);
        }
        return super.search(clazz, fw, sw, start, limit, includeCount);
    }
}
