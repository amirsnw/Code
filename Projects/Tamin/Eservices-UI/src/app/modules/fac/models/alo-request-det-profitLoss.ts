import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';


export class AloRequestDetProfitLoss {
  requestDetProfitLossId: number;
  aloRequests: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;
  netSales: number;
  otherIncome: number;
  totalSalary: number;
  otherBenefits: number;
  auditCost: number;
  adviceCost: number;
  propagandaCost: number;
  otherCosts: number;
  constructionCosts: number;
  sakhtemaniCost: number;
  edited: string;
 }
