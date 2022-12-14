package ir.tamin.insurance.technical.business.general;


public enum OperationEnum {

    CANSELPLAN("00"),
    DEFAULT("01"),
    EDITINFO("02"),
    EDITBYFIELD("03"),
    EDITFILETYPE("04"),
    EDITINFODBEDT("05"),
    EDITSTATUS("06"),
    CREATEREFUND("07"),
    EDITDEFAULT("08"),
    EDITCONFIRM("09"),
    EDITFLAGWAGE("10"),
    PROVINCEANSWER("11"),
    PROVINCEDELETESPECIALANSWER("12"),
    SANDANSWER("13"),
    SANDDELETESPECIALANSWER("14"),
    EDITGETINFO("15")
    ;

    String operationType;

    private OperationEnum(String operationType) {
        this.operationType = operationType;
    }

    public String getOperationType() {
        return operationType;
    }

    public static OperationEnum find(String operationType) {
        for (OperationEnum operationEnum : OperationEnum.values()) {
            if (operationType.equals(operationEnum.getOperationType())) {
                return operationEnum;
            }
        }
        return DEFAULT;
    }
}
