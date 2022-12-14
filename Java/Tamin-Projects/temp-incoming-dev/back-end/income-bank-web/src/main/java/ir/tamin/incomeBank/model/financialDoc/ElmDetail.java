package ir.tamin.incomeBank.model.financialDoc;

import java.math.BigDecimal;

public class ElmDetail {

    protected String vahedcode;
    protected String seqdetail;
    protected String codkol;
    protected String codmoi;
    protected String codtaf;
    protected String codjoz;
    protected String codriz;
    protected String detaildesc;
    protected BigDecimal amoubed;
    protected BigDecimal amoubes;
    protected String typedoc;
    protected String value;
    protected String checkdate;
    protected String year;

    public ElmDetail() {
    }

    public ElmDetail(String vahedcode, String codkol, String codmoi, String codtaf,
                     String codjoz, String codriz, String detaildesc, BigDecimal amoubed, BigDecimal amoubes,
                     String typedoc, String value, String checkdate, String year) {
        this.vahedcode = vahedcode;
        this.codkol = codkol;
        this.codmoi = codmoi;
        this.codtaf = codtaf;
        this.codjoz = codjoz;
        this.codriz = codriz;
        this.detaildesc = detaildesc;
        this.amoubed = amoubed;
        this.amoubes = amoubes;
        this.typedoc = typedoc;
        this.value = value;
        this.checkdate = checkdate;
        this.year = year;
    }

    public String getVahedcode() {
        return vahedcode;
    }

    public void setVahedcode(String vahedcode) {
        this.vahedcode = vahedcode;
    }

    public String getSeqdetail() {
        return seqdetail;
    }

    public void setSeqdetail(String seqdetail) {
        this.seqdetail = seqdetail;
    }

    public String getCodkol() {
        return codkol;
    }

    public void setCodkol(String codkol) {
        this.codkol = codkol;
    }

    public String getCodmoi() {
        return codmoi;
    }

    public void setCodmoi(String codmoi) {
        this.codmoi = codmoi;
    }

    public String getCodtaf() {
        return codtaf;
    }

    public void setCodtaf(String codtaf) {
        this.codtaf = codtaf;
    }

    public String getCodjoz() {
        return codjoz;
    }

    public void setCodjoz(String codjoz) {
        this.codjoz = codjoz;
    }

    public String getCodriz() {
        return codriz;
    }

    public void setCodriz(String codriz) {
        this.codriz = codriz;
    }

    public String getDetaildesc() {
        return detaildesc;
    }

    public void setDetaildesc(String detaildesc) {
        this.detaildesc = detaildesc;
    }

    public BigDecimal getAmoubed() {
        return amoubed;
    }

    public void setAmoubed(BigDecimal amoubed) {
        this.amoubed = amoubed;
    }

    public BigDecimal getAmoubes() {
        return amoubes;
    }

    public void setAmoubes(BigDecimal amoubes) {
        this.amoubes = amoubes;
    }

    public String getTypedoc() {
        return typedoc;
    }

    public void setTypedoc(String typedoc) {
        this.typedoc = typedoc;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getCheckdate() {
        return checkdate;
    }

    public void setCheckdate(String checkdate) {
        this.checkdate = checkdate;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
