package ir.tamin.insurance.technical.function.general.getHisHistoryList;
import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 *
 * @author m_Alipour
 */

public class GetHisHistoryListValue  implements DBFunctionValue {


    private Object rowId;
    private Object risuid;
    private Object hisYear;
    private Object hisMonth;
    private Object hisDay;
    private Object hisWage;
    private Object hisHard;
    private Object hisType;
    private Object hisRate;
    private Object hisrwshid;
    private Object brchcode;

    public Object getRowId() {
        return rowId;
    }

    public void setRowId(Object rowId) {
        this.rowId = rowId;
    }

    public Object getRisuid() {
        return risuid;
    }

    public void setRisuid(Object risuid) {
        this.risuid = risuid;
    }

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

    public Object getHisDay() {
        return hisDay;
    }

    public void setHisDay(Object hisDay) {
        this.hisDay = hisDay;
    }

    public Object getHisWage() {
        return hisWage;
    }

    public void setHisWage(Object hisWage) {
        this.hisWage = hisWage;
    }

    public Object getHisType() {
        return hisType;
    }

    public void setHisType(Object hisType) {
        this.hisType = hisType;
    }

    public Object getHisRate() {
        return hisRate;
    }

    public void setHisRate(Object hisRate) {
        this.hisRate = hisRate;
    }

    public Object getBrchcode() {
        return brchcode;
    }

    public void setBrchcode(Object brchcode) {
        this.brchcode = brchcode;
    }

    public Object getHisHard() {
        return hisHard;
    }

    public void setHisHard(Object hisHard) {
        this.hisHard = hisHard;
    }

    public Object getHisrwshid() {
        return hisrwshid;
    }

    public void setHisrwshid(Object hisrwshid) {
        this.hisrwshid = hisrwshid;
    }
}
