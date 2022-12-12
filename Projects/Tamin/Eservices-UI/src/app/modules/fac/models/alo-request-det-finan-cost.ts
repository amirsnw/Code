import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';

export class AloRequestDetFinanCost {
  requestDetFinanCostId: number;
  aloRequests: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;
  auditCost: number;
  inspectionFee: number;
  bankingFee: number;
  nonBankFee: number;
  brokerCost: number;
  financialAdvice: number;
  attorneyFee: number;
  otherFinancialExpernses: number;
  totalSumFinanCost: number;
  edited: string;
}
