/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import com.healthmarketscience.jackcess.ColumnBuilder;
import com.healthmarketscience.jackcess.Database;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.Table;
import com.healthmarketscience.jackcess.TableBuilder;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.centralPayment.GlSystemType;
import ir.tamin.incomeBank.model.centralPayment.LogDetail;
import ir.tamin.incomeBank.model.daramadBank.AutoRegisterResult;
import ir.tamin.incomeBank.model.daramadBank.ClmOrder;
import ir.tamin.incomeBank.model.daramadBank.ClmOrderPK;
import ir.tamin.incomeBank.model.daramadBank.DrmdBank;
import ir.tamin.incomeBank.model.daramadBank.DrmdBankPK;
import ir.tamin.incomeBank.model.daramadBank.DrmdCard;
import ir.tamin.incomeBank.model.daramadBank.DrmdCardPK;
import ir.tamin.incomeBank.model.daramadBank.DrmdSorat;
import ir.tamin.incomeBank.model.daramadBank.Vwdrmdlistcard;
import ir.tamin.incomeBank.model.daramadBank.enums.CardPassEnum;
import ir.tamin.incomeBank.model.daramadBank.enums.CardTypeEnum;
import ir.tamin.incomeBank.model.daramadBank.enums.RcvTypeEnum;
import ir.tamin.incomeBank.model.daramadBank.enums.ShowMsgEnum;
import ir.tamin.incomeBank.model.identityManager.User;
import ir.tamin.incomeBank.service.centralPayment.LogDetailService;
import ir.tamin.incomeBank.service.centralPayment.LogService;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.DateTimeUtility;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.incomeBank.util.ServiceUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.imageio.ImageIO;
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
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JsonDataSource;
import net.sf.jasperreports.engine.query.JsonQueryExecuterFactory;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author m_salami
 */
