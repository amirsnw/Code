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
@Table(name = "vwyeardocsstatus")
@Data
public class YearDocsStatusView implements Serializable{

    @Id
    @Column(name = "mon")
    private String month;
    @Column(name = "fishbaz")
    private Long fishbaz;
    @Column(name = "fishpas")
    private Long fishpas;
    @Column(name = "chekbaz")
    private Long chekbaz;
    @Column(name = "chekpas")
    private Long chekpas;
    @Column(name = "havbaz")
    private Long havbaz;
    @Column(name = "havpas")
    private Long havpas;
    @Column(name = "elamye")
    private Long elamye;
    @Column(name = "batel")
    private Long batel;
    @Column(name = "year")
    private String year;
    @Column(name = "brhcode")
    private String branchCode;
    @Column(name = "brhname")
    private String branchName;
}
