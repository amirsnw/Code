package ir.tamin.incomeBank.service.baseinfo;

import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.incomeBank.model.baseinfo.BranchView;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Stateless
public class BranchViewService {

    @Inject
    private EntityManager em;

    public Map<String, Object> getBranchs(FilterWrapper filterWrapper, int start, int limit) {
        Map<String, Object> dataPage = new HashMap<>();
        dataPage.put("list", getBranchsList(filterWrapper, start, limit));
        dataPage.put("total", getBranchsCount(filterWrapper));
        return dataPage;
    }

    private List<BranchView> getBranchsList(FilterWrapper filterWrapper, int start, int limit) {
        String brhCode = "", edareCode = "";
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {
                Object value = filter.getValue();
                String field = filter.getProperty();
                switch (field) {
                    case "brhCode":
                        brhCode = value.toString();
                        break;
                    case "edareCode":
                        edareCode = value.toString();
                        break;
                    default:
                        break;
                }
            }
        }
        return (List<BranchView>) em.createQuery("select t from BranchView t where " +
                " (:brhCode is null or t.brhCode like :brhCode or t.brhName like :brhCode) and" +
                " (:edareCode is null or t.edareCode = :edareCode) order by t.brhCode asc")
                .setParameter("brhCode", brhCode)
                .setParameter("edareCode", edareCode)
                .setFirstResult(start)
                .setMaxResults(limit)
                .getResultList();
    }

    private long getBranchsCount(FilterWrapper filterWrapper) {
        String brhCode = "", edareCode = "";
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {
                Object value = filter.getValue();
                String field = filter.getProperty();
                switch (field) {
                    case "brhCode":
                        brhCode = value.toString();
                        break;
                    case "edareCode":
                        edareCode = value.toString();
                        break;
                    default:
                        break;
                }
            }
        }
        return ((Long) em.createQuery("select count(t) from BranchView t where " +
                " (:brhCode is null or t.brhCode like :brhCode or t.brhName like :brhCode) and" +
                " (:edareCode is null or t.edareCode = :edareCode) order by t.brhCode asc")
                .setParameter("brhCode", brhCode)
                .setParameter("edareCode", edareCode)
                .getSingleResult()).longValue();
    }

    public Map<String, Object> getEdareKol(FilterWrapper filterWrapper, int start, int limit) {
        Map<String, Object> dataPage = new HashMap<>();
        dataPage.put("list", getEdareKolList(filterWrapper, start, limit));
        dataPage.put("total", getEdareKolCount(filterWrapper));
        return dataPage;
    }

    private List<BranchView> getEdareKolList(FilterWrapper filterWrapper, int start, int limit) {
        String edareCode = "";
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {
                Object value = filter.getValue();
                String field = filter.getProperty();
                switch (field) {
                    case "edareCode":
                        edareCode = value.toString();
                        break;
                    default:
                        break;
                }
            }
        }
        List<Object> contractCalculationList = em.createNativeQuery("select unique edkol_code,edkol_name from vwbranch t" +
                " where edkol_code is not null and" +
                " (?1 is null or edkol_code like ?1 or edkol_name like ?1) order by edkol_code asc")
                .setParameter("1", edareCode)
                .setFirstResult(start)
                .setMaxResults(limit)
                .getResultList();
        List<BranchView> list = new ArrayList<>();
        for (Object item : contractCalculationList) {
            BranchView model = new BranchView();
            model.setEdareCode(((String) ((Object[]) item)[0]));
            model.setEdareName(((String) ((Object[]) item)[1]));
            list.add(model);
        }
        return list;
    }

    private long getEdareKolCount(FilterWrapper filterWrapper) {
        String edareCode = "";
        if (filterWrapper != null && filterWrapper.getFilters() != null) {
            for (Filter filter : filterWrapper.getFilters()) {
                Object value = filter.getValue();
                String field = filter.getProperty();
                switch (field) {
                    case "edareCode":
                        edareCode = value.toString();
                        break;
                    default:
                        break;
                }
            }
        }
        return ((Long) em.createQuery("select count(distinct t.edareCode) from BranchView t where t.edareCode is not null and " +
                " (:edareCode is null or t.edareCode like :edareCode or t.edareName like :edareCode) order by t.edareCode asc")
                .setParameter("edareCode", edareCode)
                .getSingleResult()).longValue();
    }
}
