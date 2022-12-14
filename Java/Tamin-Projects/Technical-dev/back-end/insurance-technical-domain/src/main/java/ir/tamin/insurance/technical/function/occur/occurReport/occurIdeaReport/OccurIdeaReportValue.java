package ir.tamin.insurance.technical.function.occur.occurReport.occurIdeaReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurIdeaReportValue implements DBFunctionValue {
    private BigDecimal row_id;
    private String idea_seq ;
    private String repno ;
    private String repdate;
    private String  risuid ;
    private String risulname;
    private String  risufname;
    private String risubirthdate;
    private String expcitydesc;
    private String rwshid;
    private String workshopname;
    private String occur_serial ;
    private String  insp_review  ;
    private String  techinspinwork;
    private String  techinworkdesc ;
    private String  techinspdate    ;
    private String  fulltechinspreport;
    private String  boss_remark;
    private String  boss_review ;
    private String  boss_inwork  ;
    private String bossinworkdesc ;
    private String  occur_result   ;
    private String   occurrepregno  ;
    private String   occurrepregdate ;

    public BigDecimal getRow_id() {
        return row_id;
    }

    public void setRow_id(BigDecimal row_id) {
        this.row_id = row_id;
    }

    public String getIdea_seq() {
        return idea_seq;
    }

    public void setIdea_seq(String idea_seq) {
        this.idea_seq = idea_seq;
    }

    public String getRepno() {
        return repno;
    }

    public void setRepno(String repno) {
        this.repno = repno;
    }

    public String getRepdate() {
        return repdate;
    }

    public void setRepdate(String repdate) {
        this.repdate = repdate;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getRisulname() {
        return risulname;
    }

    public void setRisulname(String risulname) {
        this.risulname = risulname;
    }

    public String getRisufname() {
        return risufname;
    }

    public void setRisufname(String risufname) {
        this.risufname = risufname;
    }

    public String getRisubirthdate() {
        return risubirthdate;
    }

    public void setRisubirthdate(String risubirthdate) {
        this.risubirthdate = risubirthdate;
    }

    public String getExpcitydesc() {
        return expcitydesc;
    }

    public void setExpcitydesc(String expcitydesc) {
        this.expcitydesc = expcitydesc;
    }

    public String getRwshid() {
        return rwshid;
    }

    public void setRwshid(String rwshid) {
        this.rwshid = rwshid;
    }

    public String getWorkshopname() {
        return workshopname;
    }

    public void setWorkshopname(String workshopname) {
        this.workshopname = workshopname;
    }

    public String getOccur_serial() {
        return occur_serial;
    }

    public void setOccur_serial(String occur_serial) {
        this.occur_serial = occur_serial;
    }

    public String getInsp_review() {
        return insp_review;
    }

    public void setInsp_review(String insp_review) {
        this.insp_review = insp_review;
    }

    public String getTechinspinwork() {
        return techinspinwork;
    }

    public void setTechinspinwork(String techinspinwork) {
        this.techinspinwork = techinspinwork;
    }

    public String getTechinworkdesc() {
        return techinworkdesc;
    }

    public void setTechinworkdesc(String techinworkdesc) {
        this.techinworkdesc = techinworkdesc;
    }

    public String getTechinspdate() {
        return techinspdate;
    }

    public void setTechinspdate(String techinspdate) {
        this.techinspdate = techinspdate;
    }

    public String getFulltechinspreport() {
        return fulltechinspreport;
    }

    public void setFulltechinspreport(String fulltechinspreport) {
        this.fulltechinspreport = fulltechinspreport;
    }

    public String getBoss_remark() {
        return boss_remark;
    }

    public void setBoss_remark(String boss_remark) {
        this.boss_remark = boss_remark;
    }

    public String getBoss_review() {
        return boss_review;
    }

    public void setBoss_review(String boss_review) {
        this.boss_review = boss_review;
    }

    public String getBoss_inwork() {
        return boss_inwork;
    }

    public void setBoss_inwork(String boss_inwork) {
        this.boss_inwork = boss_inwork;
    }

    public String getBossinworkdesc() {
        return bossinworkdesc;
    }

    public void setBossinworkdesc(String bossinworkdesc) {
        this.bossinworkdesc = bossinworkdesc;
    }

    public String getOccur_result() {
        return occur_result;
    }

    public void setOccur_result(String occur_result) {
        this.occur_result = occur_result;
    }

    public String getOccurrepregno() {
        return occurrepregno;
    }

    public void setOccurrepregno(String occurrepregno) {
        this.occurrepregno = occurrepregno;
    }

    public String getOccurrepregdate() {
        return occurrepregdate;
    }

    public void setOccurrepregdate(String occurrepregdate) {
        this.occurrepregdate = occurrepregdate;
    }
}
