package ir.tamin.insurance.technical.business.brokerReport;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.domain.proxy.UserNotAllowedException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.function.brokerReport.RequestBrokerWageReport;
import ir.tamin.insurance.technical.function.brokerReport.RequestBrokerWageReportInput;
import ir.tamin.insurance.technical.function.brokerReport.RequestBrokerWageReportValue;
import ir.tamin.insurance.technical.model.baseinfo.City;
import ir.tamin.insurance.technical.model.baseinfo.Province;
import ir.tamin.insurance.technical.model.user.OrgUser;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Stateless
@Named("BrokerReportManager")
public class BrokerReportManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private TokenContext tokenContext;

    @Inject
    private UserManager userManager;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Inject
    @Named("DefaultDBFunctionProxy")
    protected DBFunctionProxy dBFunctionProxy;

    @Inject
    private EntityManager entityManager;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {

        OrgUser currentUser = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());
        Branch org = null;
        City city = null;

        /*Optional<Filter> branchFilter = null;
        Optional<Filter> brokerFilter = null;
        Optional<Filter> provinceFilter = null;

        if (fw != null) {
            branchFilter = fw.getFilters().stream()
                    .filter(item -> item.getProperty().equalsIgnoreCase("branch.branchCode"))
                    .findFirst();
            brokerFilter = fw.getFilters().stream()
                    .filter(item -> item.getProperty().equalsIgnoreCase("broker.branchCode"))
                    .findFirst();
            provinceFilter = fw.getFilters().stream()
                    .filter(item -> item.getProperty().equalsIgnoreCase("province.provinceCode"))
                    .findFirst();
        }*/

        if (fw == null) {
            fw = new FilterWrapper();
            fw.setFilters(new HashSet<Filter>());
        }
        try {
            org = entityManager.find(Branch.class, currentUser.getOrganization().getCode());
            if (org != null) {
                switch (org.getBranchKind()) {
                    //شعبه
                    case "1":
                        fw.addFilter("branch.branchCode", Filter.Operator.EQUAL, org.getBranchCode());
                        break;
                    //اداره کل استان
                    case "2":
                        city = entityManager.find(City.class, org.getCityCode());
                        fw.addFilter("province.provinceCode", Filter.Operator.EQUAL, city.getProvinceCode());
                        break;
                    //کارگزاری
                    case "5":
                        fw.addFilter("broker.branchCode", Filter.Operator.EQUAL, org.getBranchCode());
                        break;
                }
            }
        } catch (Exception e) {
            System.err.println("BROKER-DEBUG: BrokerReportManager.search." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }

        try {
            return super.search(clazz, fw, sw, start, limit, includeCount);
        } catch (Exception e) {
            System.err.println("BROKER-DEBUG: BrokerReportManager.search." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }
}
