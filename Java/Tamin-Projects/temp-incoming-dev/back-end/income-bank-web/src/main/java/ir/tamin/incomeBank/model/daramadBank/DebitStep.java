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
@Entity
@Table(name = "tb_debitstep", schema = "baseinfo")
@Data
public class DebitStep implements Serializable{
    @Id
    @Column(name = "DEBITSTEPCODE")
    private String stepCode;
    
    @Column(name = "DEBITSTEPDESC")
    private String stepDescription;
    
    @Column(name = "STEPORDSEQ")
    private String stepOrder;
    
    @Column(name = "STEPCAT")
    private String stepCat;
    
    @Column(name = "STATUS")
    private String status;
    
    @Column(name = "STATUSSTDATE")
    private String startDate;

}
