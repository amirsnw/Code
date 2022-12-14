import {AloRequest} from './alo-request';
import {TbFinancialSystemTypes} from './baseinfo/tb-financial-system-types';
import {CompanyAccountPeriod} from './company-account-period';
import {AloRequestDetSealed} from './alo-request-det-sealed';
import {AloReqDetNonComput} from './alo-req-det-non-comput';

export class AloRequestDetYearsSpec {
  requestDetYearsSpecId: number;
  aloRequests: AloRequest;
  tbFinancialSystemTypes: TbFinancialSystemTypes;
  sealedNumber: number;
  sealedDate: Date;
  financialDocumentsNumber: number;
  bindersNumber: number;
  insurancePersonnelNumber: number;
  nonStaffPersonnelNumber: number;
  isFinancialSystem: number;
  costContractsNumber: number;
  incomeContractsNumber: number;
  companyAccountPeriod: CompanyAccountPeriod;
  finantialSystemName: string;
  edited: string;
  aloRequestDetSealed: Array<AloReqDetNonComput>;
}
