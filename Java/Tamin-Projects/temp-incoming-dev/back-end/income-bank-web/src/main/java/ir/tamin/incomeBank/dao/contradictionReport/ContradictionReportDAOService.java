package ir.tamin.incomeBank.dao.contradictionReport;

import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.incomeBank.model.contradictionReport.ContradictionReport;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.BaseDAOService;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;

public class ContradictionReportDAOService extends BaseDAOService<ContradictionReport> {

    @Inject
    private EntityManager em;

    @Inject
    private StoredProcedure procedure;

    public BigDecimal getSummaryPrice(FilterWrapper filter) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
        Root<ContradictionReport> contradictionReportFrom = criteriaQuery.from(getClazz());
        criteriaQuery = getFilteredQuery(criteriaQuery, contradictionReportFrom, filter, null);
        criteriaQuery.select(criteriaBuilder.sum(contradictionReportFrom.<BigDecimal> get("diffAmount")));
        TypedQuery createQuery = em.createQuery(criteriaQuery);
        return new BigDecimal(createQuery.getSingleResult().toString());
    }

    @Override
    public Class<ContradictionReport> getClazz() {
        return ContradictionReport.class;
    }

    @Override
    public EntityManager getEntityManager() {
        return em;
    }
}
