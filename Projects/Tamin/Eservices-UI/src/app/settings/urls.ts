import {environment} from '../../environments/environment';

export class Urls {
  public static baseurl = environment.baseurl_base;
  // public static baseurlTEST = environment.baseurl_baseTest;ng serveng
  public static baseurl_sso = environment.baseurl_sso;
  public static baseurl_gov = environment.baseurl_gov;
  public static baseurl_sabeghe2 = environment.baseurl_sabeghe2;
  // public static baseurl_eblagh2 = environment.baseurl_eblagh2;
  public static baseurl_list = environment.baseurl_list;
  public static baseurl_account = environment.baseurl_account;
  public static baseurl_ep = ''; // environment.baseurl_ep;
  public static TicketAdminSso = Urls.baseurl_sso + '/ticket-by-sms/request-ticket-sso';
  public static ticket_crm = Urls.baseurl_sso + '/ticket';
  public static crm_question = Urls.baseurl + '/crm-question';
  public static crm_question_info = Urls.baseurl + '/crm-tiket/info';
  public static EblaghMofasaSso = Urls.baseurl_sso + '/eblagh-fram-saba/get-eblagh';
  public static EblaghMofasaPdfSso = Urls.baseurl_sso + '/eblagh-fram-saba/get-eblagh-pdf';
  /*---------------------------------------------------------------------------------------------------------*/
  public static Deserve = Urls.baseurl + '/booklet-req/deserve';
  public static DeserveSso = Urls.baseurl_sso + '/deserve/deserve-sso';
  /*---------------------------------------------------------------------------------------------------------*/
  public static BookletElectronicInfoSso = Urls.baseurl_sso + '/booklet-req/info';
  public static BookletFirstSso = Urls.baseurl_sso + '/booklet-req/first';
  public static BookletQuotasSso = Urls.baseurl_sso + '/booklet-req/quotas';
  public static BookletCitiesSso = Urls.baseurl_sso + '/booklet-req/cities';
  public static CheckPilotGeoSso = Urls.baseurl_sso + '/geo/pilot-geo';
  public static CityBranchesSso = Urls.baseurl_sso + '/booklet-req/branches';
  public static BookletElectronicRequestSso = Urls.baseurl_sso + '/booklet-req';
  public static BookletPictureSso = Urls.baseurl_sso + '/booklet-req/image';
  public static CheckIamgeSso = Urls.baseurl_sso + '/erecords/check-image';
  /*---------------------------------------------------------------------------------------------------------*/
  public static BookletNew = Urls.baseurl + '/booklet-req/subdominant';
  public static BranchesAll = Urls.baseurl + '/booklet-req/org-full';
  public static BranchesLocal = Urls.baseurl + '/booklet-req/org-local';
  public static BookletElectronicRequest = Urls.baseurl + '/booklet-req';
  public static BookletPicture = Urls.baseurl + '/booklet-req/image';
  public static BookletFirst = Urls.baseurl + '/booklet-req/first';
  public static BookletEligibleTo = Urls.Deserve;
  public static BookletElectronicInfo = Urls.baseurl + '/booklet-req/info';
  public static BookletQuotas = Urls.baseurl + '/booklet-req/quotas';
  public static BookletPhoto = Urls.baseurl + '/booklet-req/verify';
  public static CityBranches = Urls.baseurl + '/booklet-req/branches';
  public static BookletCities = Urls.baseurl + '/booklet-req/cities';
  public static BookletDeliveryProgram = Urls.baseurl + '/proxy/models/booklet-delivery-report';
  public static RightelBookletDeliveryReport = Urls.baseurl + '/delivery/delivery-report';
  public static CheckPilotGeo = Urls.baseurl + '/geo/pilot-geo';
  public static BookletOrder = Urls.baseurl + '/booklet-order'; // /proxy/models/request-order';
  public static BookletOrderSave = Urls.baseurl + '/booklet-order';
  public static RequestDocument = Urls.baseurl + '/proxy/models/request-document-entity';
  public static DocumentFile = Urls.baseurl + '/upload-image'; // + 'http://eservices.test.org:9090/api/upload-image';

  // public static DocumentFile = /*Urls.baseurl +*/ 'http://eservices.test.org:9090/api/upload-image';

  public static BookletDeliverTypes = Urls.baseurl + '/delivery/partners';
  public static BookletQuota = Urls.baseurl + '/geo/max-quota-branch';
  /*---------------------------------------------------------------------------------------------------------*/
  public static InspectionListManager = Urls.baseurl + '/inspection-header/get-all-manager';
  public static InspectionList = Urls.baseurl + '/inspection-header/get-all-insurance';
  public static InspectionListSso = Urls.baseurl_sso + '/inspection-header/get-all';
  public static InspectionReport = Urls.baseurl + '/inspection-report';
  public static InspectionReportSso = Urls.baseurl_sso + '/inspection-report';
  public static InspectionObjection = Urls.baseurl + '/inspection-request';
  public static InspectionObjectionGet = Urls.baseurl + '/inspection-header/for-insurance';
  public static InspectionObjectionPost = Urls.baseurl + '/inspection-request';
  public static InspectionBusinessStarterIndicator = Urls.baseurl + '/legal-request/get-all';
  public static InspectionLegalReport = Urls.baseurl + '/inspection-report/legal-request';
  public static InspectionTicketAdmin = Urls.baseurl_sso + '/inspection-header/requestTicketSSO';
  public static RequestTicketAdmin = Urls.baseurl_sso + '/history-services/requestTicketSSO';
  public static ElectronicPrescription = Urls.baseurl + '/electronicPrescription';
  public static HistoryRequest = Urls.baseurl + '/history-services/historyinfos';
  public static HistoryRequestAdmin = Urls.baseurl_sso + '/history-services/historyinfosSSO';
  public static InsuranceRequest = Urls.baseurl + '/history-services/userinfos';
  public static InsuranceRequestAdmin = Urls.baseurl_sso + '/history-services/userinfosSSO';
  public static SalaryRequest = Urls.baseurl + '/history-services/dastmozdinfos';
  public static SalaryRequestAdmin = Urls.baseurl_sso + '/history-services/dastmozdinfosSSO';
  public static OccupationRequest = Urls.baseurl + '/history-services/historyjobinfos';
  public static OccupationRequestAdmin = Urls.baseurl_sso + '/history-services/historyjobinfosSSO';
  public static CombinedHistoryRequest = Urls.baseurl + '/history-services/talfighinfos';
  public static CombinedHistoryRequestAdmin = Urls.baseurl_sso + '/history-services/talfighinfosSSO';
  public static downloadDastmozd = Urls.baseurl + '/historyreport-services/dastmozd';
  public static downloadTalfigh = Urls.baseurl + '/historyreport-services/talfigh';
  public static downloadHistory = Urls.baseurl + '/historyreport-services/year';
  public static HistorySendToEblagh = Urls.baseurl + '/historyreport-services/sendeblagh';
  public static HistorySendToInstitution = Urls.baseurl + '/historyreport-services/sendinstitution';
  public static loginInfo = Urls.baseurl + '/login-services/logininfo';
  public static CheckStatus = Urls.baseurl + '/historyprotest-services/checkstatusconflict';
  public static ConflictObjectionGet = Urls.baseurl + '/historyprotest-services/conflicthistories';
  public static ConflictObjectionSave = Urls.baseurl + '/historyprotest-services/saveconflict';
  public static ConflictObjectionConfirm = Urls.baseurl + '/historyprotest-services/confirmconflict';
  public static FinalConfirmConflictHistory = Urls.baseurl + '/historyprotest-services/finalconfirmconflict';
  public static CheckStatusUnSaved = Urls.baseurl + '/historyprotest-services/checkstatusnotexist';
  public static NotexistObjection = Urls.baseurl + '/historyprotest-services/getnotexistrequests';
  public static NotexistObjectionDelete = Urls.baseurl + '/historyprotest-services/deletenotexist';
  public static NotexistObjectionSave = Urls.baseurl + '/historyprotest-services/savenotexist';
  public static NotexistObjectionConfirm = Urls.baseurl + '/historyprotest-services/confirmnotexist';
  public static FinalConfirmUnsavesHistory = Urls.baseurl + '/historyprotest-services/finalconfirmnotexist';
  public static InsuranceTypes = Urls.baseurl + '/proxy/models/insurance-type';
  public static ObjectionResult = Urls.baseurl + '/historyprotest-services/getprotestresult';
  public static ObjectionUnsavedHistoryRequest = Urls.baseurl + '/historyprotest-services/viewprotestnotexist';
  public static ObjectionConflictHistoryRequest = Urls.baseurl + '/historyprotest-services/viewprotestconflict';
  /*-----------------insurance registration----------------------------------------------------------------------------------------*/
  public static banks = Urls.baseurl + '/banks';
  public static workshop = Urls.baseurl + '/baseinfo/workshop';
  public static baseEducation = Urls.baseurl + '/baseinfo/base-education';
  public static educationFields = Urls.baseurl + '/proxy/models/education-field';
  public static illnessTypes = Urls.baseurl + '/baseinfo/illness-types';
  public static Job = Urls.baseurl + '/baseinfo/job';
  public static Account = Urls.baseurl + '/proxy/models/account';
  public static Account_POST = Urls.baseurl + '/accounts';
  public static Contact = Urls.baseurl + '/proxy/models/contact';
  public static Education = Urls.baseurl + '/proxy/models/education-entity';
  public static BaseDependencytypes = Urls.baseurl + '/proxy/models/dependency';
  public static personal = Urls.baseurl + '/central-reg/personal';
  public static relationOlds = Urls.baseurl + '/relation-tamins/old';

