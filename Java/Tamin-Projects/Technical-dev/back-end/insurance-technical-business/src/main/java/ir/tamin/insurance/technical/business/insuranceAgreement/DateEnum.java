package ir.tamin.insurance.technical.business.insuranceAgreement;

/**
 *
 * @author m_hoseini
 */
public enum DateEnum {
    
    DAMPEZESHKIDATE("13860301"),
    NEZAMPEZESHKIDATE("13850101"),
    BASIJIANDATE("13840429"),
    HONARMANDANDATE("13850701"),
    MADAHANDATE("13841201"),
    BIMEHIRANDATE("13860301"),
    IRANGARDIDATE("13860301"),
    BIMEHMOALEMDATE("13870301"),
    VOKALADATE("13890101"),
    RANANDEGANDAROON("13860101");

    private String code;

    private DateEnum(String code) {
        this.code = code;
    }
    
    public String getCode() {
        return code;
    }

    public static DateEnum getDateEnumByCode(String code) {
        for (DateEnum dateEnum : DateEnum.values()) {
            if (dateEnum.getCode().equals(code)) {
                return dateEnum;
            }
        }
        return null;
    }
}
