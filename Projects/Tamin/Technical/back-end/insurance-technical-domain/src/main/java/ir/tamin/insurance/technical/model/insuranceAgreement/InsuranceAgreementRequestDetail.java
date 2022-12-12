package ir.tamin.insurance.technical.model.insuranceAgreement;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import ir.tamin.framework.core.util.DateUtils;
import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "insured_requests_list_params", schema = "techins")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.insuranceAgreement.InsuranceAgreementRequestManager")
@ResourceIds({
    @ResourceId(fields = {"detailId"})})
//@NamedQueries({
//    @NamedQuery(name = "AgreeAcctivity.countAllowedWorkshop", query = "select count(w) from AgreeActivity a,Workshop w  where a.agreementCategoryId=:agreementCategoryId and w.workshopId=:workshopId")// and a.activityCode= w.actitvityCode
//})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "detailId")
public class InsuranceAgreementRequestDetail extends AbstractEntity<String> {

    //شناسه درخواست
    @Id
    @Column(name = "DETAILID", length = 20, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    private String detailId;

//    @JsonBackReference
//    @OneToOne
//    @JoinColumn(name = "REQUESTID", referencedColumnName = "REQUESTID")
//    private InsuranceAgreementRequest insuranceAgreementRequest;
    @ManyToOne
    @JoinColumn(name = "REQUESTID")
    private InsuranceAgreementRequest insuranceAgreementRequest;

    @Column(name = "DOC_NO1")
    private String documentNumber1;
  
    @Column(name = "DOC_DATE1")
    private String documentDate1;  

    @Column(name = "DOC_NO2")
    private String documentNumber2;
    
    @Column(name = "DOC_DATE2")
    private String documentDate2;   

    @Column(name = "DOC_NO3")
    private String documentNumber3;

    @Column(name = "DOC_NO4")
    private String documentNumber4;

    @Column(name = "DOC_NO5")
    private String documentNumber5;
    
    @Column(name = "DOC_NO6")
    private String documentNumber6;
    
    @Column(name = "DOC_NO7")
    private String documentNumber7;
    
    @Column(name = "DOC_NO8")
    private String documentNumber8;
   
    @Column(name = "DOC_DATE3")
    private String documentDate3;    

    @Column(name = "DOC_DATE4")
    private String documentDate4;
    
    @Column(name = "DOC_DATE5")
    private String documentDate5;
    
    @Column(name = "DOC_SDATE")
    private String documentStartDate;  
   
    @Column(name = "DOC_EDATE")
    private String documentEndDate;   

    @Column(name = "DOC_SDATE1")
    private String documentStartDate1;

    @Column(name = "DOC_EDATE1")
    private String documentEndDate1;
    
    @Column(name = "DOC_SDATE2")
    private String documentStartDate2;

    @Column(name = "DOC_EDATE2")
    private String documentEndDate2;

    @Column(name = "TYPE1")
    private String type1;

    @Column(name = "TYPE2")
    private String type2;

    @Column(name = "TYPE3")
    private String type3;

    @Column(name = "TYPE4")
    private String type4;

    @Column(name = "TYPE5")
    private String type5;
    
    @Column(name = "TYPE6")
    private String type6;
    
    @Column(name = "TYPE7")
    private String type7;
    
    @Column(name = "TYPE8")
    private String type8;

    @Column(name = "DESC1")
    private String description1;

    @Column(name = "DESC2")
    private String description2;

    @Column(name = "DESC3")
    private String description3;

    @Column(name = "DESC4")
    private String description4;    
   

    public String getDescription3() {
        return description3;
    }

    public void setDescription3(String description3) {
        this.description3 = description3;
    }

    public String getDescription4() {
        return description4;
    }

    public void setDescription4(String description4) {
        this.description4 = description4;
    }

    public String getDocumentNumber4() {
        return documentNumber4;
    }

    public void setDocumentNumber4(String documentNumber4) {
        this.documentNumber4 = documentNumber4;
    }

    public String getDocumentNumber5() {
        return documentNumber5;
    }

    public void setDocumentNumber5(String documentNumber5) {
        this.documentNumber5 = documentNumber5;
    } 
    
    public void setDocumentStartDate1(Date documentStartDate1) {
        if (documentStartDate1 != null) {
            this.documentStartDate1 = DateUtils.format(documentStartDate1, "yyyyMMdd");
        } else {
            this.documentStartDate1 = null;
        }
    }

    public Date getDocumentStartDate1() {
        if (this.documentStartDate1 != null) {
            return DateUtils.parse(this.documentStartDate1, "yyyyMMdd");
        } else {
            return null;
        }
    }
    public void setDocumentStartDate2(Date documentStartDate2) {
        if (documentStartDate2 != null) {
            this.documentStartDate2 = DateUtils.format(documentStartDate2, "yyyyMMdd");
        } else {
            this.documentStartDate2 = null;
        }
    }

    public Date getDocumentStartDate2() {
        if (this.documentStartDate2 != null) {
            return DateUtils.parse(this.documentStartDate2, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public InsuranceAgreementRequest getInsuranceAgreementRequest() {
        return insuranceAgreementRequest;
    }

    public void setInsuranceAgreementRequest(InsuranceAgreementRequest insuranceAgreementRequest) {
        this.insuranceAgreementRequest = insuranceAgreementRequest;
    }

    public String getDocumentNumber1() {
        return documentNumber1;
    }

    public void setDocumentNumber1(String documentNumber1) {
        this.documentNumber1 = documentNumber1;
    }

    public String getDocumentNumber2() {
        return documentNumber2;
    }

    public void setDocumentNumber2(String documentNumber2) {
        this.documentNumber2 = documentNumber2;
    }

    public String getDocumentNumber3() {
        return documentNumber3;
    }

    public void setDocumentNumber3(String documentNumber3) {
        this.documentNumber3 = documentNumber3;
    }

    public String getDocumentNumber6() {
        return documentNumber6;
    }

    public void setDocumentNumber6(String documentNumber6) {
        this.documentNumber6 = documentNumber6;
    }

    public String getDocumentNumber7() {
        return documentNumber7;
    }

    public void setDocumentNumber7(String documentNumber7) {
        this.documentNumber7 = documentNumber7;
    }

    public String getDocumentNumber8() {
        return documentNumber8;
    }

    public void setDocumentNumber8(String documentNumber8) {
        this.documentNumber8 = documentNumber8;
    }

    public void setDocumentDate1(Date documentDate1) {
        if (documentDate1 != null) {
            this.documentDate1 = DateUtils.format(documentDate1, "yyyyMMdd");
        } else {
            this.documentDate1 = null;
        }
    }
    public void setDocumentEndDate1(Date documentEndDate1) {
        if (documentEndDate1 != null) {
            this.documentEndDate1 = DateUtils.format(documentEndDate1, "yyyyMMdd");
        } else {
            this.documentEndDate1 = null;
        }
    }

    public Date getDocumentEndDate1() {
        if (this.documentEndDate1 != null) {
            return DateUtils.parse(this.documentEndDate1, "yyyyMMdd");
        } else {
            return null;
        }
    }
    public void setDocumentEndDate2(Date documentEndDate2) {
        if (documentEndDate2 != null) {
            this.documentEndDate2 = DateUtils.format(documentEndDate2, "yyyyMMdd");
        } else {
            this.documentEndDate2 = null;
        }
    }

    public Date getDocumentEndDate2() {
        if (this.documentEndDate2 != null) {
            return DateUtils.parse(this.documentEndDate2, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public String getType8() {
        return type8;
    }

    public void setType8(String type8) {
        this.type8 = type8;
    }

    public Date getDocumentDate1() {
        if (this.documentDate1 != null) {
            return DateUtils.parse(this.documentDate1, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setDocumentDate2(Date documentDate2) {
        if (documentDate2 != null) {
            this.documentDate2 = DateUtils.format(documentDate2, "yyyyMMdd");
        } else {
            this.documentDate2 = null;
        }
    }

    public Date getDocumentDate2() {
        if (this.documentDate2 != null) {
            return DateUtils.parse(this.documentDate2, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setDocumentDate3(Date documentDate3) {
        if (documentDate3 != null) {
            this.documentDate3 = DateUtils.format(documentDate3, "yyyyMMdd");
        } else {
            this.documentDate3 = null;
        }
    }

    public Date getDocumentDate3() {
        if (this.documentDate3 != null) {
            return DateUtils.parse(this.documentDate3, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setDocumentEndDate(Date documentEndDate) {
        if (documentEndDate != null) {
            this.documentEndDate = DateUtils.format(documentEndDate, "yyyyMMdd");
        } else {
            this.documentEndDate = null;
        }
    }

    public Date getDocumentEndDate() {
        if (this.documentEndDate != null) {
            return DateUtils.parse(this.documentEndDate, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public void setDocumentStartDate(Date documentStartDate) {
        if (documentStartDate != null) {
            this.documentStartDate = DateUtils.format(documentStartDate, "yyyyMMdd");
        } else {
            this.documentStartDate = null;
        }
    }

    public Date getDocumentStartDate() {
        if (this.documentStartDate != null) {
            return DateUtils.parse(this.documentStartDate, "yyyyMMdd");
        } else {
            return null;
        }
    }
    
    public void setDocumentDate4(Date documentDate4) {
        if (documentDate4 != null) {
            this.documentDate4 = DateUtils.format(documentDate4, "yyyyMMdd");
        } else {
            this.documentDate4 = null;
        }
    }

    public Date getDocumentDate4() {
        if (this.documentDate4 != null) {
            return DateUtils.parse(this.documentDate4, "yyyyMMdd");
        } else {
            return null;
        }
    }
    public void setDocumentDate5(Date documentDate5) {
        if (documentDate5 != null) {
            this.documentDate5 = DateUtils.format(documentDate5, "yyyyMMdd");
        } else {
            this.documentDate5 = null;
        }
    }

    public Date getDocumentDate5() {
        if (this.documentDate5 != null) {
            return DateUtils.parse(this.documentDate5, "yyyyMMdd");
        } else {
            return null;
        }
    }

    public String getType1() {
         if (this.type1 == null) {
            return "0";
        } else {
             return type1;
        }
    }

    public void setType1(String type1) {
        this.type1 = type1;
    }

    public String getType2() {
        if (this.type2 == null) {
            return "1";
        } else {
            return type2;
        }
    }

    public void setType2(String type2) {
        this.type2 = type2;
    }

    public String getDescription1() {
        return description1;
    }

    public void setDescription1(String description1) {
        this.description1 = description1;
    }

    public String getDescription2() {
        return description2;
    }

    public void setDescription2(String description2) {
        this.description2 = description2;
    }

    public String getDetailId() {
        return detailId;
    }

    public void setDetailId(String detailId) {
        this.detailId = detailId;
    }

    public String getType3() {
        return type3;
    }

    public void setType3(String type3) {
        this.type3 = type3;
    }

    public String getType4() {
        return type4;
    }

    public void setType4(String type4) {
        this.type4 = type4;
    }

    public String getType5() {
        return type5;
    }

    public void setType5(String type5) {
        this.type5 = type5;
    }

    public String getType6() {
        return type6;
    }

    public void setType6(String type6) {
        this.type6 = type6;
    }

    public String getType7() {
        return type7;
    }

    public void setType7(String type7) {
        this.type7 = type7;
    }    

    @Override
    public String getIdentifierInstance() {
        return detailId;
    }

}