  public static PersonalPost = Urls.baseurl + '/subdominants'; // '/proxy/models/personal';

  public static relationAll = Urls.baseurl + '/relation-tamins/all';
  public static relationAllByNatcode = Urls.baseurl + '/relation-tamins/allByNatcode';
  public static SSORelationAll = Urls.baseurl_sso + '/relation-tamins/all';
  public static relationDone = Urls.baseurl_sso + '/relation-tamins/request-child';

  public static RegRequestPut = Urls.baseurl + '/requests/confirm';
  public static RegRequestSubPut = Urls.baseurl + '/requests/confirm/subdominant';
  public static Subdominant = Urls.baseurl + '/personals/subdominant';
  public static SSOSubdominant = Urls.baseurl_sso + '/personals/subdominant/sso';
  public static Questionnaire = Urls.baseurl + '/personals/report';
  public static RegSummary = Urls.baseurl + '/personals/summary';
  public static MasterAccount = Urls.baseurl + '/personals/accounts';
  public static PersonalImage = Urls.baseurl + '/personals/image-v2';
  public static PersonalImageSubdominant = Urls.baseurl + '/personals/image-subdominant-v2';
  public static SSOPersonalImage = Urls.baseurl_sso + '/personals/image/sso';
  public static SSOPersonalImageSubdominant = Urls.baseurl_sso + '/personals/image-subdominant/sso';
  public static PersonalRelation = Urls.baseurl + '/personals/relation';
  public static SSoPersonalRelation = Urls.baseurl_sso + '/personals/relation/sso';
  public static SSO_Account = Urls.baseurl_sso + '/personals/accounts/sso';
  // TODO public static RelationWithTamin = Urls.baseurl + '/proxy/models/relation-with-tamin';
  public static RelationWithTamin = Urls.baseurl + '/relation-tamins';
  public static EmployeeRegistration = Urls.baseurl + '/employers';
  public static IsPersonalNew = Urls.baseurl + '/relation-tamins/isnew';
  public static GetSubdominantOffice = Urls.baseurl + '/subdominants/getOfficeData';
  public static GetActiveBranch = Urls.baseurl + '/subdominants/getInsuredActiveBranch';
  public static GetSubdominantOfficeSSO = Urls.baseurl_sso + '/subdominants/getOfficeData';
  public static PersonalPostSSO = Urls.baseurl_sso + '/subdominants';
  public static GetActiveBranchSSO = Urls.baseurl_sso + '/subdominants/getInsuredActiveBranch';
  public static SSOActiveSubdominant = Urls.baseurl_sso + '/personals/subdominant-active/sso';
  // public static SaveInsured = Urls.baseurl + '/insured';
  public static ExceptionPersonal = Urls.baseurl_sso + '/exception-personal';
  public static ExceptionPersonalActive = Urls.baseurl_sso + '/exception-personal/active';
  public static ExceptionPersonalInActive = Urls.baseurl_sso + '/exception-personal/inactive';

  /*---------------------------------------------------------------------------------------------------------*/
  public static Request = Urls.baseurl + '/requests';
  public static Document = Urls.baseurl + '/documents';
  public static UploadImage = /*Urls.baseurl +  */'http://172.16.13.248:7001/eservices/api/upload-image'; /*'http://h-poorsafar.tamin.org:7001/eservices/api/upload-image';*/
  // public static UploadImage = Urls.baseurl + '/upload-image'; // 'http://eservices.test.org:9090/api/upload-image';
  public static ErrorRequest = Urls.baseurl + '/request-error';
  /*---------------------------------------------------------------------------------------------------------*/
  public static PostalAddress = Urls.baseurl + '/workshop-services/post/inquiry';
  /*---------------------workshop------------------------------------------------------------------------------------*/
  public static WorkshopsInfo = 'http://172.16.13.190:7001/eservices/api/workshop-services/get-workshops-info';
  public static WorkshopsStackholders = Urls.baseurl + '/workshop-services/workshop-stackholders/get-all';
  public static employerByLegal = 'http://R-AZADI.tamin.org:7001/eservices/api/workshop-services/employer/get-all-workshops';
  public static contractByWorkshop = Urls.baseurl + '/workshop-services/contract/get-all';
  public static requestSpecification = Urls.baseurl + '/workshop-services/request-dispatch';
  public static contractStatus = Urls.baseurl + '/workshop-services/contract-status';
  public static clearencCertificateByWorkshop = Urls.baseurl + '/workshop-services/contract/get-all';
  public static contractByWorkshopFA = Urls.baseurl_sso + '/workshop-services/contract/get-all-FA';
  public static workshopsMembers = Urls.baseurl + '/workshop-services/member/get-all';
  public static workshopsDebit = Urls.baseurl + '/workshop-services/workshop-debit';
  public static businessStarterIndicator = Urls.baseurl + '/workshop-services/workshop-debit';
  public static registerPropertyRegistration = Urls.baseurl + '/workshop-services/mad37/get-all';
  public static clearanceCertificateMad38Heads = Urls.baseurl + '/workshop-services/mad38-head';
  public static clearanceCertificateMad38Details = Urls.baseurl + '/workshop-services/mad38-detail';
  public static clearanceCertificateMad38HeadsFA = Urls.baseurl_sso + '/workshop-services/mad38-head';
  public static clearanceCertificateMad38DetailsFA = Urls.baseurl_sso + '/workshop-services/mad38-detail';
  public static clearanceCertificateMad38Report = Urls.baseurl_sso + '/workshop-services/report';
  public static WorkshopUsers = Urls.baseurl + '/workshop-services/workshop/users';
  public static clearanceCertificateMad37Heads = Urls.baseurl + '/workshop-services/mad37-head';
  public static clearanceCertificateMad37Details = Urls.baseurl + '/workshop-services/mad37-detail';
  public static clearanceCertificateBuildingApproval = Urls.baseurl + '/workshop-services/building-approvals-certificate';
  public static clearanceCertificateBusinessCards = Urls.baseurl + '/workshop-services/business-cards-certificate';
  public static clearanceCertificateLoanRepayments = Urls.baseurl + '/workshop-services/loan-repayments-certificate';
  public static clearanceCertificatePropertyMortgages = Urls.baseurl + '/workshop-services/property-mortgages-certificate';
  public static getAllContractInquiryLicenses = Urls.baseurl_sso + '/workshop-services/con-inq-lic/get-all';
  public static saveContractInquiryLicenses = Urls.baseurl_sso + '/workshop-services/con-inq-lic/save';
  public static Mode38Report = Urls.baseurl_sso + '/workshop-services/report';


