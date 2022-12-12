import {RequestModel} from "../dynamic-request/request.model";

export class WageAssignmentBranchModel {
  id: string;
  nationalId: string;
  bank: any;
  bankBranch: string;
  guaranteeAmount: number;
  installmentCount: number;
  installmentAmount: number;
  loanAmount: number;
  creditAmount: number;
  garanteeType: string;
  requestDate:Date;
  pensionerId:string;
  birthDate:Date;
  firstName:string;
  lastName:string;
  pensionerNationalId:string;
}
