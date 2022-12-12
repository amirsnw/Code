/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.insurance;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;
import ir.tamin.insurance.technical.model.baseinfo.InsuranceStatus;
import ir.tamin.insurance.technical.model.primaryKeyClass.RegInsuranceSpecPK;
import ir.tamin.insurance.technical.model.primaryKeyClass.RegistrationInsuranceStatusPK;

import javax.persistence.*;

/**
 *
 * @author s_naghavi
 */
@Entity
@Table(name = "Regiisustatus")
@RESTResource
@IdClass(RegistrationInsuranceStatusPK.class)
@ResourceIds({
    @ResourceId(fields = {"insuranceStatus.insuranceStatCode","insuranceRegisteration.id", "insuranceRegisteration.brchCode","rIsuStatOpDate","rIsuStatStartDate"})})

//@NamedQueries({
//    @NamedQuery(name = "AgreementRequestCreateOrEdit.IsuStatusDesc",
//            query = "SELECT s.rIsuRecType,s.insuranceStatus.insuranceStatCode,(SELECT Tisu.insuranceStatDesc FROM InsuranceStatus Tisu Where  Tisu.insuranceStatCode = s.insuranceStatus.insuranceStatCode) Isustatdesc FROM RegistrationInsuranceStatus s  WHERE  s.insuranceRegisteration.id =:risuid AND  s.insuranceStatus.insuranceStatCode NOT IN ('07', '20')  AND s.rIsuStatStartDate <=:introducedDate "),
//    @NamedQuery(name ="AgreementRequestIsuSatus.MaxRisuSatusSatartDate",
//            query="SELECT MAX(REG.rIsuStatStartDate) from RegistrationInsuranceStatus reg WHERE REG.insuranceRegisteration.id=:risuid and REG.insuranceStatus.insuranceStatCode NOT IN('07','20') AND REG.rIsuStatStartDate<=:introducedDate")
//})
public class RegistrationInsuranceStatus extends AbstractEntity<RegistrationInsuranceStatusPK> {

    @Id
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "RISUID", referencedColumnName = "RISUID", nullable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", nullable = false, insertable = false, updatable = false),})
    private InsuranceRegisteration insuranceRegisteration;

    @Id
    @ManyToOne
    @JoinColumn(name = "ISUSTATCODE", referencedColumnName = "ISUSTATCODE")
    private InsuranceStatus insuranceStatus;
    
    @Id
    @Column(name = "RISUSTATOPDATE")
    private String rIsuStatOpDate;
    
    @Id
    @Column(name = "RISUSTATSDATE")
    private String rIsuStatStartDate;

    @Column(name = "RISURECTYPE", length = 1)
    private String rIsuRecType;

    @Column(name = "RISUSTATEDATE")
    private String rIsuStatEndDate;
  
    @Column(name = "BRCH_CODE", length = 4)
    private String brchCode;

    public String getBrchCode() {
        return brchCode;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public InsuranceRegisteration getInsuranceRegisteration() {
        return insuranceRegisteration;
    }

    public void setInsuranceRegisteration(InsuranceRegisteration insuranceRegisteration) {
        this.insuranceRegisteration = insuranceRegisteration;
    }

    public InsuranceStatus getInsuranceStatus() {
        return insuranceStatus;
    }

    public void setInsuranceStatus(InsuranceStatus insuranceStatus) {
        this.insuranceStatus = insuranceStatus;
    }

    public String getrIsuRecType() {
        return rIsuRecType;
    }

    public void setrIsuRecType(String rIsuRecType) {
        this.rIsuRecType = rIsuRecType;
    }

    public String getrIsuStatOpDate() {
        return rIsuStatOpDate;
    }

    public void setrIsuStatOpDate(String rIsuStatOpDate) {
        this.rIsuStatOpDate = rIsuStatOpDate;
    }

    public String getrIsuStatStartDate() {
        return rIsuStatStartDate;
    }

    public void setrIsuStatStartDate(String rIsuStatStartDate) {
        this.rIsuStatStartDate = rIsuStatStartDate;
    }

    public String getrIsuStatEndDate() {
        return rIsuStatEndDate;
    }

    public void setrIsuStatEndDate(String rIsuStatEndDate) {
        this.rIsuStatEndDate = rIsuStatEndDate;
    }

    @Override
    public RegistrationInsuranceStatusPK getIdentifierInstance() {
        return new RegistrationInsuranceStatusPK(this.insuranceStatus.getInsuranceStatCode(),new RegInsuranceSpecPK(insuranceRegisteration.getId(), insuranceRegisteration.getBrchCode()),rIsuStatOpDate,rIsuStatStartDate);
       
    }




}
