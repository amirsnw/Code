import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';


export class AloRequestDetSalarCost {
  requestDetSalarCostId: number;
  salaryBenefitOfficeStaff: number;
  salaryBenefitFactoryStaff: number;
  dueEmployerShare: number;
  salaryOtherFunds: number;
  dueMission: number;
  reward: number;
  bonuses: number;
  totalSumSalarCost: number;
  edited: string;
  aloRequests: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;


}