  public static importantPapers = Urls.baseurl + '/important-papers';
  public static employerWorkshopsCRM = Urls.baseurl_sso + '/workshop-services/get-all-workshops';
  public static workshopDebitCRM = Urls.baseurl_sso + '/workshop-services/workshop-debit-all';
  public static insuranceProcrestination = Urls.baseurl + '/workshop-services/register-workshops-insurance-procrastination';
  public static getInsuranceProcrestination = Urls.baseurl + '/workshop-services/get-workshops-insurance-procrastination';
  public static udpateInsuranceProcrestination = Urls.baseurl + '/workshop-services/update-workshops-insurance-procrastination';
  public static approveInsuranceProcrestination = Urls.baseurl + '/workshop-services/approve-workshops-insurance-procrastination';
  public static SSO_insuranceProcrestination = Urls.baseurl_sso + '/workshop-services/register-workshops-insurance-procrastination';
  public static SSO_getInsuranceProcrestination = Urls.baseurl_sso + '/workshop-services/get-workshops-insurance-procrastination';
  public static SSO_udpateInsuranceProcrestination = Urls.baseurl_sso + '/workshop-services/update-workshops-insurance-procrastination';
  public static SSO_approveInsuranceProcrestination = Urls.baseurl_sso + '/workshop-services/approve-workshops-insurance-procrastination';
  public static SSO_getPaymentSheets = Urls.baseurl_sso + '/workshop-services/payment-sheets-all';
  public static getPaymentSheets = Urls.baseurl + '/workshop-services/payment-sheets';
  public static SSO_DebitReason = Urls.baseurl_sso + '/debit-reason';
  public static debitReason = Urls.baseurl + '/debit-reason';
  public static assignersContract = Urls.baseurl + '/workshop-services/assigners-contracts';
  public static employerEservicesAgreement = Urls.baseurl + '/workshop-services/employer-agreement-info';
  public static employerEservicesAgreementEmpInfo = Urls.baseurl + '/workshop-services/employer-info';
  public static employerEservicesAgreementRegister = Urls.baseurl + '/workshop-services/employer-agreement';
  public static employerEservicesAgreementWorkshopsInfo = Urls.baseurl + '/workshop-services/employer-workshops-info';
  public static workshopSpecialContract = Urls.baseurl + '/workshop-services/special-contracts';
  public static EMPLOYER_ESERVICES_AGREEMENT_WORKSHOPS_INFO_WITH_OUT_CONTRACT = Urls.baseurl + '/workshop-services/employer-workshops-info-with-out-contract';
  public static CONTRACT_EMPLOYER_WORKSHOP_INFO = Urls.baseurl + '/workshop-services/contract-employer-workshop-info';
  public static SSO_employerEservicesAgreementWorkshopsInfo = Urls.baseurl_sso + '/workshop-services/employer-workshops-info';
  public static employerEservicesAgreementRequestTicket = Urls.baseurl + '/workshop-services/request-ticket';
  public static GET_EMPLOYER_AGREEMENT_BY_WORKSHOP_ID = Urls.baseurl + '/workshop-services/get-employer-agreement-by-workshop-id';
  public static workshopsActivitys = Urls.baseurl + '/workshop-services/workshops-activity';
  public static workshopsTrades = Urls.baseurl + '/workshop-services/workshops-trade';
  public static GetActiveBranchs = Urls.baseurl + '/workshop-services/branches';
  public static buildingWorkshopsRequest = Urls.baseurl + '/bld-request-services/building-workshops';
  public static buildingWorkshopsRequestSSO = Urls.baseurl_sso + '/bld-request-services/building-workshops';
  public static buildingWorkshopsOwners = Urls.baseurl + '/bld-request-services/building-workshops-owners';
  public static buildingWorkshopsOwnersSSO = Urls.baseurl_sso + '/bld-request-services/building-workshops-owners';
  public static buildingWorkshopsIssuancePaymentSheet = Urls.baseurl + '/bld-request-services/issuance-payment-sheet-building-workshop-request';
  public static buildingWorkshopsUpdateIfInstallment = Urls.baseurl + '/bld-request-services/update-if-installmet';
  public static buildingWorkshopsByPK = Urls.baseurl + '/bld-request-services/building-workshops-requests-by-id';
  public static buildingWorkshopsByPKSSO = Urls.baseurl_sso + '/bld-request-services/building-workshops-requests-by-id';
  public static buildingWorkshopsPaymentSheetList = Urls.baseurl + '/bld-request-services/building-payment-sheet-list-info';
  public static buildingWorkshopsPaymentSheetListSSO = Urls.baseurl_sso + '/bld-request-services/building-payment-sheet-list-info';
  public static buildingWorkshopsCertificationReport = Urls.baseurl + '/bld-request-services/building-workshop-certificate-report';
  public static buildingWorkshopsCertificationReportSSO = Urls.baseurl_sso + '/bld-request-services/building-workshop-certificate-report';
  public static buildingWorkshopsPaymentSheetReport = Urls.baseurl + '/bld-request-services/building-workshop-payment-sheet-report';
  public static buildingWorkshopsPaymentSheetReportSSO = Urls.baseurl_sso + '/bld-request-services/building-workshop-payment-sheet-report';
  public static BuildingWorkshopGetTicketForPay = Urls.baseurl + '/bld-request-services/building-workshop-payment-get-ticket';
  public static buildingWorkshopsPaymentConfirm = Urls.baseurl + '/bld-request-services/building-workshop-payment-check';
  public static buildingWorkshopsInstallmentHead = Urls.baseurl + '/bld-request-services/building-workshop-installment-head';
  public static buildingWorkshopsInstallmentHeadSSO = Urls.baseurl_sso + '/bld-request-services/building-workshop-installment-head';
  public static buildingWorkshopsInstallmentDetail = Urls.baseurl + '/bld-request-services/building-workshop-installment-detail';
  public static buildingWorkshopsInstallmentDetailSSO = Urls.baseurl_sso + '/bld-request-services/building-workshop-installment-detail';
  public static buildingWorkshopsInstallmentList = Urls.baseurl + '/bld-request-services/building-workshop-installment-list';
  public static buildingWorkshopsInstallmentListSSO = Urls.baseurl_sso + '/bld-request-services/building-workshop-installment-list';
  public static WORK_SHOP_PAPER_USER_MANAGEMENT_SAVE = Urls.baseurl_sso + '/work-shop-paper-user-management/save';
  public static WORK_SHOP_PAPER_USER_MANAGEMENT_SAVE_COMPTROLLER_COMPANY_USER = Urls.baseurl_sso + '/work-shop-paper-user-management/save-comptroller-company-user';
  public static WORK_SHOP_PAPER_USER_MANAGEMENT_DELETE_COMPTROLLER_COMPANY_USER = Urls.baseurl_sso + '/work-shop-paper-user-management/delete-comptroller-company-user';
  public static WORK_SHOP_PAPER_USER_MANAGEMENT_FIND_COMPTROLLER_COMPANY_USER = Urls.baseurl_sso + '/work-shop-paper-user-management/find-comptroller-company-user';
  public static WORK_SHOP_PAPER_USER_MANAGEMENT_UPDATE = Urls.baseurl_sso + '/work-shop-paper-user-management/update';
  public static WORK_SHOP_PAPER_USER_MANAGEMENT_GET_USER_INFO = Urls.baseurl_sso + '/work-shop-paper-user-management/get-user-info';
  public static WORK_SHOP_PAPER_USER_MANAGEMENT_GET_ALL = Urls.baseurl_sso + '/work-shop-paper-user-management/get-all';
  public static IMPORTANT_PAPERS_SERVICE_GET_ALL = Urls.baseurl_sso + '/important-papers-service/get-all';
  public static IMPORTANT_PAPERS_SERVICE_GET_ITEMS_BY_OURAGH_ID = Urls.baseurl_sso + '/important-papers-service/get-items-by-ouragh-id';
  public static IMPORTANT_PAPERS_SERVICE_GET_COMPTROLLER_COMPANY_OURAGH_BY_OURAGH_ID = Urls.baseurl_sso + '/important-papers-service/get-comptroller-company-ouragh-by-ouragh-id';
  public static IMPORTANT_PAPERS_SERVICE_DELETE_COMPTROLLER_COMPANY_OURAGH = Urls.baseurl_sso + '/important-papers-service/delete-comptroller-company-ouragh';
  public static IMPORTANT_PAPERS_SERVICE_GET_COMPANY_BY_OURAGH_ID = Urls.baseurl + '/important-papers-service/get-company-by-ouragh-id';
  public static IMPORTANT_PAPERS_SERVICE_GET_COMPANIES_BY_CURRENT_USER = Urls.baseurl + '/important-papers-service/get-companies-by-current-user';
  public static IMPORTANT_PAPERS_SERVICE_GET_REPORT = Urls.baseurl + '/important-papers-service/get-report';
  public static workshopLicenseType = Urls.baseurl + '/workshop-services/workshop-license-types';
  public static FullBranches = Urls.baseurl + '/workshop-services/branches-full';
  /*pensioner loan ---------------------------------------------------------------------------------------------------------*/
  public static PENSIONER_LOAN_UNIT_GET_ALL = Urls.baseurl + '/pensioner-loan-users/unit/get-all';
  public static PENSIONER_LOAN_USER_GET_ALL = Urls.baseurl + '/pensioner-loan-users/user/find-relation';
  public static PENSIONER_LOAN_SAVE_UNIT = Urls.baseurl + '/pensioner-loan-users/unit/save';
  public static PENSIONER_LOAN_UPDATE_UNIT = Urls.baseurl + '/pensioner-loan-users/unit/update';
  public static PENSIONER_LOAN_GET_UNIT_DETAIL = Urls.baseurl + '/pensioner-loan-users/unit/get-by-id';
  public static PENSIONER_LOAN_USER_INFO = Urls.baseurl + '/pensioner-loan-users/user/get-user-info';
  public static PENSIONER_LOAN_USER_SAVE = Urls.baseurl + '/pensioner-loan-users/user/save';
  public static PENSIONER_LOAN_USER_UPDATE = Urls.baseurl + '/pensioner-loan-users/user/update';
  public static PENSIONER_LOAN_USER_DELETE = Urls.baseurl + '/pensioner-loan-users/user/delete';
  public static PENSIONER_LOAN_DO_INQUIRIES = Urls.baseurl + '/pensioner-loan-operation/do-inquiries';
  public static PENSIONER_LOAN_REGISTER_BANK_REQUEST = Urls.baseurl + '/pensioner-loan-operation/register-bank-request';
  public static PENSIONER_LOAN_FIRST_CONFIRM = Urls.baseurl + '/pensioner-loan-operation/first-confirm';
  public static PENSIONER_LOAN_PENSIONER_GET_AGREEMENT_URL = Urls.baseurl + '/pensioner-loan-operation/get-agreement-url';
  public static PENSIONER_LOAN_PENSIONER_GET_PENSIONER_INFO = Urls.baseurl + '/pensioner-loan-operation/get-pensioner-info';
  public static PENSIONER_LOAN_PENSIONER_REVOKE_BANK_REQUEST = Urls.baseurl + '/pensioner-loan-operation/revoke-bank-request';
  public static PENSIONER_LOAN_GET_MAIN_QUOTA_STATUS = Urls.baseurl + '/pensioner-loan-users/main-quota-status';
  public static PENSIONER_LOAN_REGISTRATION_EXCEL_EXPORT = Urls.baseurl + '/pensioner-loan-report/registration-excel-export';
  public static PENSIONER_LOAN_UNITS_EXCEL_EXPORT = Urls.baseurl + '/pensioner-loan-report/units-excel-export';
  public static PENSIONER_LOAN_GET_USER_QUOTA_STATUS = Urls.baseurl + '/pensioner-loan-operation/get-user-quota-status';
  public static PENSIONER_LOAN_GET_PROVINCE_STATUS_INFO = Urls.baseurl + '/pensioner-loan-report/get-province-status-info';
  public static PENSIONER_LOAN_GET_UNIT_STATUS_INFO = Urls.baseurl + '/pensioner-loan-report/get-unit-status-info';
  public static PENSIONER_LOAN_GET_SUMMARY_OF_QUOTA = Urls.baseurl + '/pensioner-loan-report/get-summary-of-quota';
  public static PENSIONER_LOAN_SUMMARY_OF_PROVINCE_QUOTA_EXCEL_REPORT = Urls.baseurl + '/pensioner-loan-report/province-status-excel-export';
  public static PENSIONER_LOAN_ALL_REGISTRATION_EXCEL_REPORT = Urls.baseurl + '/pensioner-loan-report/registration-excel-export-full-access';
  /*special insured---------------------------------------------------------------------------------------------------------*/
  public static SSO_getInsuredPaymentSheets = Urls.baseurl_sso + '/workshop-services/payment-sheets-all';
  public static SSO_getPersonalInfo = Urls.baseurl_sso + '/special-insured-services/get-personal-info';
  public static getInsuredPaymentSheets = Urls.baseurl + '/special-insured-services/payment-sheets';
  public static getPersonalInfo = Urls.baseurl + '/special-insured-services/get-personal-info';
  public static fractionCheckAgeAndHistory = Urls.baseurl + '/fraction-special-insured-services/check-age-and-history';
  public static fractionMakeAContract = Urls.baseurl + '/fraction-special-insured-services/make-a-contract';
  public static fractionPrintContract = Urls.baseurl + '/fraction-special-insured-services/contract-report';
  public static fractionCheckIsActive = Urls.baseurl + '/fraction-special-insured-services/check-is-active';
  public static fractiongetLastPayment = Urls.baseurl + '/fraction-special-insured-services/get-last-payment';
  public static fractionecalcDebit = Urls.baseurl + '/fraction-special-insured-services/calc-debit';
  public static fractiondetailPayPremium = Urls.baseurl + '/fraction-special-insured-services/payment-details';
  public static fractiondisplayDetailContract = Urls.baseurl + '/fraction-special-insured-services/payment-history-head';
  public static fractiondisplayDetailContracttow = Urls.baseurl + '/fraction-special-insured-services/payment-history-detail';
  public static getRegistrationInfo = Urls.baseurl + '/special-insured-services/get-registration-info';
  public static getSsoRegistrationInfo = Urls.baseurl_sso + '/special-insured-services/get-sso-registration-info';
  public static checkAgeAndHistorySso = Urls.baseurl_sso + '/special-insured-services/check-age-and-history-sso';

