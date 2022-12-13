import {Urls} from '../../settings/urls';

export class StpUrls extends Urls {
  public static STP_InsuredMainInfo = Urls.baseurl + '/common/getRequestInsuredMainInfo';
  public static STP_SaveShorttremIllness = Urls.baseurl + '/shortTermIllnessRequest/saveShorttremIllness';
  public static STP_UpdateShorttremIllness = Urls.baseurl + '/shortTermIllnessRequest/updateShorttremIllness';
  public static STP_SaveFiles = Urls.baseurl + '/shortTermRequestFile/saveFiles';
  public static STP_Requests = Urls.baseurl + '/shortTermRequest/getAllUserRequests';
  public static STP_RequestType = Urls.baseurl + '/ShorttermRequestType';
  public static STP_SystemType = Urls.baseurl + '/ShorttemSystemType';
  public static STP_ShorttermRequestLoadData = Urls.baseurl + '/shortTermRequest/getShorttermRequestLoadData';
  public static STP_DeleteRequest = Urls.baseurl + '/shortTermRequest/deleteRequest';
  public static STP_shorttermPursuit = Urls.baseurl + '/shorttermPersuit/getShorttermPersuit';
  public static STP_GetTime = Urls.baseurl + '/common/getTime';
  public static STP_Funeral_Post = Urls.baseurl + '/shorttermBurryRequest/saveShorttremBurry';
  public static STP_Funeral_Put = Urls.baseurl + '/shorttermBurryRequest/updateShorttremBurry';
  public static STP_Marriage_Post = Urls.baseurl + '/shorttermMariageRequest/saveShorttremMariage';
  public static STP_Marriage_Put = Urls.baseurl + '/shorttermMariageRequest/updateShorttremMariage';
  public static STP_Orthosis_View = Urls.baseurl + '/shortTermArutzRequest/ArutzView';
  public static STP_Orthosis_Bar_Types = Urls.baseurl + '/ShorttermBarTypes';
  public static STP_Orthosis_Bar_Child = Urls.baseurl + '/ShorttermBarChild';
  public static STP_Pregnancy_Post = Urls.baseurl + '/shorttermPragnentRequest/saveShorttremPragnent';
  public static STP_Pregnancy_Put = Urls.baseurl + '/shorttermPragnentRequest/updateShorttremPragnent';
  public static STP_Get_Process_Data = Urls.baseurl + '/Report/getProcessData1';
  public static STP_Orthosis_And_Prosthesis_Post = Urls.baseurl + '/shortTermArutzRequest/saveShorttremArutz';
  public static STP_Orthosis_And_Prosthesis_Put = Urls.baseurl + '/shortTermArutzRequest/updateShorttremArutz';
  public static STP_Verify_Marriage = Urls.baseurl + '/shortterm-request/verifyMarriage';
  public static STP_All_Request_Report = Urls.baseurl + '/shortTermRequest/getAllRequestForReport';
  public static STP_Marriage_Post_New = Urls.baseurl + '/proxy/models/shortterm-marriage';
  public static STP_DESERVE = Urls.baseurl + '/booklet-req/stp-deserve';
  public static STP_Pending_Marriage_Request = Urls.baseurl + '/shortterm-request/checkExistRequest/09 ';
  public static STP_Introduction_To_work = Urls.baseurl + '/introduction-to-work/getIntro';
  public static STP_Introduction_To_work_Save = Urls.baseurl + '/introduction-to-work/saveIntro';
  public static STP_NEW_FUNERAL = Urls.baseurl + '/stp/saveShorttremBurry';
  public static STP_NEW_SAVE_IMAGE = Urls.baseurl + '/upload-image';
  public static STP_NEW_LOAD_IMAGE = Urls.baseurl + '/upload-image';
  public static STP_NEW_INDEMNITY = Urls.baseurl + '/stp/saveShorttremIllness';
  public static STP_NEW_MARRIAGE = Urls.baseurl + '/stp/saveShorttremMariage';
  public static STP_NEW_ORTHOSIS_AND_PROSTHESIS = Urls.baseurl + '/stp/saveShorttremOrthosis';
  public static STP_NEW_ORTHOSIS_AND_PROSTHESIS_SSO = Urls.baseurl_sso + '/stp/saveShorttremOrthosis';
  public static STP_NEW_PREGNANCY = Urls.baseurl + '/stp/saveShorttremPragnent';
  public static STP_NEW_USER_INFO = Urls.baseurl + '/shortterm-request/getRequestInsuredMainInfo';
  public static STP_NEW_USER_INFO_ORTHOSIS_SSO = Urls.baseurl_sso + '/shortterm-request/getRequestInsuredMainInfo';
  public static STP_LOAD_DATA = Urls.baseurl + '/shortterm-request/getShorttermRequestLoadData';
  public static STP_DEATH_DOC_ENQUIRY = Urls.baseurl + '/dead';
  public static STP_PROCESS_DATA = Urls.baseurl + '/shortterm-request/getProcessData';
  public static STP_ORTHOSIS_VIEW_NEW = Urls.baseurl + '/shortterm-request/ArutzView';
  public static STP_ORTHOSIS_VIEW_NEW_SSO = Urls.baseurl_sso + '/shortterm-request/ArutzViewSSO';
  public static STP_NEW_ORTHOSIS_BAR_TYPES = Urls.baseurl + '/StpBaseinfo/ShorttermBarTypes';
  public static STP_NEW_ORTHOSIS_BAR_CHILD = Urls.baseurl + '/StpBaseinfo/ShorttermBarChild';
  public static STP_NEW_VALIDATE_SHORTTREM_MARIAGE = Urls.baseurl + '/shortterm/validateShorttremMariage';
  public static STP_NEW_VALIDATE_SHORTTREM_ILLNESS = Urls.baseurl + '/shortterm/validateShorttremIllness';
  public static STP_NEW_VALIDATE_SHORTTREM_BURRY = Urls.baseurl + '/shortterm/validateShorttremBurry';
  public static STP_NEW_VALIDATE_SHORTTREM_ORTHOSIS = Urls.baseurl + '/shortterm/validateShorttremOrthosis';
  public static STP_NEW_VALIDATE_SHORTTREM_PRAGNENT = Urls.baseurl + '/shortterm/validateShorttremPragnent';
  public static STP_NEW_INDEMNITY_INQUIRY = Urls.baseurl + '/shortterm-request/calcIllness';
  public static STP_NEW_PREGNANCY_INQUIRY = Urls.baseurl + '/shortterm-request/calcPregnancy';
  public static STP_NEW_MARRIAGE_INQUIRY = Urls.baseurl + '/shortterm-request/calcMarriage';
  public static STP_NEW_USER_INFO_FUNERAL = Urls.baseurl + '/shortterm-request/getRequestInsuredMainInfoFuneral';
  public static STP_NEW_SPOUSE_LIST = Urls.baseurl + '/shortterm-request/funeralSpouse ';
  public static STP_NEW_USER_INFO_SSO = Urls.baseurl_sso + '/shortterm-branch/getRequestInsuredMainInfoSSO';
  public static STP_LOAD_DATA_SSO = Urls.baseurl_sso + '/shortterm-branch/getShorttermRequestLoadDataSSO';
  public static STP_PROCESS_DATA_SSO = Urls.baseurl_sso + '/shortterm-branch/getProcessDataSSO';
  public static STP_All_Requests = Urls.baseurl + '/shortterm-request/allRequests';
  public static STP_SSO_All_Requests = Urls.baseurl_sso + '/shortterm-branch/allRequests';
  public static PaymentReport = Urls.baseurl_list + '/api/payments/report';
  public static paymentReport = Urls.baseurl_list + '/payments/report';
  public static STP_VERIFY_MARRIAGE_Date = Urls.baseurl + '/shortterm/validateMariageNoPresence';
  public static STP_Marriage_Post_NOPRESENCE = Urls.baseurl + '/stp-no-presence/saveShorttremMariage';
  public static STP_CRMReason = Urls.baseurl + '/proxy/models/crm-request-reason';
  public static STP_Marriage_Post_NOPRESENCE_LOAD_DATA = Urls.baseurl + '/shortterm-request/getNoPresenceLoadData';
  public static STP_Marriage_CONFIRM_NOPRESENCE = Urls.baseurl + '/stp-no-presence/confirmShorttremMariage';
  public static STP_Marriage_Post_NOPRESENCE_LOAD_DATA_SSO = Urls.baseurl_sso + '/shortterm-request/getNoPresenceLoadData';
  // public static STP_POST_CRM = Urls.baseurl + '/stp-no-presence/saveCRM';
  public static STP_POST_CRM = Urls.baseurl + '/stp/saveCrmRequest';
  public static STP_GET_COVID_RESULT = Urls.baseurl + '/shortterm-request/getCovidResult';
  public static STP_VALIDATE_FUNERAL_NOPRESENCE = Urls.baseurl + '/shortterm/validateFuneral';
  public static STP_VALIDATE_FUNERAL_NOPRESENCE_SSO = Urls.baseurl_sso + '/shortterm/validateFuneral-sso';
  public static STP_NEW_USER_INFO_FUNERAL_NOPRESENCE = Urls.baseurl + '/funeral-no-presence/getFuneralNoPresenceLoadData';
  public static STP_NEW_USER_INFO_FUNERAL_NOPRESENCE_SSO = Urls.baseurl_sso + '/funeral-no-presence/getFuneralNoPresenceLoadData';
  public static STP_FUNERAL_NOPRESENCE_SAVE = Urls.baseurl + '/funeral-no-presence/saveShorttremFuneral';
  public static STP_FUNERAL_NOPRESENCE_SAVE_SSO = Urls.baseurl_sso + '/funeral-no-presence/saveShorttremFuneral-sso';
  public static STP_FUNERAL_NOPRESENCE_CONFIRM = Urls.baseurl + '/funeral-no-presence/confirmShorttremFuneral';
}