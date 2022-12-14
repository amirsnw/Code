package ir.tamin.incomeBank.model.financialDoc;

public class ElmHeader {

    private String vahedCode;
    private String faDate;
    private String detailDesc;
    private String sysType;
    private String year;

    public String getVahedCode() {
        return vahedCode;
    }

    public void setVahedCode(String vahedCode) {
        this.vahedCode = vahedCode;
    }

    public String getFaDate() {
        return faDate;
    }

    public void setFaDate(String faDate) {
        this.faDate = faDate;
    }

    public String getDetailDesc() {
        return detailDesc;
    }

    public void setDetailDesc(String detailDesc) {
        this.detailDesc = detailDesc;
    }

    public String getSysType() {
        return sysType;
    }

    public void setSysType(String sysType) {
        this.sysType = sysType;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
