package ir.tamin.incomeBank.model.centralPayment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.tamin.incomeBank.util.DateUtils;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 *
 * @author s_maknooni
 */
@Entity
@Table(name = "GL_LOG")
public class Log implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "LOG_ID")
    private Long logId;
    @Column(name = "LOG_TEXT")
    private String logText;
    @Column(name = "CREATE_USER")
    private String createUser;
    @Column(name = "CREATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @JsonIgnore
    @OneToMany(mappedBy = "log", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    List<LogDetail> logDetails;
    @JoinColumn(name = "SYSTEM_TYPE_ID", referencedColumnName = "SYSTEM_TYPE_ID")
    @ManyToOne(optional = false)
    private GlSystemType system;
    @Column(name = "PRIORITY")
    private String priority;

    @Transient
    private String opDate;

    @Transient
    private String systemType;

    @Transient
    private int detailCount;

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public String getLogText() {
        return logText;
    }

    public void setLogText(String logText) {
        this.logText = logText;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public List<LogDetail> getLogDetails() {
        return logDetails;
    }

    public void setLogDetails(List<LogDetail> logDetails) {
        this.logDetails = logDetails;
    }

    public GlSystemType getSystem() {
        return system;
    }

    public void setSystem(GlSystemType system) {
        this.system = system;
    }

    public String getOpDate() {
        String date = DateUtils.getJalaliStandard(createDate, "/");

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(createDate);
        int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int seconds = calendar.get(Calendar.SECOND);

        String result = hours + ":" + minutes + ":" + seconds + " " + date;

        return result;
    }

    public void setOpDate(String opDate) {
        this.opDate = opDate;
    }

    public String getSystemType() {
        return system.getTitle();
    }

    public void setSystemType(String systemType) {
        this.systemType = systemType;
    }

    public int getDetailCount() {
        return logDetails.size();
    }

    public void setDetailCount(int detailCount) {
        this.detailCount = detailCount;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

}
