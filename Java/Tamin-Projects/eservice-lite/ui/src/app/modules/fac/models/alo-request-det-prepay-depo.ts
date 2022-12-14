import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';
export class AloRequestDetPrepayDepo {
  requestDetPrepayDepoId: number;
  aloRequests: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;
  prepaidTaxes: number;
  prepaidInsurance: number;
  prepaymentBuyingGoods: number;
  prepaidServices: number;
  prepaidContracts: number;
  depositsGoodPerformance: number;
  insuranceDeposit: number;
  leaseDeposit: number;
  otherDeposits: number;
  edited: string;
}
