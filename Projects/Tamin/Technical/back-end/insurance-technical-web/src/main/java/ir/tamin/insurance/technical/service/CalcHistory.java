package ir.tamin.insurance.technical.service;

import ir.tamin.framework.ws.rest.ResponseHelper;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@Stateless
public class CalcHistory {

    @Inject
    private EntityManager em;

    public Response calcHistID(String insID, String intDate) throws SQLException {
        List result;
        result = em.createNativeQuery("SELECT Nvl (SUM (His_Day), 0) FROM The "
                + "(SELECT  CAST (pck_tmonhist.Tmosthist('0210','" + insID + "') as hismttbl) FROM dual)"
                + "WHERE his_year || his_mon <= substr('" + intDate + "',1,6)").getResultList();
        return ResponseHelper.ok(result);
    }

    public BigDecimal calcHistDays(String insuranceId, String nationalCode) throws SQLException {
        BigDecimal result = null;
        try {
            result = (BigDecimal) em.createNativeQuery("select sum(his_day)  from Table(pck_stmonhist.Tmonhist('"
                    + insuranceId + "', '" + nationalCode + "',Null, 'Esoldier'))").getSingleResult();
        } catch (Exception e) {
            e.printStackTrace();
            result = new BigDecimal("0");
        }
        return result;
    }
}
