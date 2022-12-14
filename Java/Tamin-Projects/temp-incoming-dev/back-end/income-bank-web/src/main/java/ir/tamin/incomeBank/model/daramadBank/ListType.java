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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Entity
@NamedQueries({
    @NamedQuery(name = "ListType.findByKindcode", query = "SELECT w FROM ListType w where w.listTypeDesc=:listTypeDesc "),
    @NamedQuery(name = "ListType.findAll", query = "SELECT w FROM ListType w ")
})
@Table(name = "BASEINFO.TB_LISTTYPE")
@Data
public class ListType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "LISTTYPECODE")
    private String listTypeCode;  //  VARCHAR2(2) not null,
    @Column(name = "LISTTYPEDESC")
    private String listTypeDesc;  //   VARCHAR2(100) not null,
    @Column(name = "STATUS")
    private String status;  //     CHAR(1) not null,
    @Column(name = "STATUSSTDATE")
    private String statusStDate;  //   VARCHAR2(8) not null,

}