  public static checkMedicalExemption = Urls.baseurl + '/special-insured-services/check-medical-exemption';
  public static checkAgeAndHistory = Urls.baseurl + '/special-insured-services/check-age-and-history';
  public static getLowHighPremium = Urls.baseurl + '/special-insured-services/get-low-high-premium';
  public static checkAndCalcSalary = Urls.baseurl + '/special-insured-services/check-and-calc-salary';
  public static makeAContract = Urls.baseurl + '/special-insured-services/make-a-contract';
  public static updateContract = Urls.baseurl + '/special-insured-services/update-contract';
  public static deleteContract = Urls.baseurl + '/special-insured-services/delete-contract';
  public static checkContractStatus = Urls.baseurl + '/special-insured-services/check-contract-status';
  public static getLastPayment = Urls.baseurl + '/special-insured-services/get-last-payment';
  public static calcDebit = Urls.baseurl + '/special-insured-services/calc-debit';
  public static printContract = Urls.baseurl + '/special-insured-services/contract-report';
  public static detailPayPremium = Urls.baseurl + '/special-insured-services/payment-details';
  public static getActiveContract = Urls.baseurl + '/special-insured-services/get-active-contract';
  public static checkPreviousPayment = Urls.baseurl + '/special-insured-services/check-previous-payment';
  public static displayDetailContracttow = Urls.baseurl + '/special-insured-services/payment-history-detail';
  public static displayDetailContract = Urls.baseurl + '/special-insured-services/payment-history-head';
  public static spcPremiumRate = Urls.baseurl + '/baseinfo/spc-premium-rate';
  public static FreeJobWage = Urls.baseurl + '/baseinfo/free-job-wage';
  ///////////////////////
  public static fractionSaveContact = Urls.baseurl + '/special-insured-services/save-contact';
  public static fractionFreelanceCheckAgeAndHistory = Urls.baseurl + '/special-insured-services/freelance-check-age-and-history';
  public static freelanceGetLowHighPremium = Urls.baseurl + '/special-insured-services/freelance-get-low-high-premium';
  public static freelancecheckAndCalcSalary = Urls.baseurl + '/special-insured-services/freelance-check-and-calc-salary';
  public static freelanceMakeAContract = Urls.baseurl + '/special-insured-services/freelance-make-a-contract';
  public static freelancedisplayDetailContracttow = Urls.baseurl + '/special-insured-services/freelance-payment-history-detail';
  public static freelancegetLastPayment = Urls.baseurl + '/special-insured-services/freelance-get-last-payment';
  public static freelancecalcDebit = Urls.baseurl + '/special-insured-services/freelance-calc-debit';
  public static freelancecheckContractStatus = Urls.baseurl + '/special-insured-services/freelance-check-contract-status';
  public static freelancedetailPayPremium = Urls.baseurl + '/special-insured-services/freelance-payment-details';
  public static freelanceprintContract = Urls.baseurl + '/special-insured-services/freelance-contract-report';
  public static freelanceupdateContract = Urls.baseurl + '/special-insured-services/freelance-update-contract';
  public static freelanceDeleteContract = Urls.baseurl + '/special-insured-services/freelance-delete-contract';
  public static freelancedisplayDetailContract = Urls.baseurl + '/special-insured-services/freelance-payment-history-head';
  public static listSelfContractState = Urls.baseurl + '/special-insured-services/list-self-contract-state';
  public static updateSelfContractState = Urls.baseurl + '/special-insured-services/update-self-contract-state';
  public static freelanceUpdateSelfContractState = Urls.baseurl + '/special-insured-services/freelance-update-self-contract-state';
  public static RequestTicketSpecialInsured = Urls.baseurl_sso + '/special-insured-services/requestTicketSSO';
  public static ssoFractionSaveContact = Urls.baseurl_sso + '/special-insured-services/sso-save-contact';
  public static ssoMakeAContract = Urls.baseurl_sso + '/special-insured-services/sso-make-a-contract';
  public static getSsoLowHighPremium = Urls.baseurl_sso + '/special-insured-services/get-sso-low-high-premium';
  public static ssoCheckAndCalcSalary = Urls.baseurl_sso + '/special-insured-services/sso-check-and-calc-salary';
  public static ssoCheckMedicalExemption = Urls.baseurl_sso + '/special-insured-services/sso-check-medical-exemption';
  public static ssoFractionFreelanceCheckAgeAndHistory = Urls.baseurl_sso + '/special-insured-services/sso-freelance-check-age-and-history';
  public static updateSsoContract = Urls.baseurl_sso + '/special-insured-services/update-sso-contract';
  public static ssoFreelanceMakeAContract = Urls.baseurl_sso + '/special-insured-services/sso-freelance-make-a-contract';
  public static ssofreelanceupdateContract = Urls.baseurl_sso + '/special-insured-services/sso-freelance-update-contract';
  public static ssofreelanceprintContract = Urls.baseurl_sso + '/special-insured-services/sso-freelance-contract-report';
///////////////////////
  public static examinationHistory = Urls.baseurl + '/examination-services/get-history';
  public static makeACommSelfDeClar = Urls.baseurl + '/examination-services/make-self-declar';
  public static updateCommSelfDeClar = Urls.baseurl + '/examination-services/update-self-declar';
  public static vwmcMedCenterInfoTypeOne = Urls.baseurl + '/examination-services/vwmc-med-center-info-type-one';
  public static vwmcMedCenterInfoTypeTwo = Urls.baseurl + '/examination-services/vwmc-med-center-info-type-two';
  public static vwmcMedCenterInfoTypeTree = Urls.baseurl + '/examination-services/vwmc-med-center-info-type-tree';
  public static vwmcMedCenterInfoTypeFive = Urls.baseurl + '/examination-services/vwmc-med-center-info-type-five';
  public static VmMcAssignBranch = Urls.baseurl + '/examination-services/vm-mc-assign-branch';
  public static makeAMcmedcenterinfo = Urls.baseurl + '/examination-services/make-a-mcmedcenterinfo';
  public static updateAMcmedcenterinfo = Urls.baseurl + '/examination-services/update-a-mcmedcenterinfo';
  public static getMedicalRslt = Urls.baseurl + '/examination-services/get-medical-rslt';
  public static getMedicalRsltWithContractNumber = Urls.baseurl + '/examination-services/get-medical-rslt-contract-number';
  public static pdfReport = Urls.baseurl + '/examination-services/pdf-report';
  public static imageReport = Urls.baseurl + '/examination-services/image-report';
  public static darmanSoap = Urls.baseurl + '/examination-services/darman-soap';
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public static onlinePayment = Urls.baseurl + '/sep/online-payment';
  public static onlinePayment_sso = Urls.baseurl_sso + '/sep/online-payment';
  public static specialInsuranceCityBranches = Urls.baseurl + '/special-insured-services/branches';
  public static specialInsuranceCities = Urls.baseurl + '/special-insured-services/cities';
  public static specialInsuranceContracts = Urls.baseurl + '/special-insured-services/list-contracts';
  public static ssoSpecialInsuranceContracts = Urls.baseurl_sso + '/special-insured-services/list-sso-contracts';
  public static printContractSso = Urls.baseurl_sso + '/special-insured-services/sso-contract-report';
  public static updateSelfContractStateSso = Urls.baseurl_sso + '/special-insured-services/sso-update-self-contract-state';
  public static freelanceUpdateSelfContractStateSso = Urls.baseurl_sso + '/special-insured-services/sso-freelance-update-self-contract-state';
  public static ssoFreelancecheckAndCalcSalary = Urls.baseurl_sso + '/special-insured-services/sso-freelance-check-and-calc-salary';
  public static onlinePaymentBack = Urls.baseurl + '/sep/online-payment-back';
  public static onlinePaymentWithOutBack = Urls.baseurl + '/sep/online-payment-widthout-back';
  public static onlinePaymentNew = Urls.baseurl + '/sep/online-payment-new';
  /*---------------------------------------------------------------------------------------------------------*/
  public static Images = Urls.baseurl + '/erecords/images';
  public static CheckIamge = Urls.baseurl + '/erecords/check-image';
  /*---------------------------------------------insurance list end ------------------------------------------------------------*/
  public static RegistrationStepOne = Urls.baseurl_account + '/v2.0/request';
  public static Registration = Urls.baseurl_account + '/v3.0/request';
  public static RegistrationCountries = Urls.baseurl_account + '/v2.0/countries';
  public static RegistrationProvinces = Urls.baseurl_account + '/v2.0/provinces';
  public static RegistrationQuestions = Urls.baseurl_account + '/v1.0/security-questions';
  public static RegistrationPursue = Urls.baseurl_account + '/v3.0/request/trace';
  public static SaveInsured = Urls.baseurl + '/insured';
  /*-----------------------dastmozds/insured----------------------------------------------------------------------------------*/
  public static StatusCertificate = Urls.baseurl + '/status-certificate';
  public static Announcement = Urls.baseurl + '/announcement/to-user';
  public static AnnouncementSso = Urls.baseurl_sso + '/announcement/anc';
  public static AnnouncemenTicketAdmin = Urls.baseurl_sso + '/announcement/requestTicketSSO';
  public static AnnouncementShare = Urls.baseurl + '/announcement/share';
  public static AnnouncementStatistics = Urls.baseurl_sso + '/announcement/announcement-statistics';
  public static AnnouncementType = Urls.baseurl + '/announcement/type';
  public static ISSUANCEINVOICES38REPORTS = Urls.baseurl + '/payment-services/payment-reports';
  public static AnnouncementSubType = Urls.baseurl + '/announcement/sub-type';
  public static AnnouncementReportExcel = Urls.baseurl_sso + '/announcement/excel';
  public static AnnouncementNotSeenMessages = Urls.baseurl + '/announcement/to-user/countNotSeen';
  public static AnnouncementKargozari = Urls.baseurl_sso + '/announcement/kargozari';
  public static AnnouncementSaveAgent = Urls.baseurl_sso + '/announcement/save-agent';
  public static AnnouncementSecondPdf = Urls.baseurl + '/announcement/second-pdf';
  public static RequestType = Urls.baseurl + '/request-type';
  public static RequestStatus = Urls.baseurl + '/request-status';
  public static PensionerInsuranceRequestFirst = Urls.baseurl + '/proxy/models/insurance-spec/bynatcode';
  public static PensionerInsuranceRequest = Urls.baseurl + '/proxy/models/edict/operations/bynatcode';
  public static PensionerFishRequest = Urls.baseurl + '/fish';
  public static SsoPensionerFishRequest = Urls.baseurl_sso + '/fish';
  public static PensionerCertificate = Urls.baseurl + '/certificate';
  public static PensionerFishRequestPrint = Urls.baseurl + '/fish/report';
  public static SSoPensionerFishRequestPrint = Urls.baseurl_sso + '/fish/report';
  public static PensionerFishAnnoncment = Urls.baseurl + '/fish/annoncment';
  public static SSoPensionerFishAnnoncment = Urls.baseurl_sso + '/fish/annoncment';
  public static PensionerHokmRequest = Urls.baseurl + '/hokm';
  public static SSO_PensionerHokmRequest = Urls.baseurl_sso + '/hokm';
  public static PensionerHokmPrint = Urls.baseurl + '/hokm/report';
  public static PensionerHokmAnnoncment = Urls.baseurl + '/hokm/annoncment';
  public static SSO_PensionerAccount = Urls.baseurl_sso + '/pensions';
  public static PensionerAccount = Urls.baseurl + '/pensions/account';
  public static Goverment_Supportive_Package_Registration_Step_One = Urls.baseurl_gov + '/support-package';
  public static Goverment_Supportive_Package_Registration_Captcha = Urls.baseurl_gov + '/capcha';
  public static Goverment_Supportive_Package_Registration_Final = Urls.baseurl_gov + '/support-package';
  public static Goverment_Supportive_Package_Registration_FollowUp = Urls.baseurl_gov + '/support-package';
  /*---------------------------------------------------------------------------------------------------------*/
  public static Request_Detail_Entity = Urls.baseurl_sso + '/request-detail';
  public static Branches = Urls.baseurl + '/proxy/models/branch';
  public static provinces = Urls.baseurl + '/proxy/models/province';
  public static cities = Urls.baseurl + '/proxy/models/city';
  public static BranchesByFilter = Urls.baseurl + '/baseinfo/branches';
  /*---------------------------------------------------------------------------------------------------------*/
  public static CrmRequestTypes = Urls.baseurl_sso + '/crm-request-type';
  public static CrmMapping = Urls.baseurl_sso + '/crm-mapping';
  public static CrmQuestions = Urls.baseurl_sso + '/crm-questions';
  /*---------------------------------------------------------------------------------------------------------*/
  public static Soldier_Wage = Urls.baseurl + '/soldier-info/wage';
  public static Soldier_Duration = Urls.baseurl + '/soldier-info/duration';
  public static Soldier_Validation = Urls.baseurl + '/soldier-info/insuredValidate';
  public static Soldier_Installment = Urls.baseurl + '/soldier-info/installment';
  public static SSO_Soldier_Wage = Urls.baseurl_sso + '/soldier-info';
  public static SoldierFinalDetails = Urls.baseurl + '/soldier-info/data';

