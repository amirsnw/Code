/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model.user;

import java.io.Serializable;

/**
 *
 * @author l_eivazi
 */

public class Role implements Serializable {

    private static final long serialVersionUID = 1L;
    
    //private String roleId;
    private String roleName;
    private String displayName;
    private String description;
    private String entityId;
      private String roleCategory;

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    
    
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    

//    public String getRoleId() {
//        return roleId;
//    }
//
//    public void setRoleId(String roleId) {
//        this.roleId = roleId;
//    }

    public String getRoleCategory() {
        return roleCategory;
    }

    public void setRoleCategory(String roleCategory) {
        this.roleCategory = roleCategory;
    }

 
    

}
