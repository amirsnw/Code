/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.typeOfIsu;

import ir.tamin.framework.domain.function.DBFunctionValue;
import ir.tamin.framework.domain.function.Out;

/**
 *
 * @author s_naghavi
 */
public class TypeOfIsuValue implements DBFunctionValue {
   @Out(index = 1) private String typeInsuranceCode;    
   @Out(index = 4) private String typeInsuranceDesc;

    public String getTypeInsuranceCode() {
        return typeInsuranceCode;
    }

    public void setTypeInsuranceCode(String typeInsuranceCode) {
        this.typeInsuranceCode = typeInsuranceCode;
    }

    public String getTypeInsuranceDesc() {
        return typeInsuranceDesc;
    }

    public void setTypeInsuranceDesc(String typeInsuranceDesc) {
        this.typeInsuranceDesc = typeInsuranceDesc;
    }

}
