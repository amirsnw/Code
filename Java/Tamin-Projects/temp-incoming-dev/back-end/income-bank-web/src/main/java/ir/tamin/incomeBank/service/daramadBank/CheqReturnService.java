/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.CheqReturn;
import ir.tamin.incomeBank.model.daramadBank.CheqReturnPK;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

/**
 *
 * @author f_fotuhi
 */
@Stateless
public class CheqReturnService {

    @Inject
    private EntityManager entityManager;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    private StoredProcedure procedure;

    public CheqReturn get(String ordOrdno, String orpOrdrow) {
        CheqReturnPK pk = new CheqReturnPK(ordOrdno, orpOrdrow);
        CheqReturn cheqReturn = new CheqReturn(pk);
        cheqReturn = entityManager.find(CheqReturn.class, pk);
        return cheqReturn;
    }

    public String save(CheqReturn cheqReturn) {

        String cheqDate = cheqReturn.getCheqDate();
        Date Date = DateUtils.convertTimestampStringToDate(cheqDate);
        cheqDate = DateUtils.format(Date, "yyyyMMdd");
        cheqReturn.setCheqDate(cheqDate);

        try {
            entityManager.persist(cheqReturn);
            String saveMessage = "ثبت با موفقیت انجام شد";
            return saveMessage;
        } catch (Exception ex) {
            Logger.getLogger(CheqReturnService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }

    }

    public String delete(CheqReturn cheqReturn, String user) {
        
        String deleteMessage = "";
        try {
            CheqReturn tempCheqReturn = new CheqReturn();
            tempCheqReturn = get(cheqReturn.getCheqReturnPK().getOrdOrdno(), cheqReturn.getCheqReturnPK().getOrpOrdrow());

            String brchCode = cheqReturn.getBrchCode();
            String ordNo = cheqReturn.getCheqReturnPK().getOrdOrdno();
            String ordRow = cheqReturn.getCheqReturnPK().getOrpOrdrow();

            procedure.query("{call DRMD_CHEQRET_DELETE(?,?,?,?)}");
            procedure.setInParameter(1, brchCode)
                    .setInParameter(2, ordNo)
                    .setInParameter(3, ordRow)
                    .setInParameter(4, user);
            procedure.execute();

            entityManager.remove(tempCheqReturn);
            deleteMessage = "حذف با موفقیت انجام شد";
            return deleteMessage;
        } catch (Exception ex) {
            Logger.getLogger(CheqReturn.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreAccount.common.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);

        }

    }
}
