package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.ws.rest.ResponseHelper;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.insurance.baseinfo.model.Branch;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import javax.ws.rs.Path;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import static ir.tamin.framework.ws.rest.json.Sort.Direction.ASC;

@Path("/branch")
@Produces(MediaType.APPLICATION_JSON)
public class BranchItemFinderREST {

    @Inject
    private EntityManager entityManager;

    @GET
    @Path("/item-page")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getItemPage(@QueryParam(value = "branchCode") String code, @QueryParam(value = "filter") FilterWrapper filters, @QueryParam(value = "start") Integer start, @QueryParam(value = "limit") Integer limit, @QueryParam(value = "sort") SortWrapper sort, @Context UriInfo ui) {
        if (limit == null || limit < 1 || limit > 100) {
            limit = 10;
        }
        return ResponseHelper.ok(getItemPage(code, filters, start, limit, sort));
    }

    private Map<String, Object> getItemPage(String brhCode, FilterWrapper filter, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();

        if (brhCode == null) {
            map.put("filter", filter);
            map.put("start", start);
            map.put("limit", limit);
            map.put("sort", sortWrapper);
            return map;
        }
        if (limit == null) {
            limit = 10;
        }

        Integer countResult = getPageNumber(filter, brhCode);
        Integer pageNumber = countResult / limit;
        start = pageNumber * limit;
        map.put("filter", filter);
        map.put("start", start);
        map.put("limit", limit);
        map.put("sort", sortWrapper);
        return map;
    }

    private Integer getPageNumber(FilterWrapper filters, String brhCode) {
        if (filters == null) {
            filters = new FilterWrapper();
            filters.setFilters(new HashSet<Filter>());
        }

        Filter filter = new Filter();
        filter.setOperator(Filter.Operator.BEFORE);
        filter.setValue(brhCode);
        filter.setProperty("branchCode");
        filters.getFilters().add(filter);

        SortWrapper sortwr = new SortWrapper();
        sortwr.setSortSet(new HashSet<Sort>());
        Sort sort = new Sort();
        sort.setProperty("branchCode");
        sort.setDirection(ASC);
        sortwr.getSortSet().add(sort);
        Integer countResult;
        TypedQuery query = entityManager.createQuery(getQuery(filters, sortwr));
        countResult = query.getResultList().size() - 1;
        return countResult;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {

            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<Branch> cityRoot = criteriaQuery.from(Branch.class);
            List<Predicate> predicates = new ArrayList<>();

            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<Branch> entityType = metamodel.entity(Branch.class);

            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                Object[] filterArray = filterWrapper.getFilters().toArray();

                for (int i = 0; i < filterArray.length; i++) {

                    Filter filter = (Filter) filterArray[i];
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    Filter.Operator operator = filter.getOperator();

                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    javax.persistence.criteria.Path path = null;

                    switch (operator) {
                        case LIKE:

                            predicates.add(criteriaBuilder.like(cityRoot.get(entityType.getDeclaredSingularAttribute(field, String.class)), "%" + (value.toString()).replace("*", "") + "%"));

                            break;
                        case EQUAL:
                            path = cityRoot.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case BEFORE:
                            path = cityRoot.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.lessThanOrEqualTo(path, value.toString());
                            predicates.add(predicate);
                            break;
                        case AFTER:
                            path = cityRoot.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(criteriaBuilder.greaterThanOrEqualTo(path, value.toString()));
                            break;
                    }
                }
                criteriaQuery.where(predicates.toArray(new Predicate[]{}));
            }
            if (sortWrapper != null) {
                List<Order> orders = new ArrayList<>();
                for (Sort sortSet : sortWrapper.getSortSet()) {
                    Order order = null;
                    String[] s = sortSet.getProperty().split("\\.");
                    Sort.Direction direction = sortSet.getDirection();
                    javax.persistence.criteria.Path path = null;
                    switch (direction) {
                        case ASC:
                            path = cityRoot.get(s[0]);
                            for (int j = 1; j < s.length; j++) {
                                path = path.get(s[j]);
                            }
                            order = criteriaBuilder.asc(path);
                            orders.add(order);
                            break;
                        case DESC:
                            path = cityRoot.get(s[0]);
                            for (int j = 1; j < s.length; j++) {
                                path = path.get(s[j]);
                            }
                            order = criteriaBuilder.desc(path);
                            orders.add(order);
                            break;
                    }
                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(cityRoot);
            return criteriaQuery;
        } catch (Exception e) {
            Logger.getLogger(BranchItemFinderREST.class.getName()).log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }
}
