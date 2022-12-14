package ir.tamin.insurance.technical.function.general.getLastHistInfo;
import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 *
 * @author m_Alipour
 */

public class GetLastHisInfoValue implements DBFunctionValue {

    private Object hisYear;
    private Object hisMonth;
    private Object hisType;
    private String historyTypeDesc;

    public Object getHisYear() {
        return hisYear;
    }

    public void setHisYear(Object hisYear) {
        this.hisYear = hisYear;
    }

    public Object getHisMonth() {
        return hisMonth;
    }

    public void setHisMonth(Object hisMonth) {
        this.hisMonth = hisMonth;
    }

    public Object getHisType() {
        return hisType;
    }

    public void setHisType(Object hisType) {
        this.hisType = hisType;
    }

    public String getHistoryTypeDesc() {
        return historyTypeDesc;
    }

    public void setHistoryTypeDesc(String historyTypeDesc) {
        this.historyTypeDesc = historyTypeDesc;
    }
}
