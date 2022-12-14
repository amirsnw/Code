/**
 *
 * @author h_riazat
 */
package ir.tamin.incomeBank.service.daramadBank;

import com.healthmarketscience.jackcess.ColumnBuilder;
import com.healthmarketscience.jackcess.Database;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.Table;
import com.healthmarketscience.jackcess.TableBuilder;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.incomeBank.model.daramadBank.VwDrmdListDisk;
import ir.tamin.incomeBank.model.daramadBank.VwDrmdListDiskPK;
import java.io.File;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
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
import javax.servlet.http.HttpServletRequest;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Stateless
public class VwDrmdListDiskService {

    @Inject
    private EntityManager entityManager;

//    @Inject
//    private StoredProcedure procedure;
    public VwDrmdListDisk get(VwDrmdListDiskPK vwDrmdListDiskPK) {
        VwDrmdListDisk vwDrmdListDisk = entityManager.find(VwDrmdListDisk.class, vwDrmdListDiskPK);
        return vwDrmdListDisk;
    }

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sortWrapper) {
        Map<String, Object> map = new HashMap<>();
        List<VwDrmdListDisk> vwDrmdListDisk = new ArrayList<>();
        vwDrmdListDisk = getList(filterWrapper, start, limit, sortWrapper);

        List<VwDrmdListDisk> vwDrmdListDiskAll = getListAll(filterWrapper);
        Integer count = getCount(vwDrmdListDiskAll);

        String sum = getSum(vwDrmdListDiskAll);
        int firstIndex = sum.indexOf('/');
        int secondIndex = sum.indexOf('/', firstIndex + 1);
        String sumPrice1 = sum.substring(0, firstIndex);
        String sumPrice2 = sum.substring(firstIndex + 1, secondIndex);
        String sumRest = sum.substring(secondIndex + 1);

        if (vwDrmdListDisk.size() > 0) {
            vwDrmdListDisk.get(0).setSumPrice1(sumPrice1);
            vwDrmdListDisk.get(0).setSumPrice2(sumPrice2);
            vwDrmdListDisk.get(0).setSumRest(sumRest);

        }

        map.put("list", vwDrmdListDisk);
        map.put("total", count);
//        map.put("sumPrice1", sumPrice1);
//        map.put("sumPrice2", sumPrice2);
//        map.put("sumRest", sumRest);
        return map;
    }

    private List<VwDrmdListDisk> getList(FilterWrapper filter, Integer start, Integer limit, SortWrapper sort) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, sort));
        List<VwDrmdListDisk> vwDrmdListDisk = new ArrayList<>();
        if (start != null && limit != null) {
            vwDrmdListDisk = createQuery.setFirstResult(start).setMaxResults(limit).getResultList();
        } else if (start == null && limit != null) {
            vwDrmdListDisk = createQuery.setMaxResults(limit).getResultList();
        } else if (start != null && limit == null) {
            vwDrmdListDisk = createQuery.setFirstResult(start).getResultList();
        } else if (start == null && limit == null) {
            vwDrmdListDisk = createQuery.getResultList();
        }
        return vwDrmdListDisk;
    }

    private List<VwDrmdListDisk> getListAll(FilterWrapper filter) {
        TypedQuery createQuery = entityManager.createQuery(getQuery(filter, null));
        List<VwDrmdListDisk> vwDrmdListDiskAll = createQuery.getResultList();
        return vwDrmdListDiskAll;
    }

    private Integer getCount(List<VwDrmdListDisk> vwDrmdListDiskAll) {
        Integer count = 0;
        count = vwDrmdListDiskAll.size();
        return count;
    }

    private String getSum(List<VwDrmdListDisk> vwDrmdListDiskAll) {
        long sumPrice1 = 0;
        long sumPrice2 = 0;
        long sumRest = 0;
        String result;
        for (VwDrmdListDisk r : vwDrmdListDiskAll) {
            sumPrice1 += r.getSoratPrice1();
            sumPrice2 += r.getSoratPrice2();
            sumRest += r.getSoratMandeh();
        }
        result = String.valueOf(sumPrice1) + "/" + String.valueOf(sumPrice2) + "/" + String.valueOf(sumRest);
        return result;
    }

    private CriteriaQuery getQuery(FilterWrapper filterWrapper, SortWrapper sortWrapper) {
        try {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
            Root<VwDrmdListDisk> vwDrmdListDiskFrom = criteriaQuery.from(VwDrmdListDisk.class);
            List<Predicate> predicates = new ArrayList<>();
            Metamodel metamodel = entityManager.getMetamodel();
            EntityType<VwDrmdListDisk> vwDrmdListDiskEntityType = metamodel.entity(VwDrmdListDisk.class);
            //  procedure.query("{call PKAPPCONTEXT.SETVARCHAR(?,?)}");
            if (filterWrapper != null && filterWrapper.getFilters() != null) {
                for (Filter filter : filterWrapper.getFilters()) {
                    String field = filter.getProperty();
                    Object value = filter.getValue();
                    if (field.toUpperCase().contains("FROM")) {
                        field = field.replace("from", "");
                    }
                    Filter.Operator operator = filter.getOperator();
                    String[] f = field.split("\\.");
                    Predicate predicate = null;
//                    switch (field) {
//                        case "cardDate":
//                            procedure.clear();
//                            procedure.setInParameter(1, "YearMon")
//                                    .setInParameter(2, value);
//                            procedure.execute();
//                            continue;
//                    }
                    switch (operator) {
                        case EQUAL:
                            javax.persistence.criteria.Path path = vwDrmdListDiskFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicate = criteriaBuilder.equal(path, value);
                            predicates.add(predicate);
                            break;
                        case LIKE:
                            predicates.add(criteriaBuilder.like(vwDrmdListDiskFrom.get(vwDrmdListDiskEntityType.getDeclaredSingularAttribute(field, String.class)), "%" + value + "%"));
                            break;
                        case AFTER:
                            path = vwDrmdListDiskFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.greaterThanOrEqualTo(path, (Comparable) value));
                            break;
                        case BEFORE:
                            path = vwDrmdListDiskFrom.get(f[0]);
                            for (int j = 1; j < f.length; j++) {
                                path = path.get(f[j]);
                            }
                            predicates.add(
                                    criteriaBuilder.lessThanOrEqualTo(path, (Comparable) value));
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
                    if (sortSet.getDirection().getName().equals(Sort.Direction.DESC.getName())) {
                        order = criteriaBuilder.desc(vwDrmdListDiskFrom.get(sortProperties[0]));
                    } else {
                        order = criteriaBuilder.asc(vwDrmdListDiskFrom.get(sortProperties[0]));
                    }

                    orders.add(order);
                }
                if (!orders.isEmpty()) {
                    criteriaQuery.orderBy(orders);
                }
            }
            criteriaQuery.select(vwDrmdListDiskFrom);
            return criteriaQuery;
        } catch (Exception ex) {
            Logger.getLogger(VwDrmdListDiskService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            return null;
        }
    }

    public Workbook exportToExcel(HttpServletRequest req) {
        try {
            SortWrapper sortWrapper = new SortWrapper();
            sortWrapper.setSortSet(new HashSet<Sort>());
            Sort sort = new Sort();
            sort.setProperty("cardDate");
            sort.setDirection(Sort.Direction.ASC);
            sortWrapper.getSortSet().add(sort);
            FilterWrapper filterWrapper = new FilterWrapper();
            filterWrapper.setFilters(new HashSet<Filter>());
            Enumeration<String> paramNames = req.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String nextElement = paramNames.nextElement();
                if (req.getParameter(nextElement) != null && !"".equals(req.getParameter(nextElement)) && !"_dc".equals(nextElement)) {
                    Filter filter = new Filter();
                    filter.setProperty(nextElement);
                    String value = req.getParameter(nextElement);
                    filter.setValue(value);
                    if (filter.getProperty().contains("cardDate") && !filter.getProperty().contains("from")) {
                        filter.setOperator(Filter.Operator.BEFORE);
                    } else if (filter.getProperty().contains("fromcardDate")) {
                        filter.setOperator(Filter.Operator.AFTER);
                        filter.setProperty(filter.getProperty().replace("from", ""));
                    } else {
                        filter.setOperator(Filter.Operator.EQUAL);
                    }
                    filterWrapper.getFilters().add(filter);
                }
            }
            List<VwDrmdListDisk> resultList = getList(filterWrapper, null, null, sortWrapper);
            return writeToExcel(resultList);
        } catch (Exception ex) {
            Logger.getLogger(VwDrmdListDiskService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    private Workbook writeToExcel(List<VwDrmdListDisk> resultList) {
        try {
            XSSFWorkbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet();
            sheet.setRightToLeft(true);
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
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
            CellStyle detailStyle = workbook.createCellStyle();
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
            cell3.setCellValue("نوع واریزی");
            cell3.setCellStyle(headerStyle);
            Cell cell4 = row.createCell(4);
            cell4.setCellValue("شماره واریزی/شماره سند");
            cell4.setCellStyle(headerStyle);
            Cell cell5 = row.createCell(5);
            cell5.setCellValue("مبلغ بدهکار");
            cell5.setCellStyle(headerStyle);
            Cell cell6 = row.createCell(6);
            cell6.setCellValue("مبلغ بستانکار");
            cell6.setCellStyle(headerStyle);
            Cell cell7 = row.createCell(7);
            cell7.setCellValue("مانده");
            cell7.setCellStyle(headerStyle);
            Cell cell8 = row.createCell(8);
            cell8.setCellValue("کد بانک");
            cell8.setCellStyle(headerStyle);
            Cell cell9 = row.createCell(9);
            cell9.setCellValue("نوع ثبت");
            cell9.setCellStyle(headerStyle);
            Cell cell10 = row.createCell(10);
            cell10.setCellValue("تاریخ واریز");
            cell10.setCellStyle(headerStyle);
            int rownum = 1;
            for (VwDrmdListDisk item : resultList) {
                String cardDate = item.getDateCardDate();
                String cardOrdPay = item.getCardOrdPay();
                String rcvTypDesc = item.getRcvTypDesc();
                String cardRcvNo = item.getCardRcvNo();
                Long soratPrice1 = item.getSoratPrice1();
                Long soratPrice2 = item.getSoratPrice2();
                Long soratMandeh = item.getSoratMandeh();
                String soratBank = item.getSoratBank();
                String cardType = item.getCardType();
                String soratEfDate = item.getDateSoratEfDate();
                row = sheet.createRow(rownum++);
                int cellnum = 0;
                int roww = rownum - 1;
                Cell cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(roww);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardDate);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardOrdPay);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(rcvTypDesc);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardRcvNo);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(soratPrice1);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(soratPrice2);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(soratMandeh);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(soratBank);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(cardType);
                cell = row.createCell(cellnum++);
                cell.setCellStyle(detailStyle);
                cell.setCellValue(soratEfDate);
            }
            return workbook;
        } catch (Exception ex) {
            Logger.getLogger(VwDrmdListDiskService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public HSSFColor setColor(HSSFWorkbook workbook, byte r, byte g, byte b, short index) {
        HSSFPalette palette = workbook.getCustomPalette();
        HSSFColor hssfColor = null;
        try {
            hssfColor = palette.findColor(r, g, b);
            if (hssfColor == null) {
                palette.setColorAtIndex(index, r, g, b);
                hssfColor = palette.getColor(index);
            }
        } catch (Exception ex) {
            Logger.getLogger(VwDrmdListDiskService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return hssfColor;
    }

    public String exportToXml(HttpServletRequest req) {
        try {
            SortWrapper sortWrapper = new SortWrapper();
            sortWrapper.setSortSet(new HashSet<Sort>());
            Sort sort = new Sort();
            sort.setProperty("cardDate");
            sort.setDirection(Sort.Direction.ASC);
            sortWrapper.getSortSet().add(sort);
            FilterWrapper filterWrapper = new FilterWrapper();
            filterWrapper.setFilters(new HashSet<Filter>());
            Enumeration<String> paramNames = req.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String nextElement = paramNames.nextElement();
                if (req.getParameter(nextElement) != null && !"".equals(req.getParameter(nextElement)) && !"_dc".equals(nextElement)) {
                    Filter filter = new Filter();
                    filter.setProperty(nextElement);
                    String value = req.getParameter(nextElement);
                    filter.setValue(value);
                    if (filter.getProperty().contains("cardDate") && !filter.getProperty().contains("from")) {
                        filter.setOperator(Filter.Operator.BEFORE);
                    } else if (filter.getProperty().contains("fromcardDate")) {
                        filter.setOperator(Filter.Operator.AFTER);
                        filter.setProperty(filter.getProperty().replace("from", ""));
                    } else {
                        filter.setOperator(Filter.Operator.EQUAL);
                    }
                    filterWrapper.getFilters().add(filter);
                }
            }
            List<VwDrmdListDisk> resultList = new ArrayList<>();
            resultList = getList(filterWrapper, null, null, sortWrapper);
            XStream xStream = new XStream(new DomDriver());
            String xml = xStream.toXML(resultList);
            return xml;
        } catch (Exception ex) {
            Logger.getLogger(VwDrmdListDiskService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database exportToAccess(HttpServletRequest req) {
        try {
            SortWrapper sortWrapper = new SortWrapper();
            sortWrapper.setSortSet(new HashSet<Sort>());
            Sort sort = new Sort();
            sort.setProperty("cardDate");
            sort.setDirection(Sort.Direction.ASC);
            sortWrapper.getSortSet().add(sort);
            FilterWrapper filterWrapper = new FilterWrapper();
            filterWrapper.setFilters(new HashSet<Filter>());
            Enumeration<String> paramNames = req.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String nextElement = paramNames.nextElement();
                if (req.getParameter(nextElement) != null && !"".equals(req.getParameter(nextElement)) && !"_dc".equals(nextElement)) {
                    Filter filter = new Filter();
                    filter.setProperty(nextElement);
                    String value = req.getParameter(nextElement);
                    filter.setValue(value);
                    if (filter.getProperty().contains("cardDate") && !filter.getProperty().contains("from")) {
                        filter.setOperator(Filter.Operator.BEFORE);
                    } else if (filter.getProperty().contains("fromcardDate")) {
                        filter.setOperator(Filter.Operator.AFTER);
                        filter.setProperty(filter.getProperty().replace("from", ""));
                    } else {
                        filter.setOperator(Filter.Operator.EQUAL);
                    }
                    filterWrapper.getFilters().add(filter);
                }
            }
            List<VwDrmdListDisk> resultList = getList(filterWrapper, null, null, sortWrapper);
            return writeToAccess(resultList);
        } catch (Exception ex) {
            Logger.getLogger(VwDrmdListDiskService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public Database writeToAccess(List<VwDrmdListDisk> resultList) {
        try {
            String file = "vwDrmdListDiskExportToAccess.accdb";
            Database db = (DatabaseBuilder.create(Database.FileFormat.V2010, new File(file)));
            String VWDRMDLISTDISK = "VWDRMDLISTDISK";
            Table table = new TableBuilder(VWDRMDLISTDISK) // Creating table
                    .addColumn(new ColumnBuilder("CARD_DATE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARD_ORDPAY").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("RCVTYPDESC").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARD_RCVNO").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("SORAT_PRICE1").setSQLType(Types.NUMERIC).toColumn())
                    .addColumn(new ColumnBuilder("SORAT_PRICE2").setSQLType(Types.NUMERIC).toColumn())
                    .addColumn(new ColumnBuilder("SORAT_MANDEH").setSQLType(Types.NUMERIC).toColumn())
                    .addColumn(new ColumnBuilder("SORAT_BANK").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("CARD_TYPE").setSQLType(Types.VARCHAR).toColumn())
                    .addColumn(new ColumnBuilder("SORAT_EFDATE").setSQLType(Types.VARCHAR).toColumn())
                    .toTable(db);
            for (VwDrmdListDisk item : resultList) {
                String cardDate = item.getDateCardDate();
                String cardOrdPay = item.getCardOrdPay();
                String rcvTypDesc = item.getRcvTypDesc();
                String cardRcvNo = item.getCardRcvNo();
                Long soratPrice1 = item.getSoratPrice1();
                Long soratPrice2 = item.getSoratPrice2();
                Long soratMandeh = item.getSoratMandeh();
                String soratBank = item.getSoratBank();
                String cardType = item.getCardType();
                String soratEfDate = item.getDateSoratEfDate();
                table.addRow(cardDate, cardOrdPay, rcvTypDesc, cardRcvNo, soratPrice1, soratPrice2, soratMandeh, soratBank, cardType, soratEfDate);//Inserting values into the table
            }
            db.close();
            return db;
        } catch (Exception ex) {
            Logger.getLogger(VwDrmdListDiskService.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

}
