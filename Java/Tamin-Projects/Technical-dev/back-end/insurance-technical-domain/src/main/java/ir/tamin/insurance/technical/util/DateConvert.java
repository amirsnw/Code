package ir.tamin.insurance.technical.util;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

/**
 *
 * @author m_hoseini
 */
@Stateless
public class DateConvert {

    @Inject
    private EntityManager entityManager;

    @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
    public String getCodedDate(String date) {
        String resultDate = "";
        resultDate = (String) entityManager.createNativeQuery("select general.dateutils.CODEDATE(?) from dual")
                .setParameter(1, date)
                .getSingleResult();
        return resultDate;
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
    public String getDeCodedDate(String date) {
        String resultDate = (String) entityManager.createNativeQuery("select general.dateutils.DECODEDATE(?) from dual")
                .setParameter(1, date)
                .getSingleResult();
        return resultDate;
    }

}
