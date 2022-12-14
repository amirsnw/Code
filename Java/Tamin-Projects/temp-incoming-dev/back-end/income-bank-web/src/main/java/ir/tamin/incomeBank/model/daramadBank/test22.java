/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

/**
 *
 * @author m_vahdati
 */
@Entity
public class test22 implements Serializable {
    @Id
    private Long id;
    
   @Transient
    private List<TelInfo> subReport1;

    public List<TelInfo> getSubReport1() {
        return subReport1;
    }

    public void setSubReport1(List<TelInfo> subReport1) {
        this.subReport1 = subReport1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public test22() {
    }
    
    
     
    
}
