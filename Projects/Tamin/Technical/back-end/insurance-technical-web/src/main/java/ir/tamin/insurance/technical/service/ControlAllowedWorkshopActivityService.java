/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.service;

import ir.tamin.framework.ws.rest.ResponseHelper;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author s_naghavi
 */
@Stateless
public class ControlAllowedWorkshopActivityService {
   @Inject
    private EntityManager em;
    public Response controlAllowedWorkshopActivity(@QueryParam("agreementCategoryId") String agreementCategoryId,@QueryParam("workshopId") String workshopId) throws SQLException {
          List<Long> countAllowedWorkshop = em.createNamedQuery("AgreeAcctivity.countAllowedWorkshop")
                        .setParameter("agreementCategoryId", agreementCategoryId)
                        .setParameter("workshopId", workshopId)
                        .getResultList();
           Long count = null;
                for (Long countAllowed : countAllowedWorkshop) {
                    count = countAllowed;
                }
                 Response r = ResponseHelper.ok(count);
        return r;
    
    }
}
