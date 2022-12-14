/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.centralPayment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import ir.tamin.incomeBank.model.centralPayment.sign.DataSignModel;
import ir.tamin.incomeBank.model.centralPayment.Setting;
import ir.tamin.incomeBank.model.centralPayment.SettingHis;
import ir.tamin.incomeBank.model.centralPayment.SignedSettingModel;
import ir.tamin.incomeBank.model.centralPayment.sign.ReturnResultModel;
import ir.tamin.incomeBank.model.centralPayment.sign.RightelSignModel;
import ir.tamin.incomeBank.model.centralPayment.sign.SignVerifyResult;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.RestServices;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.util.TextUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJBException;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

/**
 *
 * @author s_maknooni
 */
@Stateless
public class SettingService {

    @Inject
    EntityManager entityManager;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    SignDataService<SignedSettingModel> signDataService;

    @Inject
    RestServices restServices;

    @Inject
    @WebProperties
    Bundle webBundle;
    @Inject
    UserBean userBean;

    public Setting get(Long id) {
        Setting setting = entityManager.find(Setting.class, id);
        return setting;
    }

    public SignedSettingModel getSettingForSign(Long settingId) {
        SignedSettingModel forSignModel = entityManager.find(SignedSettingModel.class, settingId);
        return forSignModel;
    }

    public String getSettingForSignInBase64(Long settingId, Integer systemId, String userName) throws WebApplicationException {
        SignedSettingModel forSignModel = getSettingForSign(settingId);
        forSignModel.setSystemId(systemId);
        String forSignModelBase64 = null;
        try {
            forSignModelBase64 = signDataService.convertSignedModelToBase64(forSignModel);
        } catch (JsonProcessingException jsex) {
            String message = "خطا در تبدیل دیتا به فرمت base64";
            Logger.getLogger(SettingService.class.getName()).log(Level.SEVERE, message, jsex);
            delete(settingId, 1, userName);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        } catch (WebApplicationException | EJBException ex) {
            throw ex;
        }
        return forSignModelBase64;
    }

