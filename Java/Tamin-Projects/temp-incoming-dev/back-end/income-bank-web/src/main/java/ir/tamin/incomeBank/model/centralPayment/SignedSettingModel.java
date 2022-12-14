/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_TB_SETTING")
public class SignedSettingModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "TBS_ID")
    private Long settingId;
    @NotNull
    @Column(name = "TBS_DESC")
    private String tbsDesc;
    @NotNull
    @Column(name = "EP_MAX_VAL")
    private Long epMaxVal;
    @NotNull
    @Column(name = "CREATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @NotNull
    @Column(name = "CREATE_USER")
    private String createUser;
    @NotNull
    @Column(name = "UPDATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
    @NotNull
    @Column(name = "UPDATE_USER")
    private String updateUser;
//    @JoinColumn(name = "SYSTEM_TYPE_ID", referencedColumnName = "SYSTEM_TYPE_ID")
//    @ManyToOne(optional = false)
//    private GlSystemType system;
    @Transient
    private Integer systemId;

    public SignedSettingModel(Setting setting) {
        
        this.settingId = setting.getSettingId();
        this.tbsDesc = setting.getTbsDesc();
        this.epMaxVal = setting.getEpMaxVal();
        this.createDate = setting.getCreateDate();
        this.createUser = setting.getCreateUser();
        this.updateDate = setting.getUpdateDate();
        this.updateUser = setting.getUpdateUser();
        this.systemId = setting.getSystem().getSystemId();
    }

    public SignedSettingModel() {
    }

    public Long getSettingId() {
        return settingId;
    }

    public void setSettingId(Long settingId) {
        this.settingId = settingId;
    }

    public String getTbsDesc() {
        return tbsDesc;
    }

    public void setTbsDesc(String tbsDesc) {
        this.tbsDesc = tbsDesc;
    }

    public Long getEpMaxVal() {
        return epMaxVal;
    }

    public void setEpMaxVal(Long epMaxVal) {
        this.epMaxVal = epMaxVal;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public Integer getSystemId() {
        return systemId;
    }

    public void setSystemId(Integer systemId) {
        this.systemId = systemId;
    }

}
