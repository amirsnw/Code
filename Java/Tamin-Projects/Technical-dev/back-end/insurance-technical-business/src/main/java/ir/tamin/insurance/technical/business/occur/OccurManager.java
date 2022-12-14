package ir.tamin.insurance.technical.business.occur;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.Resource;
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
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.occur.OccurRep;
import ir.tamin.insurance.technical.model.occur.OccurTranslog;
import ir.tamin.insurance.technical.model.primaryKeyClass.WorkshopPK;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.model.workshop.Workshop;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.*;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Stateless
@Named("OccurManager")
public class OccurManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;

    @Inject
    private EntityManager entityManager;

    @Inject
    private UserManager userManager;

    @Inject
    private TokenContext tokenContext;

    @Inject
    RestServices restServices;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {

        int flag = 0;
        OrgUser currentUser = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());
        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());
        Optional<Filter> flagFilter = null;
        Optional<Filter> brchCodeFilter = null;
        CollectionData collectionData = null;
        Workshop workshop = null;
        List<OccurRep> requestDetailData = null;
        Timestamp transDate = null;
        String transDateStr = null;
        OccurRep occurRep = null;
        BigDecimal countRepNo;

        String org = currentUser.getOrganization().getCode();

        if (!checkRole(currentUser, roles)) {
            throw new UserNotAllowedException();
        }

        if (fw != null) {
            flagFilter = fw.getFilters().stream()
                    .filter(item -> item.getProperty().equals("flagBranch"))
                    .findFirst();
            brchCodeFilter = fw.getFilters().stream()
                    .filter(item -> item.getProperty().equalsIgnoreCase("brchCode.branchCode"))
                    .findFirst();
            if (flagFilter.isPresent()) {
                flag = Integer.parseInt(flagFilter.get().getValue());
                fw.removeFilter(flagFilter.get().getProperty(), flagFilter.get().getOperator());
            }
        }

        if (org != null) {
            if (!org.equals("0000")) {
                if (fw == null) {
                    fw = FilterWrapper.createWrapperWithFilter("brchReviewer.branchCode",
                            Filter.Operator.EQUAL, org);
                } else {
                    if (brchCodeFilter.isPresent()) {
                        if (flag == 1) {
                            brchCodeFilter.get().setProperty("brchCode.branchCode");
                            brchCodeFilter.get().setValue(org);
                            fw.addFilter("brchReviewer.branchCode", Filter.Operator.NOT_EQUAL, org);
                        } else {
                            brchCodeFilter.get().setProperty("brchReviewer.branchCode");
                            brchCodeFilter.get().setValue(org);
                        }
                    } else {
                        fw.addFilter("brchReviewer.branchCode", Filter.Operator.EQUAL, org);
                    }
                }
            } else {
                if (fw != null && brchCodeFilter.isPresent()) {
                    if (flag == 1) {
                        fw.addFilter("brchReviewer.branchCode", Filter.Operator.NOT_EQUAL, brchCodeFilter.get().getValue());
                    } else {
                        brchCodeFilter.get().setProperty("brchReviewer.branchCode");
                        brchCodeFilter.get().setValue(brchCodeFilter.get().getValue());
                    }
                }
            }
        }

        try {
            collectionData = super.search(clazz, fw, sw, start, limit, includeCount);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurManager.search." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
        requestDetailData = new ArrayList<>(collectionData.getList().size());

        for (Object request : collectionData.getList()) {
            occurRep = (OccurRep) request;

            if (!occurRep.getBrchCode().getBranchCode().equalsIgnoreCase(occurRep.getBrchReviewer().getBranchCode())) {
                try {
                    transDate = (Timestamp) entityManager.createNamedQuery("OccurTranslog.getRecord")
                            .setParameter("reqId", occurRep.getReqId())
                            .getSingleResult();
                } catch (Exception e) {
                    System.err.println("OCCUR-DEBUG: OccurManager.search." + e.getStackTrace()[0]);
                    throw new ProxyProcessingException(e);
                }
                if (transDate != null) {
                    transDateStr = ir.tamin.insurance.technical.util.DateUtils.getSimpleStringDate(transDate);
                    occurRep.setReferDate(transDateStr);
                }
            }

            try {
                countRepNo = (BigDecimal) entityManager.createNativeQuery("select count(*) from" +
                        " ssup_occur_idea i where i.repno= ? ").setParameter(1, occurRep.getRepNo())
                        .getSingleResult();
            } catch (Exception e) {
                System.err.println("OCCUR-DEBUG: OccurManager.search." + e.getStackTrace()[0]);
                throw new ProxyProcessingException(e);
            }
            occurRep.setRepNoCount(countRepNo);

            workshop = entityManager.find(Workshop.class, new WorkshopPK(occurRep.getWorkshopId(),
                    occurRep.getRwshBranch().getBranchCode()));
            occurRep.setWorkshop(workshop);

            requestDetailData.add(occurRep);
        }
        return new CollectionData(requestDetailData, collectionData.getTotal());
    }

    @Override
    public Resource save(Resource clientObject) throws ProxyProcessingException {

        OccurRep occurRep = (OccurRep) clientObject;
        String username = tokenContext.getCurrentUser().getUsername();
        OrgUser currentUser = null;
        Branch regBrchCode = null;
        String orgCode = "";

        validateCreateRequest(occurRep);

        if (username.length() != 10) {
            if (occurRep.getWorkshop() == null) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.workshop.workshopId.INVALID"), new String[0]);
            }
            occurRep.setBrchCode(entityManager.find(Branch.class, occurRep.geteBranchCode()));
            occurRep.setRisuid(occurRep.getInsuranceSpec().getId());
            regBrchCode = new Branch();
            regBrchCode.setBranchCode("9900");
            occurRep.setWorkshopId(occurRep.getWorkshop().getWorkshopId());
            occurRep.setRwshBranch(entityManager.find(Branch.class, occurRep.getWorkshop().getBranchCode()));
            occurRep.setRegBrchCode(regBrchCode);
            occurRep.setBrchReviewer(occurRep.getBrchCode());
            super.setEntityManager(entityManager);
        } else {
            currentUser = userManager.getUserByName(username);
            orgCode = currentUser.getOrganization().getCode();
            regBrchCode = new Branch();
            regBrchCode.setBranchCode(orgCode);
            occurRep.setCreateuid(currentUser.getUserName());
            occurRep.setRegBrchCode(regBrchCode);
            occurRep.setBrchReviewer(occurRep.getBrchCode());
        }

        occurRep.setCreatedt(new Date());
        occurRep.setStatus(String.valueOf(0));

        try {
            return super.save(occurRep);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurManager.save." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public Resource edit(Resource clientObject, Resource domainObject) throws ProxyProcessingException {

        OccurRep client = (OccurRep) clientObject;
        OccurRep domain = (OccurRep) domainObject;
        OrgUser currentUser = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());
        String org = currentUser.getOrganization().getCode();

        validateEditRequest(domain, client);
        if (client.getActionType().equalsIgnoreCase("0")) { // Normal Edit Request
            domain.setIsutel(client.getIsutel());
            domain.setIsuaddr(client.getIsuaddr());
            domain.setWorkshopId(client.getWorkshopId());
            domain.setWorkshopName(client.getWorkshopName());
            domain.setIsuJobLocation(client.getIsuJobLocation());
            domain.setRwshBranch(client.getRwshBranch());
            domain.setRwworkstart(client.getRwworkstart());
            domain.setRwworkfinish(client.getRwworkfinish());
            domain.setEmployeedate(client.getEmployeedate());
            domain.setVehicle(client.getVehicle());
            domain.setOccurDate(client.getOccurDate());
            domain.setOccurTime(client.getOccurTime());
            domain.setOccurAddr(client.getOccurAddr());
            domain.setOccurJobdesc(client.getOccurJobdesc());
            domain.setOccurDesc(client.getOccurDesc());
            domain.setRepNo(client.getRepNo());
            domain.setRepdate(client.getRepdate());
        } else if (client.getActionType().equalsIgnoreCase("1")) { // Add Legal Details
            domain.setBrchReviewer(client.getBrchReviewer());
            OccurTranslog occurTranslog = new OccurTranslog();
            occurTranslog.setBrchOwner(domain.getBrchCode().getBranchCode());
            occurTranslog.setBrchSender(org);
            occurTranslog.setBrchReciver(client.getBrchReviewer().getBranchCode());
            occurTranslog.setReqId(domain.getReqId());
            occurTranslog.setOpuId(tokenContext.getCurrentUser().getUsername());
            occurTranslog.setTransDate(new Timestamp(new Date().getTime()));
            try {
                entityManager.persist(occurTranslog);
            } catch (Exception e) {
                System.err.println("OCCUR-DEBUG: OccurManager.edit." + e.getStackTrace()[0]);
                throw new ProxyProcessingException(e);
            }
        } else if (client.getActionType().equalsIgnoreCase("3")) { // Change Status
            domain.setStatus(client.getStatus());
        }

        domain.setEdituid(currentUser.getUserName());
        domain.setEditdt(new Date());

        try {
            return super.edit(domain, domain);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurManager.edit." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public void remove(Resource clientObject) throws ProxyProcessingException {

        OccurRep occurRep = (OccurRep) clientObject;
        try {
            super.remove(occurRep);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurManager.remove." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public Resource getByFilter(Class clazz, FilterWrapper fw) throws ProxyProcessingException {

        Workshop workshop = null;
        OccurRep occurRep = null;
        try {
            occurRep = (OccurRep) super.getByFilter(clazz, fw);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurManager.remove." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }

        workshop = entityManager.find(Workshop.class, new WorkshopPK(occurRep.getWorkshopId(),
                occurRep.getRwshBranch().getBranchCode()));
        occurRep.setWorkshop(workshop);

        return occurRep;
    }

    private Boolean checkRole(OrgUser curentUser, List roles) {
        boolean result = true;
        if (curentUser != null
                && roles != null
                && !roles.contains(Roles.GENERAL_USER_TECH)
                && !roles.contains(Roles.HEAD_USER_TECH)
                && !roles.contains(Roles.INSPECTOR_USER_TECH)
                && !roles.contains(Roles.PROV_HEAD_USER_TECH)
                && !roles.contains(Roles.EDAREKOL_FANI_USER)
                && !roles.contains(Roles.MANAGER_USER_TECH)) {
            result = false;;
        }
        return result;
    }

    private void validateCreateRequest(OccurRep occurRep) throws ProxyProcessingException {

        Date todayDate = new Date();
        if (occurRep.getRepdate().compareTo(todayDate) > 0) {
            throw new ProxyProcessingException(bundle.getProperty("exception.proxy.repDate.isBiggerthantodaydate"), new String[0]);
        }
        if (occurRep.getOccurDate().compareTo(todayDate) > 0) {
            throw new ProxyProcessingException(bundle.getProperty("exception.proxy.OccurDate.isBiggerthantodaydate"), new String[0]);
        }
        if (occurRep.getRepdate() != null && occurRep.getOccurDate() != null &&
                occurRep.getRepdate().compareTo(occurRep.getOccurDate()) < 0) {
            throw new ProxyProcessingException(bundle.getProperty("exception.proxy.Repdate.isLessThantoOccurDate"), new String[0]);
        }
    }

    private void validateEditRequest(OccurRep domain, OccurRep client) throws ProxyProcessingException {

        Date todayDate = new Date();
        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        String org = user.getOrganization().getCode();

        switch (client.getActionType()) {
            case "0":
                if (client.getRepdate().compareTo(todayDate) > 0) {
                    throw new ProxyProcessingException(bundle.getProperty("exception.proxy.repDate.isBiggerthantodaydate"), new String[0]);
                }
                if (client.getOccurDate().compareTo(todayDate) > 0) {
                    throw new ProxyProcessingException(bundle.getProperty("exception.proxy.OccurDate.isBiggerthantodaydate"), new String[0]);
                }
                if (client.getRepdate() != null && client.getOccurDate() != null &&
                        client.getRepdate().compareTo(client.getOccurDate()) < 0) {
                    throw new ProxyProcessingException(bundle.getProperty("exception.proxy.Repdate.isLessThantoOccurDate"), new String[0]);
                }
                if ((domain.getRepNoCount() != null && domain.getRepNoCount().intValue() > 0)
                        || !org.equals(domain.getBrchCode().getBranchCode()) || domain.getSsupOccurReview() != null) {
                    throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.notAllowed"), new String[0]);
                }
                break;
            case "1":
                if (!domain.getBrchCode().getBranchCode().equalsIgnoreCase(org)
                        && !domain.getBrchReviewer().getBranchCode().equalsIgnoreCase(org)) {
                    throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.CHANGE_BRCH_NOT_ALLOWED"), new String[0]);
                }
                break;
            case "3":
                break;
        }
    }
}
