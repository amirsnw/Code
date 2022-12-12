package ir.tamin.insurance.technical.model.guardian;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//import ir.tamin.insurance.technical.model.guardian.Account;
//import ir.tamin.insurance.technical.model.guardian.Contact;
//import ir.tamin.insurance.technical.model.guardian.EducationEntity;
//import ir.tamin.insurance.technical.model.guardian.RelationWithTamin;

/**
 *
 * @author L_Eivazi
 */


@JsonIgnoreProperties(ignoreUnknown = true)
public class SendModel {

    private Personal personal;
    private Personal parent;
//    private Account accounts;
//    private Contact contacts;
//    private EducationEntity educations;
    //private RelationWithTamin relationWithTamins;

    public Personal getPersonal() {
        return personal;
    }

    public void setPersonal(Personal personal) {
        this.personal = personal;
    }

    public Personal getParent() {
        return parent;
    }

    public void setParent(Personal parent) {
        this.parent = parent;
    }
//
//    public Account getAccounts() {
//        return accounts;
//    }
//
//    public void setAccounts(Account accounts) {
//        this.accounts = accounts;
//    }
//
//    public Contact getContacts() {
//        return contacts;
//    }
//
//    public void setContacts(Contact contacts) {
//        this.contacts = contacts;
//    }
//
//    public EducationEntity getEducations() {
//        return educations;
//    }
//
//    public void setEducations(EducationEntity educations) {
//        this.educations = educations;
//    }

//    public RelationWithTamin getRelationWithTamins() {
//        return relationWithTamins;
//    }
//
//    public void setRelationWithTamins(RelationWithTamin relationWithTamins) {
//        this.relationWithTamins = relationWithTamins;
//    }

}
