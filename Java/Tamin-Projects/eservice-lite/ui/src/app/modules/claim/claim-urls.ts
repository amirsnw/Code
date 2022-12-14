import {Urls} from '../../settings/urls';

export class ClaimUrls extends Urls {
  public static workshopHistories = Urls.baseurl_list + '/workshop-history';
  public static ssoWorkshopHistories = Urls.baseurl_sso + '/workshop-history';
  public static workshopHistorySummary = Urls.baseurl_list + '/workshop-history/summary';
  public static ssoWorkshopHistorySummary = Urls.baseurl_sso + '/workshop-history/summary';
  public static workshopHistoryWorkers = Urls.baseurl_list + '/workshop-history/workers';
  public static ssoWorkshopHistoryWorkers = Urls.baseurl_sso + '/workshop-history/workers';
  public static workshopHistoryErrors = Urls.baseurl_list + '/workshop-history/errors';
  public static ssoWorkshopHistoryErrors = Urls.baseurl_sso + '/workshop-history/errors';
  public static workshops = Urls.baseurl_list + '/workshops';
  public static ssoWorkshops = Urls.baseurl_sso + '/workshop';
  public static PaymentReport = Urls.baseurl_list + '/api/payments/report';
  public static Claimorder = Urls.baseurl_list + '/proxy/models/claim-order-payment';
  public static customURL = Urls.baseurl_list + '/';
  public static paymentReport = Urls.baseurl_list + '/payments/report';
  public static paymentReceiptReport = Urls.baseurl_list + '/payments/report/receipt';
  public static workerHistories = Urls.baseurl_list + '/proxy/models/worker-history';
  public static listRecord = Urls.baseurl_list + '/list-record';
  public static branchs = Urls.baseurl_list + '/proxy/models/branch';
  public static status = Urls.baseurl_list + '/proxy/models/status';
  public static workshopSpecification = Urls.baseurl_list + '/proxy/models/workshop-specification';
  public static WorkshopSuggest = Urls.baseurl_list + '/proxy/models/workshop';
  // public static listItemRecord = Urls.baseurl_list + '/proxy/models/list-item-record';
  public static listItemRecordInfo = Urls.baseurl_list + '/proxy/models/list-record';
  public static InspectionJobs = Urls.baseurl_list + '/proxy/models/jobs';
  public static InsuranceWorkshopRelation = Urls.baseurl_list + '/proxy/models/insurance-workshop-relation';
  public static WorkshopSpecification = Urls.baseurl_list + '/proxy/models/workshop-specification';
  public static Workshop = Urls.baseurl_list + '/proxy/models/workshop';
  public static regcontractspec = Urls.baseurl_list + '/proxy/models/regcontractspec';
  public static fileUpload = Urls.baseurl_list + '/files';
  public static listConfirm = Urls.baseurl_list + '/workshop-history/confirm';
  public static listValidation = Urls.baseurl_list + '/list-record/validation';
  public static currentDate = Urls.baseurl_list + '/current-date';
  public static removeList = Urls.baseurl_list + '/workshop-history';
  public static listItemRecord = Urls.baseurl_list + '/list-item-record';
  public static CloneList1 = Urls.baseurl_list + '/copy';
  public static CloneList2 = Urls.baseurl_list + '/copy/edit';
  public static listPayment = Urls.baseurl_list + '/bank/token';
  public static ssoPaymentReport = Urls.baseurl_sso + '/payments/report';
  public static ssopaymentReceiptReport = Urls.baseurl_sso + '/payments/report/receipt';


}
