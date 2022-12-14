import {AloRequest} from './alo-request';
import {TbFinancialSystemTypes} from './baseinfo/tb-financial-system-types';
import {CompanyAccountPeriod} from './company-account-period';
import {AloRequestDetSealed} from './alo-request-det-sealed';

export class AloRequestDetReserves {
  requestDetReservesId: number;
  requests: AloRequest;
 saveSalary: number;
 saveBenefitServiceTerminat: number;
  savePaidLeave: number;
  saveAudit: number;
  otherSave: number;
  totalSumReserves: number;
  companyAccountPeriod: CompanyAccountPeriod;
  edited: string;
}
