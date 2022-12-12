import {AloRequest} from '../alo-request';
import {Branch} from '../branch';
import {Province} from './province';

export class City {
  cityCode: string;
  provinceCode: Province;
  cityName: string;
  cityGrade: string;
  cityGroup: string;
  status: string;
  statusDate: string;
  oldCityCode: string;
  branches: Array<Branch>;

}
