package ir.tamin.insurance.technical.model.insuranceAgreement;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;

@Entity
@Table(name = "SSUP_AGREEMENT_CATEGORY", schema = "BASEINFO")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.insuranceAgreement.AgreementCategoryTypeManager")
@ResourceIds({
    @ResourceId(fields = {"agreementCategoryId"})})
@NamedQueries({
    @NamedQuery(name = "AgreementCategoryType.getByCatId", query = "select c.agreementCategoryId from AgreementCategoryType c where c.agreementCategoryId=:agreementCategoryId")
})
public class AgreementCategoryType extends AbstractEntity<String> {

    @Id
    @Column(name = "SSUP_AGREEMENT_CATEID", nullable = false)
    private String agreementCategoryId;

    @Column(name = "SSUP_AGREEMENT_CATE_DESC", nullable = false)
    private String agreementCategoryDesc;

    @Column(name = "AGE_MIN", nullable = false)
    private String ageMin;

    @Column(name = "AGE_MAX", nullable = false)
    private String ageMaX;

    @Column(name = "WAGE_MIN", nullable = false)
    private String wageMin;

    @Column(name = "WAGE_MAX", nullable = false)
    private String wageMaX;

    @Column(name = "HIST_MIN", nullable = false)
    private String histMin;

    @Column(name = "HIST_MAX", nullable = false)
    private String histMaX;

    @Column(name = "Rate", nullable = false)
    private String rate;

    @Column(name = "HISTORYTYPECODE", nullable = false)
    private String historyTypeCode;

    @Column(name = "CREATEUID", nullable = false)
    private String createUserId;

    @Column(name = "PAYMENT_METHOD", nullable = false)
    private String paymentMethod;

    @Column(name = "CREATEDT", nullable = false)
    private String createDate;

    @Column(name = "EDITUID", nullable = false)
    private String editUserId;

    @Column(name = "EDITDT", nullable = false)
    private String editDate;

    @Column(name = "CONFIRMUID", nullable = false)
    private String confirmUserId;

    @Column(name = "CONFIRMDT", nullable = false)
    private String confirmDate;

    @Column(name = "SECTION_DESC", nullable = false)
    private String sectionDesc;

    @Column(name = "HIST_AGE_FLAG", nullable = false)
    private String historyageFlag;

    @Column(name = "FORM2_TITLE", nullable = false)
    private String form2Title;

    @Column(name = "DEBITTYPECODE", nullable = false)
    private String debitTypeCode;

    @Transient
    private String code;

    @Transient
    private String desc;

    //@JsonIgnore
    @Transient
    private String activityCode;

    public String getActivityCode() {
        return activityCode;
    }

    public void setActivityCode(String activityCode) {
        this.activityCode = activityCode;
    }
    
    public String getDebitTypeCode() {
        return debitTypeCode;
    }

    public void setDebitTypeCode(String debitTypeCode) {
        this.debitTypeCode = debitTypeCode;
    }

    public String getCode() {
        return agreementCategoryId;
    }

    public void setCode(String code) {
        this.code = agreementCategoryId;
    }

    public String getDesc() {
        return agreementCategoryDesc;
    }

    public void setDesc(String desc) {
        this.desc = agreementCategoryDesc;
    }

    public String getAgreementCategoryId() {
        return agreementCategoryId;
    }

    public void setAgreementCategoryId(String agreementCategoryId) {
        this.agreementCategoryId = agreementCategoryId;
    }

    public String getAgreementCategoryDesc() {
        return agreementCategoryDesc;
    }

    public void setAgreementCategoryDesc(String agreementCategoryDesc) {
        this.agreementCategoryDesc = agreementCategoryDesc;
    }

    public String getAgeMin() {
        return ageMin;
    }

    public void setAgeMin(String ageMin) {
        this.ageMin = ageMin;
    }

    public String getAgeMaX() {
        return ageMaX;
    }

    public void setAgeMaX(String ageMaX) {
        this.ageMaX = ageMaX;
    }

    public String getWageMin() {
        return wageMin;
    }

    public void setWageMin(String wageMin) {
        this.wageMin = wageMin;
    }

    public String getWageMaX() {
        return wageMaX;
    }

    public void setWageMaX(String wageMaX) {
        this.wageMaX = wageMaX;
    }

    public String getHistMin() {
        return histMin;
    }

    public void setHistMin(String histMin) {
        this.histMin = histMin;
    }

    public String getHistMaX() {
        return histMaX;
    }

    public void setHistMaX(String histMaX) {
        this.histMaX = histMaX;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public String getHistoryTypeCode() {
        return historyTypeCode;
    }

    public void setHistoryTypeCode(String historyTypeCode) {
        this.historyTypeCode = historyTypeCode;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getEditUserId() {
        return editUserId;
    }

    public void setEditUserId(String editUserId) {
        this.editUserId = editUserId;
    }

    public String getEditDate() {
        return editDate;
    }

    public void setEditDate(String editDate) {
        this.editDate = editDate;
    }

    public String getConfirmUserId() {
        return confirmUserId;
    }

    public void setConfirmUserId(String confirmUserId) {
        this.confirmUserId = confirmUserId;
    }

    public String getConfirmDate() {
        return confirmDate;
    }

    public void setConfirmDate(String confirmDate) {
        this.confirmDate = confirmDate;
    }

    public String getSectionDesc() {
        return sectionDesc;
    }

    public void setSectionDesc(String sectionDesc) {
        this.sectionDesc = sectionDesc;
    }

    public String getHistoryageFlag() {
        return historyageFlag;
    }

    public void setHistoryageFlag(String historyageFlag) {
        this.historyageFlag = historyageFlag;
    }

    public String getForm2Title() {
        return form2Title;
    }

    public void setForm2Title(String form2Title) {
        this.form2Title = form2Title;
    }

    @Override
    public String getIdentifierInstance() {
        return this.agreementCategoryId;
    }

}
