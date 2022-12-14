package ir.tamin.insurance.technical.model.user;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 *
 * @author m_hoseini
 */
@Entity
@Table(name = "BRANCHUSER")
@NamedQueries(
        {
            @NamedQuery(name = "BranchUser.getByBranch", query = "SELECT i FROM BranchUser i WHERE i.branchCode = :branchCode ")
        }
)
public class BranchUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @Column(name = "ID", nullable = false)
    private Long id;

    @Size(max = 10)
    @Pattern(regexp = "[0-9]*")
    @Column(name = "NATIONALID", length = 10, nullable = false)
    private String nationalId;

    @Size(max = 50)
    @Column(name = "BRANCHCODE", nullable = false)
    private String branchCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

}
