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
import ir.tamin.incomeBank.model.daramadBank.Vwdrmdlistcard;
import ir.tamin.incomeBank.service.identityManager.UserBean;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
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
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author m_salami
 */
public class VwdrmdlistcardService {

    @Inject
    private EntityManager em;
    @Inject
    UserBean userBean;

    public Map<String, Object> getAll(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        Map<String, Object> map = new HashMap<>();
        map.put("list", getList(filter, start, limit, sort));
        map.put("total", getCount(filter));
        map.put("sumPrice", start != null && start > 0 ? getSumPrice(filter, 0, start, sort) : 0);
        return map;
    }

    public List<Vwdrmdlistcard> getList(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) {

        TypedQuery createQuery = em.createQuery(getQuery(filterWrapper, sort));

        List<Vwdrmdlistcard> bankList = new ArrayList<>();
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
        for (Vwdrmdlistcard card : bankList) {
            card.setCardDateTimeStamp(DateUtils.convertDateToTimestampString(DateUtils.convertPersianDateStringToDate(card.getCardDate())));
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
            Root<Vwdrmdlistcard> vwdrmdlistcardForm = criteriaQuery.from(Vwdrmdlistcard.class);
            List<Predicate> predicates = new ArrayList<Predicate>();
            Metamodel metamodel = em.getMetamodel();
            List<Order> orders = new ArrayList<>();
            EntityType<Vwdrmdlistcard> vwdrmdlistcardEntityType = metamodel.entity(Vwdrmdlistcard.class);
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {

                    Object value = filter.getValue();
                    String field = filter.getProperty();
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    if (f[0].equals("cardDateFrom") || f[0].equals("cardDateTo")) {
                        f[0] = "cardDate";
                        value = DateUtils.format(DateUtils.convertTimestampStringToDate(value.toString())).replace("/", "");
                    } else if (f[0].equals("yearmon")) {
                        value = DateUtils.format(DateUtils.convertTimestampStringToDate(value.toString())).replace("/", "").substring(0, 6);
                    } else if (f[0].equals("cardPriceFrom") || f[0].equals("cardPriceTo")) {
                        f[0] = "cardPrice";
                    }
                    Predicate predicate = null;
                    javax.persistence.criteria.Path path = null;
                    switch (operator) {

                        case EQUAL:
                            path = vwdrmdlistcardForm.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:

                            predicates.add(criteriaBuilder.like(vwdrmdlistcardForm.get(vwdrmdlistcardEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));

                            break;
                        case BEFORE:
                            path = vwdrmdlistcardForm.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.lessThanOrEqualTo(path, (Comparable) value);
                            predicates.add(predicate);
                            break;
                        case AFTER:
                            path = vwdrmdlistcardForm.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value);
                            predicates.add(predicate);
                            break;
                        default:
                            break;
                    }
                }
                criteriaQuery.where(predicates.toArray(new Predicate[]{}));
            }

            if (sortWrapper != null) {

                for (Sort sortSet : sortWrapper.getSortSet()) {
                    Order order = null;
                    String[] sortProperties = sortSet.getProperty().split("\\.");

                    javax.persistence.criteria.Path path = vwdrmdlistcardForm.get(sortProperties[0]);
                    for (int j = 1; j < sortProperties.length; j++) {
                        path = path.get(sortProperties[j]);
                    }
                    if (sortProperties.length == 1) {
                        if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                            order = criteriaBuilder.desc(vwdrmdlistcardForm.get(sortProperties[0]));
                        } else {
                            order = criteriaBuilder.asc(vwdrmdlistcardForm.get(sortProperties[0]));
                        }
                    }
                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(vwdrmdlistcardForm);

            return criteriaQuery;

        } catch (Exception e) {
            return null;
        }
    }

    private Long getSumPrice(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        Long sumPrice = 0L;
        TypedQuery createQuery = em.createQuery(getQuery(filter, sort));
        List<Vwdrmdlistcard> list = new ArrayList<>();
        if (start != null && limit != null) {
            list = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        }
        if (start == null && limit != null) {
            list = createQuery.setMaxResults(limit).getResultList();
        }
        if (start != null && limit == null) {
            list = createQuery.setFirstResult(start).getResultList();
        }
        if (start == null && limit == null) {
            list = createQuery.getResultList();
        }
        if (list.size() > 0) {
            for (int i = 0; i < list.size(); i++) {
                sumPrice += list.get(i).getCardPrice();
            }
        }
        return sumPrice;
    }

