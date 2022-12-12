/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.user;

import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.business.baseinfo.BranchManager;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.model.user.Organization;
import ir.tamin.insurance.technical.model.user.WorkshopUser;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

//import ir.tamin.insurance.technical.model.baseinfo.Branch;

/**
 *
 * @author h_poursafar
 */
@ApplicationScoped
public class UserManager implements Serializable {

    @Inject
    private RestServices gs;

    @Inject
    private OrganizationBean organizationBean;
    
    @Inject
    private BranchManager branchService;
    
    private Map<String, OrgUser> users;

    @Inject
    @Named("DefaultEntityProxy")
    private EntityProxy entityProxy;
    
    @Inject
    private EntityManager em;
    
    @PostConstruct
    public void initialize() {
        users = new HashMap<>();
    }

    public OrgUser getUser(String entityId) {
        OrgUser orgUser = users.get(entityId);
        if (orgUser != null) {
            return orgUser;
        } else {
            orgUser = gs.getUsersById(entityId);
            if (orgUser != null && orgUser.getEntityId() != null) {
                users.put(orgUser.getEntityId(), orgUser);
            }
            return orgUser;
        }
    }

    public OrgUser getUserByName(String userName) {
        OrgUser orgUser = null;

        for (OrgUser u : users.values()) {
            if (userName.equals(u.getUserName())) {
                orgUser = u;
            }
        }
        if (orgUser != null) {
            return orgUser;
        } else {
            orgUser = gs.getUserByName(userName);
            if (orgUser != null && orgUser.getEntityId() != null) {
                List<Organization> org = new ArrayList<>();
//                orgUser.setOrganization(getFilterOrganization(orgUser.getOrganization()));
                org.add(orgUser.getOrganization());
//                organizationBean.getFullOrganization(org);
                orgUser.setOrganization(org.get(0));
                try {
                    orgUser.setWorkshopUsers(workshopUsers(userName));
                } catch (ProxyProcessingException ex) {
                    Logger.getLogger(UserManager.class.getName()).log(Level.SEVERE, null, ex);
                }
                users.put(orgUser.getEntityId(), orgUser);
            }
            return orgUser;
        }
    }

    public void reloadUser(String userName) {
        OrgUser orgUser = null;

        orgUser = gs.getUserByName(userName);
        if (orgUser != null && orgUser.getEntityId() != null) {
            List<Organization> org = new ArrayList<>();
            org.add(orgUser.getOrganization());
            organizationBean.getFullOrganization(org);
            orgUser.setOrganization(org.get(0));

            for (OrgUser u : users.values()) {
                if (userName.equals(u.getUserName())) {
                    users.remove(u);
                }
            }

            users.put(orgUser.getEntityId(), orgUser);
        }

    }

    public OrgUser getCurrentUser(String username) {
        OrgUser user = getUserByName(username);

//        if (user != null && user.getEntityId() != null) {
//            users.put(user.getEntityId(), user);
//        }
        return user;
    }

    public Map<String, Object> getOrganizations(FilterWrapper filter, int start, int limit) {
        int qcount = 0;
        Map<String, Object> dataPage = new HashMap<>();
        Map<String, Object> organizations = gs.getOrganizations(filter, start, limit);
        qcount = 1;
        dataPage.put("total", organizations.get("total"));
        dataPage.put("list", organizations.get("list"));
        return dataPage;

    }

    public List<OrgUser> getUsers(List<String> userIds) {
        List<OrgUser> orgUsers = new ArrayList<>();
        List<String> fetchParam = new ArrayList<>();
        if (userIds != null && userIds.size() > 0) {
            for (String id : userIds) {
                OrgUser orgUser = users.get(id);
                if (orgUser != null) {
                    orgUsers.add(orgUser);
                } else {
                    fetchParam.add(id);
                }
            }
            if (fetchParam.size() > 0) {
                FilterWrapper fw = new FilterWrapper();
                fw.setFilters(new HashSet<Filter>());
                Filter filter = new Filter();
                filter.setOperator(Filter.Operator.AFTER);
                filter.setProperty("userName");
                filter.setValue(fetchParam.toString());
                fw.getFilters().add(filter);
                List<OrgUser> newOrgUsers = gs.getUsers(fw, null, null);
                if (newOrgUsers != null && newOrgUsers.size() > 0) {
                    for (OrgUser newOrgUser : newOrgUsers) {
                        if (newOrgUser != null && newOrgUser.getEntityId() != null) {
                            users.put(newOrgUser.getEntityId(), newOrgUser);
                            orgUsers.add(newOrgUser);
                        }
                    }
                }
            }
            return orgUsers;

        } else {
            return null;
        }

    }

//    private Organization getFilterOrganization(Organization org) {
//        Branch branch = branchService.get(org.getCode());
//        if (branch.getBrhKind().equals(OrganizationTypeEnum.AGHMARI.getCode())
//                || branch.getBrhKind().equals(OrganizationTypeEnum.KARGOZARI.getCode())) {
//            org = organizationBean.getOrganizationById(org.getEntityId());
//            org = organizationBean.getOrganizationById(org.getParent().getEntityId());
//        }
//        return org;
//    }
    private Organization getFilterOrganization(Organization org) {
        Branch branch = branchService.get(org.getCode());
        if (branch.getBranchKind().equals(OrganizationTypeEnum.AGHMARI.getCode())
                || branch.getBranchKind().equals(OrganizationTypeEnum.KARGOZARI.getCode())) {
            org = organizationBean.getOrganizationById(org.getEntityId());
            org = organizationBean.getOrganizationById(org.getParent().getEntityId());
            return org;
        } else {
            return null;
        }
    }
    
    private List<WorkshopUser> workshopUsers (String userName) throws ProxyProcessingException{
//                FilterWrapper filterWrapper = new FilterWrapper();
//        Set<Filter> filters = new HashSet<>();
//        Filter filter = new Filter();
//        filter.setProperty("userId");
//        filter.setOperator(Filter.Operator._EQUAL);
//        filter.setValue(userName);
//        filters.add(filter);
//        filterWrapper.setFilters(filters);
//        entityProxy.setEntityManager(em);
        List<WorkshopUser> list =em.createQuery("select w from WorkshopUser w where w.userId=:userId").setParameter("userId", userName).getResultList();
        //List<WorkshopUser> list = (List <WorkshopUser>) entityProxy.search(WorkshopUser.class, filterWrapper, null, 0, -1, true);
        return list;
    }
}
