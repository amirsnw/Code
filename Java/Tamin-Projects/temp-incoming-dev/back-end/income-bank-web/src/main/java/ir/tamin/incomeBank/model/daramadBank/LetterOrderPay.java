/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Entity
@Table(name = "LET_ORDPAY")
@Data
public class LetterOrderPay implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private LetterOrderPayPK letterOrderPayPK;
    @NotNull
    @Column(name = "BRCH_CODE")
    private String branchCode;
}
