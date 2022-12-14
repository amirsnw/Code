import {AloRequest} from './alo-request';
import {City} from './baseinfo/city';
import {Province} from './baseinfo/province';


export class AloRequestDetTaxLocation {
  detTaxLocationId: number;
  taxLocNo: string;
  taxLocCity: City;
  taxLocProvince: Province;
  taxType: string;
  endDate: Date;
  requests: AloRequest;
  }
