package ir.tamin.insurance.technical.function.occur.occurReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

/**
 * Created by a-khalighi on 5/17/2022
*/
public class OccurReviewReportValue implements DBFunctionValue {
  //  , ROW_ID, OCCUR_SERIAL, BRHCODE, BRHNAME, REPNO, REPDATE, RISUID, OCCUR_CAUSE, RISULNAME, RISUFNAME, RISUBIRTHDATE, RISUDNAME, RISUIDNO, RISUNATCODE, PNATIONTYPE, EXPCITYDESC, SEXDESC, MARRIEDDESC, DIPLOMADESC, EMPLOYEEDATE, EMPLOYEESTATDESC, VEHICLEDESC, JOBDESC, ISUJOBLOCATION, DAILY_WAGE, JOB_FROM_DATE, JOB_UNTIL_DATE, ISUSHIFT_MORN, ISUSHIFT_EVEN, ISUSHIFT_NIGHT, ISUADDR, OCCUR_TIME, OCCUR_DATE, OCCUR_ADDR, OCCUR_JOBDESC, OCCUR_TOOLS, OCCUR_EQUIP, OCCUR_REASONDESC, OCCUR_RELDESC, OCCUR_RESULTDESC, OCCUR_CAUSEDESC, TYPE_DESC, ISTRAIN, ISRW_DO90, RWACTION, ISRW_DO95, RWSHID, RWSHNAME, MORN_STARTTIME, MORN_FINISHTIME, EVEN_STARTTIME, EVEN_FINISHTIME, NIGH_STARTTIME, NIGH_FINISHTIME, ISUTEL, FULLTECHINSPREPORT, BOSS_REMARK, BOSS_INWORK, TECHINSPINWORK, ACTIVITYDESC
     private BigDecimal row_id;
    private String occur_serial;
    private String brhcode;
    private String brhname;
    private String repno;
    private String repdate;
    private String risuid;
    private String occur_cause;
    private String risulname;
    private String risufname;

    private String risubirthdate;
    private String risudname;
    private String risuidno;
    private String risunatcode;
    private String pnationtype;
    private String expcitydesc;
    private String sexdesc;
    private String marrieddesc;
    private String diplomadesc;
    private String employeedate;
    private String employeestatdesc;


    private String vehicledesc;
    private String jobdesc;
    private String isujoblocation;
    private BigDecimal daily_wage;
    private String job_from_date;
    private String job_until_date;
    private String isushift_morn;
    private String isushift_even;
    private String isushift_night;
    private String isuaddr;
    private String occur_time;
    private String occur_date;
    private String occur_addr;
    private String occur_jobdesc;
    private String occur_tools;
    private String occur_equip;
    private String occur_reasondesc;
    private String occur_reldesc;
    private String occur_resultdesc;


    private String occur_causedesc;
    private String type_desc;
    private String istrain;
    private String isrw_do90;
    private String rwaction;
    private String isrw_do95;
    private String rwshid;
    private String rwshname;
    private String morn_starttime;
    private String morn_finishtime;
    private String even_starttime;
    private String even_finishtime;
    private String nigh_starttime;
    private String nigh_finishtime;
    private String isutel;
    private String fulltechinspreport;
    private String boss_remark;
    private String boss_inwork;
    private String techinspinwork;
    private String activitydesc;
/*    private String part_desc;*/

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

    public String getOccur_cause() {
        return occur_cause;
    }

