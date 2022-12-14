/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.json;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author e_shoghi
 */
public class FilterWrapper {

    private Set<Filter> filters = new HashSet<>();

    public FilterWrapper() {
    }

    public FilterWrapper(String jsonFilters) throws JsonParseException,
            JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        filters = mapper.readValue(jsonFilters, mapper.getTypeFactory().constructCollectionType(Set.class, Filter.class));

    }

    public Set<Filter> getFilters() {
        return filters;
    }

    public void setFilters(Set<Filter> filters) {
        this.filters = filters;
    }

    public void addFilter(String property, Filter.Operator operator, String value) {
        Filter filter = new Filter();
        filter.setProperty(property);
        filter.setValue(value);
        filter.setOperator(operator);
        this.filters.add(filter);
    }

    public void removeFilter(String property, Filter.Operator operator) {
        Iterator<Filter> it = filters.iterator();
        while (it.hasNext()) {
            Filter filter = it.next();
            if (filter.getProperty().equals(property) && filter.getOperator().equals(operator)) {
                it.remove();
            }
        }
    }

    public static FilterWrapper createWrapperWithFilter(String property, Filter.Operator operator, String value) {
        Set<Filter> filters = new HashSet<>();
        Filter filter = new Filter();
        filter.setOperator(operator);
        filter.setProperty(property);
        filter.setValue(value);
        filters.add(filter);
        FilterWrapper fw = new FilterWrapper();
        fw.setFilters(filters);
        return fw;
    }

    public boolean contains(String name) {
        for (Filter filter : filters) {
            if (filter.getProperty().equals(name)) {
                return true;
            }
        }

        return false;
    }

    public boolean hasOperation() {
        return this.contains("operation");
    }

    public boolean hasOperation(String operation) {
        return hasOperation() && operation.equalsIgnoreCase(this.toMap().get("operation"));
    }

    /**
     * Converts filters with <code>EQUAL</code> operator to a map object.
     *
     * @return a Map object
     */
    public Map<String, String> toMap() {
        Map<String, String> filterMap = new HashMap<>();
        for (Filter filter : filters) {
            if (filter.getOperator().equals(Filter.Operator.EQUAL) || filter.getOperator().equals(Filter.Operator._EQUAL)) {
                filterMap.put(filter.getProperty(), filter.getValue());
            }
        }

        return filterMap;
    }

    @Override
    public String toString() {
        return "FilterWrapper{"
                + "filters=" + filters
                + '}';
    }
}
