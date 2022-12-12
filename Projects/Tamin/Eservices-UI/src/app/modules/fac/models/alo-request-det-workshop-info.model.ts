import {AloRequest} from './alo-request';
import {Branch} from './branch';

export class AloRequestDetWorkshopInfo {
  detWorkshopInfoId: number;
  workshopName: string;
  workshopOldName: string;
  workshopTypeDesc: string;
  workshopActivityDesc: string;
  registerNumber: string;
  registerDate: string;
  nationalCode: string;
  workshopId: string;
  requests: AloRequest;
  branch: Branch;
  characterCode: string;
  tradeDesc: string;
}
