/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.dao.receipt;

import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.incomeBank.model.receipt.ReceiptPaper;
import ir.tamin.incomeBank.model.receipt.ReceiptPaperSummery;
import ir.tamin.incomeBank.util.BaseDAOService;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;

/**
 *
 * @author a_khalighi
 */
public class ReceiptPaperDAOService extends BaseDAOService<ReceiptPaper> {

    @Inject
    private EntityManager em;

    public ReceiptPaperSummery getSummaryPrice(FilterWrapper filter) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
        Root<ReceiptPaper> receiptFrom = criteriaQuery.from(getClazz());
        criteriaQuery = super.getFilteredQuery(criteriaQuery, receiptFrom, filter, null);
        criteriaQuery.select(criteriaBuilder.construct(ReceiptPaperSummery.class,
                criteriaBuilder.sum(receiptFrom.<BigDecimal> get("orderAmount")),
                criteriaBuilder.sum(receiptFrom.<BigDecimal> get("governmentAmount")),
                criteriaBuilder.sum(receiptFrom.<BigDecimal> get("countIsu"))));
        TypedQuery createQuery = em.createQuery(criteriaQuery);
        ReceiptPaperSummery summery = (ReceiptPaperSummery) createQuery.getSingleResult();
        return summery;
    }

    @Override
    public Class<ReceiptPaper> getClazz() {
        return ReceiptPaper.class;
    }

    @Override
    public EntityManager getEntityManager() {
        return em;
    }
}
