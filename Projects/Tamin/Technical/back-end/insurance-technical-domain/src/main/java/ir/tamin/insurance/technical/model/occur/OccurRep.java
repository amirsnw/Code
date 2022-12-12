package ir.tamin.insurance.technical.model.occur;

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.baseinfo.model.Branch;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.model.workshop.Workshop;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by a-khalighi on 5/17/2022
*/

@Entity
@Table(name = "ssup_occur_rep")

@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.occur.OccurManager")
@ResourceIds({@ResourceId(fields = {"reqId"})})
public class OccurRep extends AbstractEntity<Long> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="sequenceGenerator")
    @Column(name = "REQ_ID", nullable = false)
    private Long reqId;

    @OneToOne(mappedBy = "occurRep", cascade = {CascadeType.REFRESH, CascadeType.REMOVE,
                                                CascadeType.MERGE, CascadeType.DETACH})
    private SsupOccurReview ssupOccurReview;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRHCODE" )
    private Branch brchCode;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "BRCH_REGISTER", referencedColumnName = "BRHCODE")
    private Branch regBrchCode;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "BRCH_REVIEWER", referencedColumnName = "BRHCODE")
    private Branch brchReviewer;

    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "RWSH_BRCH", referencedColumnName = "BRHCODE")
    private Branch rwshBranch;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "RISUID", referencedColumnName = "RISUID", insertable = false, updatable = false),
            @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)})
    private InsuranceRegisteration insuranceSpec;

    @Column(name = "RISUID", nullable = false)
    private String risuid;

    /*@ManyToOne
    @JoinColumns({
            @JoinColumn(name = "RWSHID", referencedColumnName = "RWSHID"),
            @JoinColumn(name = "BRCH_REGISTER", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false),})
    private Workshop workshop;*/

    @Transient
    private Workshop workshop;

    @Column(name = "RWSHID", nullable = false)
    private String workshopId;

    @Column(name = "REPNO", nullable = false)
    private String repNo;

    @Column(name = "EREPID")
    private String eRepId;

    @Column(name = "REPDATE")
    private String repdate;

    @Column(name = "ISMARRIED")
    private String ismarried;

    @Column(name = "DIPLOMA")
    private String diploma;

    @Column(name = "EMPLOYEEDATE")
    private String employeedate;

    @Column(name = "EMPLOYEESTAT")
    private String employeestat;

    @Column(name = "ISUJOBLOCATION")
    private String isuJobLocation;

    @Column(name = "WORKSHOPNAME")
    private String workshopName;

    @Column(name = "DAILY_WAGE")
    private Long dailyWage;

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

    @Column(name = "OCCUR_CAUSE")
    private String occurCause;

    @Column(name = "OCCUR_TOOLS")
    private String occurTools;

    @Column(name = "OCCUR_EQUIP")
    private String occurEquip;

    @Column(name = "OCCUR_JOBDESC")
    private String occurJobdesc;

    @Column(name = "OCCUR_PART")
    private String occurPart;

    @Column(name = "ISTRAIN")
    private String istrain;

    @Column(name = "OCCUR_RESULT")
    private String occurResult;

    @Column(name = "OCCUR_DESC")
    private String occurDesc;

    @Column(name = "RWACTION")
    private String rwaction;

    @Column(name = "OCCUR_VISITORS")
    private String occurVisitors;

    @Column(name = "ISRECORDED")
    private String isrecorded;

    @Column(name = "RECORDERNAME")
    private String recordername;

    @Column(name = "CREATEUID")
    private String createuid;

    @Column(name = "CREATEDT")
    private String createdt;

    @Column(name = "EDITUID")
    private String edituid;

    @Column(name = "EDITDT")
    private String editdt;

    @Column(name = "RWWORKSTART")
    private String rwworkstart;

    @Column(name = "RWWORKFINISH")
    private String rwworkfinish;

    @Column(name = "ISUTEL")
    private String isutel;

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

    @Column(name = "INSPBRHREQDATE")
    private String inspbrhreqdate;

    @Column(name = "REVIEWREQNO")
    private String reviewreqno;

    @Column(name = "REVIEWREQDATE")
    private String reviewreqdate;

    @Column(name = "INSPBRHREQNO")
    private String inspbrhreqno;

    @Column(name = "INWORKHAPPEN")
    private String inworkhappen;

    @Column(name = "PFATHERNAME")
    private String pfathername;

    @Column(name = "PNATIONTYPE")
    private String pnationtype;

    @Column(name = "REPORTERTYPE")
    private String reportertype;

    @Column(name = "REQ_OWNER")
    private String reqOwner;

    @Column(name = "OCCURREPREGDATE")
    private String occurrepregdate;

    @Column(name = "OCCURREPREGNO")
    private String occurrepregno;

    @Column(name = "STATUS")
    private String status;

    @Transient
    private BigDecimal repNoCount;

    @Transient
    private  String actionType;

    @Transient
    private String referDate;

    @Transient
    private String eBranchCode;

    @Override
    public Long getIdentifierInstance() {
        return this.reqId;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public BigDecimal getRepNoCount() {
        return repNoCount;
    }

    public void setRepNoCount(BigDecimal repNoCount) {
        this.repNoCount = repNoCount;
    }

    public SsupOccurReview getSsupOccurReview() {
        return ssupOccurReview;
    }

    public void setSsupOccurReview(SsupOccurReview ssupOccurReview) {
        this.ssupOccurReview = ssupOccurReview;
    }

    public Date getRepdate() {
        if (repdate != null) {
            return DateUtils.parse(repdate, "yyyyMMdd");
        }
        return null;
    }

    public void setRepdate(Date repdate) {
        if (repdate != null)
            this.repdate = DateUtils.format(repdate, "yyyyMMdd");
    }

    public InsuranceRegisteration getInsuranceSpec() {
        return insuranceSpec;
    }

    public void setInsuranceSpec(InsuranceRegisteration insuranceSpec) {
        this.insuranceSpec = insuranceSpec;
    }

    public Workshop getWorkshop() {
        return workshop;
    }

    public void setWorkshop(Workshop workshop) {
        this.workshop = workshop;
    }

    public Long getReqId() {
        return reqId;
    }

    public void setReqId(Long reqId) {
        this.reqId = reqId;
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

    public String getIsuJobLocation() {
        return isuJobLocation;
    }

    public void setIsuJobLocation(String isuJobLocation) {
        this.isuJobLocation = isuJobLocation;
    }

    public String getWorkshopName() {
        return workshopName;
    }

    public void setWorkshopName(String workshopName) {
        this.workshopName = workshopName;
    }

    public Long getDailyWage() {
        return dailyWage;
    }

    public void setDailyWage(Long dailyWage) {
        this.dailyWage = dailyWage;
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
        if (occurDate != null) {
            this.occurDate = DateUtils.format(occurDate, "yyyyMMdd");
        }
    }

    public String getOccurCause() {
        return occurCause;
    }

    public void setOccurCause(String occurCause) {
        this.occurCause = occurCause;
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

    public String getOccurDesc() {
        return occurDesc;
    }

    public void setOccurDesc(String occurDesc) {
        this.occurDesc = occurDesc;
    }

    public String getRwaction() {
        return rwaction;
    }

    public void setRwaction(String rwaction) {
        this.rwaction = rwaction;
    }

    public String getOccurVisitors() {
        return occurVisitors;
    }

    public void setOccurVisitors(String occurVisitors) {
        this.occurVisitors = occurVisitors;
    }

    public String getIsrecorded() {
        return isrecorded;
    }

    public void setIsrecorded(String isrecorded) {
        this.isrecorded = isrecorded;
    }

    public String getRecordername() {
        return recordername;
    }

    public void setRecordername(String recordername) {
        this.recordername = recordername;
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

    public Date getEditdt() {
        return editdt != null ? DateUtils.parse(DateUtils.decodeDateString(editdt), "yyyyMMdd") : null;
    }

    public void setEditdt(Date editdt) {
        if (editdt != null) {
            this.editdt = DateUtils.encodeDateString(DateUtils.format(editdt, "yyyyMMdd"));
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

    public String getIsutel() {
        return isutel;
    }

    public void setIsutel(String isutel) {
        this.isutel = isutel;
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
        return this.pbirthdate;
    }

    public void setPbirthdate(String pbirthdate) {
        if (pbirthdate != null)
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

    public Date getInspbrhreqdate() {
        if (inspbrhreqdate != null) {
            return DateUtils.parse(inspbrhreqdate, "yyyyMMdd");
        }
        return null;
    }

    public void setInspbrhreqdate(Date inspbrhreqdate) {
        if (inspbrhreqdate != null) {
            this.inspbrhreqdate = DateUtils.format(inspbrhreqdate, "yyyyMMdd");
        }
    }

    public String getReviewreqno() {
        return reviewreqno;
    }

    public void setReviewreqno(String reviewreqno) {
        this.reviewreqno = reviewreqno;
    }

    public Date getReviewreqdate() {
        if (reviewreqdate != null) {
            return DateUtils.parse(reviewreqdate, "yyyyMMdd");
        }
        return null;
    }

    public void setReviewreqdate(Date reviewreqdate) {
        if (reviewreqdate != null) {
            this.reviewreqdate = DateUtils.format(reviewreqdate, "yyyyMMdd");
        }
    }

    public String getInspbrhreqno() {
        return inspbrhreqno;
    }

    public void setInspbrhreqno(String inspbrhreqno) {
        this.inspbrhreqno = inspbrhreqno;
    }

    public String getInworkhappen() {
        return inworkhappen;
    }

    public void setInworkhappen(String inworkhappen) {
        this.inworkhappen = inworkhappen;
    }

    public String getPfathername() {
        return pfathername;
    }

    public void setPfathername(String pfathername) {
        this.pfathername = pfathername;
    }

    public String getPnationtype() {
        return pnationtype;
    }

    public void setPnationtype(String pnationtype) {
        this.pnationtype = pnationtype;
    }

    public String getReportertype() {
        return reportertype;
    }

    public void setReportertype(String reportertype) {
        this.reportertype = reportertype;
    }

    public String getReqOwner() {
        return reqOwner;
    }

    public void setReqOwner(String reqOwner) {
        this.reqOwner = reqOwner;
    }

    public String getOccurrepregdate() {
        return occurrepregdate;
    }

    public void setOccurrepregdate(String occurrepregdate) {
        this.occurrepregdate = occurrepregdate;
    }

    public String getOccurrepregno() {
        return occurrepregno;
    }

    public void setOccurrepregno(String occurrepregno) {
        this.occurrepregno = occurrepregno;
    }

    public String getOccurAddr() {
        return occurAddr;
    }

    public void setOccurAddr(String occurAddr) {
        this.occurAddr = occurAddr;
    }

    public String getRepNo() {
        return repNo;
    }

    public void setRepNo(String repNo) {
        this.repNo = repNo;
    }

    public String getReferDate() {
        return referDate;
    }

    public void setReferDate(String referDate) {
        this.referDate = referDate;
    }

    public String geteRepId() {
        return eRepId;
    }

    public void seteRepId(String eRepId) {
        this.eRepId = eRepId;
    }

    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public Branch getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(Branch brchCode) {
        this.brchCode = brchCode;
    }

    public Branch getRegBrchCode() {
        return regBrchCode;
    }

    public void setRegBrchCode(Branch regBrchCode) {
        this.regBrchCode = regBrchCode;
    }

    public Branch getBrchReviewer() {
        return brchReviewer;
    }

    public void setBrchReviewer(Branch brchReviewer) {
        this.brchReviewer = brchReviewer;
    }

    public String geteBranchCode() {
        return eBranchCode;
    }

    public void seteBranchCode(String eBranchCode) {
        this.eBranchCode = eBranchCode;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Branch getRwshBranch() {
        return rwshBranch;
    }

    public void setRwshBranch(Branch rwshBranch) {
        this.rwshBranch = rwshBranch;
    }

    @Override
    public String toString() {
        return "OccurRep{" +
                "reqId=" + reqId +
                ", ssupOccurReview=" + ssupOccurReview +
                ", brchCode=" + brchCode +
                ", regBrchCode=" + regBrchCode +
                ", brchReviewer=" + brchReviewer +
                ", insuranceSpec=" + insuranceSpec +
                ", risuid='" + risuid + '\'' +
                ", workshop=" + workshop +
                ", rwshId='" + workshopId + '\'' +
                ", repNo='" + repNo + '\'' +
                ", eRepId='" + eRepId + '\'' +
                ", repdate='" + repdate + '\'' +
                ", ismarried='" + ismarried + '\'' +
                ", diploma='" + diploma + '\'' +
                ", employeedate='" + employeedate + '\'' +
                ", employeestat='" + employeestat + '\'' +
                ", workshopName='" + workshopName + '\'' +
                ", isuJobLocation='" + isuJobLocation + '\'' +
                ", dailyWage=" + dailyWage +
                ", vehicle='" + vehicle + '\'' +
                ", isuaddr='" + isuaddr + '\'' +
                ", isuworkShift='" + isuworkShift + '\'' +
                ", occurTime='" + occurTime + '\'' +
                ", occurDate='" + occurDate + '\'' +
                ", occurAddr='" + occurAddr + '\'' +
                ", occurCause='" + occurCause + '\'' +
                ", occurTools='" + occurTools + '\'' +
                ", occurEquip='" + occurEquip + '\'' +
                ", occurJobdesc='" + occurJobdesc + '\'' +
                ", occurPart='" + occurPart + '\'' +
                ", istrain='" + istrain + '\'' +
                ", occurResult='" + occurResult + '\'' +
                ", occurDesc='" + occurDesc + '\'' +
                ", rwaction='" + rwaction + '\'' +
                ", occurVisitors='" + occurVisitors + '\'' +
                ", isrecorded='" + isrecorded + '\'' +
                ", recordername='" + recordername + '\'' +
                ", createuid='" + createuid + '\'' +
                ", createdt='" + createdt + '\'' +
                ", edituid='" + edituid + '\'' +
                ", editdt='" + editdt + '\'' +
                ", rwworkstart='" + rwworkstart + '\'' +
                ", rwworkfinish='" + rwworkfinish + '\'' +
                ", isutel='" + isutel + '\'' +
                ", plname='" + plname + '\'' +
                ", pfname='" + pfname + '\'' +
                ", sexcode='" + sexcode + '\'' +
                ", pnationdesc='" + pnationdesc + '\'' +
                ", pidno='" + pidno + '\'' +
                ", pidserial='" + pidserial + '\'' +
                ", pbirthdate='" + pbirthdate + '\'' +
                ", pexpcityname='" + pexpcityname + '\'' +
                ", pnatcode='" + pnatcode + '\'' +
                ", inspbrhreqdate='" + inspbrhreqdate + '\'' +
                ", reviewreqno='" + reviewreqno + '\'' +
                ", reviewreqdate='" + reviewreqdate + '\'' +
                ", inspbrhreqno='" + inspbrhreqno + '\'' +
                ", inworkhappen='" + inworkhappen + '\'' +
                ", pfathername='" + pfathername + '\'' +
                ", pnationtype='" + pnationtype + '\'' +
                ", reportertype='" + reportertype + '\'' +
                ", reqOwner='" + reqOwner + '\'' +
                ", occurrepregdate='" + occurrepregdate + '\'' +
                ", occurrepregno='" + occurrepregno + '\'' +
                ", status='" + status + '\'' +
                ", repNoCount=" + repNoCount +
                ", actionType='" + actionType + '\'' +
                ", referDate='" + referDate + '\'' +
                ", eBranchCode='" + eBranchCode + '\'' +
                '}';
    }
}