  public static Soldier_Wage_sso = Urls.baseurl_sso + '/soldier-info/wage';
  public static Soldier_Duration_sso = Urls.baseurl_sso + '/soldier-info/duration';
  public static Soldier_Validation_sso = Urls.baseurl_sso + '/soldier-info/insuredValidate';
  public static Soldier_Installment_sso = Urls.baseurl_sso + '/soldier-info/installment';
  public static SoldierFinalDetails_sso = Urls.baseurl_sso + '/soldier-info/data';
  /*---------------------------------------------------------------------------------------------------------*/
  public static MedicalCommitteeLastDetails = Urls.baseurl + '/medical-committee-demand/get-last-demand-details';
  public static MedicalCommitteeLastDiseases = Urls.baseurl + '/medical-committee-request/get-last-request-details';
  public static MedicalCommitteeStageOneDataSubmit = Urls.baseurl + '/medical-committee-demand/saveCommitteeDemand';
  public static MedicalCommitteeEditData = Urls.baseurl + '/medical-committee-demand/editCommitteeDemand';
  public static MedicalCommitteeStageThreeDataSubmit = Urls.baseurl + '/medical-committee-request/saveCommitteeRequest';
  public static MedicalCommitteeCheckDocument = Urls.baseurl + '/medical-committee-demand/check-document';
  public static MedicalCommitteeFinalSubmit = Urls.baseurl + '/medical-committee-demand/final-confirm';
  public static MedicalCommitteeGetMissDocs = Urls.baseurl + '/medical-committee-demand/defective-document';
  public static DeleteCommitteeDisease = Urls.baseurl + '/medical-committee-request/deleteCommitteeRequest';
  public static MedicalCommitteeDoctorSource = Urls.baseurl + '/medical-committee-doctor/getDoctorData';
  public static MedicalCommitteeIdentitySystem = Urls.baseurl + '/medical-committee-demand/office-personalInfo';
  public static MedicalCommitteeMainPdfForm = Urls.baseurl + '/medical-committee-request/committeeForm';
  public static MedicalCommitteeHospitalPdfForm = Urls.baseurl + '/medical-committee-request/committeeFormHospital';
  public static MedicalCommitteeDoctorPdfForm = Urls.baseurl + '/medical-committee-request/committeeFormDoctor';
  public static MedicalCommitteePollPdfForm = Urls.baseurl + '/medical-committee-demand/committeeFormPoll';
  public static MedicalCommitteeFinancialForm = Urls.baseurl + '/medical-committee-demand/committeeFormFinancial';
  public static MedicalCommitteeFinalForm = Urls.baseurl + '/medical-committee-request/committeeFormHistory';
  public static MedicalCommitteeForm9 = Urls.baseurl + '/medical-committee-request/committeeFormSoldier';
  public static MedicalCommitteeMissDocForm = Urls.baseurl + '/medical-committee-demand/committeeDefectiveLetter';
  public static MedicalCommitteeCheckProfileImage = Urls.baseurl + '/medical-committee-request/check-image';
  public static MedicalCommitteeProvince = Urls.baseurl + '/medical-committee-demand/all-province';
  public static MedicalCommitteeCity = Urls.baseurl + '/medical-committee-demand/city-by-province';
  public static MedicalCommitteeCase = Urls.baseurl + '/medical-committee-demand/insured-relation';
  public static MedicalCommitteeCaseByDate = Urls.baseurl + '/medical-committee-demand/insured-relation-bydate';
  public static MedicalCommitteePilot = Urls.baseurl + '/medical-committee-demand/check-pilot';
  public static MedicalCommitteeInsuredValidation = Urls.baseurl + '/medical-committee-demand/insured-validation';
  public static MedicalCommitteeCheckTurn = Urls.baseurl + '/medical-committee-demand/check-turn';
  public static MedicalCommitteeCheckHistory = Urls.baseurl + '/medical-committee-demand/insured-history';
  public static MedicalCommitteeDocType = Urls.baseurl + '/document-type';
  public static MedicalDataGet = Urls.baseurl + '/medical-committee-demand';
  public static MedicalCommitteeUpdateDocuments = Urls.baseurl + '/medical-committee-demand/saveCommitteeRequestDocument';
  public static MedicalCommitteeLastJob = Urls.baseurl + '/medical-committee-demand/insured-job';
  /*---------------------------------------------------------------------------------------------------------*/
  public static OccurrenceCase = Urls.baseurl + '/occurence/insured-relation';
  public static OccurrencePersonalInfo = Urls.baseurl + '/occurence/office-personalInfo';
  public static OccurrenceDocumentType = Urls.baseurl + '/occurrence-document-type';
  public static OccurrenceDataSubmit = Urls.baseurl + '/occurence';
  public static OccurrenceAllWorkShops = Urls.baseurl + '/occurence/all-workshop';
  public static OccurrenceSingleWorkShop = Urls.baseurl + '/occurence/workshop-specifications';
  public static OccurrenceDateValidate = Urls.baseurl + '/occurence/workshop-history';
  /*---------------------------------------------------------------------------------------------------------*/
  public static SSO_Request = Urls.baseurl_sso + '/requests';
  public static SSO_Request_General_Report = Urls.baseurl_sso + '/reports/request';
  public static SSO_Service_Status = Urls.baseurl + '/service-status';
  public static SSO_Request_Report_Excel = Urls.baseurl_sso + '/reports/request/excel';
  public static SSO_Request_Report_CSV = Urls.baseurl_sso + '/reports/request/csv';
  /*map---------------------------------------------------------------------------------------------------------*/
  public static MAP_ALL_GEO_UNIT = Urls.baseurl + '/proxy/models/branch-geo-all'; // Urls.baseurl + '/geo/all';
  public static MAP_ALL__BRANCHES_GEO_UNIT = Urls.baseurl + '/geo/all';
  public static MAP_ALL_GEO_MEDICAL = Urls.baseurl + '/proxy/models/branch-medical-geo';
  public static MAP_ALL_GEO_BRANCH_VEHICLE = Urls.baseurl + '/geo/path-info-car';
  public static MAP_ALL_GEO_BRANCH_FOOT = Urls.baseurl + '/geo/path-info-foot';
  public static MAP_ALL_GEO_MEDICAL_VEHICLE = Urls.baseurl + '/geo/path-medical-info-car';
  public static MAP_ALL_GEO_MEDICAL_FOOT = Urls.baseurl + '/geo/path-medical-info-foot';
  public static GEO_PATH_INFO = Urls.baseurl + '/geo/path-info';
  public static GEO_NEAREST_BRANCH = Urls.baseurl + '/geo/nearest-branch';
  public static BRANCH_GEO = Urls.baseurl + '/proxy/models/branch-geo';
  public static REQUEST_FAQ = Urls.baseurl + '/faq';
  public static REQUEST_FAQ_SSO = Urls.baseurl_sso + '/faq';
  public static REQUEST_FAQ_VIEW = Urls.baseurl_sso + '/faq/no-limitation';
  public static REQUEST_FAQ_VIEW_LIMITATION = Urls.baseurl + '/faq/limitation';
  public static SSO_SMS = Urls.baseurl_sso + '/sms';
  public static SITE_FEEDBACK = Urls.baseurl + '/crm-tiket';
  public static USER_PROFILE = Urls.baseurl_account + '/v2.0/user-profiles';
  public static USER_PROFILE_IMAGE = Urls.baseurl + '/booklet-req/profile-image';
  public static MY_INBOX_QUOTA = Urls.baseurl + '/announcement/size-personal-box';
  public static WAGE_ASSIGNMENT = Urls.baseurl + '/wage-assignment';
  public static SSO_WAGE_ASSIGNMENT = Urls.baseurl_sso + '/wage-assignment';
  public static SSO_WAGE_ASSIGNMENT_OLD = Urls.baseurl_sso + '/wage-assignment-olds';
  public static PENSIONER_NO = Urls.baseurl + '/pensioner-no';
  public static SSO_PENSIONER_NO = Urls.baseurl_sso + '/pensioner-no';
  public static DEPENDENCY_TYPE = Urls.baseurl_sso + '/dependency-type';
  public static FAMILY_INFO = Urls.baseurl_sso + '/family-info';
  public static BENEFICIARY = Urls.baseurl + '/beneficiary';
  public static recipients = Urls.baseurl + '/recipients';
  /*----------HEALTH------------*/
  public static TCR_PRICECERTIFICATE = Urls.baseurl + '/health/tcr-price-certificate';
  public static CUSTOMERS = Urls.baseurl_ep + '/EserviceCustomers';
  public static SPECS = Urls.baseurl_ep + '/specials/specialsEsrvice';
  public static ALLProvince = Urls.baseurl_ep + '/links/allProvince';
  public static ALLCITIES = Urls.baseurl_ep + '/cities/allCity';
  public static PROPRIETARY = Urls.baseurl_ep + '/EserviceProprietary';
  /* --------------------------------------------------------------- */
  public static SSO_LOG = Urls.baseurl_sso + '/log';
  /* --------------------------------------------------------------- */

