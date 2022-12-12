import {AloRequest} from './alo-request';
import {TbFinancialSystemTypes} from './baseinfo/tb-financial-system-types';
import {CompanyAccountPeriod} from './company-account-period';
import {AloRequestDetYearsSpec} from './alo-request-det-years-spec';


export class AloRequestDetSealed {
  sealedId: number;
  aloRequests: AloRequest;
  requestDetYersSpec: AloRequestDetYearsSpec;
  sealedNumber: number;
  sealedDate: Date;

}
