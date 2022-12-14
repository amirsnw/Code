import {OrganizationModel} from './organization.model';
import {RoleModel} from './role.model';

export class UserModel {
  constructor() {
    this.Roles = [];
  }

  BirthDate: string;
  Email: string;
  EntityId: string;
  FirstName: string;
  Gender: string;
  GeoUnit: string;
  LastName: string;
  Mobile: string;
  NationalCode: string;
  Organization: OrganizationModel;
  Roles: Array<RoleModel>;
}