  /*pension---------------------------------------------------------------------------------------------------------*/
  public static PENSION_REQUEST = Urls.baseurl + '/pension-request';
  public static SSO_PENSION_REQUEST = Urls.baseurl_sso + '/pension-request';
  public static PENSION_REQUESTReport = Urls.baseurl + '/pension-request/report';
  public static SSO_PENSION_REQUESTReport = Urls.baseurl_sso + '/pension-request/report';
  public static PENSION_Account_POST = Urls.baseurl + '/pensions/account';
  public static BranchesByCity = Urls.baseurl + '/baseinfo/city-branches';
  public static ProvincesBranches = Urls.baseurl + '/baseinfo/province-branches';
  public static SSO_PENSION_ACCOUNT = Urls.baseurl_sso + '/pensions';

  public static employerMade47GetList = Urls.baseurl + '/workshop-services/employer-made47';
  public static employerMade47Agreement = Urls.baseurl + '/workshop-services/employer-made47';


  /*Income-----------------------------------------------------------*/
  public static REQUEST_ISSUANCE_INVOICES38 = Urls.baseurl + '/requestissuanceinvoices38/request-issuance-invoices38-ins';
  public static UPDATE_REQUEST_ISSUANCE_INVOICES38 = Urls.baseurl + '/requestissuanceinvoices38/update-request-issuance-invoices38';
  public static APPROVE_REQUEST_ISSUANCE_INVOICES38 = Urls.baseurl + '/requestissuanceinvoices38/approve-request-issuance-invoices38';
  public static INVOICES38FINDDETAIL = Urls.baseurl + '/requestissuanceinvoices38/request-issuance-invoices38-det';
  public static RemovePaper = Urls.baseurl + '/removepaper/getLetersubject';
  public static generalLetter = Urls.baseurl + '/removepaper/general-letter';
  public static LeterHeader = Urls.baseurl + '/removepaper/letterHeader';
  public static FindLeterHeader = Urls.baseurl + '/removepaper/findLetterHeadert';
  public static DeLLeterHeader = Urls.baseurl + '/removepaper';
  public static approveHeader = Urls.baseurl + '/removepaper/general-letter/approve';
  public static ContractSubject = Urls.baseurl + '/requestissuanceinvoices38/contractSubject';
  public static INVOICES38FINDBYID = Urls.baseurl + '/requestissuanceinvoices38/request-issuance-invoices38-findByID';
  public static GETBASICCALCDATA = Urls.baseurl + '/requestissuanceinvoices38/basiccalcdata';
  public static findLetterHeaderByID = Urls.baseurl + '/removepaper/general-letter/findLetterHeaderByID';
  public static findLetterDeitalByID = Urls.baseurl + '/removepaper/general-letter/findLetterDeitalByID';
  public static RequestTicketInvoices38Admin = Urls.baseurl_sso + '/request-issuance-invoices38sso-services/requestTicketSSO';
  public static assignersContractCrm = Urls.baseurl_sso + '/requestissuanceinvoices38/assigners-contracts';
  public static UPDATE_SSo_REQUEST_ISSUANCE_INVOICES38 = Urls.baseurl_sso + '/requestissuanceinvoices38/update-sso-request-issuance-invoices38';
  public static Invoices38FindDetailsso = Urls.baseurl_sso + '/requestissuanceinvoices38/sso-request-issuance-invoices38-det';
  public static Invoices38FindByIdSso = Urls.baseurl_sso + '/requestissuanceinvoices38/sso-request-issuance-invoices38-findByID';

