package ir.tamin.incomeBank.model.identityManager;

import java.io.Serializable;

/**
 *
 * @author s_maknooni
 */
public class GeoUnit implements Serializable {

    private Integer id;
    private String code;
    private String title;
    private String description;
    private GeoUnitType type;
    private GeoUnit parent;
    private Byte isDefault;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public GeoUnitType getType() {
        return type;
    }

    public void setType(GeoUnitType type) {
        this.type = type;
    }

    public GeoUnit getParent() {
        return parent;
    }

    public void setParent(GeoUnit parent) {
        this.parent = parent;
    }

    public Byte getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Byte isDefault) {
        this.isDefault = isDefault;
    }


}

