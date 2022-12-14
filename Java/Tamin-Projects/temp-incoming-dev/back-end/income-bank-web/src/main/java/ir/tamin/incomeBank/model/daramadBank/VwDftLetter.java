/**
 *
 * @author h_riazat
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "VWDFTLETTER")
public class VwDftLetter implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    VwDftLetterPK vwDftLetterPK;
    @NotNull
    @Column(name = "LETTER_SERIAL")
    private String letterSerial;
    @Column(name = "LETTER_NO")
    private String letterNo;
    @NotNull
    @Column(name = "LETTER_DATE")
    private String letterDate;
    @NotNull
    @Column(name = "BRHCODE")
    private String brhCode;
    @Column(name = "BRHNAME")
    private String brhName;
    @Column(name = "PRICE")
    private Long price;
    @Column(name = "SPRICE")
    private Long sprice;
    @Column(name = "LETTER_NAM")
    private String letterNam;
    @Column(name = "LETTER_LNO")
    private String letterLno;
    @Column(name = "LETTER_LDATE")
    private String letterLdate;
    @NotNull
    @Column(name = "LETTER_SANADFLAG")
    private String letterSanadFlag;
    @NotNull
    @Column(name = "LETTER_RABET")
    private String letterRabet;
    @Column(name = "LETTER_RABETDESC")
    private String letterRabetDesc;
    @NotNull
    @Column(name = "LETTER_TYPE")
    private Character letterType;
    @Column(name = "LETTER_TYPEDESC")
    private String letterTypeDesc;
    @Column(name = "LETTER_PRICE1")
    private Long letterPrice1;
    @Column(name = "LETTER_PRICE2")
    private Long letterPrice2;
    @Column(name = "LETTER_CODE1")
    private String letterCode1;
    @Column(name = "LETTER_CODE2")
    private String letterCode2;
    @NotNull
    @Column(name = "CARD_DATE")
    private String cardDate;
    @NotNull
    @Column(name = "CARD_RCVTYPE")
    private String cardRcvType;
    @Column(name = "CARD_RCVTYPEDESC")
    private String cardRcvTypedDesc;
    @Column(name = "CARD_RCVNO")
    private String cardRcvNo;
    @Column(name = "LETTER_PRINT")
    private Character letterPrint;
    @Column(name = "LETTER_SODOR")
    private Character letterSodor;
    @Column(name = "LETTER_SODORDESC")
    private String letterSodorDesc;
    @Column(name = "PRNTFLAG")
    private String prntFlag;
    @NotNull
    @Column(name = "BRCH_CODE")
    private String brchCode;
    @Column(name = "LETTER_STAT")
    private String letterStat;

    @Column(name = "LETTER_OBJDATE")
    private String letterObjDate;
    @Column(name = "CREATEUID")
    private String createUid;
    @Column(name = "createdt")
    private String createdt;
    @Column(name = "LETTER_FLAG")
    private Character letterFlag;
    @Column(name = "LETTER_DEL")
    private String letterDel;
    @Column(name = "BES_CNTNO")
    private String besCntNo;
    @Column(name = "BES_CNTDATE")
    private String besCntDate;
    @Column(name = "BES_EMPZFLAG")
    private String besEmpzFlag;
    @Column(name = "BES_FUNCTIONDATE")
    private String besFunctionDate;
    @Column(name = "RWSHID")
    private String rwshId;
    @Column(name = "RWSHNAME")
    private String rwshName;
    @Column(name = "IDNO")
    private String idNo;
    @Column(name = "CODEDIGIT")
    private String codeDigit;
    @Column(name = "ourag_gno")
    private String ourag_gno;
    @Column(name = "ourag_sdate")
    private String ourag_sdate;

    @Transient
    private String pk;
    @Transient
    private String dateCardDate;
    @Transient
    private String dateLetterDate;
    @Transient
    private String dateLetterLdate;

    public VwDftLetter() {
    }

    public VwDftLetterPK getVwDftLetterPK() {
        return vwDftLetterPK;
    }

    public String getPK() {
        return vwDftLetterPK.getLetterSerial() + vwDftLetterPK.getLetterDate() + vwDftLetterPK.getBrchCode();
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getLetterSerial() {
        return letterSerial;
    }

    public String getLetterNo() {
        return letterNo;
    }

    public String getLetterDate() {
        return letterDate;
    }

    public String getBrhCode() {
        return brhCode;
    }

    public String getBrhName() {
        return brhName;
    }

    public Long getPrice() {
        return price;
    }

    public Long getSprice() {
        return sprice;
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

    public String getLetterSanadFlag() {
        return letterSanadFlag;
    }

    public String getLetterRabet() {
        return letterRabet;
    }

    public String getLetterRabetDesc() {
        return letterRabetDesc;
    }

    public Character getLetterType() {
        return letterType;
    }

    public String getLetterTypeDesc() {
        return letterTypeDesc;
    }

    public Long getLetterPrice1() {
        return letterPrice1;
    }

    public Long getLetterPrice2() {
        return letterPrice2;
    }

    public String getLetterCode1() {
        return letterCode1;
    }

    public String getLetterCode2() {
        return letterCode2;
    }

    public String getCardDate() {
        return cardDate;
    }

    public String getCardRcvType() {
        return cardRcvType;
    }

    public String getCardRcvTypedDesc() {
        return cardRcvTypedDesc;
    }

    public String getCardRcvNo() {
        return cardRcvNo;
    }

    public Character getLetterPrint() {
        return letterPrint;
    }

    public Character getLetterSodor() {
        return letterSodor;
    }

    public String getLetterSodorDesc() {
        return letterSodorDesc;
    }

    public String getPrntFlag() {
        return prntFlag;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public void setLetterSerial(String letterSerial) {
        this.letterSerial = letterSerial;
    }

    public void setLetterNo(String letterNo) {
        this.letterNo = letterNo;
    }

    public void setLetterDate(String letterDate) {
        this.letterDate = letterDate;
    }

    public void setBrhCode(String brhCode) {
        this.brhCode = brhCode;
    }

    public void setBrhName(String brhName) {
        this.brhName = brhName;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public void setSprice(Long sprice) {
        this.sprice = sprice;
    }

    public void setLetterNam(String letterNam) {
        this.letterNam = letterNam;
    }

    public void setLetterLno(String letterLno) {
        this.letterLno = letterLno;
    }

    public void setLetterLdate(String letterLdate) {
        this.letterLdate = letterLdate;
    }

    public void setLetterSanadFlag(String letterSanadFlag) {
        this.letterSanadFlag = letterSanadFlag;
    }

    public void setLetterRabet(String letterRabet) {
        this.letterRabet = letterRabet;
    }

    public void setLetterRabetDesc(String letterRabetDesc) {
        this.letterRabetDesc = letterRabetDesc;
    }

    public void setLetterType(Character letterType) {
        this.letterType = letterType;
    }

    public void setLetterTypeDesc(String letterTypeDesc) {
        this.letterTypeDesc = letterTypeDesc;
    }

    public void setLetterPrice1(Long letterPrice1) {
        this.letterPrice1 = letterPrice1;
    }

    public void setLetterPrice2(Long letterPrice2) {
        this.letterPrice2 = letterPrice2;
    }

    public void setLetterCode1(String letterCode1) {
        this.letterCode1 = letterCode1;
    }

    public void setLetterCode2(String letterCode2) {
        this.letterCode2 = letterCode2;
    }

    public void setCardDate(String cardDate) {
        this.cardDate = cardDate;
    }

    public void setCardRcvType(String cardRcvType) {
        this.cardRcvType = cardRcvType;
    }

    public void setCardRcvTypedDesc(String cardRcvTypedDesc) {
        this.cardRcvTypedDesc = cardRcvTypedDesc;
    }

    public void setCardRcvNo(String cardRcvNo) {
        this.cardRcvNo = cardRcvNo;
    }

    public void setLetterPrint(Character letterPrint) {
        this.letterPrint = letterPrint;
    }

    public void setLetterSodor(Character letterSodor) {
        this.letterSodor = letterSodor;
    }

    public void setLetterSodorDesc(String letterSodorDesc) {
        this.letterSodorDesc = letterSodorDesc;
    }

    public void setPrntFlag(String prntFlag) {
        this.prntFlag = prntFlag;
    }

    public void setBrchCode(String brchCode) {
        this.brchCode = brchCode;
    }

    public String getLetterStat() {
        return letterStat;
    }

    public void setLetterStat(String letterStat) {
        this.letterStat = letterStat;
    }

    public String getLetterObjDate() {
        return letterObjDate;
    }

    public void setLetterObjDate(String letterObjDate) {
        this.letterObjDate = letterObjDate;
    }

    public String getCreateUid() {
        return createUid;
    }

    public void setCreateUid(String createUid) {
        this.createUid = createUid;
    }

    public String getCreatedt() {
        return createdt;
    }

    public void setCreatedt(String createdt) {
        this.createdt = createdt;
    }

    public Character getLetterFlag() {
        return letterFlag;
    }

    public void setLetterFlag(Character letterFlag) {
        this.letterFlag = letterFlag;
    }

    public String getLetterDel() {
        return letterDel;
    }

    public void setLetterDel(String letterDel) {
        this.letterDel = letterDel;
    }

    public String getBesCntNo() {
        return besCntNo;
    }

    public void setBesCntNo(String besCntNo) {
        this.besCntNo = besCntNo;
    }

    public String getBesCntDate() {
        return besCntDate;
    }

    public void setBesCntDate(String besCntDate) {
        this.besCntDate = besCntDate;
    }

    public String getBesEmpzFlag() {
        return besEmpzFlag;
    }

    public void setBesEmpzFlag(String besEmpzFlag) {
        this.besEmpzFlag = besEmpzFlag;
    }

    public String getBesFunctionDate() {
        return besFunctionDate;
    }

    public void setBesFunctionDate(String besFunctionDate) {
        this.besFunctionDate = besFunctionDate;
    }

    public String getRwshId() {
        return rwshId;
    }

    public void setRwshId(String rwshId) {
        this.rwshId = rwshId;
    }

    public String getRwshName() {
        return rwshName;
    }

    public void setRwshName(String rwshName) {
        this.rwshName = rwshName;
    }

    public String getIdNo() {
        return idNo;
    }

    public void setIdNo(String idNo) {
        this.idNo = idNo;
    }

    public String getCodeDigit() {
        return codeDigit;
    }

    public void setCodeDigit(String codeDigit) {
        this.codeDigit = codeDigit;
    }

    public String getOurag_gno() {
        return ourag_gno;
    }

    public void setOurag_gno(String ourag_gno) {
        this.ourag_gno = ourag_gno;
    }

    public String getOurag_sdate() {
        return ourag_sdate;
    }

    public void setOurag_sdate(String ourag_sdate) {
        this.ourag_sdate = ourag_sdate;
    }

    public String getDateCardDate() {
        if (getCardDate() != null && getCardDate().length() == 8) {
            String dateCardDate;
            dateCardDate = getCardDate().substring(0, 4) + "/" + getCardDate().substring(4, 6) + "/" + getCardDate().substring(6, 8);
            return dateCardDate;
        } else {
            return null;
        }
    }

    public String getDateLetterDate() {
        if (getLetterDate() != null && getLetterDate().length() == 8) {
            String dateLetterDate;
            dateLetterDate = getLetterDate().substring(0, 4) + "/" + getLetterDate().substring(4, 6) + "/" + getLetterDate().substring(6, 8);
            return dateLetterDate;
        } else {
            return null;
        }
    }

    public String getDateLetterLdate() {
        if (getLetterLdate() != null && getLetterLdate().length() == 8) {
            String dateLetterLdate;
            dateLetterLdate = getLetterLdate().substring(0, 4) + "/" + getLetterLdate().substring(4, 6) + "/" + getLetterLdate().substring(6, 8);
            return dateLetterLdate;
        } else {
            return null;
        }
    }

}
