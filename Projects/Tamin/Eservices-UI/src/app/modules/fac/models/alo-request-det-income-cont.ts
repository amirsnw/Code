import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';
import {Branch} from './branch';

export class AloRequestDetIncomeCont {
  requestDetIncomeContId: number;
  aloRequests: AloRequest;
  contractNumber: string;
  contractDate: Date;
  contractSubject: string;
  signingContract: string;
  contractEndDate: Date;
  contractStartDate: Date;
  initialAmountContract: number;
  refinedSeries: string;
  amountFunction: number;
  refinedNumber: string;
  refinedDate: Date;
  refinedFunction: number;
  isOk: string;
  dateFunction: Date;
  differencesFieldsDesc: string;
  confirm: string;

}