  public static PENSION_CALC_PERSONAL = Urls.baseurl + '/multiple-workshops';
  public static GOVERNMENT_PENSION_INQUIRY = Urls.baseurl_gov + '/pension-inquiry';
  public static PENSIONER_LOAN_INQUIRY = Urls.baseurl_gov + '/pensioner-loan-inquiry';
  /*--------------------------------------------------------------------*/
  /*survivor---------------------------------------------------------------------------------------------------------*/
  public static SURVIVOR_REQUEST = Urls.baseurl + '/survivor-request';
  public static FEMALE_REQUEST = Urls.baseurl + '/female-request';
  /*--------------------------------------------------------------------*/
  /*LeaveWork---------------------------------------------------------------------------------------------------------*/
  public static LEAVE_WORK_REQUEST = Urls.baseurl + '/leave-work-request';

  /*-------------------------------Debit-Objection---------------------------*/
  public static ObjectionWorkshopsDebit = Urls.baseurl + '/debit-objection/objection-workshop-debit';
  public static SSO_ObjectionWorkshopsDebit = Urls.baseurl_sso + '/debit-objection/objection-workshop-debit';
  public static SSO_WorkshopsInfo = Urls.baseurl + '/debit-objection/get-workshops-info';
  public static ManagementWorkshopsDebit = Urls.baseurl + '/debit-objection/management-workshop-debit';
  public static DetailObjectionWorkshopsDebit = Urls.baseurl + '/debit-objection/detail-objection-workshop-debit';
  public static SSO_DetailObjectionWorkshopsDebit = Urls.baseurl_sso + '/debit-objection/detail-objection-workshop-debit';
  public static EcalimDetailObjectionWorkshopsDebit = Urls.baseurl + '/debit-objection/eclaim-detail-objection-workshop-debit';
  public static SSO_EcalimDetailObjectionWorkshopsDebit = Urls.baseurl_sso + '/debit-objection/eclaim-detail-objection-workshop-debit';
  public static detailObjectionWorkshopDebitReport = Urls.baseurl + '/debit-objection/detail-objection-workshop-debit-report';
  public static ObjectionCheckDate = Urls.baseurl + '/debit-objection/objection-check-date';
  public static SSO_detailObjectionWorkshopDebitReport = Urls.baseurl_sso + '/debit-objection/detail-objection-workshop-debit-report';
  public static SSO_detailObjectionWorkshopDebitRequest = Urls.baseurl_sso + '/debit-objection/detail-objection-debit-agent';
  public static ObjectionSave = Urls.baseurl + '/debit-objection/objection-save';
  public static SSO_ObjectionSave = Urls.baseurl_sso + '/debit-objection/objection-save';
  public static DebitComitteSave = Urls.baseurl + '/debit-objection/debit-comitte-save';
  public static DebitComitteUpdate = Urls.baseurl + '/debit-objection/debit-comitte-update';
  public static Objection = Urls.baseurl + '/debit-objection';
  public static SSO_Objection = Urls.baseurl_sso + '/debit-objection';
  public static ObjectionAll = Urls.baseurl + '/debit-objection/objection-all';
  public static ObjectionReports = Urls.baseurl + '/debit-objection-reports';
  public static ObjectionRequest = Urls.baseurl + '/debit-objection/objection-request';
  public static ObjectionDetail = Urls.baseurl + '/debit-objection/objection-detail';
  public static lastRelation = Urls.baseurl + '/relation-tamins/last-relation';
  public static changeMobileNumber1 = Urls.baseurl + '/sms-ticket/request-ticket';
  public static changeMobileNumber2 = Urls.baseurl + '/change-mobile-number';
  public static DiffDays = Urls.baseurl + '/debit-objection/diff-days';
  /*--------------------------------Debit-Installment--------------------------*/
  public static InstallmentWorkshopsDebit = Urls.baseurl + '/debit-installment/workshop-debit';
  public static PenaltyReliefWorkshopsDebit = Urls.baseurl + '/penalty-relief/workshop-debit';
  public static SavePenaltyRelief = Urls.baseurl + '/penalty-relief/save';
  public static GetPenaltyReliefDebits = Urls.baseurl + '/penalty-relief/debits';
  public static SSO_InstallmentWorkshopsDebit = Urls.baseurl_sso + '/debit-installment/workshop-debit';
  public static InstallmentGetDiscount = Urls.baseurl + '/debit-installment/get-discount';
  public static InstallmentSave = Urls.baseurl + '/debit-installment/installment-save';
  public static SSO_InstallmentSave = Urls.baseurl_sso + '/debit-installment/installment-save';
  public static InstallmentAll = Urls.baseurl + '/debit-installment/installment-all';
  public static PaidInstallment = Urls.baseurl + '/debit-installment/paid-installment';
  public static InstallmentPaymentView = Urls.baseurl + '/debit-installment-reports/installment-payment';
  public static SSO_InstallmentAll = Urls.baseurl_sso + '/debit-installment/installment-all';
  public static InstallmentReports = Urls.baseurl + '/debit-installment-reports';
  public static InstallmentPaymentList = Urls.baseurl + '/debit-installment-payment/pay-status-list';
  public static InstallmentPaymentCheck = Urls.baseurl + '/debit-installment-payment/pay-check';
  public static SSO_InstallmentPaymentCheck = Urls.baseurl_sso + '/debit-installment/pay-check';
  public static InstallmentPay = Urls.baseurl + '/debit-installment-payment/pay';
  public static SSO_InstallmentPay = Urls.baseurl_sso + '/debit-installment/pay';
  public static InstallmentUpadteDebitNumber = Urls.baseurl + '/debit-installment/update-debit-number';
  /*--------------------------------Debit-Online-Payment--------------------------*/
  public static OnlinePaymentWorkshopsDebit = Urls.baseurl + '/debit-online-payment/workshop-debit';
  public static OnlinePaymentView = Urls.baseurl + '/debit-installment-reports/online-payment';
  public static OnlinePaymentDebitSelectPreCheck = Urls.baseurl + '/debit-online-payment/debit-select-pre-check';
  public static OnlinePayCheck = Urls.baseurl + '/debit-online-payment/pay-check';
  public static OnlineInstallmentList = Urls.baseurl + '/debit-online-payment/installment-list';
  public static OnlineInstallmentPay = Urls.baseurl + '/debit-online-payment/pay-installment-debit';
  public static DebitOnlinePaymentAll = Urls.baseurl + '/debit-online-payment/all';
  public static DebitOnlinePaymentPaySave = Urls.baseurl + '/debit-online-payment/pay-normal-debit';
  public static DebitInstallmetBySerial = Urls.baseurl_sso + '/debit-installment/installment-serial';
  /* --------------------------------------------------------------- */

