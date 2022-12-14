/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.util;

import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.Sort;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.Serializable;
import java.sql.Types;
import java.util.Date;
import java.util.HashSet;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;

/**
 *
 * @author m_salami
 */
public class ServiceUtils implements Serializable{

    @Inject
    StoredProcedure procedure;

    public static FilterWrapper createOrAddToFilterWrapper(FilterWrapper fw, String property, String value, Filter.Operator operator) {
        if (fw == null) {
            fw = new FilterWrapper();
            fw.setFilters(new HashSet<Filter>());
        }
        if (property != null && value != null && operator != null) {
            Filter filter = new Filter();
            filter.setOperator(operator);
            filter.setProperty(property);
            filter.setValue(value);
            fw.getFilters().add(filter);
        }
        return fw;
    }

    public static SortWrapper createOrAddToSortWrapper(SortWrapper sw, String property, Sort.Direction direction) {
        if (sw == null) {
            sw = new SortWrapper();
            sw.setSortSet(new HashSet<Sort>());
        }
        if (property != null && direction != null) {
            Sort sort = new Sort();
            sort.setProperty(property);
            sort.setDirection(direction);
            sw.getSortSet().add(sort);
        }
        return sw;
    }

    public String codeDateForDB(String dateTime) {
        procedure.query("{?=call general.dateutils.CODEDATE(?)}");
        String result = "";
        try {
            procedure.setOutParameter(1, Types.NVARCHAR)
                    .setInParameter(2, dateTime);
            procedure.execute();
            result = procedure.getOutParameter(1).toString();
        } catch (Exception exc) {
            Logger.getLogger(ServiceUtils.class.getName()).log(Level.SEVERE, exc.getMessage(), exc);
            return null;
        }
        return result;
    }
    
    public String decodeDateForDB(String decodedDt) {
        procedure.query("{?=call general.dateutils.DECODEDATE(?)}");
        String result = "";
        try {
            procedure.setOutParameter(1, Types.NVARCHAR)
                    .setInParameter(2, decodedDt);
            procedure.execute();
            result = procedure.getOutParameter(1).toString();
            result = DateUtils.stringDateToStringSlashedDate(result.substring(0,8));
        } catch (Exception exc) {
            Logger.getLogger(ServiceUtils.class.getName()).log(Level.SEVERE, exc.getMessage(), exc);
            return null;
        }
        return result;
    }

    public String codeDateForDB(Date date) {
        String sdate = DateUtils.getJalaliStandard(date, "");
        // زمان تاثیری داده نشده شاید نیاز شود
        return codeDateForDB(sdate);
    }
    
    public Filter filterContainProperty(FilterWrapper filter,String property){
        for(Filter f:filter.getFilters()){
            if(f.getProperty().equals(property)){
                return f;
            }
        }
        return null;
    }
}
