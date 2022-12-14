/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.baseinfo;

import ir.tamin.incomeBank.model.pension.enums.PensionPayModelEnum;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_BANK", schema = "BASEINFO")
public class Bank implements Serializable {

    @Id
    @Column(name = "BANKCODE")
    private String bankCode;

    @Column(name = "BANKNAME")
    private String bankName;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "STATUSSTDATE")
    private String statusSTdate;

    public Bank() {
    }

    public Bank(String bankCode) {        
        if ("00".equals(bankCode)) {
            this.bankName = PensionPayModelEnum.BONYAD_SHAHID.getName();
        }
        this.bankCode = bankCode;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusSTdate() {
        return statusSTdate;
    }

    public void setStatusSTdate(String statusSTdate) {
        this.statusSTdate = statusSTdate;
    }

}
