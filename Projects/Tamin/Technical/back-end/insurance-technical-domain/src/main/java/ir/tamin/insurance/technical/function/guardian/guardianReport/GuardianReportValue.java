package ir.tamin.insurance.technical.function.guardian.guardianReport;

import ir.tamin.framework.domain.function.DBFunctionValue;

import java.math.BigDecimal;

public class GuardianReportValue implements DBFunctionValue{
    private BigDecimal father;
    private BigDecimal mother;
    private BigDecimal husband;
    private BigDecimal parents;
    private BigDecimal boys;
    private BigDecimal girls;
    private String status;
    private String statusDesc;
    private BigDecimal total;

    public BigDecimal getFather() {
        return father == null ? BigDecimal.ZERO : father;
    }

    public void setFather(BigDecimal father) {
        this.father = father;
    }

    public BigDecimal getMother() {
        return mother == null ? BigDecimal.ZERO : mother;
    }

    public void setMother(BigDecimal mother) {
        this.mother = mother;
    }

    public BigDecimal getHusband() {
        return husband == null ? BigDecimal.ZERO : husband;
    }

    public void setHusband(BigDecimal husband) {
        this.husband = husband;
    }

    public BigDecimal getParents() {
        return parents == null ? BigDecimal.ZERO : parents;
    }

    public void setParents(BigDecimal parents) {
        this.parents = parents;
    }

    public BigDecimal getBoys() {
        return boys == null ? BigDecimal.ZERO : boys;
    }

    public void setBoys(BigDecimal boys) {
        this.boys = boys;
    }

    public BigDecimal getGirls() {
        return girls == null ? BigDecimal.ZERO : girls;
    }

    public void setGirls(BigDecimal girls) {
        this.girls = girls;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusDesc() {
        return statusDesc;
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }

    public BigDecimal getTotal() {
        return total == null ? BigDecimal.ZERO : total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
