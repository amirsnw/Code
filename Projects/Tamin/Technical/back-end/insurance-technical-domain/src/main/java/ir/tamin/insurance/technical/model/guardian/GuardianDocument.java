package ir.tamin.insurance.technical.model.guardian;


import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "guar_documentfile")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.guardian.GuardianDocumentManager")
@NamedQueries({
        @NamedQuery(name = "GuardianDocument.findByReqSerial", query = "SELECT c FROM GuardianDocument c WHERE  c.reqSerial=:reqSerial")})
public class GuardianDocument extends AbstractEntity<String> {

    @Id
    @Column(name = "ID")
    String guid;

    @Column(name = "FILECONTENT")
    @Lob
    private byte[] blob;

    @Column(name="REQ_SERIAL")
    private String reqSerial;

    @Column(name = "CREATED_ON", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadDate;

    @Column(name = "CREATED_BY")
    private String userName;

    @Transient
    private String blobString;

    public String getBlobString() {
        return blobString;
    }

    public void setBlobString(String blobString) {
        this.blobString = blobString;
    }


    public String getReqSerial() {
        return reqSerial;
    }

    public void setReqSerial(String reqSerial) {
        this.reqSerial = reqSerial;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public byte[] getBlob() {
        return blob;
    }

    public void setBlob(byte[] blob) {
        this.blob = blob;
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

    @Override
    public String getIdentifierInstance() {
        return guid;
    }

}
