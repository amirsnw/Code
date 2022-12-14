/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.insuranceAgreement.repagreementmedicalinfo;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author s_naghavi
 */
@RESTResource
@Mapping(output = RepAgreementMedicalInfoValue.class, input = RepAgreementMedicalInfoInput.class, type = MappingType.COMPLEX)
public class RepAgreementMedicalInfo extends AbstractDBFunction{
        private static final String QUERY = "{?=call  pckssupviews.get_vwrep_agre_medinfo(?,?)}";
    @Override
    public DBFunctionCall createCall() {

        RepAgreementMedicalInfoInput repAgreementMedicalInfoInput=(RepAgreementMedicalInfoInput) inputResource;
        return new DBFunctionCall().createCall(QUERY)
                .withInput(2, repAgreementMedicalInfoInput.getBranchCode())
                .withInput(3, repAgreementMedicalInfoInput.getReqId())
                .returns(1, OracleTypes.CURSOR);
    }
}