  public static GUARDIAN_REQUEST = Urls.baseurl + '/guardian-request';
  public static GUARDIAN_REQUEST_LIST = Urls.baseurl + '/guardian-request/registeration';
  public static GUARDIAN_REQUEST_SSO = Urls.baseurl_sso + '/guardian-request';
  public static GetActiveBranch_SSO = Urls.baseurl_sso + '/subdominants/getInsuredActiveBranch';
  public static InsuranceRequest_SSO = Urls.baseurl_sso + '/history-services/userinfos';
  public static INSURED_ACTIVE_BRANCH = Urls.baseurl + '/subdominants/getInsuredLastActiveBranch';
  /* --------------------------------------------------------------- */
  public static PATIENT_HISTORY = Urls.baseurl + '/patient-history';
  /* --------------------------------------------------------------- */
  public static PATIENT_HISTORY_REPORT = Urls.baseurl_sso + '/patient-history-report';


  // public static PATIENT_HISTORY =Urls.baseurl_ep + '/patients/patientHistory/eservice';
  // public static PATIENT_HISTORY_DETAIL =Urls.baseurl_ep + '/patients/patientHistoryDetail/eservice';
  /* ----------- Legal Persons --------------*/
  public static LegalPersonsTicket = Urls.baseurl + '/legal-ticket';
  public static LegalStakeholders = Urls.baseurl + '/legal-stakeholders';
  public static LegalSubUnits = Urls.baseurl + '/legal-stakeholders/sub-units';
  public static LegalUnits = Urls.baseurl + '/office-agent/units';
  public static LegalPersonsDetail = Urls.baseurl + '/legal-stakeholders/detail';
  public static OfficeAgent = Urls.baseurl + '/office-agent';
  // ---------------------------------------------
  private static data: any;

  public static contractInfo = '';

  static setData(data: any) {
    this.data = data;
  }

  static getUrl(system: 'booklet' | 'inspection' | 'history' | 'registration' | 'workshop', name: string): string | null {
    try {
      const theSystem = (<Array<any>>this.data.systems).find(c => c.name === system);
      const theEntry = (<Array<any>>theSystem.urls).find(c => c.name === name);
      const base = this.data.base[theEntry.base];
      return `${base}${theEntry.url}`;
    } catch (e) {
      return null;
    }
  }

  /*---------------------------------------------------------------------------------------------------------*/
}
