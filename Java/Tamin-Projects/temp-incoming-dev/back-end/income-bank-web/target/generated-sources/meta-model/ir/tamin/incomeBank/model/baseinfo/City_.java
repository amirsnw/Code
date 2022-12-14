package ir.tamin.incomeBank.model.baseinfo;

import ir.tamin.incomeBank.model.baseinfo.Branch;
import ir.tamin.incomeBank.model.baseinfo.Province;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.1.v20130918-rNA", date="2022-12-13T16:15:32")
@StaticMetamodel(City.class)
public class City_ { 

    public static volatile SingularAttribute<City, String> statusDate;
    public static volatile SingularAttribute<City, Integer> cityGrade;
    public static volatile SingularAttribute<City, Province> province;
    public static volatile SingularAttribute<City, String> cityName;
    public static volatile SingularAttribute<City, String> cityCode;
    public static volatile SingularAttribute<City, String> oldCityCode;
    public static volatile SingularAttribute<City, Integer> cityGroup;
    public static volatile ListAttribute<City, Branch> branches;
    public static volatile SingularAttribute<City, String> status;

}