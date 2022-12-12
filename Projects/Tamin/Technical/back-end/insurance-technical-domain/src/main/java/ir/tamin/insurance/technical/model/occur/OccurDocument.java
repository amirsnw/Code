package ir.tamin.insurance.technical.model.occur;


import ir.tamin.framework.domain.AbstractEntity;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceId;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceIds;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "OCCUR_DOCUMENTFILE")
@RESTResource(lookupProxy = "ir.tamin.insurance.technical.business.occur.OccurDocumentManager")
@ResourceIds({@ResourceId(fields = {"guid"})})
public class OccurDocument extends AbstractEntity<String> {

    @Id
    @Column(name = "ID")
    String guid;

    @Column(name = "DOC_IMAGE")
    @Lob
    private byte[] image;

    @Column(name = "REQ_ID")
    private String reqId;

    @Column(name = "CREATION_TIME", length = 6)
    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadDate;

    @Column(name = "CREATED_BY")
    private String userName;

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

    public String getReqId() {
        return reqId;
    }

    public void setReqId(String reqId) {
        this.reqId = reqId;
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

    @Override
    public String getIdentifierInstance() {
        return guid;
    }

}
