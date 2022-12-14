/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "BAJ_ORDPUSED")
@XmlRootElement
public class BajOrdpused implements Serializable {
    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    
    @EmbeddedId
    private BajOrdpusedPK bajOrdpusedPK;
    
    
    @Column(name = "OPU_AMOUNT")
    private Long opuAmount;
    @Column(name = "OPU_UCODE")
    private Character opuUcode;
    @Column(name = "OPU_UTYPE")
    private Character opuUtype;

    public BajOrdpused() {
    }

    public BajOrdpused(BajOrdpusedPK bajOrdpusedPK) {
        this.bajOrdpusedPK = bajOrdpusedPK;
    }

    public Long getOpuAmount() {
        return opuAmount;
    }

    public void setOpuAmount(Long opuAmount) {
        this.opuAmount = opuAmount;
    }

    public Character getOpuUcode() {
        return opuUcode;
    }

    public void setOpuUcode(Character opuUcode) {
        this.opuUcode = opuUcode;
    }

    public Character getOpuUtype() {
        return opuUtype;
    }

    public void setOpuUtype(Character opuUtype) {
        this.opuUtype = opuUtype;
    }

    public BajOrdpusedPK getBajOrdpusedPK() {
        return bajOrdpusedPK;
    }

    public void setBajOrdpusedPK(BajOrdpusedPK bajOrdpusedPK) {
        this.bajOrdpusedPK = bajOrdpusedPK;
    }

    
}
