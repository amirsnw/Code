package ir.tamin.incomeBank.model.identityManager;

import java.io.Serializable;

/**
 *
 * @author s_maknooni
 */
public class GeoUnitType implements Serializable {

     private Integer id;
    private String code;
    private String title;
    private GeoUnitType parent;

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

    public GeoUnitType getParent() {
        return parent;
    }

    public void setParent(GeoUnitType parent) {
        this.parent = parent;
    }

}
