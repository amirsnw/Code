/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.identityManager;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.RestServices;

import java.util.HashMap;
import java.util.Map;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

/**
 * @author s_maknooni
 */
@ApplicationScoped
public class UserBean {

    @Inject
    private RestServices rs;

    private Map<String, User> users = new HashMap<>();

    @Inject
    private EntityManager entityManager;

    public User getUserByUserName(String username) {
        User user;
        if (users.get(username) == null) {
            user = rs.getUserByName(username);
            if (user != null && user.getUserName() != null) {
                users.put(user.getUserName(), user);
            }
            String userOIMORGCode = user.getOrganization().getCode();
            Branch branch = entityManager.find(Branch.class, userOIMORGCode);
            if (branch.getBrhKind().equals("2")) {
                user.setEdareKol(true);
            }
        } else {
            user = users.get(username);
        }

        return user;
    }

    //    public Map<String, Object> getUsers(FilterWrapper filter, Integer start, Integer limit) {
//        return rs.getUsersMap(filter, start, limit);
//    }
//    public List<User> getUsers(List<String> userIds) {
//        List<User> orgUsers = new ArrayList<>();
//        List<String> fetchParam = new ArrayList<>();
//        if (userIds != null && userIds.size() > 0) {
//            for (String id : userIds) {
//                User orgUser = users.get(id);
//                if (orgUser != null) {
//                    orgUsers.add(orgUser);
//                } else {
//                    fetchParam.add(id);
//                }
//            }
//            if (fetchParam.size() > 0) {
//                FilterWrapper fw = new FilterWrapper();
//                fw.setFilters(new HashSet<Filter>());
//                Filter filter = new Filter();
//                filter.setOperator(Filter.Operator.AFTER);
//                filter.setProperty("entityId");
//                filter.setValue(fetchParam.toString());
//                fw.getFilters().add(filter);
//                List<User> newOrgUsers = rs.getUsers(fw, null, null);
//                if (newOrgUsers != null && newOrgUsers.size() > 0) {
//                    for (User newOrgUser : newOrgUsers) {
//                        if (newOrgUser != null && newOrgUser.getUserName() != null) {
//                            users.put(newOrgUser.getUserName(), newOrgUser);
//                            orgUsers.add(newOrgUser);
//                        }
//                    }
//                }
//            }
//            return orgUsers;
//
//        } else {
//            return null;
//        }
//
//    }
    public User updateUserCashe(String username) {
        users.remove(username);
        User user = rs.getUserByName(username);
        if (user != null) {
            users.put(user.getUserName(), user);
        }
        return user;
    }
}
