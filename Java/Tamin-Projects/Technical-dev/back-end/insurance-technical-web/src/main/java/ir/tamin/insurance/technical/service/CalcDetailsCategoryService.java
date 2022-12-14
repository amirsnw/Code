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
public class CalcDetailsCategoryService {
    @Inject
    private EntityManager em;

     public Response calcMinMaxWageAgeHist(@QueryParam("agreementCategoryId") String agreementCategoryId) throws SQLException {
         List<String> result = null;
        //String sqlQuery = "select wage_min,wage_max,age_min,age_max,hist_min, hist_max,hist_age_flag  from ssup_agreement_category where trim(ssup_agreement_cateid) = ?";
        result = em.createNamedQuery("AgreementCategory.getByCatId")
                .setParameter("agreementCategoryId", agreementCategoryId)
                .getResultList();
        Response r = ResponseHelper.ok(result);
        return r;
    }

    public Response calcHistID(String insID, String intDate) throws SQLException {
        List result;
        result = em.createNativeQuery("SELECT Nvl (SUM (His_Day), 0) FROM The " +
                "(SELECT  CAST (pck_tmonhist.Tmosthist('0210','" + insID +"') as hismttbl) FROM dual)" +
                "WHERE his_year || his_mon <= substr('" + intDate +"',1,6)").getResultList();
        return ResponseHelper.ok(result);
    }
    
}
