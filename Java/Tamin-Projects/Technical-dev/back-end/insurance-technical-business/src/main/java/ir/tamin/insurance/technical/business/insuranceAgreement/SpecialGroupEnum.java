package ir.tamin.insurance.technical.business.insuranceAgreement;
/**
 *
 * @author m_hoseini
 */
public enum SpecialGroupEnum {

    DEFAULT("00"),
    //اعضای نظام دامپزشکی کشور
    DAMPEZESHKI("01"),
    //اعضای عضو سازمان نظام پزشکي 
    NEZAMPEZESHKI("02"),
    //بسیجیان 
    BASIJIYAN("03"),
    //رانندگان
    RANANDEGAN("04"),
    //راننده-برون شهری
    RANANDEGANBOROON("01"),
    //راننده-درون شهری
    RANANDEGANDAROON("02"),
    //هنرمندان و صنعتگران
    HONARMANDAN("05"),
    //نمایندگی بوتان
    BOOTAN("06"),
    //مداحان و شاعران اهل بیت
    MADAHAN("07"),
    //جانبازي
    JANBAZAN("08"),
    //باربران
    BARBARAN("09"),
    //بیمه ایران 
    BIMEHIRAN("10"),
    //ایرانگردی و جهانگردی
    IRANGARDI("11"),
    //بیمه معلم 
    BIMEHMOALEM("12"),
    //وکلا و کارشناسان قوه قضاییه
    VOKALA("13"),
    //قالیبافان
    GHALIBAFAN("14"),
    //بهزیستی
    BEHZISTI("15"),
    //صیادی
    SAYADAN("16"),
    //کارورزان
    KARVARZAN("17"),
    //صنفی
    SENFI("18"),
    //همسر و فرزند شهید
    SHAHID("19");

    String code;
    private SpecialGroupEnum(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static SpecialGroupEnum find(String operationType) {
        for (SpecialGroupEnum specialGroupEnum : SpecialGroupEnum.values()) {
            if (operationType.equals(specialGroupEnum.getCode())) {
                return specialGroupEnum;
            }
        }
        return DEFAULT;
    }

}
