package ir.tamin.insurance.technical.business.occur.ssupoccurpartlist;

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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Stateless
public class SsupOccurPartlistManager extends AbstractEntityProxy implements EntityProxy {

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
            String q = "select t from SSUP_OCCUR_PARTLIST t ";
           // String qc = "select count(t) from SSUP_OCCUR_PARTLIST t";
            if (!"".equals(value)) {
                value = value.replace("*", "");
                q = q + " where   ( t.part_code LIKE '%" + value + "%' or  t.part_code LIKE '%" + value + "%'" + ")";
             //   qc = qc + " where (t.causeCode LIKE '%" + value + "%' or t.causeDesc LIKE '%" + value + "%'" + ")";
            }
            w = (List<TbOccurCause>) entityManager.createQuery(q).setFirstResult(start).setMaxResults(limit).getResultList();
            qcount = ((Long) entityManager.createQuery(q).getSingleResult());

            dataPage.put("total", qcount);
            dataPage.put("list", w);
            return new CollectionData(w, qcount);
        }
        return super.search(clazz, fw, sw, start, limit, includeCount);
    }
}
