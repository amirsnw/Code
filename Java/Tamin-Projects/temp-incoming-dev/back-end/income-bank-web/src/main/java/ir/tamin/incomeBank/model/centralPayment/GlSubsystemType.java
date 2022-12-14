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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_SUBSYSTEM_TYPE")
public class GlSubsystemType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @Column(name = "SUB_SYSTEM_ID")
    private Integer subSystemId;
    @Column(name = "CODE")
    private String code;
    @Size(max = 100)
    @Column(name = "TITLE")
    private String title;
    @Size(max = 100)
    @Column(name = "LATINTITLE")
    private String latintitle;
    @Column(name = "PRIORITY")
    private Integer priority;
    @Size(max = 500)
    @Column(name = "DESCRIPTION")
    private String description;

    @JoinColumn(name = "SYSTEM_TYPE_ID", referencedColumnName = "SYSTEM_TYPE_ID")
    @ManyToOne(optional = false)
    private GlSystemType system;

    @Transient
    String codeTitle;

    public GlSubsystemType() {
    }

    public GlSubsystemType(Integer subSystemId) {
        this.subSystemId = subSystemId;
    }

    public Integer getSubSystemId() {
        return subSystemId;
    }

    public void setSubSystemId(Integer subSystemId) {
        this.subSystemId = subSystemId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public GlSystemType getSystem() {
        return system;
    }

    public void setSystem(GlSystemType system) {
        this.system = system;
    }

    public String getCodeTitle() {
        return code + " " + title;
    }

    public void setCodeTitle(String codeTitle) {
        this.codeTitle = codeTitle;
    }

}
