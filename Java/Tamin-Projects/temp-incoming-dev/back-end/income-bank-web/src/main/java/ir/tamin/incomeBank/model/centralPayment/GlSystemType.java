/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_SYSTEM_TYPE")
public class GlSystemType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @Column(name = "SYSTEM_TYPE_ID")
    private Integer systemId;
    @Size(max = 100)
    @Column(name = "TITLE")
    private String title;
    @Size(max = 100)
    @Column(name = "LATINTITLE")
    private String latintitle;
    @Size(max = 500)
    @Column(name = "DESCRIPTION")
    private String description;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "systemtypeid")
//    private Collection<GlVouchertype> glVouchertypeCollection;

    @Transient
    private String systemIdTitle;

    public GlSystemType() {
    }

    public GlSystemType(Integer systemId) {
        this.systemId = systemId;
    }

    public Integer getSystemId() {
        return systemId;
    }

    public void setSystemId(Integer systemId) {
        this.systemId = systemId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLatintitle() {
        return latintitle;
    }

    public void setLatintitle(String latintitle) {
        this.latintitle = latintitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSystemIdTitle() {
        return systemId + " " + title;
    }

    public void setSystemIdTitle(String systemIdTitle) {
        this.systemIdTitle = systemIdTitle;
    }


}