    public List<Setting> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filterWrapper, sort));

        List<Setting> settingList = new ArrayList<>();
        if (start != null && limit != null) {
            settingList = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            settingList = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            settingList = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            settingList = createQuery.getResultList();
        }

        return settingList;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<Setting> settingFrom = criteriaQuery.from(Setting.class);
            Metamodel m = entityManager.getMetamodel();
            EntityType<Setting> settingEntityType = m.entity(Setting.class);
            List<Predicate> predicates = new ArrayList<>();
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
                    switch (operator) {
                        case LIKE:
                            predicates.add(criteriaBuilder.like(settingFrom.get(settingEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case EQUAL:
                            javax.persistence.criteria.Path path = settingFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case NOT_EQUAL:
                            if ("userSignature".equals(field)) {
                                path = settingFrom.get(f[0]);
                                for (int j = 1; j < f.length; j++) {
                                    path = path.get(f[j]);
                                }
                                predicate = criteriaBuilder.isNotNull(path);
                                predicates.add(predicate);
                                break;

                            }

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

                    javax.persistence.criteria.Path path = settingFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 1) {

                    } else {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(settingFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(settingFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(settingFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    public Setting getBySystemId(Integer systemId) {

        FilterWrapper filterWrapper = new FilterWrapper();
        Filter filter = new Filter();
        filter.setProperty("system.systemId");
        filter.setValue(systemId.toString());
        filter.setOperator(Filter.Operator.EQUAL);
        Set<Filter> filters = new HashSet<>();
        filters.add(filter);

//        filter = new Filter();
//        filter.setProperty("userSignature");
//        filter.setValue("");
//        filter.setOperator(Filter.Operator.NOT_EQUAL);
//        filters.add(filter);
        filterWrapper.setFilters(filters);

        List<Setting> list = getList(filterWrapper, 0, 10, null);
        String user = " ";
        if (list != null && !list.isEmpty()) {
            //userlog
            Setting setting = list.get(0);

            if (setting.getCreateUser() != null) {
                user = userBean.getUserByUserName(setting.getCreateUser()).getFirstName() + " " + userBean.getUserByUserName(setting.getCreateUser()).getLastName();
            }
            setting.setStrCreateUser(user);
            user = " ";
            if (setting.getUpdateUser() != null) {
                user = userBean.getUserByUserName(setting.getUpdateUser()).getFirstName() + " " + userBean.getUserByUserName(setting.getUpdateUser()).getLastName();
            }
            setting.setStrUpdateUser(user);
            String tmp = " ";
            if (setting.getStrCreateDate() != null) {
                tmp = setting.getStrCreateDate();
            }
            setting.setStrCreateDate(tmp);
            tmp = " ";
            if (setting.getStrUpdateDate() != null) {
                tmp = setting.getStrUpdateDate();
            }
            setting.setStrUpdateDate(tmp);
            tmp = " ";
            if (setting.getUserSignature() != null) {
                tmp = setting.getUserSignature();
                setting.setUserSignature(tmp);
            }

            //
            return setting;

        } else {
            return new Setting();
        }

    }

    public Setting preSave(Setting setting, String returnCode, String userName) {

        try {
            if (returnCode == null) {
                setting.setCreateUser(userName);
                setting.setCreateDate(new Date());
                setting.setUpdateUser(userName);
                setting.setUpdateDate(new Date());
                entityManager.persist(setting);
            } else {
                setting.setRightelReturnId(returnCode);
                entityManager.merge(setting);
                entityManager.flush();
            }
            // return setting.getSettingId();
            return setting;
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطای غیرمنتطره در ذخیره اولیه تنظیمات!").build();
            throw new WebApplicationException(response);
        }

    }

    public void finalSaveWithSign(DataSignModel dataSignModel, String userName) {

        String sign = dataSignModel.getSign();
        Long preSettingId = Long.valueOf(dataSignModel.getId().toString());

        try {
            Setting setting = get(preSettingId);
            String dataInBase64 = getSettingForSignInBase64(preSettingId, setting.getSystem().getSystemId(), userName);

            //verift sign
            SignVerifyResult signVerifyResult = signDataService.verifySign(sign, dataInBase64, userName);

            //Pars SignVerify Result
            boolean verifyResult = signDataService.parsSignVerifyResult(signVerifyResult);
            if (verifyResult) {
                setting.setUserSignature(sign);
                entityManager.merge(setting);
            }

        } catch (WebApplicationException | EJBException wex) {
            throw wex;
        } catch (JsonProcessingException ex) {
            Logger.getLogger(SettingService.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطا در تبدیل دیتا به فرمت base64").build();
            throw new WebApplicationException(response);
        } catch (Exception ex) {
            String message = "خطا در بروز رسانی تنظیمات";
            Logger.getLogger(SettingService.class.getName()).log(Level.SEVERE, message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

    }

    public Setting preEdit(Setting setting, String returnCode, String userName, User user) throws Exception {
        Setting oldSetting = get(setting.getSettingId());
        SettingHis settingHis = new SettingHis(oldSetting);
        if (returnCode == null) {
            setting.setCreateUser(oldSetting.getCreateUser());
            setting.setCreateDate(oldSetting.getCreateDate());
            setting.setUpdateUser(userName);
            setting.setUpdateDate(new Date());
        } else {
            setting.setRightelReturnId(returnCode); 
        }

        try {
            //update
            entityManager.merge(setting);
            entityManager.flush();
            if (returnCode == null) {
                //insert His
                entityManager.persist(settingHis);
            }
            return setting;
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطای غیرمنتطره در ویرایش اولیه تنظیمات!").build();
            throw new WebApplicationException(response);
        }
    }

    public void finalEditWithSign(DataSignModel dataSignModel, String userName) {
        String sign = dataSignModel.getSign();
        Long preSettingId = Long.valueOf(dataSignModel.getId().toString());

        try {
            Setting setting = get(preSettingId);
            String dataInBase64 = getSettingForSignInBase64(preSettingId, setting.getSystem().getSystemId(), userName);

            //verift sign
            SignVerifyResult signVerifyResult = signDataService.verifySign(sign, dataInBase64, userName);

            //Pars SignVerify Result
            boolean verifyResult = signDataService.parsSignVerifyResult(signVerifyResult);
            if (verifyResult) {
                setting.setUserSignature(sign);
                entityManager.merge(setting);
            }

        } catch (WebApplicationException | EJBException wex) {
            throw wex;
        } catch (JsonProcessingException ex) {
            Logger.getLogger(SettingService.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطا در تبدیل دیتا به فرمت base64").build();
            throw new WebApplicationException(response);
        } catch (Exception ex) {
            String message = "خطا در بروز رسانی تنظیمات";
            Logger.getLogger(SettingService.class.getName()).log(Level.SEVERE, message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

    }

    public void delete(Long id, Integer status, String userName) {
        try {
            Setting setting = get(id);
            SettingHis settingHis;

            if (status != 0) {
                if (setting.getSystem().getSystemId() == 3) {
                    settingHis = new SettingHis(setting, setting.getSettingId());
                } else {
                    settingHis = new SettingHis(setting);
                }

                settingHis.setDeleteUser(userName);
                settingHis.setDeleteDate(new Date());

                entityManager.persist(settingHis);
            }
            entityManager.remove(setting);
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطای غیرمنتطره در حذف تنظیمات!").build();
            throw new WebApplicationException(response);
        }

    }

    public Setting sendToRightelForSign(Setting setting, User user) {

        try {
            // call rightel service for sign data
            SignedSettingModel settingForSign = getSettingForSign(setting.getSettingId());
            settingForSign.setSystemId(setting.getSystem().getSystemId());
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonString = ow.writeValueAsString(settingForSign);
            String sh1String = TextUtils.getSHA1(jsonString);

            RightelSignModel signModel = new RightelSignModel();
            signModel.setPhoneNumber(user.getMobile());
            signModel.setHash(sh1String);
            signModel.setText("آیا امضا تنظیمات را تایید می نمایید؟");
            signModel.setUserName(webBundle.getProperty("rightel.sign.username"));
            signModel.setPasswd(webBundle.getProperty("rightel.sign.passwd"));

            String returnCode = restServices.rightelSignRequest(setting.getSettingId().toString(), signModel);
            if (returnCode != null && !returnCode.isEmpty()) {
                setting.setRightelReturnId(returnCode);
                entityManager.merge(setting);
                entityManager.flush();
                return setting;
            } else {
                String message = "خطا در دریافت اطلاعات از رایتل.لطفا مجددا سعی نمایید و یا به مدیر سیستم اطلاع دهید.";
                ReturnResultModel returnResultModel = new ReturnResultModel(setting.getSettingId().toString(), message);
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(returnResultModel).build();
                throw new WebApplicationException(response);
            }

        } catch (WebApplicationException wex) {
            throw wex;
        } catch (Exception ex) {
            Logger.getLogger(SettingService.class.getName()).log(Level.SEVERE, null, ex);
            String message = "خطای غیرمنتطره در ارسال اطلاعات جهت امضا.لطفا مجددا سعی نمایید و یا به مدیر سیستم اطلاع دهید.!";
            ReturnResultModel returnResultModel = new ReturnResultModel(setting.getSettingId().toString(), message);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(returnResultModel).build();
            throw new WebApplicationException(response);
        }

    }

    public void finalSaveWithRightelSign(Setting setting, User user) {
        try {
            // 1 - call rightel service for get sign data after some seconds

            Thread.sleep(10000);

            String signedHash = restServices.getRightelSignedData(setting.getRightelReturnId()).get("signedHash");
            if (signedHash != null && !signedHash.isEmpty()) {

                // 2 - call rightel service for verify sign 
                SignedSettingModel settingForSign = getSettingForSign(setting.getSettingId());
                settingForSign.setSystemId(setting.getSystem().getSystemId());
                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String jsonString = ow.writeValueAsString(settingForSign);
                String sh1String = TextUtils.getSHA1(jsonString);

                RightelSignModel signModel = new RightelSignModel();
                signModel.setPhoneNumber(user.getMobile());
                signModel.setSignedHash(signedHash);
                signModel.setHash(sh1String);

                Map<String, Boolean> returnResult = restServices.verifyRightelSign(setting.getSettingId().toString(), signModel);
                boolean verifyResult = returnResult.get("finalResult");
                if (verifyResult) {
                    setting.setUserSignature(signedHash);
                    entityManager.merge(setting);
                    entityManager.flush();
                } else {
                    String message = "خطا در صحت سنجی امضا.لطفا مجددا سعی نمایید و یا به مدیر سیستم اطلاع دهید.";
                    Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
                    throw new WebApplicationException(response);
                }

            } else {
                String message = "خطا در  دریافت امضا.لطفا مجددا سعی نمایید و یا به مدیر سیستم اطلاع دهید.";
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
                throw new WebApplicationException(response);
            }
        } catch (Exception ex) {
            String message = "خطای غیرمنتظره در ذخیره تنظیمات!.لطفا مجددا سعی نمایید و یا به مدیر سیستم اطلاع دهید.";
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

    }

//    public void getSignAndVerify(Setting setting, User user) throws Exception {
//
//        SignedSettingModel settingForSign = getSettingForSign(setting.getSettingId());
//        settingForSign.setSystemId(setting.getSystem().getSystemId());
//
//        String signedHash = rightelSignService.getSignAndVerify(settingForSign, setting.getRightelReturnId(), setting.getSettingId().toString(), user);
//        if (signedHash != null && !signedHash.isEmpty()) {
//            setting.setUserSignature(signedHash);
//
//        } else {
//            String message = "صحت امضا تایید نشد.لطفا مجددا سعی نمایید و یا به مدیر سیستم اطلاع دهید.";
//            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
//            throw new WebApplicationException(response);
//        }
//        try {
//            //update
//            entityManager.merge(setting);
//            entityManager.flush();
//        } catch (Exception ex) {
//            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطای غیرمنتطره در ویرایش اولیه تنظیمات!").build();
//            throw new WebApplicationException(response);
//        }
//    }

    public Setting reverse(Long id) {
        try {
            //find last Rec in His
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery<BigDecimal> criteriaQuery = criteriaBuilder.createQuery(BigDecimal.class);
            CriteriaQuery query = criteriaBuilder.createQuery();
            Root<SettingHis> rootClass = criteriaQuery.from(SettingHis.class);
            Root<SettingHis> root = query.from(SettingHis.class);

            List<Predicate> predicates = new ArrayList<>();
            criteriaQuery.select(criteriaBuilder.max(rootClass.<BigDecimal>get("tbsHisId")));

            BigDecimal maxValue = entityManager.createQuery(criteriaQuery).getSingleResult();
            Expression<BigDecimal> path = root.get("tbsHisId");
            predicates.add(criteriaBuilder.equal(path, maxValue));

            query.where(predicates.toArray(new Predicate[]{}));
            query.select(root);
            TypedQuery createQuery = entityManager.createQuery(query);

            SettingHis hisRec = (SettingHis) createQuery.getSingleResult();

            //create a setting obj from His Rec
            Setting setting = new Setting(hisRec, id);
            //delete His Rec
            //update setting with obj
            entityManager.remove(hisRec);
            entityManager.merge(setting);
            entityManager.flush();
            //return setting for refreshing form
            return setting;

        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطای غیرمنتطره در حذف تنظیمات!").build();
            throw new WebApplicationException(response);
        }

    }

    public void editPensionSetting(Setting setting, String userName, User user) throws Exception {
        Setting oldSetting = get(setting.getSettingId());
        SettingHis settingHis = new SettingHis(oldSetting, setting.getSettingId());

        setting.setCreateUser(oldSetting.getCreateUser());
        setting.setCreateDate(oldSetting.getCreateDate());
        setting.setUpdateUser(userName);
        setting.setUpdateDate(new Date());

        try {
            //update
            entityManager.merge(setting);
            entityManager.flush();
            //insert His
            entityManager.persist(settingHis);
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطای غیرمنتطره در ویرایش اولیه تنظیمات!").build();
            throw new WebApplicationException(response);
        }
    }

    public void finalSave(Setting setting, Map<String, String> returnData, String userName) {

        setting.setUserSignature(returnData.get("signedHash"));
        setting.setX509certificate(returnData.get("x509Certificate"));
        setting.setSignEvaluation(returnData.get("signatureEvaluationResult"));
        setting.setCertChainValidation(returnData.get("certificateChainValidationResult"));
        setting.setCertOcspValidation(returnData.get("certificateOCSPValidationResult"));
        setting.setCertCrlValidation(returnData.get("certificateCRLValidationResult"));
        setting.setUpdateUser(userName);
        setting.setUpdateDate(new Date());

        try {
            entityManager.merge(setting);
            entityManager.flush();
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("خطای غیرمنتطره در ذخیره!").build();
            throw new WebApplicationException(response);
        }

    }

}
