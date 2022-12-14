import {AloRequest} from './alo-request';
import {CompanyAccountPeriod} from './company-account-period';
import {TbAssetTypes} from './baseinfo/TbAssetTypes';

export class AloRequestDetFixAsset {
  requestDetFixAssetId: number;
  requests: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;
  ground: number;
  building: number;
  facility: number;
  machinery: number;
  tempates: number;
  vehicles: number;
  upholstery: number;
  assetInFlow: number;
  mashinAlat: number;
  edited: string;
  assetTypes: TbAssetTypes;
  assetTypeTitle: string;
}
