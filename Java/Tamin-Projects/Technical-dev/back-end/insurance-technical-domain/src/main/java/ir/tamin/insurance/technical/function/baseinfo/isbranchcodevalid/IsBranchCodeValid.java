/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.baseinfo.isbranchcodevalid;

import ir.tamin.framework.domain.function.AbstractDBFunction;
import ir.tamin.framework.domain.function.DBFunctionCall;
import ir.tamin.framework.domain.function.Mapping;
import ir.tamin.framework.domain.function.MappingType;
import ir.tamin.framework.ws.rest.repository.annotation.RESTResource;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceOperation;
import ir.tamin.framework.ws.rest.repository.annotation.ResourceOperations;
import ir.tamin.insurance.technical.function.baseinfo.GeneralFunctionResult;
import ir.tamin.insurance.technical.model.Roles;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author e_shoghi
 */
@RESTResource
@Mapping(type = MappingType.SINGLE, input = IsBranchCodeValidInput.class, output = GeneralFunctionResult.class)
@ResourceOperations(
        @ResourceOperation(roles = {Roles.BRANCH_USERS}))
public class IsBranchCodeValid extends AbstractDBFunction{
        private static final String QUERY = "{? = call pck_sisview.getfncsis_isbrchcodevalid(?)}";

    @Override
    public DBFunctionCall createCall() {
        IsBranchCodeValidInput isBranchCodeValidInput = (IsBranchCodeValidInput) inputResource;
        return new DBFunctionCall().createCall(QUERY)
                .withInput(2, isBranchCodeValidInput.getBranchCode())
                .returns(1, OracleTypes.VARCHAR);
    }
}
