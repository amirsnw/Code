package ir.tamin.incomeBank.dao.financialDoc;

import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.incomeBank.model.financialDoc.FinancialDoc;
import ir.tamin.incomeBank.model.financialDoc.FinancialDocSummery;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.BaseDAOService;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.WebApplicationException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Types;

public class FinancialDocDAOService extends BaseDAOService<FinancialDoc> {

    @Inject
    private EntityManager em;

    @Inject
    private StoredProcedure procedure;

    public FinancialDocSummery getSummaryPrice(FilterWrapper filter) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
        Root<FinancialDoc> financialFrom = criteriaQuery.from(getClazz());
        criteriaQuery = getFilteredQuery(criteriaQuery, financialFrom, filter, null);
        criteriaQuery.select(criteriaBuilder.construct(FinancialDocSummery.class,
                criteriaBuilder.sum(financialFrom.<BigDecimal> get("debtAmount")),
                criteriaBuilder.sum(financialFrom.<BigDecimal> get("creditAmount"))));
        TypedQuery createQuery = em.createQuery(criteriaQuery);
        FinancialDocSummery summery = (FinancialDocSummery) createQuery.getSingleResult();
        return summery;
    }

    public String financialIssuance(String year, String month) throws SQLException {

        procedure.init();
        procedure.query("{?=call Pck_Telproc_Core.Create_AccDoc(?,?,?)}");
        procedure.setOutParameter(1, Types.NVARCHAR)
                .setInParameter(2, year)
                .setInParameter(3, month)
                .setOutParameter(4, Types.INTEGER);
        procedure.execute();
        if (procedure.getOutParameter(4).toString().equals("1")) {
            return procedure.getOutParameter(1).toString();
        } else {
            throw new WebApplicationException(procedure.getOutParameter(1).toString());
        }
    }

    /*public String financialSubmit(String year, String month) throws SQLException {

        procedure.init();
        procedure.query("{?=call Pck_Telproc_Core.Send_AccDoc(?,?,?)}");
        procedure.setOutParameter(1, Types.NVARCHAR)
                .setInParameter(2, year)
                .setInParameter(3, month)
                .setOutParameter(4, Types.INTEGER);
        procedure.execute();
        if (procedure.getOutParameter(4).toString().equals("1")) {
            return procedure.getOutParameter(1).toString();
        } else {
            throw new WebApplicationException(procedure.getOutParameter(1).toString());
        }
    }*/

    @Override
    public Class<FinancialDoc> getClazz() {
        return FinancialDoc.class;
    }

    @Override
    public EntityManager getEntityManager() {
        return em;
    }
}
