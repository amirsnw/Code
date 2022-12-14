import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';



export class AloRequestDetContractAcc {
  requestDetContractAccId: number;
  requestId: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;
  contractRevenue: number;
  finishedGoodsPrice: number;
  grossProfitsLosses: number;
  totalDepositsDeductions: number;
  contractRelatedPremium: number;
  edited: string;
}
