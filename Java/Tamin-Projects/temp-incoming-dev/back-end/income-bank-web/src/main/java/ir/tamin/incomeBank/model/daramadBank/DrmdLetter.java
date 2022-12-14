/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.baseinfo.Contract;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import org.eclipse.persistence.annotations.Customizer;

/**
 *
 * @author m_salami
 */
//@NamedNativeQuery( name = "customJoin", 
//                   query = "SELECT Vch_LsZiflg AS myFlag FROM Drmd_Lsanad d, DRMD_LETTER where d.Vch_Lsmdate=substr(Drmd_Letter.Letter_Date,1,6)",
//                   resultSetMapping = "customJoinMapping" )
//
//@SqlResultSetMapping( name = "customJoinMapping",
//                      entities = @EntityResult( entityClass = DrmdLetter.class, fields = @FieldResult( name = "lsZiFlag", column = "myFlag" ) ) )
@Entity
//@Access( AccessType.FIELD )
@Table(name = "DRMD_LETTER")
@Customizer(DrmdLetterCustomizer.class)
@XmlRootElement
//@Customizer(LetterOrderPayDC.class)
@NamedQueries({ //    @NamedQuery(name = "getIncomeLettersToexport",query = "select t from DrmdLetter t where t.letterFlag = '2' and t.letterDel is not null")
})
@Data
public class DrmdLetter implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 13)
    @Column(name = "LETTER_SERIAL")
    private String letterSerial;

    @OneToOne
    @JoinColumns({
        @JoinColumn(name = "LETTER_SERIAL", referencedColumnName = "LETTER_SERIAL", insertable = false, updatable = false),
        @JoinColumn(name = "brch_code", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)})

    private DrmdLetterOK drmdLetterOK;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "bes_cntno", referencedColumnName = "contractcode", insertable = false, updatable = false),
        @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)
    })

    private Contract contract;

//    @Column(name = "(select ORD_ORDNO || ORP_ORDROW from LET_ORDPAY l where l.LETTER_SERIAL=DRMD_LETTER.LETTER_SERIAL and l.BRCH_CODE=DRMD_LETTER.BRCH_CODE)", insertable = false, updatable = false)
//    private String letterOrderNumber;
//    @Column(name = "(select Vch_LsZiflg from Drmd_Lsanad d where d.Vch_Lsmdate=substr(Drmd_Letter.Letter_Date,1,6)) as myFlag", insertable = false, updatable = false)
//    private String lsZiFlag;
//     @JoinFormula(value = "substr(Letter_Date,1,6)", referencedColumnName = "VCH_LSMDATE")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
//        @JoinColumn(name = "LETTER_DATE", referencedColumnName = "VCH_LSMDATE", insertable = false, updatable = false),
        @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)
    })
    private DrmdLSanad sanad;

    @Transient
    private String lsZiFlag;
    public String getLsZiFlag(){
        String ziFlag = this.getSanad()!= null ? this.getSanad().getLsZiFlag() : null;
        return "1".equals(ziFlag) ? "*" : "";
    }
    
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "LETTER_SERIAL", referencedColumnName = "LETTER_SERIAL", insertable = false, updatable = false),
        @JoinColumn(name = "brch_code", referencedColumnName = "BRCH_CODE", insertable = false, updatable = false)})
    private LetCard letCard;

//    @ManyToMany
//    @JoinTable(
//            name = "LET_CARD",
//            joinColumns = {
//                @JoinColumn(name = "letter_serial", referencedColumnName = "letter_serial", insertable = false, updatable = false),
//                @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)},
//            inverseJoinColumns
//            = {
//                @JoinColumn(name = "CARD_ROW", referencedColumnName = "CARD_ROW", insertable = false, updatable = false),
//                @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)}
//    )
//    private List<DrmdCard> drmdCards;
    @ManyToMany
    @JoinTable(
            name = "LET_ORDPAY",
            joinColumns = {
                @JoinColumn(name = "letter_serial", referencedColumnName = "letter_serial", insertable = false, updatable = false),
                @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)},
            inverseJoinColumns
            = {
                @JoinColumn(name = "ord_ordno", referencedColumnName = "ord_ordno", insertable = false, updatable = false),
                @JoinColumn(name = "orp_ordrow", referencedColumnName = "orp_ordrow", insertable = false, updatable = false),
                @JoinColumn(name = "brch_code", referencedColumnName = "brch_code", insertable = false, updatable = false)}
    )
    private List<ClmOrdpay> orderPays;

