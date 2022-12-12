package ir.tamin.insurance.technical.service.brokerReport;

import ir.tamin.framework.cdi.event.ProxyMethod;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.function.brokerReport.RequestBrokerWageReport;
import ir.tamin.insurance.technical.function.brokerReport.RequestBrokerWageReportInput;
import ir.tamin.insurance.technical.function.brokerReport.RequestBrokerWageReportValue;
import ir.tamin.insurance.technical.model.baseinfo.City;
import ir.tamin.insurance.technical.model.brokerReport.BrokerReport;
import ir.tamin.insurance.technical.model.brokerReport.BrokerReportDetail;
import ir.tamin.insurance.technical.service.report.InsuranceAgreementRequestReportService;
import ir.tamin.insurance.technical.util.DateUtils;
import ir.tamin.insurance.technical.util.ExcelDataProvider;
import ir.tamin.insurance.technical.util.ExcelReportHeader;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.apache.poi.ss.usermodel.Workbook;
import org.json.JSONObject;
import org.slf4j.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.io.InputStream;
import java.util.*;

@Stateless
public class BrokerReportService {

    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Inject
    private Logger logger;

    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;

    @Inject
    @Named("ProcedureManagerSpecialIns")
    private ProcedureManager procedureManagerSpecialIns;

    @Inject
    @Named("BrokerReportDetailManager")
    private EntityProxy brokerReportDetailManager;

    @Inject
    private EntityManager entityManager;

    @Inject
    private ExcelDataProvider excelDataConverter;

