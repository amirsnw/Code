package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.DrmdCard;
import ir.tamin.incomeBank.model.daramadBank.LetCardPK;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(LetCard.class)
public class LetCard_ { 

    public static volatile SingularAttribute<LetCard, String> brchCode;
    public static volatile SingularAttribute<LetCard, String> orpOrdrow;
    public static volatile SingularAttribute<LetCard, DrmdCard> drmdCard;
    public static volatile SingularAttribute<LetCard, String> ordOrdno;
    public static volatile SingularAttribute<LetCard, LetCardPK> letCardPK;

}