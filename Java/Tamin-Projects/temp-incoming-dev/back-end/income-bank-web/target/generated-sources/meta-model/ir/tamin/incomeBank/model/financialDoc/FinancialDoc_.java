package ir.tamin.incomeBank.model.financialDoc;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(FinancialDoc.class)
public class FinancialDoc_ { 

    public static volatile SingularAttribute<FinancialDoc, String> flagDocument;
    public static volatile SingularAttribute<FinancialDoc, String> accountCode;
    public static volatile SingularAttribute<FinancialDoc, String> accountDesc;
    public static volatile SingularAttribute<FinancialDoc, BigDecimal> creditAmount;
    public static volatile SingularAttribute<FinancialDoc, String> daramadYear;
    public static volatile SingularAttribute<FinancialDoc, String> daramadMonth;
    public static volatile SingularAttribute<FinancialDoc, BigDecimal> debtAmount;
    public static volatile SingularAttribute<FinancialDoc, String> rowId;

}