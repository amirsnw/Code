import {AloRequest} from './alo-request';

export class CompanyAccountPeriod {
  companyAccountPeriodId: number;
  startDate: Date;
  endDate: Date;
  hasBooklet: string;
  requests: AloRequest;

}
