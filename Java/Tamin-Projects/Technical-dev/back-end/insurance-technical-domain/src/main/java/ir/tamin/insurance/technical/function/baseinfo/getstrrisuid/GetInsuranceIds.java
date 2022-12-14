/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.baseinfo.getstrrisuid;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceOperation;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceOperations;
import ir.tamin.insurance.technical.function.baseinfo.GeneralFunctionResult;
import ir.tamin.insurance.technical.model.Roles;

import java.sql.Types;

/**
 *
 * @author e_shoghi
 */
@RESTResource
@Mapping(input = GetInsuranceIdsInput.class, output = GeneralFunctionResult.class, type = MappingType.SINGLE)
@ResourceOperations(
        @ResourceOperation(roles = {Roles.BRANCH_USERS}))
public class GetInsuranceIds extends AbstractDBFunction {

    private static final String QUERY = "{? = call getstrrisuid(?,?,?)}";

    @Override
    public DBFunctionCall createCall() {

        GetInsuranceIdsInput getInsuranceIdsInput = (GetInsuranceIdsInput) inputResource;
     //   if (getInsuranceIdsInput.getIwithq() != null) {
            return new DBFunctionCall().createCall(QUERY)
                    .withInput(2, getInsuranceIdsInput.getBranchCode())
                    .withInput(3, getInsuranceIdsInput.getInsuranceId())
                    .withInput(4, getInsuranceIdsInput.getIwithq())
                    .returns(1, Types.VARCHAR);
//        } else {
//            return new DBFunctionCall().createCall(QUERY)
//                    .withInput(2, getInsuranceIdsInput.getBranchCode())
//                    .withInput(3, getInsuranceIdsInput.getInsuranceId())
//                    .withInput(4, null)
//                    .returns(1, Types.VARCHAR);
//        }

    }
}