@Stateless
public class DrmdCardService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;
    @Inject
    private DrmdCompareService drmdCompareService;
    @Inject
    @MessageBundle
    Bundle messageBundle;
    @Inject
    private ClmOrderService clmOrderService;
    @Inject
    private ClmOrdpayService ordpayService;
    @Inject
    private ClmOrditmService orditmService;
    @Inject
    private StoredProcedure procedure;
    @Inject
    private StoredProcedure procedureForPass;
    @Inject
    private BajOrdpusedService bajOrdpusedService;
    @Inject
    private VwdrmdlistcardService drmdListService;
    @Inject
    ServiceUtils serviceUtils;
    @Inject
    DrmdSoratService drmdSoratService;
    @Inject
    @WebProperties
    Bundle webBundle;

    @Inject
    private LogService logService;

    @Inject
    private LogDetailService logDetailService;

    @Inject
    private DrmdSoratInsertCardBank soratInsertService;

    public DrmdCard get(DrmdCardPK drmdCardPK) throws WebApplicationException {
        DrmdCard drmdCard = em.find(DrmdCard.class, drmdCardPK);
        if (drmdCard.getCardDate() != null) {
            drmdCard.setCardDateTimeStamp(DateUtils
                    .convertDateToTimestampString(DateUtils.convertPersianDateStringToDate(drmdCard.getCardDate())));
        }
        return drmdCard;
    }

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {

        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        return map;
    }

    public List<DrmdCard> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<DrmdCard> bankList = new ArrayList<>();
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
            Root<DrmdCard> drmdCardFrom = criteriaQuery.from(DrmdCard.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            EntityType<DrmdCard> drmdCardEntityType = metamodel.entity(DrmdCard.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");

                    Predicate predicate = null;
                    switch (operator) {

                        case EQUAL:
                            javax.persistence.criteria.Path path = drmdCardFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            predicates.add(criteriaBuilder.like(drmdCardFrom.get(drmdCardEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));

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

                    javax.persistence.criteria.Path path = drmdCardFrom.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length > 0) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(drmdCardFrom.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(drmdCardFrom.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }

                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }

            criteriaQuery.select(drmdCardFrom);
            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    public void update(DrmdCard drmdCard, User user) {
        try {
            drmdCard = checkBeforeChange(drmdCard);
            DrmdCard pdrmdCard = get(drmdCard.getDrmdCardPK());
            pdrmdCard.setAllowDublicatedRcvNo(drmdCard.getAllowDublicatedRcvNo());
            pdrmdCard.setCardComment(drmdCard.getCardComment());
            pdrmdCard.setCardOrdpay(drmdCard.getCardOrdpay());
            pdrmdCard.setCardPrice(drmdCard.getCardPrice());
            pdrmdCard.setCardRcvno(drmdCard.getCardRcvno());
            pdrmdCard.setCardRcvtype(drmdCard.getCardRcvtype());
            pdrmdCard.setCardPass("1");
            pdrmdCard.setCardRetu(null);
            em.merge(pdrmdCard);
            em.flush();
            passCard(pdrmdCard, CardPassEnum.PASS.getCode(), ShowMsgEnum.YES.getCode());
        } catch (WebApplicationException exc) {
            throw exc;
        } catch (Exception e) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.UNKNOWN_EXCEPTION_IN_UPDATE")).build();
            throw new WebApplicationException(response);
        }
    }

    public void save(DrmdCard drmdCard, User user) throws WebApplicationException {
        drmdCard = checkBeforeChange(drmdCard);
        // چک کردن برگه پرداخت تکراری
        if (!drmdCard.getCardOrdpay().substring(8).equals("0000000")) {// برگ پرداخت خالی نباشد
            FilterWrapper fw = ServiceUtils.createOrAddToFilterWrapper(null, "cardOrdpay", drmdCard.getCardOrdpay(), Filter.Operator.EQUAL);
            fw = ServiceUtils.createOrAddToFilterWrapper(fw, "drmdCardPK.brchCode", drmdCard.getDrmdCardPK().getBrchCode(), Filter.Operator.EQUAL);
            SortWrapper sw = ServiceUtils.createOrAddToSortWrapper(null, null, null);
            List<DrmdCard> list = (List) getList(fw, null, null, /*sw*/ null);
            if (!list.isEmpty()) {
                Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.ITERATED_CARD_ORD_PAY")).build();
                throw new WebApplicationException(response);
            }
        }

        drmdCard.setCreateuid(user.getUserName());
        drmdCard.setCreatedt(serviceUtils.codeDateForDB(new Date()));
        drmdCard.setCardPass("1");
        drmdCard.setCardRetu(null);
        drmdCard.getDrmdCardPK().setBrchCode(user.getOrganization().getCode());
        try {
            em.persist(drmdCard);
            em.flush();
            passCard(drmdCard, CardPassEnum.PASS.getCode(), ShowMsgEnum.YES.getCode());
        } catch (WebApplicationException exc) {
            throw exc;
        } catch (Exception e) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_IN_SAVE_CARD_BANK") + "<br><br>" + e.getMessage()).build();
            throw new WebApplicationException(response);
        }
    }

    public Integer passCard(DrmdCard drmdCard, String type, String showMsg) {
        String brchCode = drmdCard.getDrmdCardPK().getBrchCode();
        String ordNo = drmdCard.getCardOrdpay().substring(0, 13);
        String ordRow = drmdCard.getCardOrdpay().substring(13, 15);
        String pcardDate = drmdCard.getCardDate();
        Long cardPrice = drmdCard.getCardPrice();
        String userName = drmdCard.getCreateuid();
        Integer result = 0;
        try {
            procedureForPass.init();
            procedureForPass.query("{?=call Pck_Pay_Clm.Pay_Clm(?,?,?,?,?,?,?,?,?)}");
            procedureForPass.setOutParameter(1, Types.INTEGER)
                    .setInParameter(2, brchCode)
                    .setInParameter(3, ordNo)
                    .setInParameter(4, ordRow)
                    .setInParameter(5, pcardDate)
                    .setInParameter(6, cardPrice)
                    .setInParameter(7, pcardDate)
                    .setInParameter(8, type)
                    .setInParameter(9, userName)
                    .setInParameter(10, showMsg);
            procedureForPass.execute();
            result = Integer.valueOf(procedureForPass.getOutParameter(1).toString());

        } catch (SQLException sqex) {

            String errorMsg = null;
            int index = sqex.getMessage().indexOf(':');
            int secondIndex = sqex.getMessage().indexOf("ORA", sqex.getMessage().indexOf("ORA") + 1);
            if (secondIndex != -1) {
                errorMsg = sqex.getMessage().substring(index + 1, secondIndex);
            } else {
                errorMsg = sqex.getMessage().substring(index + 1);
            }
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMsg).build();
            throw new WebApplicationException(response);
        } catch (Exception exc) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_IN_PASS_RETURN")).build();
            throw new WebApplicationException(response);
        }
        return result;
    }

    private DrmdCard checkBeforeChange(DrmdCard drmdCard) throws WebApplicationException {

        try {
            Response response = null;
            // تاریخ وصولی نباید از تاریخ روز بزرگتر باشد
            Date cardDateS = DateUtils.convertTimestampStringToDate(drmdCard.getCardDateTimeStamp().toString());
            cardDateS = DateTimeUtility.setTimeToZero(cardDateS);
            Date today = new Date();
            if (cardDateS.after(today)) {
                response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.CARD_DATE_IS_AFTER_TODAY")).build();
                throw new WebApplicationException(response);
            }
            String cardDate = DateUtils.getJalaliStandard(cardDateS, "");
            // چک کردن بزرگتر بودن از تاریخ صدور برگه پرداخت-1
            //درج مقدار تاریخ مؤثر برگ پرداخت - 2
            ClmOrderPK clmOrderPk = new ClmOrderPK(drmdCard.getCardOrdpay().substring(0, 13), drmdCard.getDrmdCardPK().getBrchCode());
            ClmOrder clmOrder = clmOrderService.get(clmOrderPk);
            Date docDate = null;
            if (clmOrder != null && clmOrder.getOrdDocdat() != null) {
                docDate = DateUtils.convertPersianDateStringToDate(clmOrder.getOrdDocdat());
                docDate = DateTimeUtility.setTimeToZero(docDate);
                if (cardDateS.before(docDate)) {
                    response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.CARD_DATE_IS_BEFORE_ORD_DOCDATE")).build();
                    throw new WebApplicationException(response);
                }
                drmdCard.setCardMdate(clmOrder.getOrdDocdat());
            }

            // چک کردن برگ پرداخت ابطالی
            if (ordpayService.IsRevoked(drmdCard.getCardOrdpay().substring(0, 13), drmdCard.getCardOrdpay().substring(13, 15), drmdCard.getDrmdCardPK().getBrchCode())) {
                response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.EBATELI_ORD_PAY")).build();
                throw new WebApplicationException(response);
            }

            // چک کردن شماره واریزی تکراری در صورتی که
            //نوع واریزی چک یا حواله باشد با نوع واریزی برابر تاریخ وصول و مبلغ برابر
            if (drmdCard.getCardRcvtype().equals(RcvTypeEnum.CHEQUE.getCode()) || drmdCard.getCardRcvtype().equals(RcvTypeEnum.HAVALE.getCode())) {
                FilterWrapper fw = ServiceUtils.createOrAddToFilterWrapper(null, "cardRcvno", drmdCard.getCardRcvno(), Filter.Operator.LIKE);
                SortWrapper sw = ServiceUtils.createOrAddToSortWrapper(null, null, null);
                List<DrmdCard> preDrmdCardList = getList(fw, 0, 1, sw);
                if (!preDrmdCardList.isEmpty() && preDrmdCardList.get(0).getCardRcvtype().equals(drmdCard.getCardRcvtype()) && preDrmdCardList.get(0).getCardDate().equals(cardDate) && preDrmdCardList.get(0).getCardPrice() == drmdCard.getCardPrice()) {
                    response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.ITERATED_RCV_NO")).build();
                    throw new WebApplicationException(response);
                } else if (!drmdCard.getAllowDublicatedRcvNo() && (!preDrmdCardList.isEmpty() && (preDrmdCardList.get(0).getCardRcvtype().equals(drmdCard.getCardRcvtype()) || !preDrmdCardList.get(0).getCardDate().equals(cardDate) || preDrmdCardList.get(0).getCardPrice() != drmdCard.getCardPrice()))) {
                    response = Response.status(Response.Status.ACCEPTED).entity(messageBundle.getProperty("coreaccount.daramadbank.ITERATED_RCV_NO_CONFIRM")).build();
                    throw new WebApplicationException(response);
                }
            }

            // چک کردن صدور سند مالی
            boolean issued = drmdCompareService.isIssued(drmdCard.getDrmdCardPK().getBrchCode(), cardDate.substring(0, 6));
            if (issued) {
                response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.DOC_IS_ISSUED_MODIF_INVALID")).build();
                throw new WebApplicationException(response);
            }

            // درج مقدار ذیحسابی -- باتریگر پر می شود
//        boolean accountant = orditmService.IsAccountant(drmdCard.getDrmdCardPK().getBrchCode(), drmdCard.getCardOrdpay().substring(0, 13));
//        if (accountant) {
//            drmdCard.setCardAttrib(CardAttribEnum.ZIHESABI.getCode());
//        } else {
//            drmdCard.setCardAttrib(CardAttribEnum.MOTEFAREGHEH.getCode());
//        }
            // درج مقدار تاریخ وصولی
            drmdCard.setCardDate(cardDate);

            // درج مقدار نوع ثبت
            drmdCard.setCardType(CardTypeEnum.NOT_MECHANIZED.getCode());
        } catch (WebApplicationException exc) {
            throw exc;
        } catch (Exception exc) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_IN_SAVE_CARD_BANK")).build();
            throw new WebApplicationException(response);
        }

        return drmdCard;
    }

    public void delete(DrmdCardPK drmdCardPk, User user) {
        DrmdCard pdrmdCard = get(drmdCardPk);
        try {
            em.remove(pdrmdCard);
        } catch (Exception exc) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_IN_DELETE_CARD_BANK")).build();
            throw new WebApplicationException(response);
        }
    }

    public void passReturn(DrmdCardPK drmdCardPk, User user) {
        Response response;
        DrmdCard drmdCard = get(drmdCardPk);
        if (drmdCard != null) {

            // چک کردن صدور سند مالی
            String cardDate = drmdCard.getCardDate();
            boolean issued = drmdCompareService.isIssued(drmdCard.getDrmdCardPK().getBrchCode(), cardDate.substring(0, 6));
            if (issued) {
                response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.DOC_IS_ISSUED_RETURN_INVALID")).build();
                throw new WebApplicationException(response);
            }
            // چک کردن عملیات ریاضی
            boolean calculated = bajOrdpusedService.isCalculated(drmdCard.getDrmdCardPK().getBrchCode(), drmdCard.getCardOrdpay().substring(0, 13), drmdCard.getCardOrdpay().substring(13, 15));
            if (calculated) {
                response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.MATH_OP_DONE_RETURN_INVALID")).build();
                throw new WebApplicationException(response);
            }
            try {
                drmdCard.setCardPass(null);
                drmdCard.setCardRetu("1");
                em.merge(drmdCard);
                em.flush();
                passCard(drmdCard, CardPassEnum.RETURN_PASS.getCode(), ShowMsgEnum.YES.getCode());
            } catch (WebApplicationException sqlexc) {
                throw sqlexc;
            } catch (Exception exc) {
                Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
                response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_IN_PASS_RETURN")).build();
                throw new WebApplicationException(response);
            }
        } else {
            response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_NO_CARDBANK_PASS_RETURN")).build();
            throw new WebApplicationException(response);
        }
    }

    public Map<String, Object> autoRegister(FilterWrapper filter, User user) {
        Map<String, Object> result = new HashMap<>();
        SortWrapper sw = ServiceUtils.createOrAddToSortWrapper(null, "soratOrdPay", Sort.Direction.ASC);
        List<DrmdSorat> list = (List) drmdSoratService.getAll(filter, null, null, sw).get("list");
        List<LogDetail> logDetList = new ArrayList<>();
        String[] resultOfIns = new String[2];
        String logText = "";
        try {
            if (!list.isEmpty()) {
                Integer index = -1;
                JSONArray res = new JSONArray();
                for (DrmdSorat sorat : list) {
                    String retMsg;
                    String returnedRes;
                    try {
                        resultOfIns = soratInsertService.InsertInCardBank(sorat, user);
                    } catch (Exception exc) {
                        exc.printStackTrace();
                    }
                    retMsg = resultOfIns[1];
                    returnedRes = resultOfIns[0];
                    Map resultRow = new HashMap<>();
                    resultRow.put("soratOrdpay", sorat.getSoratOrdPay());
                    resultRow.put("desc", retMsg);
                    res.put(++index, resultRow);
                    if (!returnedRes.equals("1")) {
                        LogDetail logDetail = new LogDetail();
                        logDetail.setErrorCode(returnedRes);
                        logDetail.setErrorMessage(retMsg);
                        logDetail.setShenasePayment(sorat.getSoratOrdPay());
                        logDetList.add(logDetail);
                    }
                }
                if (res.length() != 0) {
                    result.put("list", res.toString());
                    result.put("total", res.length());
                }
                String soratDateFrom = "";
                String soratDateTo = "";
                if (serviceUtils.filterContainProperty(filter, "soratDatefrom") != null) {
                    soratDateFrom = serviceUtils.filterContainProperty(filter, "soratDatefrom").getValue().replaceAll("/", "");
                }
                if (serviceUtils.filterContainProperty(filter, "soratDate") != null) {
                    soratDateTo = serviceUtils.filterContainProperty(filter, "soratDate").getValue().replaceAll("/", "");
                }
                if (serviceUtils.filterContainProperty(filter, "soratOrdPay") != null) {
                    String cardOrdpayFrom = serviceUtils.filterContainProperty(filter, "soratOrdPayfrom").getValue();
                    String cardOrdpayTo = serviceUtils.filterContainProperty(filter, "soratOrdPay").getValue();
                    logText = String.format(messageBundle.getProperty("coreaccount.daramadbank.LOG_INSERT_DRMD_CARD_WITH_ORDPAY"), result.size(), result.size() + logDetList.size(), soratDateFrom, soratDateTo, cardOrdpayFrom, cardOrdpayTo);
                } else {
                    logText = String.format(messageBundle.getProperty("coreaccount.daramadbank.LOG_INSERT_DRMD_CARD_NO_ORDPAY"), result.size(), result.size() + logDetList.size(), soratDateFrom, soratDateTo);
                }
                if (!logDetList.isEmpty()) {
                    logService.save(logText, logDetList, new GlSystemType(Integer.valueOf(webBundle.getProperty("system.drmd.id"))), user.getUserName(), LogService.MIN_PRIORITY);
                }
                result.put("report", exportToPdfLocal(result, filter));
            }
        } catch (WebApplicationException sqlexc) {
            throw sqlexc;
        } catch (Exception exc) {
            Logger.getLogger(DrmdSoratInsertCardBank.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_IN_INSSORAT")).build();
            throw new WebApplicationException(response);
        }
        return result;
    }

    public byte[] exportToPdfLocal(Map<String, Object> result, FilterWrapper filter) throws IOException {
        JSONObject jsonReportInfo = new JSONObject();
        String brchCode = "";
        String soratRadif = "";
        String brchCodeName = "";
        String soratRadifDesc = "";
        for (Filter f : filter.getFilters()) {
            if (f.getProperty().equals("soratDatefrom")) {
                jsonReportInfo.put("yearmon", f.getValue().substring(0, 6));
                jsonReportInfo.put("fromDay", f.getValue().substring(6, 8));
            } else if (f.getProperty().equals("soratDate")) {
                jsonReportInfo.put("toDay", f.getValue().substring(6, 8));
            } else if (f.getProperty().equals("soratOrdPayfrom")) {
                jsonReportInfo.put("fromSoratOrdPay", f.getValue());
            } else if (f.getProperty().equals("soratOrdPay")) {
                jsonReportInfo.put("toSoratOrdPay", f.getValue());
            } else if (f.getProperty().equals("drmdSoratPK.brchCode")) {
                brchCode = f.getValue();
                jsonReportInfo.put("brchCode", brchCode);
            } else if (f.getProperty().equals("soratRadif")) {
                soratRadif = f.getValue();
                jsonReportInfo.put("soratRadif", soratRadif);
            }
        }
        Branch branch = em.find(Branch.class, brchCode);
        brchCodeName = branch != null ? branch.getBrchCodeName() : null;
        DrmdBank drmdBank = em.find(DrmdBank.class, new DrmdBankPK(soratRadif, brchCode));
        soratRadifDesc = drmdBank != null ? drmdBank.getBankInfoDesc() : null;
        jsonReportInfo.put("brchDesc", brchCodeName);
        jsonReportInfo.put("soratRadifDesc", soratRadifDesc);
        byte[] byteStream = exportToPdf(result.get("list").toString(), jsonReportInfo.toString());
        return byteStream;
    }

    public byte[] exportToPdf(String resultString, String reportInfoJson) throws IOException {
        InputStream reportStream = null;
        try {
            Map<String, Object> parameters = new HashMap<>();
            JSONArray resultJson = new JSONArray(resultString);
            ByteArrayInputStream jsonDataStream = new ByteArrayInputStream(resultJson.toString().getBytes("UTF-8"));
            JsonDataSource jsonDataSource = new JsonDataSource(jsonDataStream);
            reportStream = DrmdCardService.class.getResourceAsStream("/reports/daramadBank/cardBank/autoRegisterResult.jasper");
            BufferedImage image = ImageIO.read(DrmdCardService.class.getResource("/reports/Images/sazman.jpg"));
            JSONObject reportInfo = new JSONObject(reportInfoJson);
            Set<String> keys = reportInfo.keySet();
            for (String k : keys) {
                parameters.put(k, reportInfo.get(k).toString().equals("") ? "-" : reportInfo.get(k).toString());
            }
            parameters.put("IMAGE", image);
            parameters.put("REPORT_DATA_SOURCE", jsonDataSource);
            parameters.put(JsonQueryExecuterFactory.JSON_INPUT_STREAM, jsonDataStream);
            Date todayDate = new Date();
            String date = DateUtils.getJalaliStandard(todayDate, "/");
            parameters.put("date", date);
            byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, parameters);
            return byteStream;
        } catch (Exception ex) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_IN_EXPORT_TO_PDF")).build();
            throw new WebApplicationException(response);
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
    }

    public void initNewCard(String brchCode, String yearmon) {
        try {
            String yearmonJalali = DateUtils.format(DateUtils.convertTimestampStringToDate(yearmon)).replace("/", "").substring(0, 6);
            boolean issued = drmdCompareService.isIssued(brchCode, yearmonJalali);
            if (issued) {
                Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.DOC_IS_ISSUED_ADD_INVALID")).build();
                throw new WebApplicationException(response);
            }
        } catch (WebApplicationException sqlexc) {
            throw sqlexc;
        } catch (Exception exc) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }
    }

    public Long getVosooliDate(String brchCode, String yearmon) {
        try {
            initNewCard(brchCode, yearmon);
            String yearmonJalali = DateUtils.format(DateUtils.convertTimestampStringToDate(yearmon)).replace("/", "").substring(0, 6);
            FilterWrapper fw = ServiceUtils.createOrAddToFilterWrapper(null, "vwdrmdlistcardPK.brchCode", brchCode, Filter.Operator.EQUAL);
            fw = ServiceUtils.createOrAddToFilterWrapper(fw, "yearmon", yearmon, Filter.Operator.EQUAL);
            SortWrapper sw = ServiceUtils.createOrAddToSortWrapper(null, "cardDate", Sort.Direction.DESC);
            List<Vwdrmdlistcard> drmdList = drmdListService.getList(fw, 0, 1, sw);
            if (!drmdList.isEmpty()) {
                Long cardCateTimeStamp = DateUtils.convertDateToTimestampString(DateUtils.convertPersianDateStringToDate(drmdList.get(0).getCardDate()));
                return cardCateTimeStamp;
            } else {
                return DateUtils.convertDateToTimestampString(DateUtils.convertPersianDateStringToDate(yearmonJalali + "01"));
            }
        } catch (WebApplicationException sqlexc) {
            throw sqlexc;
        } catch (Exception exc) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, exc);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }
    }

    public String saveInCard(String cardOrdPay, Float cardPrice, String cardDate, String cardRcvType, String bankCode, String bankHesab, String brchCode, User user) {
        try {
            String yearMon = cardDate.substring(0, 6);
            String bankRadif = "";
            bankRadif = em.createNativeQuery("select bank_radif from drmd_bank where bank_code = ?1 and bank_hesab = ?2 and brch_code = ?3")
                    .setParameter(1, bankCode)
                    .setParameter(2, bankHesab)
                    .setParameter(3, brchCode)
                    .getResultList().toString();
            bankRadif = bankRadif.substring(1, 3);
            String cardEfdate = "";
            procedure.query("{?=call pck_drmdoperations.insert_card(?,?,?,?,?,?,?,?,?,?,?)}");
            procedure.setOutParameter(1, Types.CHAR)
                    .setInParameter(2, brchCode)
                    .setInParameter(3, yearMon)
                    .setInParameter(4, bankRadif)
                    .setInParameter(5, cardDate)
                    .setInParameter(6, cardOrdPay)
                    .setInParameter(7, cardRcvType)
                    .setInParameter(8, cardOrdPay)
                    .setInParameter(9, cardPrice)
                    .setInParameter(10, cardEfdate)
                    .setOutParameter(11, Types.NVARCHAR)
                    .setInParameter(12, user.getUserName());
            procedure.execute();
            String result = procedure.getOutParameter(11).toString();
            em.flush();
            procedure.destroy();
            return result;
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.NOT_ACCEPTABLE).entity(messageBundle.getProperty("coreaccount.daramadbank.EXC_UNKNOWN_ERROR")).build();
            throw new WebApplicationException(response);
        }
    }

    public Workbook writeToExcelAutoRegister(String resultJson) throws IOException {

        JSONArray array = new JSONArray(resultJson);
        List<AutoRegisterResult> result = new ArrayList<>();
        for (int i = 0; i < array.length(); i++) {
            result.add(new AutoRegisterResult(array.getJSONObject(i).getString("soratOrdpay"), array.getJSONObject(i).getString("desc")));
        }

        XSSFWorkbook wb = new XSSFWorkbook();

        Sheet sheet = wb.createSheet();
        sheet.setRightToLeft(true);

        Font font = wb.createFont();

        CellStyle headerStyle = wb.createCellStyle();

        font.setFontName("Arial");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        font.setColor(HSSFColor.BLACK.index);

        headerStyle.setBorderBottom(CellStyle.BORDER_THIN);
        headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderLeft(CellStyle.BORDER_THIN);
        headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderRight(CellStyle.BORDER_THIN);
        headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setBorderTop(CellStyle.BORDER_THIN);
        headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        headerStyle.setFont(font);

        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        CellStyle detailStyle = wb.createCellStyle();
        detailStyle.setBorderBottom(CellStyle.BORDER_THIN);
        detailStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderLeft(CellStyle.BORDER_THIN);
        detailStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderRight(CellStyle.BORDER_THIN);
        detailStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        detailStyle.setBorderTop(CellStyle.BORDER_THIN);
        detailStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());

        Row row = sheet.createRow(0);

        Cell cell0 = row.createCell(0);
        cell0.setCellValue("ردیف");
        cell0.setCellStyle(headerStyle);

        Cell cell1 = row.createCell(1);
        cell1.setCellValue("شماره برگ پرداخت");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("شرح");
        cell2.setCellStyle(headerStyle);

        try {

            int rownum = 1;
            for (AutoRegisterResult item : result) {
                String soratOrdpay = item.getSoratOrdpay();
                String desc = item.getDesc();
                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(soratOrdpay);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(desc);
            }

        } catch (Exception ex) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return wb;
    }

    public String writeToXmlAutoRegister(String resultJson) throws IOException {
        try {

            JSONArray array = new JSONArray(resultJson);
            List<AutoRegisterResult> result = new ArrayList<>();
            for (int i = 0; i < array.length(); i++) {
                result.add(new AutoRegisterResult(array.getJSONObject(i).getString("soratOrdpay"), array.getJSONObject(i).getString("desc")));
            }
            XStream xStream = new XStream(new DomDriver());
            String xml = xStream.toXML(result);
            return xml;
        } catch (Exception ex) {
            Logger.getLogger(DrmdCardService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database writeToAccessAutoRegister(String resultJson) throws ClassNotFoundException, SQLException, IOException, NumberFormatException {

        String file = "autoRegister.accdb";
        List<AutoRegisterResult> result = new ArrayList<>();
        JSONArray array = new JSONArray(resultJson);
        for (int i = 0; i < array.length(); i++) {
            result.add(new AutoRegisterResult(array.getJSONObject(i).getString("soratOrdpay"), array.getJSONObject(i).getString("desc")));
        }

        try {
            Database db = (DatabaseBuilder.create(Database.FileFormat.V2010, new File(file)));
            String autoRegister = "autoRegister";
            Table table = new TableBuilder(autoRegister) // Creating table
                    .addColumn(new ColumnBuilder("CARDORDPAY").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("DESC").setSQLType(Types.VARCHAR).toColumn())
                    .toTable(db);
            for (AutoRegisterResult item : result) {

                String soratOrdpay = item.getSoratOrdpay();
                String desc = item.getDesc();
                table.addRow(soratOrdpay, desc);//Inserting values into the table
            }
            db.close();
            return db;
        } catch (Exception ex) {
            Logger.getLogger(VwdrmdlistcardService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

}
