import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';


export class AloRequestDetDisSalCos {
  requestDetDisSalCosId: number;
  requests: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;
  advertisingCost: number;
  marketingCommission: number;
  inventory: number;
  packing: number;
  advancePayment: number;
  leaseWarehouse: number;
  keepingGoods: number;
  carriageFares: number;
  totalSumDisSalCost: number;
  edited: string;
}
