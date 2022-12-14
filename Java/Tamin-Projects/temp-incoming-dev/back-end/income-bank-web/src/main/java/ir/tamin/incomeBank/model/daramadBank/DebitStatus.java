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
@Table(name = "tb_debitstat", schema = "baseinfo")
@Data
public class DebitStatus implements Serializable {

    @Id
    @Column(name = "DEBITSTATCODE")
    private String statusCode;

    @Column(name = "DEBITSTATDESC")
    private String statusDescription;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "STATUSSTDATE")
    private String startDate;

}
