
package ir.tamin.insurance.technical.model.primaryKeyClass;

import java.io.Serializable;

/**
 *
 * @author a_khalighi
 */
public class BrokerReportDetailPK implements Serializable{

    private String reportId;
    private Long reportRow;

    public BrokerReportDetailPK(String reportId, Long reportRow) {
        this.reportId = reportId;
        this.reportRow = reportRow;
    }

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public Long getReportRow() {
        return reportRow;
    }

    public void setReportRow(Long reportRow) {
        this.reportRow = reportRow;
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int hashCode() {
        return super.hashCode(); //To change body of generated methods, choose Tools | Templates.
    }
}
