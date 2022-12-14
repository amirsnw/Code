package ir.tamin.incomeBank.model.identityManager;

import java.io.Serializable;
import java.util.List;

/**
 *
 * @author s_maknooni
 */
public class Organization implements Serializable {

    public String entityId;
    public String organizationName;
    public String code;
    public String type;
    public Long actKey;
    public Organization parent;
    public List<Organization> children;
    public OrganizationDetail organizationDetail;

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public Long getActKey() {
        return actKey;
    }

    public void setActKey(Long actKey) {
        this.actKey = actKey;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Organization getParent() {
        return parent;
    }

    public void setParent(Organization parent) {
        this.parent = parent;
    }

    public List<Organization> getChildren() {
        return children;
    }

    public void setChildren(List<Organization> children) {
        this.children = children;
    }

    public OrganizationDetail getOrganizationDetail() {
        return organizationDetail;
    }

    public void setOrganizationDetail(OrganizationDetail organizationDetail) {
        this.organizationDetail = organizationDetail;
    }
}
