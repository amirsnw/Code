package ir.tamin.insurance.technical.business.refund;

import com.ibm.icu.text.DecimalFormat;
import com.ibm.icu.text.DecimalFormatSymbols;
import com.ibm.icu.text.NumberFormat;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.function.refund.RefundRefrencePayment;
import ir.tamin.insurance.technical.function.refund.RefundRefrencePaymentInput;
import ir.tamin.insurance.technical.function.refund.RefundRefrencePaymentValue;
import ir.tamin.insurance.technical.model.refund.RefundPayment;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;

/**
 * @author m_hoseini
 */
@Stateless
@Named("RefundPaymentManager")
public class RefundPaymentManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dBFunctionProxy;

    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedure;

    @Inject
    private TokenContext tokenContext;

    @Inject
    private UserManager um;

    @Inject
    EntityManager em;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit,
                                 boolean includeCount) throws ProxyProcessingException {
        String nationalCode = "";
        String resNum = "";
        List<RefundPayment> paymentValueList = new ArrayList<RefundPayment>();
        List<RefundRefrencePaymentValue> refundRefrencePaymentValueList;

        if (fw != null) {
            Set<Filter> filters = fw.getFilters();
            for (Filter f : filters) {
                switch (f.getProperty().toUpperCase()) {
                    case "NATIONCODE":
                        nationalCode = f.getValue();
                        break;
                    case "RESNUM":
                        resNum = f.getValue();
                        break;
                }
            }
        }

        refundRefrencePaymentValueList = refundRefrencePayment("1", nationalCode);
        
        for(RefundRefrencePaymentValue rrpv : refundRefrencePaymentValueList){
            if (!resNum.equals("") && !resNum.equals(rrpv.getRESNUM())) {
                continue;
            }
            RefundPayment payment= new RefundPayment();
            payment.setCNT_CNTRCTNO(rrpv.getCNT_CNTRCTNO());
            payment.setCWS_DBTEDATE(rrpv.getCWS_DBTEDATE());
            payment.setCWS_DBTNO(rrpv.getCWS_DBTNO());            
            payment.setDARMAN_DEBITTYPECODE(rrpv.getDARMAN_DEBITTYPECODE());
            payment.setISU_DEBITTYPECODE(rrpv.getISU_DEBITTYPECODE());            
            payment.setCWS_DBTSDATE(rrpv.getCWS_DBTSDATE());
            payment.setPAYDATE(rrpv.getPAYDATE());
            payment.setRESNUM(rrpv.getRESNUM());
            payment.setRISUID(rrpv.getRISUID());          
            payment.setSELFISUTYPECODE(rrpv.getSELFISUTYPECODE());
            payment.setSELFISUTYPEDESC(rrpv.getSELFISUTYPEDESC());
            payment.setSPCRATECODE(rrpv.getSPCRATECODE());
            payment.setSPCRATEDESC(rrpv.getSPCRATEDESC());
            payment.setSYSTEMTYPE(rrpv.getSYSTEMTYPE());  
            payment.setWORKDAY(rrpv.getWORKDAY());  
            payment.setAMOUNT(commaSeperatorNumbers(rrpv.getAMOUNT()));  
            payment.setTYPECODE(rrpv.getTYPECODE());
            payment.setBRCH_CODE(rrpv.getBRCH_CODE());

            paymentValueList.add(payment);
        }
        CollectionData collectionData = new CollectionData(paymentValueList, paymentValueList.size());
        return collectionData;       
    }

    private List<RefundRefrencePaymentValue> refundRefrencePayment(String type, String nationalCode) {
        dBFunctionProxy.setProcedureManager(procedure);
        try {
             List<RefundRefrencePaymentValue> refundRefrencePaymentValueList = (List<RefundRefrencePaymentValue>) dBFunctionProxy.execute(new RefundRefrencePayment(),
                    new RefundRefrencePaymentInput(type, nationalCode));
            return refundRefrencePaymentValueList;
        } catch (ProxyProcessingException e) {
            System.err.println("REFUND-DEBUG: RefundPaymentManager.refundRefrencePayment." + e.getStackTrace()[0]);
            return null;
        }
    }
    
    private String commaSeperatorNumbers(String value) {
        DecimalFormat formatter = (DecimalFormat) NumberFormat.getInstance(Locale.US);
        DecimalFormatSymbols symbols = formatter.getDecimalFormatSymbols();

        symbols.setGroupingSeparator(',');
        formatter.setDecimalFormatSymbols(symbols);
        return formatter.format(Long.parseLong(value));
    }

}
