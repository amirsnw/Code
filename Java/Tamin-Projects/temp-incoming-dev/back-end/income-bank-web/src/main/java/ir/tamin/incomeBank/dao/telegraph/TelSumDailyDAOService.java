package ir.tamin.incomeBank.dao.telegraph;

import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.incomeBank.model.telegraph.TelSumDaily;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.BaseDAOService;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;

public class TelSumDailyDAOService extends BaseDAOService<TelSumDaily> {

    @Inject
    private EntityManager em;

    @Inject
    private StoredProcedure procedure;

    public BigDecimal getSummaryPrice(FilterWrapper filter) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
        Root<TelSumDaily> telSumDailyFrom = criteriaQuery.from(getClazz());
        criteriaQuery = getFilteredQuery(criteriaQuery, telSumDailyFrom, filter, null);
        criteriaQuery.select(criteriaBuilder.sum(telSumDailyFrom.<BigDecimal> get("sumAmount")));
        TypedQuery createQuery = em.createQuery(criteriaQuery);
        return new BigDecimal(createQuery.getSingleResult().toString());
    }

    @Override
    public Class<TelSumDaily> getClazz() {
        return TelSumDaily.class;
    }

    @Override
    public EntityManager getEntityManager() {
        return em;
    }
}
