/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.daramadBank;

import ir.tamin.incomeBank.model.daramadBank.Comperr;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author f_fotuhi
 */
public class ComperrService {

    @Inject
    private StoredProcedure procedure;

    public Map<String, Object> getAll(FilterWrapper filterWrapper, Integer start, Integer limit, SortWrapper sort) throws IOException, SQLException {

        String brchCode = null;
        String yearMonth = null;
        Map<String, Object> map = new HashMap<>();

        Object[] filterArray = filterWrapper.getFilters().toArray();
        for (int i = 0; i < filterArray.length; i++) {
            Filter filter = (Filter) filterArray[i];
            String field = filter.getProperty();
            Object value = filter.getValue();

            if (field.equals("compMdate")) {
                yearMonth = value.toString();
            }
            if (field.equals("brhCode")) {
                brchCode = value.toString();
            }
        }

        procedure.query("{?=call pckdrmdview.getVWDRMDPAYMAIN(?,?)}");
        procedure.setOutParameter(1, OracleTypes.CURSOR);
        procedure.setInParameter(2, brchCode);
        procedure.setInParameter(3, yearMonth);
        procedure.execute();
        ResultSet rs = (ResultSet) procedure.getOutParameter(1);
        List<Comperr> comperrList = new ArrayList<>();
        while (rs.next()) {
            Comperr comperrModel = new Comperr();

            comperrModel.setType(rs.getString("typ"));
            comperrModel.setDesc(rs.getString("des"));
            comperrModel.setViewName(rs.getString("viewname"));
            comperrModel.setSubject(rs.getString("subject"));
            comperrModel.setCount(rs.getLong("cnt"));
            comperrModel.setSum(rs.getLong("sum1"));
            comperrModel.setDescription(rs.getString("hlptxt"));

            comperrList.add(comperrModel);
        }

        rs.close();
        map.put("list", comperrList);
        map.put("total", comperrList.size());

        return map;

    }

}
