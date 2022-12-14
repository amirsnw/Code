/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment;

import ir.tamin.incomeBank.model.centralPayment.*;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;

import javax.ejb.Asynchronous;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import ir.tamin.framework.cdi.util.WebProperties;

import java.math.BigDecimal;

import org.slf4j.LoggerFactory;

/**
 * @author s_maknooni
 */
@Stateless
public class TempBankControlFileService {

    @Inject
    EntityManager entityManager;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    @WebProperties
    private Bundle webBundle;

    @Inject
    LogService logService;

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(TempBankControlFileService.class);

    public void deleteRecord(BigDecimal detailId) {
        TempBankControlFile temp = entityManager.find(TempBankControlFile.class, detailId);
        if (temp!= null){
            entityManager.remove(temp);
        }
        //entityManager.flush();
    }

    public long getCountByHeadId(BigDecimal payHeadId) {

        Object count = entityManager.createNamedQuery("TempBankControlFile.getCountByHeadId")
                .setParameter("headId", payHeadId)
                .getSingleResult();
        if (count != null) {
            return (Long) count;
        } else {
            return 0;
        }
    }

    @Asynchronous
    public void deleteByHeadId(BigDecimal payHeadId) {
        entityManager.createNamedQuery("TempBankControlFile.deleteByHeadId")
                .setParameter("headId", payHeadId)
                .executeUpdate();
    }

}
