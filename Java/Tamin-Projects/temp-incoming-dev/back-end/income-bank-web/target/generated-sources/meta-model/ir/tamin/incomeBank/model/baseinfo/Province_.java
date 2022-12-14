package ir.tamin.incomeBank.model.baseinfo;

import ir.tamin.incomeBank.model.baseinfo.City;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(Province.class)
public class Province_ { 

    public static volatile SingularAttribute<Province, String> statusDate;
    public static volatile ListAttribute<Province, City> cities;
    public static volatile SingularAttribute<Province, String> provinceCode;
    public static volatile SingularAttribute<Province, String> provinceName;
    public static volatile SingularAttribute<Province, String> status;

}