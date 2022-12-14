/**
 *
 * @author m_salami
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.ClmOrder;
import ir.tamin.incomeBank.model.daramadBank.ClmOrderPK;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.daramadBank.webservice.CentralOrdRequest;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.ServiceUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

@Stateless
public class ClmOrderService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    @MessageBundle
    Bundle messageBundle;
    @Inject
    private StoredProcedure procedure;
    @Inject
    CentralOrdRequest centralOrdRequest;

    public ClmOrder get(ClmOrderPK clmOrderPK) throws WebApplicationException {
        FilterWrapper fw=ServiceUtils.createOrAddToFilterWrapper(null, "clmOrderPK.ordOrdno", clmOrderPK.getOrdOrdno(), Filter.Operator.EQUAL);
        fw=ServiceUtils.createOrAddToFilterWrapper(fw, "clmOrderPK.brchCode", clmOrderPK.getBrchCode(), Filter.Operator.EQUAL);
        List<ClmOrder> list=getList(fw, null, null, null);
        return list.isEmpty()?null:list.get(0);
    }

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    public List<ClmOrder> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));
        List<ClmOrder> bankList = new ArrayList<>();
        if (start != null && limit != null) {
            bankList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            bankList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            bankList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            bankList = createQuery.getResultList();
        }
        return bankList;
    }

    public Integer getCount(FilterWrapper filter) {
        Integer qcount = 0;
        TypedQuery createQuery = em.createQuery(getQuery(filter, null));
        qcount = createQuery.getResultList().size();
        return qcount;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<ClmOrder> clmOrderFrom = criteriaQuery.from(ClmOrder.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<ClmOrder> clmOrderEntityType = metamodel.entity(ClmOrder.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {
                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {
                        case EQUAL:
                            javax.persistence.criteria.Path path = clmOrderFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            predicates.add(criteriaBuilder.like(clmOrderFrom.get(clmOrderEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));

                            break;
                        default:
                            break;
                    }
                }
                criteriaQuery.where(predicates.toArray(new Predicate[]{}));
            }
            if (sortWrapper != null) {
                List<Order> orders = new ArrayList<>();
                for (Sort sortSet : sortWrapper.getSortSet()) {
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");
                    javax.persistence.criteria.Path path = clmOrderFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(clmOrderFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(clmOrderFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(clmOrderFrom);
            return criteriaQuery;
        } catch (Exception e) {
            return null;
        }
    }

    //package 
    public void update(ClmOrder clmOrder, User user) {
        try {
            em.merge(clmOrder);
            em.flush();
        } catch (Exception e) {
            Logger.getLogger(ClmOrderService.class.getName()).log(Level.SEVERE, null, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.payhead.EXC_IN_SAVE_PAYINFO")).build();
            throw new WebApplicationException(response);
        }
    }

    //package
    public void save(ClmOrder clmOrder, User user) {
        clmOrder.setCreateuid(user.getUserName());
        try {
            em.persist(clmOrder);
            em.flush();
        } catch (Exception e) {
            Logger.getLogger(ClmOrderService.class.getName()).log(Level.SEVERE, null, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.payhead.EXC_IN_SAVE_PAYINFO")).build();
            throw new WebApplicationException(response);
        }
    }

    public Map<String, Object> getTejaratBankInquiry(String ordOrdno, Long payAmt, String brchCode) {
        try {
            procedure.query("{?=call pck_bajoperations.digit(?,?)}");
            procedure.setOutParameter(1, Types.CHAR)
                    .setInParameter(2, ordOrdno)
                    .setInParameter(3, payAmt);
            procedure.execute();
            String digit = procedure.getOutParameter(1).toString();
            String id = ordOrdno.substring(0, 9) + "00" + ordOrdno.substring(9, 13) + digit;
            String serviceResult = centralOrdRequest.getCentralOrdRequestSoap().ordRequestTejarat(id);
            Map<String, Object> map = new HashMap<>();
            if (!(serviceResult.equals(""))) {
                if (!(serviceResult.substring(0, 1).equals("1"))) {
                    if (serviceResult.substring(0, 1).equals("0")) {
                        String message = "پاسخی از بانک دريافت نشد. تراکنشی با مشخصات وارد شده وجود ندارد !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    } else if (serviceResult.substring(0, 1).equals("7")) {
                        String message = "کاربر کلمه عبور خود را تغيير نداده است. ميبايست کلمه عبور اوليه حتما عوض شود !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    } else if (serviceResult.substring(0, 1).equals("8")) {
                        String message = "نام کاربر و يا کلمه عبور وارد شده اشتباه است !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    } else if (serviceResult.substring(0, 1).equals("9")) {
                        String message = "خطای داخلی سامانه رخ داده است !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    }
                } else {
                    String message = "استعلام با موفقیت انجام شد";
                    map.put("message", message);
                    serviceResult = serviceResult.replaceFirst(serviceResult.substring(0, 2), "");
                    serviceResult = serviceResult.replaceFirst(serviceResult.substring(0, serviceResult.indexOf("#") + 1), "");
                    serviceResult = serviceResult.replaceFirst(serviceResult.substring(0, serviceResult.indexOf("#") + 1), "");
                    String bankCardDate = "13" + serviceResult.substring(0, 2) + "/" + serviceResult.substring(2, 4) + "/" + serviceResult.substring(4, 6);
                    map.put("bankCardDate", bankCardDate);
                    serviceResult = serviceResult.replaceFirst(serviceResult.substring(0, 14), "");
                    String bankPayAmt = serviceResult.substring(0, serviceResult.indexOf("#"));
                    map.put("bankPayAmt", bankPayAmt);
                    return map;
                }
            } else {
                String message = "پاسخی از بانک دريافت نشد !";
                map.put("message", message);
                map.put("bankCardDate", null);
                map.put("bankPayAmt", null);
                return map;
            }
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }
        return null;
    }

    public Map<String, Object> getRefahBankInquiry(String ordOrdno, Long payAmt, String orpCarddate, String brchCode) {
        try {
            procedure.query("{?=call pck_bajoperations.digit(?,?)}");
            procedure.setOutParameter(1, Types.CHAR)
                    .setInParameter(2, ordOrdno)
                    .setInParameter(3, payAmt);
            procedure.execute();
            String digit = procedure.getOutParameter(1).toString();
            String id = ordOrdno.substring(0, 9) + "00" + ordOrdno.substring(9, 13) + digit;
            String serviceResult = centralOrdRequest.getCentralOrdRequestSoap().ordRequestRefah("81504", id, orpCarddate);
            Map<String, Object> map = new HashMap<>();
            if (!(serviceResult.equals(""))) {
                if (serviceResult.substring(0, 1).equals("*")) {
                    if ((serviceResult.substring(1, 4).equals("101")) || (serviceResult.substring(1, 4).equals("102"))) {
                        String message = "پاسخی از بانک دريافت نشد. خطا دراتصال به سامانه متمرکز !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    } else if (serviceResult.substring(1, 4).equals("103")) {
                        String message = "پاسخی از بانک دريافت نشد. خطای TimeOut!";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    }
                    if ((serviceResult.substring(1, 4).equals("202")) || (serviceResult.substring(1, 4).equals("201"))) {
                        String message = "پاسخی از بانک دريافت نشد. خطا درتهيه صورتحساب !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    } else if (serviceResult.substring(1, 4).equals("001")) {
                        String message = "پاسخی از بانک دريافت نشد. نام کاربری و يا کلمه عبور نامعتبر می باشد !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    } else if (serviceResult.substring(1, 4).equals("002")) {
                        String message = "پاسخی از بانک دريافت نشد.کاربر مورد نظر حق دسترسی به سرويس مذکور را ندارد !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    } else if (serviceResult.substring(1, 4).equals("003")) {
                        String message = "پاسخی از بانک دريافت نشد. خطا دراحراز هويت کاربر !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    } else if (serviceResult.substring(1, 4).equals("004")) {
                        String message = "پاسخی از بانک دريافت نشد.کاربر مورد نظر حق دسترسی به حساب مذکور را ندارد !";
                        map.put("message", message);
                        map.put("bankCardDate", null);
                        map.put("bankPayAmt", null);
                        return map;
                    }
                } else {
                    String message = "استعلام با موفقیت انجام شد";
                    map.put("message", message);
                    String bankCardDate = "13" + serviceResult.substring(17, 19) + "/" + serviceResult.substring(19, 21) + "/" + serviceResult.substring(21, 23);
                    map.put("bankCardDate", bankCardDate);
                    String bankPayAmt = serviceResult.substring(23, 37);
                    map.put("bankPayAmt", bankPayAmt);
                    return map;
                }
            } else {
                String message = "پاسخی از بانک دريافت نشد !";
                map.put("message", message);
                map.put("bankCardDate", null);
                map.put("bankPayAmt", null);
                return map;
            }
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }
        return null;
    }

}
