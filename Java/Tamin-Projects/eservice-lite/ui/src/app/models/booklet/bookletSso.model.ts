import {BookletSsnModel} from './bookletSsn.model';
import {UserModel} from '../user.model';
import {OrganizationModel} from './organization.model';

export class BookletSsoModel {
  constructor() {
   // this.BookletSsn = new BookletSsnModel();
  }

  branchCreationTime: string;
  createdBy: string;
  errorDescription: string;
  healthBookletDate: string;
  id: string;
  organizationId: string;
  pensionerId: string;
  perId: string;
  printStatus: string;
  recieveTime: number;
  recieveTimeInterval: string;
  recieveType: string;
  reciveOrganization: string;
  reciveOrganizationId: string;
  requestCreationTime: string;
  requestType: string;
  userName: string;
  status: string;
  userType: string;
  bookletSsn: BookletSsnModel;
  organization: OrganizationModel;
  user: UserModel;
  latitude1:any;
  longitude1:any;
  mapImage:any;
  price:any;
  distance:any;
  guid:string;
  docType:string;
  deliverType:string;
  cityCode:String;
  provinceCode:String;
  requestByCRM:String;
}

