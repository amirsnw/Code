package ir.tamin.insurance.technical.business.occur;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.insurance.technical.model.occur.TbOccurCause;

import javax.ejb.Stateless;
import javax.inject.Named;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Stateless
@Named("TbOccurCauseManager")
public class TbOccurCauseManager extends AbstractEntityProxy implements EntityProxy {

    @Override
    @ProxyMethod
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        if (fw != null) {
            Set<Filter> filters = fw.getFilters();
            String value = "";
            for (Filter f : filters) {
                value = f.getValue();
            }
            List<TbOccurCause> w = null;
            Long qcount = 0l;
            Map<String, Object> dataPage = new HashMap<>();
            String q = "select t from TbOccurCause t ";
            String qc = "select count(t) from TbOccurCause t";
            if (!"".equals(value)) {
                value = value.replace("*", "");
                q = q + " where   (t.causeCode LIKE '%" + value + "%' or t.causeDesc LIKE '%" + value + "%'" + ")";
                qc = qc + " where (t.causeCode LIKE '%" + value + "%' or t.causeDesc LIKE '%" + value + "%'" + ")";
            }
            w = (List<TbOccurCause>) entityManager.createQuery(q).setFirstResult(start).setMaxResults(limit).getResultList();
            qcount = ((Long) entityManager.createQuery(qc).getSingleResult());

            dataPage.put("total", qcount);
            dataPage.put("list", w);
            return new CollectionData(w, qcount);
        }
        return super.search(clazz, fw, sw, start, limit, includeCount);
    }
}
