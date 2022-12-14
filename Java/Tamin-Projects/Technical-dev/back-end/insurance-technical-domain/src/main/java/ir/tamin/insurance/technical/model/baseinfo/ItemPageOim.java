package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;

/**
 *
 * @author m_shabanlou
 */
public class ItemPageOim {

    private Integer limit;
    private SortWrapper sort;
    private Integer start;
    private FilterWrapper filter;

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public SortWrapper getSort() {
        return sort;
    }

    public void setSort(SortWrapper sort) {
        this.sort = sort;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public FilterWrapper getFilter() {
        return filter;
    }

    public void setFilter(FilterWrapper filter) {
        this.filter = filter;
    }

}
