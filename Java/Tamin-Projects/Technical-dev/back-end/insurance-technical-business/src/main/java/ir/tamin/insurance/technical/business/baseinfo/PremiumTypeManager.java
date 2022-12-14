/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.baseinfo;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.Resource;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.function.baseinfo.GeneralFunctionResult;
import ir.tamin.insurance.technical.function.baseinfo.isbranchcodevalid.IsBranchCodeValid;
import ir.tamin.insurance.technical.function.baseinfo.isbranchcodevalid.IsBranchCodeValidInput;
import ir.tamin.insurance.technical.model.baseinfo.PremiumType;
import ir.tamin.insurance.technical.model.user.OrgUser;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author e_shoghi
 */
@Stateless
@Named("PremiumTypeManager")
public class PremiumTypeManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private UserManager userManager;
    @Inject
    private TokenContext tokenContext;
    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;
    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedureManager;

    @Override
    public void init() {
        this.dbFunctionProxy.setProcedureManager(procedureManager);
    }

    @Override
    @ProxyMethod
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        String branchCode = user.getOrganization().getCode();
        boolean isBranch = branchCode != null ? true : false;
        List<PremiumType> w = null;
        Long qcount = 0l;
        Map<String, Object> dataPage = new HashMap<>();
        String q = "select p from PremiumType p ";
        String qc = "select count(p) from PremiumType p ";
        String branchKind = (String) entityManager.createNativeQuery("select getbrhkind(?) from dual").setParameter(1, user.getUserName()).getSingleResult();
        StringBuilder typeCodes = new StringBuilder();
        if ("5".equals(branchKind))/*کاربر کارگزاری*/ {
            typeCodes.append("01,");
            typeCodes.append("02");
            q = q + "where p.insuranceTypeCode IN (" + typeCodes.toString() + ")";
            qc = qc + "where p.insuranceTypeCode IN (" + typeCodes.toString() + ")";
        } else /*کاربر شعبه*/ {
            GeneralFunctionResult generalFunctionResult = (GeneralFunctionResult) dbFunctionProxy.execute(new IsBranchCodeValid(), new IsBranchCodeValidInput(branchCode));
            if ("1".equals(generalFunctionResult.getResult())) {
                typeCodes.append("20");//زنان خانه دار
            } else if ("0".equals(generalFunctionResult.getResult())) {
                typeCodes.append("20,");//زنان خانه دار
                typeCodes.append("32");//کارفرمایان کارگاه کشاورزی
            }
            q = q + "where p.insuranceTypeCode NOT IN (" + typeCodes.toString() + ")";
            qc = qc + "where p.insuranceTypeCode NOT IN (" + typeCodes.toString() + ")";
        }

        if (isBranch) {
//                fw = new FilterWrapper();
//                fw.setFilters(new HashSet<Filter>());
//                if ("5".equals(branchKind))/*کاربر کارگزاری*/ {
//                    typeCodes.append("01,");//مشاغل آزاد
//                    typeCodes.append("02");//اختیاری
//                    fw.addFilter("premiumType.insuranceTypeCode", Filter.Operator.IN, typeCodes.toString());
//                } else/*کاربر شعبه*/ {
//                    GeneralFunctionResult generalFunctionResult = (GeneralFunctionResult) dbFunctionProxy.execute(new IsBranchCodeValid(), new IsBranchCodeValidInput(branchCode));
//                    if ("1".equals(generalFunctionResult.getResult())) {
//                        typeCodes.append("20");//زنان خانه دار
//                        fw.addFilter("premiumType.insuranceTypeCode", Filter.Operator.NOT_IN, typeCodes.toString());
//                    } else if ("0".equals(generalFunctionResult.getResult())) {
//                        typeCodes.append("20,");//زنان خانه دار
//                        typeCodes.append("32");//کارفرمایان کارگاه کشاورزی
//                        fw.addFilter("premiumType.insuranceTypeCode", Filter.Operator.NOT_IN, typeCodes.toString());
//                    }
//                }
//                return super.search(clazz, fw, sw, start, limit, true);
            if (fw != null) {
                Set<Filter> filters = fw.getFilters();
                String value = "";
                for (Filter f : filters) {
                    value = f.getValue();
                }

                if (!"".equals(value)) {
                    value = value.replace("*", "");
                    q = q + " and   (p.insuranceTypeCode LIKE '%" + value + "%' or p.insuranceDescription LIKE '%" + value + "%'" + ")";
                    qc = qc + " and (p.insuranceTypeCode LIKE '%" + value + "%' or p.insuranceDescription LIKE '%" + value + "%'" + ")";
                }
            }
            w = (List<PremiumType>) entityManager.createQuery(q).setFirstResult(start).setMaxResults(limit).getResultList();
            qcount = ((Long) entityManager.createQuery(qc).getSingleResult());

            dataPage.put("total", qcount);
            dataPage.put("list", w);
            return new CollectionData(w, qcount);
        } else {
            return null;
        }
    }

    @Override
    @ProxyMethod
    public Resource getByFilter(Class clazz, FilterWrapper fw) throws ProxyProcessingException {
//        Set<Filter> filters = fw.getFilters();
//        String value = "";
//        for (Filter f : filters) {
//            value = f.getValue();
//        }
//        if ("suggest".equals(value)) {
//            List<PremiumType> w = null;
//            Long qcount = 0l;
//            Map<String, Object> dataPage = new HashMap<>();
//            String q = "select p from PremiumType p ";
//            String qc = "select count(p) from PremiumType p";
//            if (!"".equals(value)) {
//                value = value.replaceAll("*", "");
//                q = q + " where   (p.insuranceTypeCode LIKE '" + value + "%' or p.insuranceDescription LIKE '%" + value + "%'" + ")";
//                qc = qc + " where (p.insuranceTypeCode LIKE '" + value + "%' or p.insuranceDescription LIKE '%" + value + "%'" + ")";
//            }
//           // w = (List<PremiumType>) entityManager.createQuery(q).setFirstResult(start).setMaxResults(limit).getResultList();
//            qcount = ((Long) entityManager.createQuery(qc).getSingleResult());
//
//            dataPage.put("total", qcount);
//            dataPage.put("list", w);
//            //  return dataPage; 
//        }

        return super.getByFilter(clazz, fw);
    }
}
