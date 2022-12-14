package ir.tamin.incomeBank.model.shortterm;

public class PayDetailResult {

    private String path;
    private String formateExcel;
    private String headId;
    private String payStep;

    private String risuid;
    private String natcode;
    private String accountNo;
    private String firstName;
    private String lastName;
    private String subSystem;
    private String branchCode;
    private String brhName;
    private String provinceCode;
    private String provinceName;
    private Long payAmount;
    private String payDocNo;
    private String nationality;
    private String calcStartDate;
    private String calcEndDate;
    private String firstConfirmUserDesc;
    private String firstConfirmDate;
    private String secondConfirmUserDesc;
    private String secondConfirmDate;
    private String sendToMaliUserDesc;
    private String sendToMaliDate;
    private String accCode;
    private String message;
    private String firstConfirmUser;
    private String secondConfirmUser;
    private String sendToMaliUser;
    private String title;
    private String pensionerId;
    private String alphabet;
    private String payDocDate;
    private String isHamkar;

    public PayDetailResult() {
    }

    //region کوتاه مدت
    public PayDetailResult(String risuid, String natcode, String accountNo, String firstName, String lastName, String title, String branchCode, String brhName, String provinceCode, String provinceName, Long payAmount, String payDocNo, String nationality, String calcStartDate, String calcEndDate, String firstConfirmDate, String secondConfirmDate, String sendToMaliDate, String accCode, String message, String firstConfirmUser, String secondConfirmUser, String sendToMaliUser) {
        this.risuid = risuid;
        this.natcode = natcode;
        this.accountNo = accountNo;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.branchCode = branchCode;
        this.brhName = brhName;
        this.provinceCode = provinceCode;
        this.provinceName = provinceName;
        this.payAmount = payAmount;
        this.payDocNo = payDocNo;
        this.nationality = nationality;
        this.calcStartDate = calcStartDate;
        this.calcEndDate = calcEndDate;
        this.firstConfirmDate = firstConfirmDate;
        this.secondConfirmDate = secondConfirmDate;
        this.sendToMaliDate = sendToMaliDate;
        this.accCode = accCode;
        this.message = message;
        this.firstConfirmUser = firstConfirmUser;
        this.secondConfirmUser = secondConfirmUser;
        this.sendToMaliUser = sendToMaliUser;

    }
    //endregion

    //region اسناد
    public PayDetailResult(String risuid, String natcode, String accountNo, String firstName, String lastName, String title, String branchCode, String brhName, String provinceCode, String provinceName, Long payAmount, String payDocNo, String nationality, String calcStartDate, String calcEndDate, String sendToMaliDate, String message, String sendToMaliUser) {
        this.risuid = risuid;
        this.natcode = natcode;
        this.accountNo = accountNo;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.branchCode = branchCode;
        this.brhName = brhName;
        this.provinceCode = provinceCode;
        this.provinceName = provinceName;
        this.payAmount = payAmount;
        this.payDocNo = payDocNo;
        this.nationality = nationality;
        this.calcStartDate = calcStartDate;
        this.calcEndDate = calcEndDate;
        this.sendToMaliDate = sendToMaliDate;
        this.message = message;
        this.sendToMaliUser = sendToMaliUser;

    }
    //endregion

    public PayDetailResult(String path, String formateExcel, String headId, String payStep) {
        this.path = path;
        this.formateExcel = formateExcel;
        this.headId = headId;
        this.payStep = payStep;
    }

    //region for pensionReport
    public PayDetailResult(String risuid, String natcode, String accountNo, String firstName, String lastName, String branchCode, String brhName, String provinceCode, String provinceName, Long payAmount, String payDocNo, String nationality, String calcStartDate, String calcEndDate, String firstConfirmDate, String secondConfirmDate, String sendToMaliDate, String message, String firstConfirmUser, String secondConfirmUser, String sendToMaliUser, String title, String pensionerId, String alphabet, String payDocDate, String isHamkar) {
        this.risuid = risuid;
        this.natcode = natcode;
        this.accountNo = accountNo;
        this.firstName = firstName;
        this.lastName = lastName;
        this.branchCode = branchCode;
        this.brhName = brhName;
        this.provinceCode = provinceCode;
        this.provinceName = provinceName;
        this.payAmount = payAmount;
        this.payDocNo = payDocNo;
        this.nationality = nationality;
        this.calcStartDate = calcStartDate;
        this.calcEndDate = calcEndDate;
        this.firstConfirmDate = firstConfirmDate;
        this.secondConfirmDate = secondConfirmDate;
        this.sendToMaliDate = sendToMaliDate;
        this.message = message;
        this.firstConfirmUser = firstConfirmUser;
        this.secondConfirmUser = secondConfirmUser;
        this.sendToMaliUser = sendToMaliUser;
        this.title = title;
        this.pensionerId = pensionerId;
        this.alphabet = alphabet;
        this.payDocDate = payDocDate;
        this.isHamkar = isHamkar;
    }
    //endregion

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getFormateExcel() {
        return formateExcel;
    }