    public String saveBrokerWageReport(JSONObject report, String userId, String orgCode) throws ProxyProcessingException {

        this.dbFunctionProxy.setProcedureManager(procedureManagerSpecialIns);
        String provinceCode = null;
        RequestBrokerWageReportValue result = null;

        try {
            Branch org = entityManager.find(Branch.class, orgCode);
            provinceCode = entityManager.find(City.class, org.getCityCode()).getProvinceCode();

            if (org.toString().equalsIgnoreCase("0000")) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.broker.invalidBranchCode"), new String[0]);
            }
            switch (org.getBranchKind()) {
                //شعبه
                case "1":
                    result = (RequestBrokerWageReportValue) dbFunctionProxy.execute(new RequestBrokerWageReport(),
                            new RequestBrokerWageReportInput(
                                    provinceCode,
                                    orgCode,
                                    report.get("brokerCode").equals(null) ? null: report.getString("brokerCode") ,
                                    report.getString("startDate"),
                                    report.getString("endDate"),
                                    userId));
                    break;
                //اداره کل استان
                case "2":
                    result = (RequestBrokerWageReportValue) dbFunctionProxy.execute(new RequestBrokerWageReport(),
                            new RequestBrokerWageReportInput(
                                    provinceCode,
                                    report.get("branchCode").equals(null) ? null: report.getString("branchCode") ,
                                    report.get("brokerCode").equals(null) ? null : report.getString("brokerCode"),
                                    report.getString("startDate"),
                                    report.getString("endDate"),
                                    userId));
                    break;
                //کارگزاری
                case "5":
                    result = (RequestBrokerWageReportValue) dbFunctionProxy.execute(new RequestBrokerWageReport(),
                            new RequestBrokerWageReportInput(
                                    provinceCode,
                                    orgCode,
                                    report.getString("brokerCode"),
                                    report.getString("startDate"),
                                    report.getString("endDate"),
                                    userId));
                    break;
            }
            return result.getResult();
        } catch (Exception e) {
            System.err.println("BROKERREPORT-DEBUG: BrokerReportService.saveBrokerWageReport." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    public BrokerReport confirmBrokerWageReport(String reportId) throws ProxyProcessingException {

        BrokerReport brokerReport = null;
        try {
            brokerReport = entityManager.find(BrokerReport.class, reportId);
            brokerReport.setStatus("1");
            entityManager.persist(brokerReport);
        } catch (Exception e) {
            System.err.println("BROKERREPORT-DEBUG: BrokerReportService.confirmBrokerWageReport." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }

        return brokerReport;
    }

    @ProxyMethod
    public byte[] loadPdfBrokerInfo(String reportId, SortWrapper sorter) throws Exception, ProxyProcessingException {

        int i = 0;
        InputStream reportStream = null;
        BrokerReport brokerReport = null;
        Collection brokerReportDetailList = null;
        FilterWrapper filter = new FilterWrapper();
        filter.setFilters(new HashSet<Filter>());
        Map<String, Object> params = new HashMap<>();

        try {
            brokerReport = entityManager.find(BrokerReport.class, reportId);
            filter.addFilter("reportId", Filter.Operator.EQUAL, reportId);
            try {
                brokerReportDetailList = brokerReportDetailManager.search(BrokerReportDetail.class, filter, sorter, 0, Integer.MAX_VALUE, true).getList();
            } catch (Exception e) {
                throw new ProxyProcessingException(bundle.getProperty("insurance.technical.null_REPORT"), new String[0]);
            }
            try {
                params.put("reportDate", DateUtils.getPersian8Char(brokerReport.getReportDate()));
                params.put("startDate", DateUtils.getPersian8Char(brokerReport.getStartDate()));
                params.put("endDate", DateUtils.getPersian8Char(brokerReport.getEndDate()));
            } catch (NoResultException e) {
                params = null;
            }
            JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(brokerReportDetailList);
            reportStream = InsuranceAgreementRequestReportService.class.getResourceAsStream("/reports/calculationReport.jasper");
            byte[] byteStream = JasperRunManager.runReportToPdf(reportStream, params, ds);
            return byteStream;
        } catch (Exception e) {
            logger.error(e.toString());
        } finally {
            if (reportStream != null) {
                reportStream.close();
            }
        }
        return null;
    }

    public Workbook loadExcelBrokerInfo(String reportId, SortWrapper sorter) throws Exception {

        Map<String, Object> dataPage = new HashMap<>();
        Map<String, Object> map = new HashMap<>();
        BrokerReport brokerReport = null;
        Collection brokerReportDetailList = null;
        FilterWrapper filter = new FilterWrapper();
        filter.setFilters(new HashSet<Filter>());

        filter.addFilter("reportId", Filter.Operator.EQUAL, reportId);
        try {
            brokerReportDetailList = brokerReportDetailManager.search(BrokerReportDetail.class, filter, sorter, 0, Integer.MAX_VALUE, true).getList();
        } catch (Exception e) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.null_REPORT"), new String[0]);
        }

        List<List<String>> rowsForExcel = prepareDataForExcel(brokerReportDetailList);
        ExcelReportHeader reportHeader = createReportHeaderDetails();
        return excelDataConverter.provideExcelFrom(reportHeader, rowsForExcel);
    }

    private List<List<String>> prepareDataForExcel(Collection<BrokerReportDetail> outPutModelList) {
        List<List<String>> rows = new ArrayList<>();
        rows.add(Arrays.asList(
                "ردیف",
                "کد شعبه",
                "نام شعبه",
                "کد کارگزاری",
                "نام کارگزاری",
                "کدملی",
                "مبلغ پرداختی",
                "حق الزحمه متعلقه",
                "تعداد ماه های پرداخت شده",
                "نرخ حق پرداخت",
                "دستمزد قرارداد",
                "شماره قرارداد",
                "تاریخ قرارداد"
        ));
        int rowCounter = 1;
        for (BrokerReportDetail data : outPutModelList) {
            List<String> row = new ArrayList<>();
            row.add(String.valueOf(rowCounter));
            row.add(data.getBranch() != null ? data.getBranch().getBranchCode() : "-");
            row.add(data.getBranch() != null ? data.getBranch().getBranchName() : "-");
            row.add(data.getBroker() != null ? data.getBroker().getBranchCode() : "-");
            row.add(data.getBroker() != null ? data.getBroker().getBranchCode() : "-");
            row.add(data.getNationalCode() != null ? data.getNationalCode() : "-");
            row.add(data.getAmount() != null ? String.valueOf(data.getAmount()) : "-");
            row.add(data.getBrokerWage() != null ? String.valueOf(data.getBrokerWage()) : "-");
            row.add(data.getPaymentMonthCount() != null ? data.getPaymentMonthCount() : "-");
            row.add(data.getPercent() != null ? String.valueOf(data.getPercent()) + "%" : "-");
            row.add(data.getMonthWage() != null ? String.valueOf(data.getMonthWage()) : "-");
            row.add(data.getContractNumber() != null ? data.getContractNumber() : "-");
            row.add(data.getContractDate() != null ? data.getContractDate() : "-");
            rows.add(row);
            rowCounter++;
        }
        return rows;
    }

    private ExcelReportHeader createReportHeaderDetails() {
        ExcelReportHeader reportHeader = new ExcelReportHeader();
        reportHeader.setTitle("گزارش محاسبه حق الزحمه کارگزایها ");
        reportHeader.setReportDate(DateUtils.format(new Date(), "yyyy/MM/dd - hh:mm"));
        return reportHeader;
    }
}
