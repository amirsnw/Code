/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.baseinfo;

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
@Table(name = "REGWORKSHOPSPEC")
@Data
public class Workshop implements Serializable {

    @Id
    @Column(name = "RWSHID")
    private String id;

    @Column(name = "RWSHNAME", nullable = false)
    private String workshopName;

}
