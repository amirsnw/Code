package ir.tamin.incomeBank.model.contradictionReport;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(ContradictionReport.class)
public class ContradictionReport_ { 

    public static volatile SingularAttribute<ContradictionReport, String> branchCode;
    public static volatile SingularAttribute<ContradictionReport, BigDecimal> billAmount;
    public static volatile SingularAttribute<ContradictionReport, String> orderNo;
    public static volatile SingularAttribute<ContradictionReport, String> month;
    public static volatile SingularAttribute<ContradictionReport, String> year;
    public static volatile SingularAttribute<ContradictionReport, BigDecimal> diffAmount;
    public static volatile SingularAttribute<ContradictionReport, String> billDate;
    public static volatile SingularAttribute<ContradictionReport, String> daftarBank;
    public static volatile SingularAttribute<ContradictionReport, String> type;
    public static volatile SingularAttribute<ContradictionReport, String> billBank;
    public static volatile SingularAttribute<ContradictionReport, BigDecimal> daftarAmount;
    public static volatile SingularAttribute<ContradictionReport, String> daftarDate;

}