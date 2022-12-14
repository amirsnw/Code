package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.baseinfo.Contract;
import ir.tamin.incomeBank.model.daramadBank.ClmOrdpay;
import ir.tamin.incomeBank.model.daramadBank.DrmdLSanad;
import ir.tamin.incomeBank.model.daramadBank.DrmdLetterOK;
import ir.tamin.incomeBank.model.daramadBank.LetCard;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(DrmdLetter.class)
public class DrmdLetter_ { 

    public static volatile SingularAttribute<DrmdLetter, Long> letterPrice1;
    public static volatile SingularAttribute<DrmdLetter, DrmdLSanad> sanad;
    public static volatile SingularAttribute<DrmdLetter, Long> letterPrice2;
    public static volatile SingularAttribute<DrmdLetter, String> letterSerial;
    public static volatile SingularAttribute<DrmdLetter, Character> letterSodor;
    public static volatile SingularAttribute<DrmdLetter, String> letterObjdate;
    public static volatile SingularAttribute<DrmdLetter, String> besEmpzflag;
    public static volatile SingularAttribute<DrmdLetter, String> createdt;
    public static volatile SingularAttribute<DrmdLetter, Branch> branch;
    public static volatile SingularAttribute<DrmdLetter, String> rwshname;
    public static volatile SingularAttribute<DrmdLetter, String> besCntno;
    public static volatile SingularAttribute<DrmdLetter, Branch> brhcode;
    public static volatile SingularAttribute<DrmdLetter, String> letterLno;
    public static volatile SingularAttribute<DrmdLetter, Character> letterPrint;
    public static volatile ListAttribute<DrmdLetter, ClmOrdpay> orderPays;
    public static volatile SingularAttribute<DrmdLetter, Character> letterType;
    public static volatile SingularAttribute<DrmdLetter, String> letterCode2;
    public static volatile SingularAttribute<DrmdLetter, String> letterNo;
    public static volatile SingularAttribute<DrmdLetter, String> letterCode1;
    public static volatile SingularAttribute<DrmdLetter, String> besFunctiondate;
    public static volatile SingularAttribute<DrmdLetter, String> letterDate;
    public static volatile SingularAttribute<DrmdLetter, Contract> contract;
    public static volatile SingularAttribute<DrmdLetter, DrmdLetterOK> drmdLetterOK;
    public static volatile SingularAttribute<DrmdLetter, String> letterBrhsendf;
    public static volatile SingularAttribute<DrmdLetter, String> letterNam;
    public static volatile SingularAttribute<DrmdLetter, Character> letterFlag;
    public static volatile SingularAttribute<DrmdLetter, String> besCntdate;
    public static volatile SingularAttribute<DrmdLetter, String> letterSanadflag;
    public static volatile SingularAttribute<DrmdLetter, String> idno;
    public static volatile SingularAttribute<DrmdLetter, String> letterLdate;
    public static volatile SingularAttribute<DrmdLetter, String> letterRabet;
    public static volatile SingularAttribute<DrmdLetter, String> codedigit;
    public static volatile SingularAttribute<DrmdLetter, LetCard> letCard;
    public static volatile SingularAttribute<DrmdLetter, String> letterDel;
    public static volatile SingularAttribute<DrmdLetter, String> createuid;
    public static volatile SingularAttribute<DrmdLetter, String> rwshid;

}