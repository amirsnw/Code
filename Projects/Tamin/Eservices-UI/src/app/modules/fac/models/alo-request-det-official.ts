import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';

export class AloRequestDetOfficial {
  officialId: number;
  requestId: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;
  wntAndComming: number;
  lunch: number;
  rent: number;
  installation: number;
  repairs: number;
  postAndTel: number;
  waterAndElectricity: number;
  others: number;
  totalSum: number;
  edited: string;
}
