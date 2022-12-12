package ir.tamin.insurance.technical.model.occur;

/**
 * Created by a-khalighi on 5/17/2022
*/

import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "SSUP_OCCUR_IDEA")

@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.occur.OccurIdeaManager")
@ResourceIds({
        @ResourceId(fields = {"reqId" ,"ideaSeq"})})
public class SsupOccurIdea extends AbstractEntity<SsupOccurIdeaPK> {

    @Id
    @Column(name = "REQ_ID", nullable = false)
    private Long reqId;

    @Id
    @Column(name = "IDEA_SEQ", nullable = false)
    private String ideaSeq;

    @Column(name = "OCCUR_SERIAL")
    private String occurSerial;

    @Column(name = "REPNO", nullable = false)
    private String repno;

    @Column(name = "OCCUR_RESULT")
    private String occurResult;

    @Column(name = "BOSS_INWORK")
    private String bossInwork;

    @Column(name = "BOSS_NOWORK")
    private String bossNowork;

    @Column(name = "BOSS_REMARK")
    private String bossRemark;

    @Column(name = "TECHINSPDATE")
    private String techinspdate;

    @Column(name = " FULLTECHINSPREPORT")
    private String fulltechinspreport;

    @Column(name = "TECHINSPINWORK")
    private String techinspinwork;

    @Column(name = "BOSS_STATUS")
    private String bossStatus;

    @Column(name = "OCCURREPREGNO")
    private String occurrepregno;

    @Column(name = "OCCURREPREGDATE")
    private String occurrepregdate;

    @Column(name = "CREATEUID")
    private String createuid;

    @Column(name = "CREATEDT")
    private String createdt;

    @Column(name = "EDITUID")
    private String edituid;

    @Column(name = "EDITDT")
    private String editdt;

    @Column(name = "TECHCONF_UID")
    private String techConfUid;

    @Column(name = "TECHCONF_DT")
    private String techConfDt;

    @Column(name = "CONF_INSPUID")
    private String confInspuid;

    @Column(name = "CONF_INSPDT")
    private String confInspdt;

    @Column(name = "BRCH_CODE", nullable = false)
    private String brchCode;

    @Transient
    private int reqType;

    public int getReqType() {
        return reqType;
    }

    public void setReqType(int reqType) {
        this.reqType = reqType;
    }

    public Long getReqId() {
        return reqId;
    }

    public void setReqId(Long reqId) {
        this.reqId = reqId;
    }

    public String getIdeaSeq() {
        return ideaSeq;
    }

    public void setIdeaSeq(String ideaSeq) {
        this.ideaSeq = ideaSeq;
    }

    public String getOccurSerial() {
        return occurSerial;
    }

    public void setOccurSerial(String occurSerial) {
        this.occurSerial = occurSerial;
    }

    public String getRepno() {
        return repno;
    }

    public void setRepno(String repno) {
        this.repno = repno;
    }

    public String getOccurResult() {
        return occurResult;
    }

    public void setOccurResult(String occurResult) {
        this.occurResult = occurResult;
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

    public Date getTechinspdate() {

        if (techinspdate != null) {
                      return DateUtils.parse(techinspdate, "yyyyMMdd");
                  }
                  return null;
    }

    public void setTechinspdate(Date techinspdate) {
        if (techinspdate != null)
                      this.techinspdate = DateUtils.format(techinspdate, "yyyyMMdd");

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

    public String getBossStatus() {
        return bossStatus;
    }

    public void setBossStatus(String bossStatus) {
        this.bossStatus = bossStatus;
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

    public String getTechConfUid() {
        return techConfUid;
    }

    public void setTechConfUid(String techConfUid) {
        this.techConfUid = techConfUid;
    }

    public Date getTechConfDt() {
        return techConfDt != null ? DateUtils.parse(DateUtils.decodeDateString(techConfDt), "yyyyMMdd") : null;
    }

    public void setTechConfDt(Date techConfDt) {
        if (techConfDt != null) {
            this.techConfDt = DateUtils.encodeDateString(DateUtils.format(techConfDt, "yyyyMMdd"));
        }
    }

    public String getConfInspuid() {
        return confInspuid;
    }

    public void setConfInspuid(String confInspuid) {
        this.confInspuid = confInspuid;
    }

    public Date getConfInspdt() {
        return confInspdt != null ? DateUtils.parse(DateUtils.decodeDateString(confInspdt), "yyyyMMdd") : null;
    }

    public void setConfInspdt(Date confInspdt) {
        if (confInspdt != null) {
            this.confInspdt = DateUtils.encodeDateString(DateUtils.format(confInspdt, "yyyyMMdd"));
        }
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    @Override
    public SsupOccurIdeaPK getIdentifierInstance() {
        return new SsupOccurIdeaPK(this.reqId, this.ideaSeq);
    }
}
