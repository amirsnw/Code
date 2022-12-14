import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';
import {Branch} from './branch';




export class AloRequestDetConContra {
  requestDetConContraId: number;
  requests: AloRequest;
  branches: Branch;
  workshopId: string;
  treatyRow: string;
  contractor: string;
  contractNumber: string;
  contractDate: Date;
  contractSubject: string;
  initialAmountContract: number;
  isOk: string;
  newYear: string;
  contractStartDate: Date;
  contractEndDate: Date;
  totalApprovedFunction: Date;
  amountFunction: number;
  insuranceDeposit: number;
  refinedNumber: string;
  refinedDate: Date;
  refinedFunction: number;
  refinedSeries: string;
  confirm: string;
  differencesFieldsDesc: string;
}
