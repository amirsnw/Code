import {City} from './city';
import {RoleModel} from '../../../../models/booklet/role.model';

export class Province {
  provinceCode: string;
  provinceName: string;
  status: string;
  statusDate: string;
  cities: Array<City>;


}
