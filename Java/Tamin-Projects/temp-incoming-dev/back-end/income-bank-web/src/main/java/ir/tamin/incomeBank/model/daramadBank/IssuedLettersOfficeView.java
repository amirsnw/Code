/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Entity
@Table(name = "DRMD_VWDFTLETTERSANAD")
@Data
public class IssuedLettersOfficeView implements Serializable{
    @Id
    @Column(name = "letter_serial")
    private String letterSerial;
    @Column(name = "letter_no")
    private String letterNo;
    @Column(name = "letter_date")
    private String letterDate;
    @Column(name = "let_date")
    private String letterDateSixCharacters;
    @Column(name = "brhcode")
    private String branchCode;
    @Column(name = "brch_code")
    private String brchCode;
    @Column(name = "brhname")
    private String branchName;
    @Column(name = "price")
    private Long price;
    @Column(name = "sprice")
    private Long sprice;
    @Column(name = "letter_nam")
    private String letterNam;
    @Column(name = "letter_lno")
    private String letterLno;
    @Column(name = "letter_ldate")
    private String letterLdate;
    @Column(name = "letter_sanadflag")
    private String letterSanadflag;
    @Column(name = "letter_rabet")
    private String letterRabet;
    @Column(name = "letter_rabetdesc")
    private String letterRabetDesc;
    @Column(name = "letter_type")
    private Character letterType;
    @Column(name = "letter_typedesc")
    private String letterTypeDesc;
    @Column(name = "letter_price1")
    private Long letterPrice1;
    @Column(name = "letter_price2")
    private Long letterPrice2;
    @Column(name = "letter_code1")
    private String letterCode1;
    @Column(name = "letter_code2")
    private String letterCode2;   
    @Column(name = "card_date")
    private String cardDate;
    @Column(name = "card_rcvtype")
    private String cardRcvtype;
    @Column(name = "card_rcvtypedesc")
    private String cardRcvTypeDesc;
    @Column(name = "card_rcvno")
    private String cardRcvno;
    @Column(name = "letter_print")
    private Character letterPrint;
    @Column(name = "letter_sodor")
    private Character letterSodor;
    @Column(name = "letter_sodordesc")
    private String letterSodorDesc;
    @Column(name = "bes_cntno")
    private String besCntno;
    @Column(name = "bes_cntdate")
    private String besCntdate;
    @Column(name = "rwshid")
    private String rwshid;
    @Column(name = "rwshname")
    private String rwshname;
    @Column(name = "bes_empzflag")
    private String besEmpzflag;
    @Column(name = "bes_functiondate")
    private String besFunctiondate;
    @Column(name = "createuid")
    private String createuid;
    @Column(name = "letter_del")
    private String letterDel;
    @Column(name = "letter_flag")
    private Character letterFlag;
    @Column(name = "letter_objdate")
    private String letterObjdate;
    @Column(name = "card_attrib")
    private String cardAttrib;
    @Column(name = "functiondate")
    private String functionDate;
    @Column(name = "idno")
    private String idno;
    @Column(name = "contractrow")
    private String contractRow;
    @Column(name = "LETTER_BRHSENDF_")
    private String letterBrhsendf;
    @Column(name = "LETTER_BRHSENDF")
    private String letterBrhsendfDesc;
    @Column(name = "let_stat")
    private String letterStatusDesc;
    @Column(name = "Ord_Ordno")
    private String ordNoDesc;
    @Column(name = "Ord_Ordno_")
    private String ordNo;
    @Column(name = "Codedigit")
    private String codedigit;
    @Column(name = "Let_Ordpay")
    private String letOrdPay;
    @Column(name = "Vch_Lskhflg")
    private String vchLskhFlag;
    @Column(name = "Vch_LsZiflg")
    private String lsZiFlag;

    public String getLetterSerial() {
        return letterSerial;
    }

    public String getLetterNo() {
        return letterNo;
    }

    public String getLetterDate() {
        return letterDate;
    }

    public String getLetterDateSixCharacters() {
        return letterDateSixCharacters;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public String getBrchCode() {
        return brchCode;
    }

    public String getBranchName() {
        return branchName;
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

    public String getLetterSanadflag() {
        return letterSanadflag;
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

    public String getCardRcvtype() {
        return cardRcvtype;
    }

    public String getCardRcvTypeDesc() {
        return cardRcvTypeDesc;
    }

    public String getCardRcvno() {
        return cardRcvno;
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

    public String getBesFunctiondate() {
        return besFunctiondate;
    }

    public String getCreateuid() {
        return createuid;
    }

    public String getLetterDel() {
        return letterDel;
    }

    public Character getLetterFlag() {
        return letterFlag;
    }

    public String getLetterObjdate() {
        return letterObjdate;
    }

    public String getCardAttrib() {
        return cardAttrib;
    }

    public String getFunctionDate() {
        return functionDate;
    }

    public String getIdno() {
        return idno;
    }

    public String getContractRow() {
        return contractRow;
    }

    public String getLetterBrhsendf() {
        return letterBrhsendf;
    }

    public String getLetterBrhsendfDesc() {
        return letterBrhsendfDesc;
    }

    public String getLetterStatusDesc() {
        return letterStatusDesc;
    }

    public String getOrdNoDesc() {
        return ordNoDesc;
    }

    public String getOrdNo() {
        return ordNo;
    }

    public String getCodedigit() {
        return codedigit;
    }

    public String getLetOrdPay() {
        return letOrdPay;
    }

    public String getVchLskhFlag() {
        return vchLskhFlag;
    }

    public String getLsZiFlag() {
        return lsZiFlag;
    }
}
