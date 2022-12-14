/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.DrmdSorat;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.ServiceUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import java.sql.SQLException;
import java.sql.Types;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.UserTransaction;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

/**
 *
 * @author m_salami
 */
@Stateless
@TransactionManagement(value = TransactionManagementType.BEAN)
public class DrmdSoratInsertCardBank {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    @MessageBundle
    Bundle messageBundle;
    @Inject
    private StoredProcedure procedure;
    @Inject
    ServiceUtils serviceUtils;
    @Inject
    DrmdSoratService drmdSoratService;
    @Inject
    @WebProperties
    Bundle webBundle;

    @Resource
    private UserTransaction userTransaction;

    public String[] InsertInCardBank(DrmdSorat sorat, User user) {

        String returnedRes = "";
        String retMsg = "";
        String[] result = new String[2];
        try {
            userTransaction.begin();
            procedure.init();
            procedure.query("{?=call PCK_DRMDOPERATIONS.InsSorat_Card(?,?,?,?,?,?)}");
            procedure.setOutParameter(1, Types.CHAR)
                    .setInParameter(2, sorat.getDrmdSoratPK().getBrchCode())
                    .setInParameter(3, sorat.getSoratDate().substring(0, 6))
                    .setInParameter(4, sorat.getSoratRadif())
                    .setInParameter(5, sorat.getSoratRow())
                    .setOutParameter(6, Types.NVARCHAR)
                    .setInParameter(7, user.getUserName());
            procedure.execute();
            returnedRes = procedure.getOutParameter(1).toString();
            retMsg = procedure.getOutParameter(6).toString();
            result[0] = returnedRes;
            result[1] = retMsg;
            em.flush();
            userTransaction.commit();
        } catch(SQLException sqlexc){
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(sqlexc.getMessage()).build();
            throw new WebApplicationException(response);
        }catch (Exception exc) {
            Logger.getLogger(DrmdSoratInsertCardBank.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_IN_INSSORAT")).build();
            throw new WebApplicationException(response);
        }
        return result;
    }

}