    public void setOccur_cause(String occur_cause) {
        this.occur_cause = occur_cause;
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

    public String getRisudname() {
        return risudname;
    }

    public void setRisudname(String risudname) {
        this.risudname = risudname;
    }

    public String getRisuidno() {
        return risuidno;
    }

    public void setRisuidno(String risuidno) {
        this.risuidno = risuidno;
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

    public String getExpcitydesc() {
        return expcitydesc;
    }

    public void setExpcitydesc(String expcitydesc) {
        this.expcitydesc = expcitydesc;
    }

    public String getSexdesc() {
        return sexdesc;
    }

    public void setSexdesc(String sexdesc) {
        this.sexdesc = sexdesc;
    }

    public String getMarrieddesc() {
        return marrieddesc;
    }

    public void setMarrieddesc(String marrieddesc) {
        this.marrieddesc = marrieddesc;
    }

    public String getDiplomadesc() {
        return diplomadesc;
    }

    public void setDiplomadesc(String diplomadesc) {
        this.diplomadesc = diplomadesc;
    }

    public String getEmployeedate() {
        return employeedate;
    }

    public void setEmployeedate(String employeedate) {
        this.employeedate = employeedate;
    }

    public String getEmployeestatdesc() {
        return employeestatdesc;
    }

    public void setEmployeestatdesc(String employeestatdesc) {
        this.employeestatdesc = employeestatdesc;
    }

    public String getVehicledesc() {
        return vehicledesc;
    }

    public void setVehicledesc(String vehicledesc) {
        this.vehicledesc = vehicledesc;
    }

    public String getJobdesc() {
        return jobdesc;
    }

    public void setJobdesc(String jobdesc) {
        this.jobdesc = jobdesc;
    }

    public String getIsujoblocation() {
        return isujoblocation;
    }

    public void setIsujoblocation(String isujoblocation) {
        this.isujoblocation = isujoblocation;
    }

    public BigDecimal getDaily_wage() {

        return daily_wage == null ? BigDecimal.ZERO : daily_wage;

    }

    public void setDaily_wage(BigDecimal daily_wage) {
        this.daily_wage = daily_wage;
    }

    public String getJob_from_date() {
        return job_from_date;
    }

    public void setJob_from_date(String job_from_date) {
        this.job_from_date = job_from_date;
    }

    public String getJob_until_date() {
        return job_until_date;
    }

    public void setJob_until_date(String job_until_date) {
        this.job_until_date = job_until_date;
    }

    public String getIsushift_morn() {
        return isushift_morn;
    }

    public void setIsushift_morn(String isushift_morn) {
        this.isushift_morn = isushift_morn;
    }

    public String getIsushift_even() {
        return isushift_even;
    }

    public void setIsushift_even(String isushift_even) {
        this.isushift_even = isushift_even;
    }

    public String getIsushift_night() {
        return isushift_night;
    }

    public void setIsushift_night(String isushift_night) {
        this.isushift_night = isushift_night;
    }

    public String getIsuaddr() {
        return isuaddr;
    }

    public void setIsuaddr(String isuaddr) {
        this.isuaddr = isuaddr;
    }

    public String getOccur_time() {
        return occur_time;
    }

    public void setOccur_time(String occur_time) {
        this.occur_time = occur_time;
    }

    public String getOccur_date() {
        return occur_date;
    }

    public void setOccur_date(String occur_date) {
        this.occur_date = occur_date;
    }

    public String getOccur_addr() {
        return occur_addr;
    }

    public void setOccur_addr(String occur_addr) {
        this.occur_addr = occur_addr;
    }

    public String getOccur_jobdesc() {
        return occur_jobdesc;
    }

    public void setOccur_jobdesc(String occur_jobdesc) {
        this.occur_jobdesc = occur_jobdesc;
    }

    public String getOccur_tools() {
        return occur_tools;
    }

    public void setOccur_tools(String occur_tools) {
        this.occur_tools = occur_tools;
    }

    public String getOccur_equip() {
        return occur_equip;
    }

    public void setOccur_equip(String occur_equip) {
        this.occur_equip = occur_equip;
    }

    public String getOccur_reasondesc() {
        return occur_reasondesc;
    }

    public void setOccur_reasondesc(String occur_reasondesc) {
        this.occur_reasondesc = occur_reasondesc;
    }

    public String getOccur_reldesc() {
        return occur_reldesc;
    }

    public void setOccur_reldesc(String occur_reldesc) {
        this.occur_reldesc = occur_reldesc;
    }

    public String getOccur_resultdesc() {
        return occur_resultdesc;
    }

    public void setOccur_resultdesc(String occur_resultdesc) {
        this.occur_resultdesc = occur_resultdesc;
    }

    public String getOccur_causedesc() {
        return occur_causedesc;
    }

    public void setOccur_causedesc(String occur_causedesc) {
        this.occur_causedesc = occur_causedesc;
    }

    public String getType_desc() {
        return type_desc;
    }

    public void setType_desc(String type_desc) {
        this.type_desc = type_desc;
    }

    public String getIstrain() {
        return istrain;
    }

    public void setIstrain(String istrain) {
        this.istrain = istrain;
    }

    public String getIsrw_do90() {
        return isrw_do90;
    }

    public void setIsrw_do90(String isrw_do90) {
        this.isrw_do90 = isrw_do90;
    }

    public String getRwaction() {
        return rwaction;
    }

    public void setRwaction(String rwaction) {
        this.rwaction = rwaction;
    }

    public String getIsrw_do95() {
        return isrw_do95;
    }

    public void setIsrw_do95(String isrw_do95) {
        this.isrw_do95 = isrw_do95;
    }

    public String getRwshid() {
        return rwshid;
    }

    public void setRwshid(String rwshid) {
        this.rwshid = rwshid;
    }

    public String getRwshname() {
        return rwshname;
    }

    public void setRwshname(String rwshname) {
        this.rwshname = rwshname;
    }

    public String getMorn_starttime() {
        return morn_starttime;
    }

    public void setMorn_starttime(String morn_starttime) {
        this.morn_starttime = morn_starttime;
    }

    public String getMorn_finishtime() {
        return morn_finishtime;
    }

    public void setMorn_finishtime(String morn_finishtime) {
        this.morn_finishtime = morn_finishtime;
    }

    public String getEven_starttime() {
        return even_starttime;
    }

    public void setEven_starttime(String even_starttime) {
        this.even_starttime = even_starttime;
    }

    public String getEven_finishtime() {
        return even_finishtime;
    }

    public void setEven_finishtime(String even_finishtime) {
        this.even_finishtime = even_finishtime;
    }

    public String getNigh_starttime() {
        return nigh_starttime;
    }

    public void setNigh_starttime(String nigh_starttime) {
        this.nigh_starttime = nigh_starttime;
    }

    public String getNigh_finishtime() {
        return nigh_finishtime;
    }

    public void setNigh_finishtime(String nigh_finishtime) {
        this.nigh_finishtime = nigh_finishtime;
    }

    public String getIsutel() {
        return isutel;
    }

    public void setIsutel(String isutel) {
        this.isutel = isutel;
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

    public String getBoss_inwork() {
        return boss_inwork;
    }

    public void setBoss_inwork(String boss_inwork) {
        this.boss_inwork = boss_inwork;
    }

    public String getTechinspinwork() {
        return techinspinwork;
    }

    public void setTechinspinwork(String techinspinwork) {
        this.techinspinwork = techinspinwork;
    }

    public String getActivitydesc() {
        return activitydesc;
    }

    public void setActivitydesc(String activitydesc) {
        this.activitydesc = activitydesc;
    }
/*
    public String getPart_desc() {
        return part_desc;
    }

    public void setPart_desc(String part_desc) {
        this.part_desc = part_desc;
    }*/
}
