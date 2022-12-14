package ir.tamin.incomeBank.model.financialDoc;

import java.util.List;

public class ElmAccVoucher {

    private ElmHeader header;
    private List<ElmDetail> details;

    public ElmHeader getHeader() {
        return header;
    }

    public void setHeader(ElmHeader header) {
        this.header = header;
    }

    public List<ElmDetail> getDetails() {
        return details;
    }

    public void setDetails(List<ElmDetail> details) {
        this.details = details;
    }
}
