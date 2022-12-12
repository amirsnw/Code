package ir.tamin.insurance.technical.function.brokerReport;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;

import java.sql.Types;


@RESTResource
@Mapping(type = MappingType.SINGLE, input = RequestBrokerWageReportInput.class, output = RequestBrokerWageReportValue.class)
public class RequestBrokerWageReport extends AbstractDBFunction {
    private static final String QUERY = "{? = call pck_broker_wage.calc_broker_wage(?, ?, ?, ?, ?, ?)}";

    @Override
    public DBFunctionCall createCall() {
        try {
            RequestBrokerWageReportInput requestBrokerWageReportInput = (RequestBrokerWageReportInput) inputResource;
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, requestBrokerWageReportInput.getProvinceCode())
                    .withInput(3, requestBrokerWageReportInput.getBranchCode())
                    .withInput(4, requestBrokerWageReportInput.getBrokerCode())
                    .withInput(5, requestBrokerWageReportInput.getStartDate())
                    .withInput(6, requestBrokerWageReportInput.getEndDate())
                    .withInput(7, requestBrokerWageReportInput.getUserId())
                    .returns(1, Types.VARCHAR);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
