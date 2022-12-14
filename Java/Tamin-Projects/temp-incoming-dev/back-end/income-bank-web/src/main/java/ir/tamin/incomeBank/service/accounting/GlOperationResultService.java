/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.accounting;

import ir.tamin.incomeBank.model.accounting.GlOperationResult;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.slf4j.LoggerFactory;

/**
 *
 * @author f_fotuhi
 */
@Stateless
public class GlOperationResultService {

    @Inject
    private EntityManager entityManager;

    @Inject
    private StoredProcedure procedure;

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(GlOperationResultService.class);

    /**
     * *
     *
     * @param headId
     * @return 1: Account code control is already done 2: Account code control
     * is in progress 3: No action has yet been taken to control the account
     * code
     */
    public int checkRecord(BigDecimal headId) {
        int result = 0;

        FilterWrapper filterWrapper = new FilterWrapper();
        Set<Filter> filters = new HashSet<>();

        Filter filter = new Filter();
        filter.setProperty("payHeadId.payHeadId");
        filter.setOperator(Filter.Operator.EQUAL);
        filter.setValue(headId.toString());
        filters.add(filter);

        filterWrapper.setFilters(filters);

        List<GlOperationResult> returnList = new ArrayList<>();
        returnList = entityManager.createQuery(getQuery(filterWrapper)).getResultList();

        GlOperationResult operationResult = null;
        if (!returnList.isEmpty()) {
            operationResult = returnList.get(0);
        }

        if (operationResult != null) {
            if ("1".equals(operationResult.getSendData()) && "1".equals(operationResult.getControlData())) {
                //بررسی کد حساب انجام شده.
                result = 1;
            } else if (!"1".equals(operationResult.getSendData()) || !"1".equals(operationResult.getControlData())) {
                //عملیات بررسی کد حساب در حال انجام است.
                result = 2;
            }
        } else {
            //عمیلات بررسی کد حساب برای این لیست هنوز انجام نشده.
            result = 3;
        }

        return result;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<GlOperationResult> operationResultFrom = criteriaQuery.from(GlOperationResult.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;

                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = operationResultFrom.get(f[0]);
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

            criteriaQuery.select(operationResultFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    public void save(GlOperationResult cpGlOperationResult) {
        entityManager.persist(cpGlOperationResult);
        entityManager.flush();
    }

    public void deleteAll(BigDecimal payHeadId) {

        procedure.query("{? = call PCK_CP_GL.deleteAllFromIntClsu(?)}");
        procedure.setOutParameter(1, Types.NUMERIC)
                .setInParameter(2, payHeadId);

        try {
            procedure.execute();
        } catch (SQLException ex) {
            logger.error("خطا در اجرای پکیج حذف تمام رکوردهای مربوط به عملیات کنترل کد حساب در لیست مستمری با شناسه : " + payHeadId, ex);
        }
    }

}
