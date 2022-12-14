package ir.tamin.insurance.technical.function.brokerReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

public class RequestBrokerWageReportValue implements DBFunctionValue{

    private String result;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
