import {Urls} from '../../settings/urls';
import { environment } from '../../../environments/environment';

// public static FAC_xxxxxxxxxx = Urls.baseurl + '';

export class FacUrls extends Urls {
  public static baseurl_audit = environment.baseurl_audit;
  // public static baseurl = environment.baseurl_base_me;
  public static baseurl = environment.baseurl_audit;



  /*--------------------------portalkarfarmayan-------------------------*/
  public static AUDIT_GETALL = FacUrls.baseurl_audit + '/karfarmayan/getAll' ;
  public static AUDIT_ALL_REQ_PORTAL = FacUrls.baseurl + '/portal-forms/getReqPortalForms' ;
  public static AUDIT_WORKSHOP_INFO = FacUrls.baseurl + '/det-workshop-info/getDetWorkshopInfo' ;
  public static AUDIT_WORKSHOP_INFO_EDIT = FacUrls.baseurl + '/det-workshop-info/editWorkshopInfo' ;
  public static STACK_HOLDERS = FacUrls.baseurl + '/det-stack-holders/getStackholders' ;
  public static STACK_HOLDERS_REQUEST = FacUrls.baseurl + '/det-stack-holders/getStackByRequestId' ;
    public static STACK_HOLDERS_BY_NAT = FacUrls.baseurl + '/det-stack-holders/getStackholdersByNat' ;
  public static Heyat_SAVE = FacUrls.baseurl + '/det-stack-holders/saveHeyat' ;
  public static SIG_OWNER = FacUrls.baseurl + '/det-stack-holders/getSigOwner' ;
  public static SIG_OWNER_EDIT = FacUrls.baseurl + '/det-stack-holders/editSigOwner' ;
  public static WORKSHOP_ADDREES = FacUrls.baseurl + '/workshop-address/getDetWorkshopAddress' ;
  public static WORKSHOP_ADDREES_EDIT = FacUrls.baseurl + '/workshop-address/editWorkshopAddress' ;
  public static WORKSHOP_ADDREES_SAVE = FacUrls.baseurl + '/workshop-address/saveWorkshopAddress' ;
  public static SIG_OWNER_SAVE = FacUrls.baseurl + '/det-stack-holders/saveSigOwner' ;
  public static SIG_OWNER_DELETE = FacUrls.baseurl + '/det-stack-holders/deleteStackholders' ;
  public static RESPONSIBLE = FacUrls.baseurl + '/responsible/getResponsible' ;
  public static RESPONSIBLE_ID = FacUrls.baseurl + '/responsible/getResponsibleId' ;
  public static RESPONSIBLE_SAVE = FacUrls.baseurl + '/responsible/saveResponsible' ;
  public static RESPONSIBLE_EDIT = FacUrls.baseurl + '/responsible/editResponsible' ;
  public static COMPANY_ACCOUNT_PERIOD = FacUrls.baseurl + '/companyAccPeriod/getAll' ;
  public static COMPANY_ACCOUNT_PERIOD_SAVE = FacUrls.baseurl + '/companyAccPeriod/saveCompanyAccountPeriod' ;
  public static COMPANY_ACCOUNT_PERIOD_EDIT = FacUrls.baseurl + '/companyAccPeriod/editCompanyAccountPeriod' ;
  public static AUDITORS = FacUrls.baseurl + '/auditors/getAll' ;
  public static AUDITORS_BY_ID = FacUrls.baseurl + '/auditors/getByAuditorsId' ;
  public static AUDITORS_SAVE = FacUrls.baseurl + '/auditors/saveAuditors' ;
  public static AUDITORS_EDIT = FacUrls.baseurl + '/auditors/editAuditors' ;
  public static CHECKED_PERIOD = FacUrls.baseurl + '/checked-period/getAll' ;
  public static CHECKED_PERIOD_BY_ID = FacUrls.baseurl + '/checked-period/getById' ;
  public static CHECKED_PERIOD_SAVE = FacUrls.baseurl + '/checked-period/saveCheckedPeriod' ;
  public static CHECKED_PERIOD_EDIT = FacUrls.baseurl + '/checked-period/editCheckedPeriod' ;
  public static NON_COMPUT = FacUrls.baseurl + '/non-comput/getAll' ;
  public static NON_COMPUT_SAVE = FacUrls.baseurl + '/non-comput/saveNonComput' ;
  public static NON_COMPUT_EDIT = FacUrls.baseurl + '/non-comput/editNonComput' ;
  public static YEARS_SPEC = FacUrls.baseurl + '/years-spec/getAll' ;
  public static YEARS_SPEC_BY_ID = FacUrls.baseurl + '/years-spec/getById' ;
  public static YEARS_SPEC_EDIT = FacUrls.baseurl + '/years-spec/editYearsSpec' ;
  public static PROFIT_LOSS = FacUrls.baseurl + '/profit-loss/getAll' ;
  public static PROFIT_LOSS_BY_ID = FacUrls.baseurl + '/profit-loss/getById' ;
  public static PROFIT_LOSS_EDIT = FacUrls.baseurl + '/profit-loss/editProfitLoss' ;
  public static STOCK = FacUrls.baseurl + '/stock/getAll' ;
  public static STOCK_BY_ID = FacUrls.baseurl + '/stock/getById' ;
  public static STOCK_EDIT = FacUrls.baseurl + '/stock/editStock' ;
  public static STOCK_SAVE = FacUrls.baseurl + '/stock/saveStock' ;
  public static CONTRACT_ACC = FacUrls.baseurl + '/det-contract-acc/getAll' ;
  public static CONTRACT_ACC_BY_ID = FacUrls.baseurl + '/det-contract-acc/getById' ;
  public static CONTRACT_ACC_EDIT = FacUrls.baseurl + '/det-contract-acc/editContractAcc' ;
  public static CONTRACT_ACC_SAVE = FacUrls.baseurl + '/det-contract-acc/saveContractAcc' ;
  public static PREPAY_DEPO = FacUrls.baseurl + '/prepay-depo/getAll' ;
  public static PREPAY_DEPO_EDIT = FacUrls.baseurl + '/prepay-depo/editPrepayDepo' ;
  public static PREPAY_DEPO_SAVE = FacUrls.baseurl + '/prepay-depo/savePrepayDepo' ;
  public static OFFICIAL = FacUrls.baseurl + '/official/getAll' ;
  public static OFFICIAL_EDIT = FacUrls.baseurl + '/official/editOfficial' ;
  public static OFFICIAL_SAVE = FacUrls.baseurl + '/official/saveOfficial' ;
  public static FINAN_COST = FacUrls.baseurl + '/finan-cost/getAll' ;
  public static FINAN_COST_EDIT = FacUrls.baseurl + '/finan-cost/editFinanCost' ;
  public static FINAN_COST_SAVE = FacUrls.baseurl + '/finan-cost/saveFinanCost' ;
  public static DIS_SAL_COST = FacUrls.baseurl + '/dis-sal-cost/getAll' ;
  public static DIS_SAL_COST_EDIT = FacUrls.baseurl + '/dis-sal-cost/editDisSalCost' ;
  public static DIS_SAL_COST_SAVE = FacUrls.baseurl + '/dis-sal-cost/saveSalarCost' ;
  public static SALAR_COST = FacUrls.baseurl + '/salar-cost/getAll' ;
  public static SALAR_COST_EDIT = FacUrls.baseurl + '/salar-cost/editSalarCost' ;
  public static SALAR_COST_SAVE = FacUrls.baseurl + '/salar-cost/savePrepayDepo' ;
  public static RESERVES = FacUrls.baseurl + '/reserves/getAll' ;
  public static RESERVES_EDIT = FacUrls.baseurl + '/reserves/editReserves' ;
  public static RESERVES_SAVE = FacUrls.baseurl + '/reserves/saveReserves' ;
  public static FIX_ASSERT = FacUrls.baseurl + '/fix-assert/getAll' ;
  public static FIX_ASSERT_EDIT = FacUrls.baseurl + '/fix-assert/editFixAssert' ;
  public static FIX_ASSERT_SAVE = FacUrls.baseurl + '/fix-assert/saveFixAsset' ;
  public static BRANCH = FacUrls.baseurl + '/branch/getAll' ;
  public static STATUS_TYPE = FacUrls.baseurl + '/statusTypes/getAll' ;
  public static BRANCH_CODE = FacUrls.baseurl + '/branch/getBranchCode' ;
  public static REQUEST = FacUrls.baseurl + '/alo-request/getRequest' ;
  public static SYSTEM_REQUEST = FacUrls.baseurl + '/vwSystemRequest/getAll' ;
  public static OK_INFO_SERVICE = FacUrls.baseurl + '/okInfoByKarfarmaService/statusResponsible' ;
  public static WORKSHOP_VALIDITY = FacUrls.baseurl + '/workshop-validity/is-valid' ;
  public static TAX_LOCATIONS_SALARY = FacUrls.baseurl + '/tax-locations/getAllSalary' ;
  public static TAX_LOCATIONS_INCOME = FacUrls.baseurl + '/tax-locations/getAllIncome' ;
  public static TAX_LOCATIONS_EDIT = FacUrls.baseurl + '/tax-locations/editTaxLocations' ;
  public static TAX_LOCATIONS_BY_ID = FacUrls.baseurl + '/tax-locations/getSalaryByTaxLocationId' ;
  public static TAX_LOCATIONS_SAVE = FacUrls.baseurl + '/tax-locations/saveTaxLocations' ;
  public static GET_IDENTIFICATION = FacUrls.baseurl + '/loadName/getInqIdentity' ;
  public static STATUS_INFO_SUB_WORKSHOP = FacUrls.baseurl + '/okInfoByKarfarmaService/statusInfoSubWorkshop' ;
  public static PROVINCE_PAGING = FacUrls.baseurl + '/province-paging/getAll' ;
  public static CITY = FacUrls.baseurl + '/city/getCity' ;
  public static CON_CONTRA = FacUrls.baseurl + '/con-contra/getAll' ;
  public static CON_CONTRA_EDIT = FacUrls.baseurl + '/con-contra/editConContra' ;
  public static CON_CONTRA_DET = FacUrls.baseurl + '/con-contra-det/getAll' ;
  public static CON_CONTRA_EDIT_DET = FacUrls.baseurl + '/con-contra-det/editConContraDet' ;
  public static CON_CONTRA_SAVE = FacUrls.baseurl + '/con-contra/saveConContra' ;
  public static INCOME_CONT = FacUrls.baseurl + '/income-cont/getAll' ;
  public static INCOME_CONT_EDIT = FacUrls.baseurl + '/income-cont/editIncomeCont' ;
  public static INCOME_CONT_SAVE = FacUrls.baseurl + '/income-cont/saveIncomeCont' ;



}
