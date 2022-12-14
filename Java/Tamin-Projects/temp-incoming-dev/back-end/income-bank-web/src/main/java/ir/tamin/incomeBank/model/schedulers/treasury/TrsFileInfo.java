///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package ir.tamin.incomeBank.model.schedulers.treasury;
//
//import java.io.Serializable;
//import java.math.BigDecimal;
//import java.util.Date;
//import java.util.List;
//import javax.persistence.CascadeType;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Lob;
//import javax.persistence.NamedQueries;
//import javax.persistence.NamedQuery;
//import javax.persistence.OneToMany;
//import javax.persistence.Table;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//
///**
// *
// * @author s_maknooni
// */
//@Entity
//@Table(name = "TRS_FILE_INFO")
//@NamedQueries({
//    @NamedQuery(name = "TrsFileInfo.findByFileDate", query = "SELECT t FROM TrsFileInfo t WHERE t.fileDate = :fileDate")
//})
//public class TrsFileInfo implements Serializable {
//
//    private static final long serialVersionUID = 1L;
//    @Id
//    @GeneratedValue(generator = "sequenceGenerator", strategy = GenerationType.SEQUENCE)
//    @Column(name = "ID")
//    private BigDecimal id;
//    @Column(name = "FILE_DATE")
//    private String fileDate;
//    @Lob
//    @Column(name = "FILE_FILE")
//    private Serializable fileFile;
//    @Column(name = "CREATE_DATE")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date createDate;
//
//    @OneToMany(mappedBy = "fileInfo", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<TrsDocsData> dataList;
//
//    public TrsFileInfo() {
//    }
//
//    public TrsFileInfo(BigDecimal id) {
//        this.id = id;
//    }
//
//    public TrsFileInfo(BigDecimal id, String fileDate, Date createDate) {
//        this.id = id;
//        this.fileDate = fileDate;
//        this.createDate = createDate;
//    }
//
//    public BigDecimal getId() {
//        return id;
//    }
//
//    public void setId(BigDecimal id) {
//        this.id = id;
//    }
//
//    public String getFileDate() {
//        return fileDate;
//    }
//
//    public void setFileDate(String fileDate) {
//        this.fileDate = fileDate;
//    }
//
//    public Serializable getFileFile() {
//        return fileFile;
//    }
//
//    public void setFileFile(Serializable fileFile) {
//        this.fileFile = fileFile;
//    }
//
//    public Date getCreateDate() {
//        return createDate;
//    }
//
//    public void setCreateDate(Date createDate) {
//        this.createDate = createDate;
//    }
//
//    public List<TrsDocsData> getDataList() {
//        return dataList;
//    }
//
//    public void setDataList(List<TrsDocsData> dataList) {
//        this.dataList = dataList;
//    }
//
//}
