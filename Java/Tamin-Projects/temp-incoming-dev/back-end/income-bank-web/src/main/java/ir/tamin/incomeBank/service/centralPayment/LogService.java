/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment;

import com.ibm.icu.text.SimpleDateFormat;
import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import ir.tamin.incomeBank.model.centralPayment.Log;
import ir.tamin.incomeBank.model.centralPayment.LogDetail;
import ir.tamin.incomeBank.service.asnad.timer.ScheduledPayEPrescriptions;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import org.slf4j.LoggerFactory;

/**
 *
 * @author s_maknooni
 */
@Stateless
public class LogService {

    public static final String MAX_PRIORITY = "1";
    public static final String MIN_PRIORITY = "0";

    @Inject
    private EntityManager entityManager;

    int count = 0;

    private final static org.slf4j.Logger logger = LoggerFactory.getLogger(ScheduledPayEPrescriptions.class);

    public void save(String logText, List<LogDetail> logDetails, GlSystemType system, String userName, String priority) {
        try {
            Log log = new Log();
            log.setLogText(logText);
            log.setCreateDate(new Date());
            log.setCreateUser(userName);
            log.setSystem(system);
            log.setPriority(priority);
            if (logDetails != null && !logDetails.isEmpty()) {
                for (LogDetail logDetail : logDetails) {
                    logDetail.setLog(log);
                }
                log.setLogDetails(logDetails);
            }
            entityManager.persist(log);
        } catch (Exception e) {
            logger.error("خطا در ثبت log : " + logText + e.toString(), e);
        }

    }

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        Map<String, Object> map = new HashMap<>();
        boolean flag = false;
        map.put("list", getList(filterWrapper, start, limit, sort));

        if (filterWrapper != null) {
            Object[] filterArray = filterWrapper.getFilters().toArray();

            for (int i = 0; i < filterArray.length; i++) {
                Filter filterItem = (Filter) filterArray[i];
                if ((filterItem.getProperty().equals("createDate"))) {
                    map.put("total", count);
                    flag = true;
                }
            }
        }

        if (!flag) {
            map.put("total", getCount(filterWrapper));
        }

        return map;

    }

    private Integer getCount(FilterWrapper filter) {
        Integer count = 0;
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        count = createQuery.getResultList().size();
        return count;

    }

    private List<Log> getList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        FilterWrapper customFilter = new FilterWrapper();
        Set<Filter> filters = new HashSet<>();
        Object value = null;
        Integer tempLimit = limit;
        Integer tempStart = start;
        if (filter != null) {
            Object[] filterArray = filter.getFilters().toArray();

            for (int i = 0; i < filterArray.length; i++) {
                Filter filterItem = (Filter) filterArray[i];
                if (!(filterItem.getProperty().equals("createDate"))) {
                    filters.add(filterItem);
                }
                if (filterItem.getProperty().equals("createDate")) {
                    value = filterItem.getValue();
                    limit = null;
                    start = null;
                }
            }
        }
        customFilter.setFilters(filters);

        TypedQuery createQuery = entityManager.createQuery(getQuery(customFilter, sort));
        List<Log> logList = new ArrayList<>();

        if (start != null && limit != null) {
            logList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            logList = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            logList = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            logList = createQuery.getResultList();
        }

        List<Log> finalList = new ArrayList<>();
        if (value != null) {

            for (Log m : logList) {
                String date = new SimpleDateFormat("yyyy/MM/dd").format(m.getCreateDate());
                if (date.equals(value.toString())) {
                    finalList.add(m);
                }
                count = finalList.size();
            }
            return finalList.subList(tempStart, (tempStart + tempLimit < finalList.size() ? tempStart + tempLimit : finalList.size()));
        } else {
            return logList;
        }
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<Log> logFrom = criteriaQuery.from(Log.class);
            List<Predicate> predicates = new ArrayList<>();
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<Log> entityType = metamodel.entity(Log.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {

                Object[] filterArray = filterWrapper.getFilters().toArray();

                for (int i = 0; i < filterArray.length; i++) {
                    Filter filter = (Filter) filterArray[i];
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();

                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    javax.persistence.criteria.Path path;
                    switch (operator) {
                        case LIKE:
                            predicates.add(criteriaBuilder.like(logFrom.get(entityType.getDeclaredSingularAttribute(field, String.class)), "%" + value.toString().replace(" ", "") + "%"));

                            break;
                        case EQUAL:

                            path = logFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }

                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);

                            break;

                        default:
                            break;
                    }
                }
                criteriaQuery.where(predicates.toArray(new Predicate[]{}));

            }

            if (sortWrapper != null) {
                List<Order> orders = new ArrayList<>();
                for (Sort sortSet : sortWrapper.getSortSet()) {
                    if (sortSet.getProperty().equals("opDate")) {
                        sortSet.setProperty("createDate");
                    }
                    if (sortSet.getProperty().equals("systemType")) {
                        sortSet.setProperty("system.systemId");
                    }
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(logFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(logFrom.get(sortProperties[0]));
                    }

                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(logFrom);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(Log.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }

}
