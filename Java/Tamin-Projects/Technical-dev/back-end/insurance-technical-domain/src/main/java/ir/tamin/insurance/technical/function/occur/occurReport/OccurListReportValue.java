package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurListReportValue implements DBFunctionValue {
    private BigDecimal   row_id;
    private String occur_serial;
    private String brhcode;
    private String today;
    private String brhname;
    private String repno;
    private String risuid;
    private String isufullname;
    private String risubirthdate;
    private String risunatcode;
    private String pnationtype;
    private String occur_date;
    private String rwshid;
    private String occur_rel;
    private String occur_resultdesc;
    private String rwshname;
    private BigDecimal isublameperc;
    private BigDecimal wshblameperc;
    private String inspworksended;
    private String blamecode;
    private String begindate;
    private String todate;
    private String workinspletno;
    private String workinspletdate;

    public OccurListReportValue() {
    }

    public BigDecimal getRow_id() {
        return row_id;
    }

    public void setRow_id(BigDecimal row_id) {
        this.row_id = row_id;
    }

    public String getOccur_serial() {
        return occur_serial;
    }

    public void setOccur_serial(String occur_serial) {
        this.occur_serial = occur_serial;
    }

    public String getBrhcode() {
        return brhcode;
    }

    public void setBrhcode(String brhcode) {
        this.brhcode = brhcode;
    }

    public String getToday() {
        return today;
    }

    public void setToday(String today) {
        this.today = today;
    }

    public String getBrhname() {
        return brhname;
    }

    public void setBrhname(String brhname) {
        this.brhname = brhname;
    }

    public String getRepno() {
        return repno;
    }

    public void setRepno(String repno) {
        this.repno = repno;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getIsufullname() {
        return isufullname;
    }

    public void setIsufullname(String isufullname) {
        this.isufullname = isufullname;
    }

    public String getRisubirthdate() {
        return risubirthdate;
    }

    public void setRisubirthdate(String risubirthdate) {
        this.risubirthdate = risubirthdate;
    }

    public String getRisunatcode() {
        return risunatcode;
    }

    public void setRisunatcode(String risunatcode) {
        this.risunatcode = risunatcode;
    }

    public String getPnationtype() {
        return pnationtype;
    }

    public void setPnationtype(String pnationtype) {
        this.pnationtype = pnationtype;
    }

    public String getOccur_date() {
        return occur_date;
    }

    public void setOccur_date(String occur_date) {
        this.occur_date = occur_date;
    }

    public String getRwshid() {
        return rwshid;
    }

    public void setRwshid(String rwshid) {
        this.rwshid = rwshid;
    }

    public String getOccur_rel() {
        return occur_rel;
    }

    public void setOccur_rel(String occur_rel) {
        this.occur_rel = occur_rel;
    }

    public String getOccur_resultdesc() {
        return occur_resultdesc;
    }

    public void setOccur_resultdesc(String occur_resultdesc) {
        this.occur_resultdesc = occur_resultdesc;
    }

    public String getRwshname() {
        return rwshname;
    }

    public void setRwshname(String rwshname) {
        this.rwshname = rwshname;
    }

    public BigDecimal getIsublameperc() {
        return isublameperc;
    }

    public void setIsublameperc(BigDecimal isublameperc) {
        this.isublameperc = isublameperc;
    }

    public BigDecimal getWshblameperc() {
        return wshblameperc;
    }

    public void setWshblameperc(BigDecimal wshblameperc) {
        this.wshblameperc = wshblameperc;
    }

    public String getInspworksended() {
        return inspworksended == null ? "" : inspworksended;
    }

    public void setInspworksended(String inspworksended) {
        this.inspworksended = inspworksended;
    }

    public String getBlamecode() {
        return blamecode;
    }

    public void setBlamecode(String blamecode) {
        this.blamecode = blamecode;
    }

    public String getBegindate() {
        return begindate;
    }

    public void setBegindate(String begindate) {
        this.begindate = begindate;
    }

    public String getTodate() {
        return todate;
    }

    public void setTodate(String todate) {
        this.todate = todate;
    }

    public String getWorkinspletno() {
        return workinspletno;
    }

    public void setWorkinspletno(String workinspletno) {
        this.workinspletno = workinspletno;
    }

    public String getWorkinspletdate() {
        return workinspletdate;
    }

    public void setWorkinspletdate(String workinspletdate) {
        this.workinspletdate = workinspletdate;
    }

}
