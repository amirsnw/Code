package ir.tamin.incomeBank.model.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.DftroznamdetPK;
import java.math.BigInteger;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(Dftroznamdet.class)
public class Dftroznamdet_ { 

    public static volatile SingularAttribute<Dftroznamdet, BigInteger> amount;
    public static volatile SingularAttribute<Dftroznamdet, String> lettitledesc;
    public static volatile SingularAttribute<Dftroznamdet, String> orpOrdrow;
    public static volatile SingularAttribute<Dftroznamdet, String> lettitlecode;
    public static volatile SingularAttribute<Dftroznamdet, String> debittypeDesc;
    public static volatile SingularAttribute<Dftroznamdet, String> ordOrdno;
    public static volatile SingularAttribute<Dftroznamdet, DftroznamdetPK> dftroznamdetPK;

}