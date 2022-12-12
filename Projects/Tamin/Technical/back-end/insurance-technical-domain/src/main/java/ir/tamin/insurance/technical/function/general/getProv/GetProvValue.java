package ir.tamin.insurance.technical.function.general.getProv;

import ir.tamin.framework.domain.function.DBFunctionValue;

/**
 *
 * @author m_hoseini
 */
public class GetProvValue implements DBFunctionValue {

    private String provinceCode;

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }
    
    
}
