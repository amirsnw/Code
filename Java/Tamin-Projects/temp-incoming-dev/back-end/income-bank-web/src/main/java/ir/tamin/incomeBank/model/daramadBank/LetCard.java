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
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import lombok.Data;

/**
 *
 * @author m_salami
 */
@Entity
@Table(name = "LET_CARD")
@XmlRootElement
@Data
@NamedQueries({
    @NamedQuery(name = "LetCard.findAll", query = "SELECT l FROM LetCard l"),
    @NamedQuery(name = "LetCard.findByCardRow", query = "SELECT l FROM LetCard l WHERE l.letCardPK.cardRow = :cardRow"),
    @NamedQuery(name = "LetCard.findByLetterSerial", query = "SELECT l FROM LetCard l WHERE l.letCardPK.letterSerial = :letterSerial"),
    @NamedQuery(name = "LetCard.findByOrdOrdno", query = "SELECT l FROM LetCard l WHERE l.ordOrdno = :ordOrdno"),
    @NamedQuery(name = "LetCard.findByOrpOrdrow", query = "SELECT l FROM LetCard l WHERE l.orpOrdrow = :orpOrdrow"),
    @NamedQuery(name = "LetCard.findByBrchCode", query = "SELECT l FROM LetCard l WHERE l.brchCode = :brchCode")})
public class LetCard implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected LetCardPK letCardPK;
    @Size(max = 13)
    @Column(name = "ORD_ORDNO")
    private String ordOrdno;
    @Size(max = 2)
    @Column(name = "ORP_ORDROW")
    private String orpOrdrow;
    @Size(max = 4)
    @Column(name = "BRCH_CODE")
    private String brchCode;
    @OneToOne
    @JoinColumns({
        @JoinColumn(name = "CARD_ROW", referencedColumnName = "CARD_ROW", insertable = false, updatable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)
    })
    private DrmdCard drmdCard;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public LetCardPK getLetCardPK() {
        return letCardPK;
    }

    public String getOrdOrdno() {
        return ordOrdno;
    }

    public String getOrpOrdrow() {
        return orpOrdrow;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public DrmdCard getDrmdCard() {
        return drmdCard;
    }
}
