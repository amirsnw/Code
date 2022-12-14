package ir.tamin.incomeBank.util;

import java.util.Map;

/**
 *
 * @author m_vahdati
 */
public class ExcelReportHeader {
    private String title;
    private Map<String, String> filters;
    private String reportDate;

    public Map<String, String> getFilters() {
        return filters;
    }

    public void setFilters(Map<String, String> filters) {
        this.filters = filters;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReportDate() {
        return reportDate;
    }

    public void setReportDate(String reportDate) {
        this.reportDate = reportDate;
    }

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        result.append(title);
        if(filters != null && !filters.isEmpty()) {
            for (String key : filters.keySet()) {
                result.append(key);
                result.append(" : ");
                result.append(filters.get(key));
            }
        }
        result.append(reportDate);
        return result.toString();
    }
}
