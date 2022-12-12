package ir.tamin.insurance.technical.model.occur;

import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "OCCUR_SIGNATUREFILE")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.occur.OccurSignatureManager")
@NamedQueries({
        @NamedQuery(name = "OccurSignature.getSignatureByBranchCode", query = "SELECT i FROM OccurSignature i"
                + " WHERE  i.branchCode=:branchCode and  i.roleType=:roleType")
})
@ResourceIds({@ResourceId(fields = {"guid"})})
public class OccurSignature extends AbstractEntity<String> {

    @Id
    @Column(name = "ID")
    String guid;

    @Column(name = "DOC_IMAGE" , columnDefinition = "BLOB")
    @Lob
    private byte[] image;

    @Column(name = "NATIONALID")
    private String nationalId;

    @Column(name = "BRANCHCODE")
    private String branchCode;

    @Column(name = "ROLETYPE")
    private String roleType;

    @Column(name = "CREATION_TIME", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadDate;

    @Column(name = "CREATED_BY")
    private String userName;

    @Column(name = "STATUS")
    private String status;

    @Transient
    private String imageString;

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageString() {
        return imageString;
    }

    public void setImageString(String imageString) {
        this.imageString = imageString;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String getIdentifierInstance() {
        return guid;
    }

}
