/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.function.general.CalcAge;

import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 *
 * @author s_naghavi
 */
public class CalcAgeValue implements DBFunctionValue{
    
    private String Age;

    public String getAge() {
        return Age;
    }

    public void setAge(String Age) {
        this.Age = Age;
    }
    
    
    
}
