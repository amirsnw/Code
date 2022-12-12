package ir.tamin.insurance.technical.model.occur;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by a-khalighi on 5/17/2022
*/

@Entity
@Table(name = "SSUP_OCCUR_REVIEW")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.occur.OccurReviewManager")
@ResourceIds({@ResourceId(fields = {"occurSerial"})})
public class SsupOccurReview extends AbstractEntity<String> {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "OCCUR_SERIAL", nullable = false)
    private String occurSerial;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "REQ_ID", referencedColumnName = "REQ_ID", insertable = false, updatable = false)
    private OccurRep occurRep;

    @JsonManagedReference
    @OneToMany(mappedBy = "ssupOccurReview", cascade = CascadeType.ALL)
    private List<SsupOccurPartlist> ssupOccurPartlist;

    @ManyToOne
    @JoinColumn(name = "OCCUR_CAUSE", nullable = false)
    private TbOccurCause occurCause;

    @ManyToOne
    @JoinColumn(name = "OCCUR_TYPE", nullable = false)
    private TbOccurType OccurType;

    @Column(name = "REPNO", nullable = false)
    private String repNo;

    @Column(name = "RISUID")
    private String risuid;

    @Column(name = "RWSHID")
    private String rwshid;

    @Column(name = "ISMARRIED")
    private String ismarried;

    @Column(name = "DIPLOMA")
    private String diploma;

    @Column(name = "EMPLOYEEDATE")
    private String employeedate;

    @Column(name = "EMPLOYEESTAT")
    private String employeestat;

    @Column(name = "JOBDESC")
    private String jobdesc;

    @Column(name = "ISUJOBLOCATION")
    private String isujoblocation;

    @Column(name = "DAILY_WAGE")
    private String dailyWage;

    @Column(name = "JOB_FROM_DATE")
    private String jobFromDate;

    @Column(name = "JOB_UNTIL_DATE")
    private String jobUntilDate;

    @Column(name = "VEHICLE")
    private String vehicle;

    @Column(name = "ISUADDR")
    private String isuaddr;

    @Column(name = "ISUWORK_SHIFT")
    private String isuworkShift;

    @Column(name = "OCCUR_TIME")
    private String occurTime;

    @Column(name = "OCCUR_DATE")
    private String occurDate;

    @Column(name = "OCCUR_ADDR")
    private String occurAddr;

    @Column(name = "OCCUR_TOOLS")
    private String occurTools;

    @Column(name = "OCCUR_EQUIP")
    private String occurEquip;

    @Column(name = "OCCUR_JOBDESC")
    private String occurJobdesc;

    @Column(name = "OCCUR_REASON")
    private String occurReason;

    @Column(name = "OCCUR_REL")
    private String occurRel;

    @Column(name = "OCCUR_PART")
    private String occurPart;

    @Column(name = "ISTRAIN")
    private String istrain;

    @Column(name = "OCCUR_RESULT")
    private String occurResult;

    @Column(name = "ISRECORDED")
    private String isrecorded;

    @Column(name = "isrw_do90")
    private String isrwDo90;

    @Column(name = "RWACTION")
    private String rwaction;

    @Column(name = "ISRW_DO95")
    private String isrwDo95;

    @Column(name = "createuid")
    private String createuid;

    @Column(name = "createdt")
    private String createdt;

    @Column(name = "EDITUID")
    private String edituid;

    @Column(name = "EDITDT")
    private String EDITDT;

    @Column(name = "RWWORKSTART")
    private String rwworkstart;

    @Column(name = "RWWORKFINISH")
    private String rwworkfinish;

    @Column(name = "CONF_DOC_OK")
    private String confDocOk;

    @Column(name = "CONF_DUTY")
    private String confDuty;

    @Column(name = "CONF_DUTY_CAUSED")
    private String confDutyCaused;

    @Column(name = "CONF_INWORK")
    private String confInwork;

    @Column(name = "CONF_OUTWORK")
    private String confOutwork;

    @Column(name = "CONF_HOSP")
    private String confHosp;

    @Column(name = "CONF_TRANS")
    private String confTrans;

    @Column(name = "CONF_RESCUE")
    private String confRescue;

    @Column(name = "CONF_IS60")
    private String confIs60;

    @Column(name = "LEGAL_REPORT_UID")
    private String legalReportUID;

    @Column(name = "LEGAL_REPORT_DT")
    private String legalReportDT;

    @Column(name = "CONF_REMARK")
    private String confRemark;

    @Column(name = "BOSS_INWORK")
    private String bossInwork;

    @Column(name = "BOSS_NOWORK")
    private String bossNowork;

    @Column(name = "BOSS_REMARK")
    private String bossRemark;

    @Column(name = "ISUTEL")
    private String isutel;

    @Column(name = "ISUSHIFT_MORN")
    private String isushiftMorn;

    @Column(name = "ISUSHIFT_EVEN")
    private String isushiftEven;

    @Column(name = "ISUSHIFT_NIGHT")
    private String isushiftNight;

    @Column(name = "DIEDATE")
    private String diedate;

    @Column(name = "COMLETNO")
    private String comletno;

    @Column(name = "COMDATE")
    private String comdate;

    @Column(name = "BRHINTROLETNO")
    private String brhintroletno;

    @Column(name = "BRHINTROLETDATE")
    private String brhintroletdate;

    @Column(name = "BRHINTROREPLYLETNO")
    private String brhintroreplyletno;

    @Column(name = "BRHINTROREPLYLETDATE")
    private String brhintroreplyletdate;

    @Column(name = "PLNAME")
    private String plname;

    @Column(name = "PFNAME")
    private String pfname;

    @Column(name = "SEXCODE")
    private String sexcode;

    @Column(name = "PNATIONDESC")
    private String pnationdesc;

    @Column(name = "PIDNO")
    private String pidno;

    @Column(name = "PIDSERIAL")
    private String pidserial;

    @Column(name = "PBIRTHDATE")
    private String pbirthdate;

    @Column(name = "PEXPCITYNAME")
    private String pexpcityname;

    @Column(name = "PNATCODE")
    private String pnatcode;

    @Column(name = "MORN_STARTTIME")
    private String mornStarttime;

    @Column(name = "MORN_FINISHTIME")
    private String mornFinishtime;

    @Column(name = "EVEN_STARTTIME")
    private String evenStarttime;

    @Column(name = "EVEN_FINISHTIME")
    private String evenFinishtime;

    @Column(name = "NIGH_STARTTIME")
    private String nighStarttime;

    @Column(name = "NIGH_FINISHTIME")
    private String nighFinishtime;

    @Column(name = "PFATHERNAME")
    private String pfathername;

    @Column(name = "TECHINSPDATE")
    private String techinspdate;

    @Column(name = "FULLTECHINSPREPORT")
    private String fulltechinspreport;

    @Column(name = "TECHINSPINWORK")
    private String techinspinwork;

    @Column(name = "INSPWORKSENDED")
    private String inspworksended;

    @Column(name = "WSHBLAMEPERC")
    private Integer wshblameperc;

    @Column(name = "ISUBLAMEPERC")
    private Integer isublameperc;

    @Column(name = "PNATIONTYPE")
    private String pnationtype;

    @Column(name = "OTHERBLAMEPERC")
    private Integer otherblameperc;

    @Column(name = "OTHERBLAMEPERCDESC")
    private String otherblamepercdesc;

    @Column(name = "EVENT_REASON")
    private String eventReason;

    @Column(name = "WSHBLAMEPERCLAW")
    private Integer wshblameperclaw;

    @Column(name = "ISUBLAMEPERCLAW")
    private Integer isublameperclaw;

    @Column(name = "OTHERBLAMEPERCLAW")
    private Integer otherblameperclaw;

    @Column(name = "OTHERBLAMEPERCDESCLAW")
    private String otherblamepercdesclaw;

    @Column(name = "WORKINSPLETNO")
    private String workinspletno;

    @Column(name = "WORKINSPLETDATE")
    private String workinspletdate;

    @Column(name = "EVENT_RESULT")
    private String eventResult;

    @Column(name = "REQ_OWNER")
    private String reqOwner;

    @Column(name = "FIRSTWORKDATE")
    private String firstworkdate;

    @Column(name = "BRCH_CODE")
    private String brchCode;

    @Column(name = "REQ_ID")
    private Long reqId;

    @Transient
    private String actionType;

    public List<SsupOccurPartlist> getSsupOccurPartlist() {
        return ssupOccurPartlist;
    }

    public void setSsupOccurPartlist(List<SsupOccurPartlist> ssupOccurPartlist) {
        this.ssupOccurPartlist = ssupOccurPartlist;
    }

    public Long getReqId() {
        return reqId;
    }

    public void setReqId(Long reqId) {
        this.reqId = reqId;
    }

    public String getRepNo() {
        return repNo;
    }

    public void setRepNo(String repNo) {
        this.repNo = repNo;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getOccurSerial() {
        return occurSerial;
    }

    public void setOccurSerial(String occurSerial) {
        this.occurSerial = occurSerial;
    }

    public OccurRep getOccurRep() {
        return occurRep;
    }

    public void setOccurRep(OccurRep occurRep) {
        this.occurRep = occurRep;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getRwshid() {
        return rwshid;
    }

    public void setRwshid(String rwshid) {
        this.rwshid = rwshid;
    }

    public String getIsmarried() {
        return ismarried;
    }

    public void setIsmarried(String ismarried) {
        this.ismarried = ismarried;
    }

    public String getDiploma() {
        return diploma;
    }

    public void setDiploma(String diploma) {
        this.diploma = diploma;
    }
/*
    public Date getInspbrhreqdate() {

            if (inspbrhreqdate != null) {
                return DateUtils.parse(inspbrhreqdate, "yyyyMMdd");
            }
            return null;

        }

        public void setInspbrhreqdate(Date inspbrhreqdate) {
            if (inspbrhreqdate != null)
                this.inspbrhreqdate = DateUtils.format(inspbrhreqdate, "yyyyMMdd");


        }*/

    public TbOccurType getOccurType() {
        return OccurType;
    }

    public void setOccurType(TbOccurType occurType) {
        OccurType = occurType;
    }

    public Date getEmployeedate() {

        if (employeedate != null) {
            return DateUtils.parse(employeedate, "yyyyMMdd");
        }
        return null;

    }

    public void setEmployeedate(Date employeedate) {
        if (employeedate != null)
            this.employeedate = DateUtils.format(employeedate, "yyyyMMdd");
    }


    public String getEmployeestat() {
        return employeestat;
    }

    public void setEmployeestat(String employeestat) {
        this.employeestat = employeestat;
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

    public String getDailyWage() {
        return dailyWage;
    }

    public void setDailyWage(String dailyWage) {
        this.dailyWage = dailyWage;
    }

    public Date getJobFromDate() {
        if (jobFromDate != null) {
            return DateUtils.parse(jobFromDate, "yyyyMMdd");
        }
        return null;

    }

    public void setJobFromDate(Date jobFromDate) {
        if (jobFromDate != null)
            this.jobFromDate = DateUtils.format(jobFromDate, "yyyyMMdd");
    }

    public Date getJobUntilDate() {

        if (jobUntilDate != null) {
            return DateUtils.parse(jobUntilDate, "yyyyMMdd");
        }
        return null;
    }

    public void setJobUntilDate(Date jobUntilDate) {
        if (jobUntilDate != null) {
            this.jobUntilDate = DateUtils.format(jobUntilDate, "yyyyMMdd");
        }
    }

    public String getVehicle() {
        return vehicle;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }

    public String getIsuaddr() {
        return isuaddr;
    }

    public void setIsuaddr(String isuaddr) {
        this.isuaddr = isuaddr;
    }

    public String getIsuworkShift() {
        return isuworkShift;
    }

    public void setIsuworkShift(String isuworkShift) {
        this.isuworkShift = isuworkShift;
    }

    public String getOccurTime() {
        return occurTime;
    }

    public void setOccurTime(String occurTime) {
        this.occurTime = occurTime;
    }


    public Date getOccurDate() {
        if (occurDate != null) {
            return DateUtils.parse(occurDate, "yyyyMMdd");
        }
        return null;
    }

    public void setOccurDate(Date occurDate) {

        if (occurDate != null)
            this.occurDate = DateUtils.format(occurDate, "yyyyMMdd");

    }

    public String getOccurAddr() {
        return occurAddr;
    }

    public void setOccurAddr(String occurAddr) {
        this.occurAddr = occurAddr;
    }

    public String getOccurTools() {
        return occurTools;
    }

    public void setOccurTools(String occurTools) {
        this.occurTools = occurTools;
    }

    public String getOccurEquip() {
        return occurEquip;
    }

    public void setOccurEquip(String occurEquip) {
        this.occurEquip = occurEquip;
    }

    public String getOccurJobdesc() {
        return occurJobdesc;
    }

    public void setOccurJobdesc(String occurJobdesc) {
        this.occurJobdesc = occurJobdesc;
    }

    public String getOccurReason() {
        return occurReason;
    }

    public void setOccurReason(String occurReason) {
        this.occurReason = occurReason;
    }

    public String getOccurRel() {
        return occurRel;
    }

    public void setOccurRel(String occurRel) {
        this.occurRel = occurRel;
    }


    public TbOccurCause getOccurCause() {
        return occurCause;
    }

    public void setOccurCause(TbOccurCause occurCause) {
        this.occurCause = occurCause;
    }

    public String getOccurPart() {
        return occurPart;
    }

    public void setOccurPart(String occurPart) {
        this.occurPart = occurPart;
    }

    public String getIstrain() {
        return istrain;
    }

    public void setIstrain(String istrain) {
        this.istrain = istrain;
    }

    public String getOccurResult() {
        return occurResult;
    }

    public void setOccurResult(String occurResult) {
        this.occurResult = occurResult;
    }

    public String getIsrecorded() {
        return isrecorded;
    }

    public void setIsrecorded(String isrecorded) {
        this.isrecorded = isrecorded;
    }

    public String getIsrwDo90() {
        return isrwDo90;
    }

    public void setIsrwDo90(String isrwDo90) {
        this.isrwDo90 = isrwDo90;
    }

    public String getRwaction() {
        return rwaction;
    }

    public void setRwaction(String rwaction) {
        this.rwaction = rwaction;
    }

    public String getIsrwDo95() {
        return isrwDo95;
    }

    public void setIsrwDo95(String isrwDo95) {
        this.isrwDo95 = isrwDo95;
    }

    public String getCreateuid() {
        return createuid;
    }

    public void setCreateuid(String createuid) {
        this.createuid = createuid;
    }

    public Date getCreatedt() {
        return createdt != null ? DateUtils.parse(DateUtils.decodeDateString(createdt), "yyyyMMdd") : null;
    }

    public void setCreatedt(Date createdt) {
        if (createdt != null) {
            this.createdt = DateUtils.encodeDateString(DateUtils.format(createdt, "yyyyMMdd"));
        }
    }

    public String getEdituid() {
        return edituid;
    }

    public void setEdituid(String edituid) {
        this.edituid = edituid;
    }

    public Date getEDITDT() {
        return EDITDT != null ? DateUtils.parse(DateUtils.decodeDateString(EDITDT), "yyyyMMdd") : null;
    }

    public void setEDITDT(Date EDITDT) {
        if (EDITDT != null) {
            this.EDITDT = DateUtils.encodeDateString(DateUtils.format(EDITDT, "yyyyMMdd"));
        }
    }

    public String getRwworkstart() {
        return rwworkstart;
    }

    public void setRwworkstart(String rwworkstart) {
        this.rwworkstart = rwworkstart;
    }

    public String getRwworkfinish() {
        return rwworkfinish;
    }

    public void setRwworkfinish(String rwworkfinish) {
        this.rwworkfinish = rwworkfinish;
    }

    public String getConfDocOk() {
        return confDocOk;
    }

    public void setConfDocOk(String confDocOk) {
        this.confDocOk = confDocOk;
    }

    public String getConfDuty() {
        return confDuty;
    }

    public void setConfDuty(String confDuty) {
        this.confDuty = confDuty;
    }

    public String getConfDutyCaused() {
        return confDutyCaused;
    }

    public void setConfDutyCaused(String confDutyCaused) {
        this.confDutyCaused = confDutyCaused;
    }

    public String getConfInwork() {
        return confInwork;
    }

    public void setConfInwork(String confInwork) {
        this.confInwork = confInwork;
    }

    public String getConfOutwork() {
        return confOutwork;
    }

    public void setConfOutwork(String confOutwork) {
        this.confOutwork = confOutwork;
    }

    public String getConfHosp() {
        return confHosp;
    }

    public void setConfHosp(String confHosp) {
        this.confHosp = confHosp;
    }

    public String getConfTrans() {
        return confTrans;
    }

    public void setConfTrans(String confTrans) {
        this.confTrans = confTrans;
    }

    public String getConfRescue() {
        return confRescue;
    }

    public void setConfRescue(String confRescue) {
        this.confRescue = confRescue;
    }

    public String getConfIs60() {
        return confIs60;
    }

    public void setConfIs60(String confIs60) {
        this.confIs60 = confIs60;
    }

    public String getLegalReportUID() {
        return legalReportUID;
    }

    public void setLegalReportUID(String legalReportUID) {
        this.legalReportUID = legalReportUID;
    }

    public Date getLegalReportDT() {
        if (legalReportDT != null) {
            return DateUtils.parse(legalReportDT, "yyyyMMdd");
        }
        return null;
    }

    public void setLegalReportDT(Date legalReportDT) {
        if (legalReportDT != null)
            this.legalReportDT = DateUtils.encodeDateString(DateUtils.format(legalReportDT, "yyyyMMdd"));
    }

    public String getConfRemark() {
        return confRemark;
    }

    public void setConfRemark(String confRemark) {
        this.confRemark = confRemark;
    }

    public String getBossInwork() {
        return bossInwork;
    }

    public void setBossInwork(String bossInwork) {
        this.bossInwork = bossInwork;
    }

    public String getBossNowork() {
        return bossNowork;
    }

    public void setBossNowork(String bossNowork) {
        this.bossNowork = bossNowork;
    }

    public String getBossRemark() {
        return bossRemark;
    }

    public void setBossRemark(String bossRemark) {
        this.bossRemark = bossRemark;
    }

    public String getIsutel() {
        return isutel;
    }

    public void setIsutel(String isutel) {
        this.isutel = isutel;
    }

    public String getIsushiftMorn() {
        return isushiftMorn;
    }

    public void setIsushiftMorn(String isushiftMorn) {
        this.isushiftMorn = isushiftMorn;
    }

    public String getIsushiftEven() {
        return isushiftEven;
    }

    public void setIsushiftEven(String isushiftEven) {
        this.isushiftEven = isushiftEven;
    }

    public String getIsushiftNight() {
        return isushiftNight;
    }

    public void setIsushiftNight(String isushiftNight) {
        this.isushiftNight = isushiftNight;
    }

    public String getDiedate() {
        return diedate;
    }

    public void setDiedate(String diedate) {
        this.diedate = diedate;
    }

    public String getComletno() {
        return comletno;
    }

    public void setComletno(String comletno) {
        this.comletno = comletno;
    }

    public String getComdate() {
        return comdate;
    }

    public void setComdate(String comdate) {
        this.comdate = comdate;
    }

    public String getBrhintroletno() {
        return brhintroletno;
    }

    public void setBrhintroletno(String brhintroletno) {
        this.brhintroletno = brhintroletno;
    }

    public String getBrhintroletdate() {
        return brhintroletdate;
    }

    public void setBrhintroletdate(String brhintroletdate) {
        this.brhintroletdate = brhintroletdate;
    }

    public String getBrhintroreplyletno() {
        return brhintroreplyletno;
    }

    public void setBrhintroreplyletno(String brhintroreplyletno) {
        this.brhintroreplyletno = brhintroreplyletno;
    }

    public String getBrhintroreplyletdate() {
        return brhintroreplyletdate;
    }

    public void setBrhintroreplyletdate(String brhintroreplyletdate) {
        this.brhintroreplyletdate = brhintroreplyletdate;
    }

    public String getPlname() {
        return plname;
    }

    public void setPlname(String plname) {
        this.plname = plname;
    }

    public String getPfname() {
        return pfname;
    }

    public void setPfname(String pfname) {
        this.pfname = pfname;
    }

    public String getSexcode() {
        return sexcode;
    }

    public void setSexcode(String sexcode) {
        this.sexcode = sexcode;
    }

    public String getPnationdesc() {
        return pnationdesc;
    }

    public void setPnationdesc(String pnationdesc) {
        this.pnationdesc = pnationdesc;
    }

    public String getPidno() {
        return pidno;
    }

    public void setPidno(String pidno) {
        this.pidno = pidno;
    }

    public String getPidserial() {
        return pidserial;
    }

    public void setPidserial(String pidserial) {
        this.pidserial = pidserial;
    }

    public String getPbirthdate() {
        return pbirthdate;
    }

    public void setPbirthdate(String pbirthdate) {
        this.pbirthdate = pbirthdate;
    }

    public String getPexpcityname() {
        return pexpcityname;
    }

    public void setPexpcityname(String pexpcityname) {
        this.pexpcityname = pexpcityname;
    }

    public String getPnatcode() {
        return pnatcode;
    }

    public void setPnatcode(String pnatcode) {
        this.pnatcode = pnatcode;
    }

    public String getMornStarttime() {
        return mornStarttime;
    }

    public void setMornStarttime(String mornStarttime) {
        this.mornStarttime = mornStarttime;
    }

    public String getMornFinishtime() {
        return mornFinishtime;
    }

    public void setMornFinishtime(String mornFinishtime) {
        this.mornFinishtime = mornFinishtime;
    }

    public String getEvenStarttime() {
        return evenStarttime;
    }

    public void setEvenStarttime(String evenStarttime) {
        this.evenStarttime = evenStarttime;
    }

    public String getEvenFinishtime() {
        return evenFinishtime;
    }

    public void setEvenFinishtime(String evenFinishtime) {
        this.evenFinishtime = evenFinishtime;
    }

    public String getNighStarttime() {
        return nighStarttime;
    }

    public void setNighStarttime(String nighStarttime) {
        this.nighStarttime = nighStarttime;
    }

    public String getNighFinishtime() {
        return nighFinishtime;
    }

    public void setNighFinishtime(String nighFinishtime) {
        this.nighFinishtime = nighFinishtime;
    }

    public String getPfathername() {
        return pfathername;
    }

    public void setPfathername(String pfathername) {
        this.pfathername = pfathername;
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

    public String getTechinspinwork() {
        return techinspinwork;
    }

    public void setTechinspinwork(String techinspinwork) {
        this.techinspinwork = techinspinwork;
    }

    public String getInspworksended() {
        return inspworksended;
    }

    public void setInspworksended(String inspworksended) {
        this.inspworksended = inspworksended;
    }

    public Integer getWshblameperc() {
        return wshblameperc;
    }

    public void setWshblameperc(Integer wshblameperc) {
        this.wshblameperc = wshblameperc;
    }

    public Integer getIsublameperc() {
        return isublameperc;
    }

    public void setIsublameperc(Integer isublameperc) {
        this.isublameperc = isublameperc;
    }

    public String getPnationtype() {
        return pnationtype;
    }

    public void setPnationtype(String pnationtype) {
        this.pnationtype = pnationtype;
    }

    public Integer getOtherblameperc() {
        return otherblameperc;
    }

    public void setOtherblameperc(Integer otherblameperc) {
        this.otherblameperc = otherblameperc;
    }

    public String getOtherblamepercdesc() {
        return otherblamepercdesc;
    }

    public void setOtherblamepercdesc(String otherblamepercdesc) {
        this.otherblamepercdesc = otherblamepercdesc;
    }

    public String getEventReason() {
        return eventReason;
    }

    public void setEventReason(String eventReason) {
        this.eventReason = eventReason;
    }

    public Integer getWshblameperclaw() {
        return wshblameperclaw;
    }

    public void setWshblameperclaw(Integer wshblameperclaw) {
        this.wshblameperclaw = wshblameperclaw;
    }

    public Integer getIsublameperclaw() {
        return isublameperclaw;
    }

    public void setIsublameperclaw(Integer isublameperclaw) {
        this.isublameperclaw = isublameperclaw;
    }

    public Integer getOtherblameperclaw() {
        return otherblameperclaw;
    }

    public void setOtherblameperclaw(Integer otherblameperclaw) {
        this.otherblameperclaw = otherblameperclaw;
    }

    public String getOtherblamepercdesclaw() {
        return otherblamepercdesclaw;
    }

    public void setOtherblamepercdesclaw(String otherblamepercdesclaw) {
        this.otherblamepercdesclaw = otherblamepercdesclaw;
    }

    public String getWorkinspletno() {
        return workinspletno;
    }

    public void setWorkinspletno(String workinspletno) {
        this.workinspletno = workinspletno;
    }



    public Date getWorkinspletdate() {
        if (workinspletdate != null) {
                    return DateUtils.parse(workinspletdate, "yyyyMMdd");
                }
                return null;

    }

    public void setWorkinspletdate(Date workinspletdate) {
        if (workinspletdate != null)
                  this.workinspletdate = DateUtils.format(workinspletdate, "yyyyMMdd");
    }




    public String getEventResult() {
        return eventResult;
    }

    public void setEventResult(String eventResult) {
        this.eventResult = eventResult;
    }

    public String getReqOwner() {
        return reqOwner;
    }

    public void setReqOwner(String reqOwner) {
        this.reqOwner = reqOwner;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public Date getFirstworkdate() {
        if (firstworkdate != null) {
            return DateUtils.parse(firstworkdate, "yyyyMMdd");
        }
        return null;

    }

    public void setFirstworkdate(Date firstworkdate) {

        if (firstworkdate != null)
            this.firstworkdate = DateUtils.format(firstworkdate, "yyyyMMdd");
    }


    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    @Override
    public String getIdentifierInstance() {
        return this.occurSerial;
    }
}
