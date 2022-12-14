/**
 *
 * @author h_riazat
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.VwDftLetterB;
import ir.tamin.incomeBank.util.DateUtils;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.imageio.ImageIO;
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
import javax.servlet.http.HttpServletRequest;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import ir.tamin.incomeBank.model.identityManager.User;

@Stateless
public class VwDftLetterBService {

    @Inject
    private EntityManager entityManager;

    public VwDftLetterB get(String pk) {
        VwDftLetterB vwDftLetterB = entityManager.find(VwDftLetterB.class, pk);
        return vwDftLetterB;
    }

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();
        List<VwDftLetterB> vwDftLetterB = new ArrayList<>();
        vwDftLetterB = getList(filterWrapper, start, limit, sortWrapper);
        map.put("list", vwDftLetterB);
        List<VwDftLetterB> vwDftLetterBAll = getListAll(filterWrapper);
        Integer count = getCount(vwDftLetterBAll);
        map.put("total", count);
        return map;
    }

    private List<VwDftLetterB> getList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, sort));
        List<VwDftLetterB> vwDftLetterB = new ArrayList<>();
        if (start != null && limit != null) {
            vwDftLetterB = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            vwDftLetterB = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            vwDftLetterB = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            vwDftLetterB = createQuery.getResultList();
        }
        return vwDftLetterB;
    }

    private List<VwDftLetterB> getListAll(FilterWrapper filter) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        List<VwDftLetterB> vwDftLetterBAll = createQuery.getResultList();
        return vwDftLetterBAll;
    }

    private Integer getCount(List<VwDftLetterB> vwDftLetterBAll) {
        Integer count = 0;
        count = vwDftLetterBAll.size();
        return count;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<VwDftLetterB> vwDftLetterBFrom = criteriaQuery.from(VwDftLetterB.class);
            List<Predicate> predicates = new ArrayList<>();
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<VwDftLetterB> vwDftLetterBEntityType = metamodel.entity(VwDftLetterB.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    if (field.toUpperCase().contains("FROM")) {
                        field = field.replace("from", "");
                    }
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {
                        case EQUAL:
                            javax.persistence.criteria.Path path = vwDftLetterBFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            predicates.add(criteriaBuilder.like(vwDftLetterBFrom.get(vwDftLetterBEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case AFTER:
                            path = vwDftLetterBFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value));
                            break;
                        case BEFORE:
                            path = vwDftLetterBFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.lessThanOrEqualTo(path, (Comparable) value));
                            break;
                    }
                }
                criteriaQuery.where(predicates.toArray(new Predicate[]{}));
            }
            if (sortWrapper != null) {
                List<Order> orders = new ArrayList<>();
                for (Sort sortSet : sortWrapper.getSortSet()) {
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(vwDftLetterBFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(vwDftLetterBFrom.get(sortProperties[0]));
                    }
                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(vwDftLetterBFrom);
            return criteriaQuery;
        } catch (Exception ex) {
            Logger.getLogger(VwDftLetterBService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            return null;
        }
    }

    public byte[] exportToPdf(HttpServletRequest req, User user) throws IOException {
        InputStream reportStream = null;
        try {
            SortWrapper sortWrapper = new SortWrapper();
            sortWrapper.setSortSet(new HashSet<Sort>());
            Sort sort = new Sort();
            sort.setProperty("letterSerial");
            sort.setDirection(Sort.Direction.ASC);
            sortWrapper.getSortSet().add(sort);
            Map<String, Object> parameters = new HashMap<>();
            FilterWrapper filterWrapper = new FilterWrapper();
            filterWrapper.setFilters(new HashSet<Filter>());
            Enumeration<String> paramNames = req.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String nextElement = paramNames.nextElement();
                if (req.getParameter(nextElement) != null && !"".equals(req.getParameter(nextElement)) && !"_dc".equals(nextElement)) {
                    Filter filter = new Filter();
                    filter.setProperty(nextElement);
                    String value = req.getParameter(nextElement);
                    filter.setValue(value);
                    if (filter.getProperty().contains("letterSerial") && !filter.getProperty().contains("from")) {
                        filter.setOperator(Filter.Operator.BEFORE);
                    } else if (filter.getProperty().contains("cardDate") && !filter.getProperty().contains("from")) {
                        filter.setOperator(Filter.Operator.BEFORE);
                    } else if (filter.getProperty().contains("letterDate") && !filter.getProperty().contains("from")) {
                        filter.setOperator(Filter.Operator.BEFORE);
                    } else if (filter.getProperty().contains("fromletterSerial")) {
                        filter.setOperator(Filter.Operator.AFTER);
                        filter.setProperty(filter.getProperty().replace("from", ""));
                    } else if (filter.getProperty().contains("fromcardDate")) {
                        filter.setOperator(Filter.Operator.AFTER);
                        filter.setProperty(filter.getProperty().replace("from", ""));
                    } else if (filter.getProperty().contains("fromletterDate")) {
                        filter.setOperator(Filter.Operator.AFTER);
                        filter.setProperty(filter.getProperty().replace("from", ""));
                    } else if (filter.getProperty().contains("letterNam")) {
                        filter.setOperator(Filter.Operator.LIKE);
                    } else if (filter.getProperty().contains("wshId")) {
                        filter.setOperator(Filter.Operator.LIKE);
                    } else if (filter.getProperty().contains("letterNo")) {
                        filter.setOperator(Filter.Operator.LIKE);
                    } else if (filter.getProperty().contains("contractRow")) {
                        filter.setOperator(Filter.Operator.LIKE);
                    } else {
                        filter.setOperator(Filter.Operator.EQUAL);
                    }
                    filterWrapper.getFilters().add(filter);
                }
            }
            List<VwDftLetterB> resultList = new ArrayList<>();
            resultList = getList(filterWrapper, null, null, sortWrapper);
            if (resultList.size() > 0) {
                JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(resultList);
                reportStream = VwDftLetterBService.class.getResourceAsStream("/reports/daramadBank/letterOffice.jasper");
                Date todayDate = new Date();
                String date = DateUtils.getJalaliStandard(todayDate, "/");
                parameters.put("DATE", date);
                BufferedImage image = ImageIO.read(VwDftLetterBService.class.getResource("/reports/Images/sazman.jpg"));
                parameters.put("IMAGE", image);
                parameters.put("organizationName", user.getOrganization().getOrganizationName());
                byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, parameters, ds);
                return byteStream;
            }
        } catch (Exception ex) {
            Logger.getLogger(VwDftLetterBService.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
        return null;
    }

}
