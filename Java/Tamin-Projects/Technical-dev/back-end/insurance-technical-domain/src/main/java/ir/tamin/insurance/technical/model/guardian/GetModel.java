
package ir.tamin.insurance.technical.model.guardian;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GetModel {

    private String UserName;
    private String Password;
    private String NationalCode;

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String UserName) {
        this.UserName = UserName;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String Password) {
        this.Password = Password;
    }

    public String getNationalCode() {
        return NationalCode;
    }

    public void setNationalCode(String NationalCode) {
        this.NationalCode = NationalCode;
    }

}


