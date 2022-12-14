/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Table(name = "VWRETURNCHEQUES")
@Data
@Entity
public class ReturnChequesView implements Serializable{

    @Id
    @Column(name = "paynumber")
    private String payNumber;
    @Column(name = "NRCHEQREASONDESC")
    private String chequeReasonDesc;
    @Column(name = "cheq_date")
    private String chequeDate;
    @Column(name = "ord_mastcustcode")
    private String mastCustomerCode;
    @Column(name = "mastcustname")
    private String mastCustomerName;
    @Column(name = "rcs_chqamt")
    private Long chequeAmount;
    @Column(name = "rcs_chqno")
    private String chequeNo;
    @Column(name = "brhcode")
    private String branchCode;
    @Column(name = "brhname")
    private String branchName;
}
