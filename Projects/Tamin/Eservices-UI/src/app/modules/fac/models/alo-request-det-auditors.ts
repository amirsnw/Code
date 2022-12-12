import {AloRequest} from './alo-request';


export class AloRequestDetAuditors {
  aloRequestDetAuditorsId: number;
  nationalId: string;
  auditorName: string;
  postCode: string;
  address: string;
  phoneNumber: string;
  reportResult: string;
  birthDate: Date;
  endDate: Date;
  requests: AloRequest;
}
