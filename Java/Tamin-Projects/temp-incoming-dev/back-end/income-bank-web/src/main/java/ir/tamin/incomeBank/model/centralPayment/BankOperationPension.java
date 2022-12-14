/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.centralPayment;

/**
 *
 * @author f_fotuhi
 */
public class BankOperationPension {

    private String code;
    private String name;
    private String codeName;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCodeName() {
        return code + " " + name;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

}