    public Workbook writeToExcel(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws IOException {

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
        cell1.setCellValue("تاریخ وصولی");
        cell1.setCellStyle(headerStyle);

        Cell cell2 = row.createCell(2);
        cell2.setCellValue("شماره برگ پرداخت");
        cell2.setCellStyle(headerStyle);

        Cell cell3 = row.createCell(3);
        cell3.setCellValue("کد نوع واریزی");
        cell3.setCellStyle(headerStyle);

        Cell cell4 = row.createCell(4);
        cell4.setCellValue("شرح نوع واریزی");
        cell4.setCellStyle(headerStyle);

        Cell cell5 = row.createCell(5);
        cell5.setCellValue("شماره واریزی");
        cell5.setCellStyle(headerStyle);

        Cell cell6 = row.createCell(6);
        cell6.setCellValue("مبلغ برگ پرداخت");
        cell6.setCellStyle(headerStyle);

        Cell cell7 = row.createCell(7);
        cell7.setCellValue("مشخصه");
        cell7.setCellStyle(headerStyle);

        Cell cell8 = row.createCell(8);
        cell8.setCellValue("توضیحات");
        cell8.setCellStyle(headerStyle);

        Cell cell9 = row.createCell(9);
        cell9.setCellValue("کد طرف حساب");
        cell9.setCellStyle(headerStyle);

        Cell cell10 = row.createCell(10);
        cell10.setCellValue("ردیف بانک");
        cell10.setCellStyle(headerStyle);

        Cell cell11 = row.createCell(11);
        cell11.setCellValue("تاریخ وصول باجه");
        cell11.setCellStyle(headerStyle);

        Cell cell12 = row.createCell(12);
        cell12.setCellValue("تاریخ مؤثر بانک");
        cell12.setCellStyle(headerStyle);

        try {
            Map<String, Object> map = getAll(filterWrapper, null, null, null);
            List<Vwdrmdlistcard> comperrList = (List<Vwdrmdlistcard>) map.get("list");
            int rownum = 1;
            for (Vwdrmdlistcard item : comperrList) {
                String cardDate = (item.getCardDate() != null ? item.getCardDate().substring(0, 4) + "/" + item.getCardDate().substring(4, 6) + "/" + item.getCardDate().substring(6, 8) : " ");
                String cardOrdpay = item.getCardOrdpay();
                String rcvtypdesc = item.getRcvtypdesc();
                String cardRcvno = item.getCardRcvno();
                String cardAttrib = item.getCardAttrib();
                Long cardPrice = item.getCardPrice();
                String cardComment = item.getCardComment();
                String cardRcvtype = item.getCardRcvtype();
                String bankRadif = item.getBankRadif();
                String cardEfdate = (item.getCardEfdate() != null ? item.getCardEfdate().substring(0, 4) + "/" + item.getCardEfdate().substring(4, 6) + "/" + item.getCardEfdate().substring(6, 8) : " ");
                String ordMastcustcode = item.getOrdMastcustcode();
                String orpCarddate = (item.getOrpCarddate() != null ? item.getOrpCarddate().substring(0, 4) + "/" + item.getOrpCarddate().substring(4, 6) + "/" + item.getOrpCarddate().substring(6, 8) : " ");

                row = sheet.createRow(rownum++);
                int cellnum = 0;

                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rownum - 1);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardDate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardOrdpay);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardRcvtype);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rcvtypdesc);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardRcvno);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardPrice);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardAttrib);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardComment);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(ordMastcustcode);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(bankRadif);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(orpCarddate);

                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardEfdate);

            }

        } catch (Exception ex) {
            Logger.getLogger(VwdrmdlistcardService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return wb;
    }

    public String writeToXml(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws IOException {
        try {

            Map<String, Object> map = getAll(filter, null, null, null);
            List<Vwdrmdlistcard> comperrList = (List<Vwdrmdlistcard>) map.get("list");
            XStream xStream = new XStream(new DomDriver());
            String xml = xStream.toXML(comperrList);
            return xml;
        } catch (Exception ex) {
            Logger.getLogger(VwdrmdlistcardService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database writeToAccess(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) throws ClassNotFoundException, SQLException, IOException, NumberFormatException {

        String file = "drmdcard.accdb";
        Map<String, Object> map = getAll(filter, null, null, null);
        List<Vwdrmdlistcard> comperrList = (List<Vwdrmdlistcard>) map.get("list");

        try {
            Database db = (DatabaseBuilder.create(Database.FileFormat.V2010, new File(file)));
            String comperrReport1 = "drmdcard";
            Table table = new TableBuilder(comperrReport1) // Creating table
                    .addColumn(new ColumnBuilder("CARDDATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARDORDPAY").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RCVTYPDESC").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARDRCVNO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARDATTRIB").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARDPRICE").setSQLType(Types.NUMERIC).toColumn())
                    .addColumn(new ColumnBuilder("CARDCOMMENT").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARDRCVTYPE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("BANKRADIF").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARDEFDATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ORDMASTCUSTCODE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("ORPCARDDATE").setSQLType(Types.VARCHAR).toColumn())
                    .toTable(db);
            for (Vwdrmdlistcard item : comperrList) {

                String cardDate = (item.getCardDate() != null ? item.getCardDate().substring(0, 4) + "/" + item.getCardDate().substring(4, 6) + "/" + item.getCardDate().substring(6, 8) : " ");
                String cardOrdpay = item.getCardOrdpay();
                String rcvtypdesc = item.getRcvtypdesc();
                String cardRcvno = item.getCardRcvno();
                String cardAttrib = item.getCardAttrib();
                Long cardPrice = item.getCardPrice();
                String cardComment = item.getCardComment();
                String cardRcvtype = item.getCardRcvtype();
                String bankRadif = item.getBankRadif();
                String cardEfdate = item.getCardEfdate();
                String ordMastcustcode = item.getOrdMastcustcode();
                String orpCarddate = item.getOrpCarddate();
                table.addRow(cardDate, cardOrdpay, rcvtypdesc, cardRcvno, cardAttrib, cardPrice, cardComment, cardRcvtype, bankRadif, cardEfdate, ordMastcustcode, orpCarddate);//Inserting values into the table
            }
            db.close();
            return db;
        } catch (Exception ex) {
            Logger.getLogger(VwdrmdlistcardService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
}
