package ir.tamin.insurance.technical.business.baseinfo;

import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.DateUtils;
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
import ir.tamin.insurance.technical.function.general.CalcAge.CalcAge;
import ir.tamin.insurance.technical.function.general.CalcAge.CalcAgeInput;
import ir.tamin.insurance.technical.function.general.CalcAge.CalcAgeValue;
import ir.tamin.insurance.technical.function.insuranceAgreement.isuStatus.IsuStatus;
import ir.tamin.insurance.technical.function.insuranceAgreement.isuStatus.IsuStatusInput;
import ir.tamin.insurance.technical.function.insuranceAgreement.isuStatus.IsuStatusValue;
import ir.tamin.insurance.technical.function.insuranceAgreement.isuType.IsuType;
import ir.tamin.insurance.technical.function.insuranceAgreement.isuType.IsuTypeInput;
import ir.tamin.insurance.technical.function.insuranceAgreement.isuType.IsuTypeValue;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceStatus;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceType;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import java.sql.SQLException;
import java.util.Date;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.util.Set;

@Stateless
@Named("InsuranceRegisterationProxy")
public class InsuranceRegisterationProxy extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private EntityManager entityManager;

    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;

    @Inject
    private UserManager userManager;

    @Inject
    private TokenContext tokenContext;

    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedureManager;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {

        String operation = "";
        String introductionLetterDate = "";
        Filter operationFilter = returnFilterByProperty(fw, "operation");
        Filter introductionLetterDateFilter = returnFilterByProperty(fw, "introductionLetterDate");
        String currentDate = DateUtils.format(new Date(), "yyyyMMdd");

        if (introductionLetterDateFilter != null) {
            introductionLetterDate = introductionLetterDateFilter.getValue();
            fw.removeFilter("introductionLetterDate", Filter.Operator._EQUAL);
        }
        if (operationFilter != null) {
            operation = operationFilter.getValue();
            fw.removeFilter("operation", Filter.Operator._EQUAL);
        }
        String letterDate = !introductionLetterDate.isEmpty() ? introductionLetterDate: null ;
        CollectionData collectionData = super.search(clazz, fw, sw, start, limit, includeCount);

        //if (fw != null && fw.contains("id")) {
        collectionData.getList().forEach((Object item) -> {
            InsuranceRegisteration identity = (InsuranceRegisteration) item;
            if (identity.getCityOfBirth() != null) {
                String cityOfBirthDesc = (String) entityManager.createNamedQuery("City.findByCityCode")
                        .setParameter("cityCode", identity.getCityOfBirth()).getSingleResult();
                identity.setCityOfBirthDesc(cityOfBirthDesc);
            }
            if (identity.getDateOfBirth() != null) {
                try {
                    identity.setAgeDays(calcAgeDays(identity.getDateOfBirth(), (letterDate !=null ? letterDate : currentDate)));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        //}

        if (operation.equals("1") && collectionData != null) {
            collectionData.getList().forEach(item -> {
                InsuranceRegisteration identity = (InsuranceRegisteration) item;
                identity.setIsuStat(getInsuranceStatus(identity.getId(), identity.getNationalId()));
                identity.setIsuType(getInsuranceType(identity.getId(), identity.getNationalId()));
            });
        }
        return collectionData;

    }

    public InsuranceStatus getInsuranceStatus(String insuranceNumber, String nationalCode) {
        InsuranceStatus isuStatNew = null;
        IsuStatusInput statusInput = new IsuStatusInput("0010570639", "14000121");
        dbFunctionProxy.setProcedureManager(procedureManager);
        IsuStatusValue statusValue = new IsuStatusValue();
        try {
            statusValue = (IsuStatusValue) dbFunctionProxy.execute(new IsuStatus(), statusInput);
            isuStatNew = entityManager.find(InsuranceStatus.class, statusValue.getResult());
        } catch (Exception e) {

        }
        return isuStatNew;
    }

    public InsuranceType getInsuranceType(String insuranceNumber, String nationalCode) {
        InsuranceType isuTypeNew = null;
        IsuTypeInput typeInput = new IsuTypeInput("0010570639", "14000121");
        dbFunctionProxy.setProcedureManager(procedureManager);
        IsuTypeValue typeValue = new IsuTypeValue();
        try {
            typeValue = (IsuTypeValue) dbFunctionProxy.execute(new IsuType(), typeInput);
            isuTypeNew = entityManager.find(InsuranceType.class, typeValue.getResult());
        } catch (Exception e) {

        }
        return isuTypeNew;
    }

    private Filter returnFilterByProperty(FilterWrapper fw, String property) {
        if (fw != null && fw.getFilters() != null && fw.getFilters().size() > 0) {
            for (Filter filter
                    : fw.getFilters()) {
                if (filter.getProperty().toUpperCase().contains(property.toUpperCase())) {
                    return filter;
                }
            }
        }
        return null;
    }

    public String calcAgeDays(String birthDate, String date) throws ProxyProcessingException {
        dbFunctionProxy.setProcedureManager(procedureManager);
        CalcAgeValue calcAgeValue = new CalcAgeValue();
        calcAgeValue = (CalcAgeValue) dbFunctionProxy.execute(new CalcAge(), new CalcAgeInput(birthDate, date));
        return calcAgeValue.getAge();
    }

}