//    @Basic(optional = false)
//    @NotNull
//    @Size(min = 1, max = 4)
    @ManyToOne
    @JoinColumn(name = "BRHCODE", referencedColumnName = "BRHCODE")
    private Branch brhcode;
    @Size(max = 10)
    @Column(name = "LETTER_NO")
    private String letterNo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "LETTER_DATE")
    private String letterDate;
    @Size(max = 100)
    @Column(name = "LETTER_NAM")
    private String letterNam;
    @Size(max = 12)
    @Column(name = "LETTER_LNO")
    private String letterLno;
    @Size(max = 8)
    @Column(name = "LETTER_LDATE")
    private String letterLdate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "LETTER_TYPE")
    private Character letterType;
    @Transient
    private String letterTypeDesc;
    @Column(name = "LETTER_PRICE1")
    private Long letterPrice1;
    @Size(max = 4)
    @Column(name = "LETTER_CODE1")
    private String letterCode1;
    @Column(name = "LETTER_PRICE2")
    private Long letterPrice2;
    @Transient
    private Long price;
    @Size(max = 4)
    @Column(name = "LETTER_CODE2")
    private String letterCode2;
    @Size(max = 8)
    @Column(name = "LETTER_OBJDATE")
    private String letterObjdate;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "LETTER_RABET")
    private String letterRabet;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "LETTER_SANADFLAG")
    private String letterSanadflag;
    @Size(max = 20)
    @Column(name = "CREATEUID")
    private String createuid;
    @Size(max = 7)
    @Column(name = "CREATEDT")
    private String createdt;
    @Column(name = "LETTER_PRINT")
    private Character letterPrint;
    @Basic(optional = false)
    @NotNull
    @Column(name = "LETTER_FLAG")
    private Character letterFlag;
    @Column(name = "LETTER_SODOR")
    private Character letterSodor;
    @Size(max = 1)
    @Column(name = "LETTER_DEL")
    private String letterDel;
    @Size(max = 6)
    @Column(name = "BES_FUNCTIONDATE")
    private String besFunctiondate;
    @Size(max = 12)
    @Column(name = "BES_CNTNO")
    private String besCntno;
    @Size(max = 8)
    @Column(name = "BES_CNTDATE")
    private String besCntdate;
    @Size(max = 10)
    @Column(name = "RWSHID")
    private String rwshid;
    @Size(max = 100)
    @Column(name = "RWSHNAME")
    private String rwshname;
    @Size(max = 1)
    @Column(name = "BES_EMPZFLAG")
    private String besEmpzflag;
    @Size(max = 1)
    @Column(name = "LETTER_BRHSENDF")
    private String letterBrhsendf;
    @Size(max = 15)
    @Column(name = "IDNO")
    private String idno;
    @Size(max = 2)
    @Column(name = "CODEDIGIT")
    private String codedigit;
//    @Basic(optional = false)
//    @NotNull
//    @Size(min = 1, max = 4)
    @JoinColumn(name = "BRCH_CODE", referencedColumnName = "BRHCODE")
//    @Column(name = "BRCH_CODE")
    @ManyToOne
    private Branch branch;
    @Transient
    private String shenase;

    public String getShenase() {
//        Long letterNumber = new Long(letterNo).longValue();
//        return letterNumber.equals(0l) ? branch.getBrhCode() : branch.getBrhCode() + "" + letterNumber;
        String letterNumber = this.letterNo != null ? letterNo : "";
        return branch != null ? branch.getBrhCode() + letterNumber : null;
    }

    public Long getPrice() {
        Long price1 = letterPrice1 != null ? letterPrice1 : 0l;
        Long price2 = letterPrice2 != null ? letterPrice2 : 0l;
        return price1 + price2;
    }

    public String getLetterTypeDesc() {
        if ("1".equals(this.getLetterType().toString())) {
            return "بدهکار";
        } else if ("2".equals(this.getLetterType().toString())) {
            return "بستانکار";
        }
        return "";
    }

    public Character getLetterType() {
        return letterType;
    }

    public Long getLetterPrice1() {
        return letterPrice1 != null ? letterPrice1 : 0l;
    }

    public Long getLetterPrice2() {
        return letterPrice2 != null ? letterPrice2 : 0l;
    }

    public String getLetterBrhsendf() {
        return letterBrhsendf;
    }

    public void setLetterBrhsendf(String letterBrhsendf) {
        this.letterBrhsendf = letterBrhsendf;
    }

    public DrmdLSanad getSanad() {
        return sanad;
    }

    public void setSanad(DrmdLSanad sanad) {
        this.sanad = sanad;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getLetterSerial() {
        return letterSerial;
    }

    public DrmdLetterOK getDrmdLetterOK() {
        return drmdLetterOK;
    }

    public Contract getContract() {
        return contract;
    }

    public LetCard getLetCard() {
        return letCard;
    }

    public List<ClmOrdpay> getOrderPays() {
        return orderPays;
    }

    public Branch getBrhcode() {
        return brhcode;
    }

    public String getLetterNo() {
        return letterNo;
    }

    public String getLetterDate() {
        return letterDate;
    }

    public String getLetterNam() {
        return letterNam;
    }

    public String getLetterLno() {
        return letterLno;
    }

    public String getLetterLdate() {
        return letterLdate;
    }

    public String getLetterCode1() {
        return letterCode1;
    }

    public String getLetterCode2() {
        return letterCode2;
    }

    public String getLetterObjdate() {
        return letterObjdate;
    }

    public String getLetterRabet() {
        return letterRabet;
    }

    public String getLetterSanadflag() {
        return letterSanadflag;
    }

    public String getCreateuid() {
        return createuid;
    }

    public String getCreatedt() {
        return createdt;
    }

    public Character getLetterPrint() {
        return letterPrint;
    }

    public Character getLetterFlag() {
        return letterFlag;
    }

    public Character getLetterSodor() {
        return letterSodor;
    }

    public String getLetterDel() {
        return letterDel;
    }

    public String getBesFunctiondate() {
        return besFunctiondate;
    }

    public String getBesCntno() {
        return besCntno;
    }

    public String getBesCntdate() {
        return besCntdate;
    }

    public String getRwshid() {
        return rwshid;
    }

    public String getRwshname() {
        return rwshname;
    }

    public String getBesEmpzflag() {
        return besEmpzflag;
    }

    public String getIdno() {
        return idno;
    }

    public String getCodedigit() {
        return codedigit;
    }

    public Branch getBranch() {
        return branch;
    }
}
