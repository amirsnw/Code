import {RequestModel} from "../dynamic-request/request.model";

export class WageAssignmentModel {
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
  request:RequestModel;
  pensionerId:string;
  birthDate:Date;
  firstName:string;
  lastName:string;
  userFirstName:string;
  userLastName:string;
  pensionerNationalId:string;
  documentFile:any;
  comment;
}