    public void setFormateExcel(String formateExcel) {
        this.formateExcel = formateExcel;
    }

    public String getHeadId() {
        return headId;
    }

    public void setHeadId(String headId) {
        this.headId = headId;
    }

    public String getPayStep() {
        return payStep;
    }

    public void setPayStep(String payStep) {
        this.payStep = payStep;
    }

    public String getRisuid() {
        return risuid;
    }

    public void setRisuid(String risuid) {
        this.risuid = risuid;
    }

    public String getNatcode() {
        return natcode;
    }

    public void setNatcode(String natcode) {
        this.natcode = natcode;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSubSystem() {
        return subSystem;
    }

    public void setSubSystem(String subSystem) {
        this.subSystem = subSystem;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getBrhName() {
        return brhName;
    }

    public void setBrhName(String brhName) {
        this.brhName = brhName;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public Long getPayAmount() {
        return payAmount;
    }

    public void setPayAmount(Long payAmount) {
        this.payAmount = payAmount;
    }

    public String getPayDocNo() {
        return payDocNo;
    }

    public void setPayDocNo(String payDocNo) {
        this.payDocNo = payDocNo;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getCalcStartDate() {
        return calcStartDate;
    }

    public void setCalcStartDate(String calcStartDate) {
        this.calcStartDate = calcStartDate;
    }

    public String getCalcEndDate() {
        return calcEndDate;
    }

    public void setCalcEndDate(String calcEndDate) {
        this.calcEndDate = calcEndDate;
    }

    public String getFirstConfirmUserDesc() {
        return firstConfirmUserDesc;
    }

    public void setFirstConfirmUserDesc(String firstConfirmUserDesc) {
        this.firstConfirmUserDesc = firstConfirmUserDesc;
    }

    public String getFirstConfirmDate() {
        return firstConfirmDate;
    }

    public void setFirstConfirmDate(String firstConfirmDate) {
        this.firstConfirmDate = firstConfirmDate;
    }

    public String getSecondConfirmUserDesc() {
        return secondConfirmUserDesc;
    }

    public void setSecondConfirmUserDesc(String secondConfirmUserDesc) {
        this.secondConfirmUserDesc = secondConfirmUserDesc;
    }

    public String getSecondConfirmDate() {
        return secondConfirmDate;
    }

    public void setSecondConfirmDate(String secondConfirmDate) {
        this.secondConfirmDate = secondConfirmDate;
    }

    public String getSendToMaliUserDesc() {
        return sendToMaliUserDesc;
    }

    public void setSendToMaliUserDesc(String sendToMaliUserDesc) {
        this.sendToMaliUserDesc = sendToMaliUserDesc;
    }

    public String getSendToMaliDate() {
        return sendToMaliDate;
    }

    public void setSendToMaliDate(String sendToMaliDate) {
        this.sendToMaliDate = sendToMaliDate;
    }

    public String getAccCode() {
        return accCode;
    }

    public void setAccCode(String accCode) {
        this.accCode = accCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFirstConfirmUser() {
        return firstConfirmUser;
    }

    public void setFirstConfirmUser(String firstConfirmUser) {
        this.firstConfirmUser = firstConfirmUser;
    }

    public String getSecondConfirmUser() {
        return secondConfirmUser;
    }

    public void setSecondConfirmUser(String secondConfirmUser) {
        this.secondConfirmUser = secondConfirmUser;
    }

    public String getSendToMaliUser() {
        return sendToMaliUser;
    }

    public void setSendToMaliUser(String sendToMaliUser) {
        this.sendToMaliUser = sendToMaliUser;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPensionId() {
        return pensionerId;
    }

    public void setPensionId(String pensionId) {
        this.pensionerId = pensionId;
    }

    public String getAlphabet() {
        return alphabet;
    }

    public void setAlphabet(String alphabet) {
        this.alphabet = alphabet;
    }

    public String getPayDocDate() {
        return payDocDate;
    }

    public void setPayDocDate(String payDocDate) {
        this.payDocDate = payDocDate;
    }

    public String getIsHamkar() {
        return isHamkar;
    }

    public void setIsHamkar(String isHamkar) {
        this.isHamkar = isHamkar;
    }

}
