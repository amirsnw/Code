import {AloRequest} from './alo-request';
import {TbFinancialSystemTypes} from './baseinfo/tb-financial-system-types';
import {CompanyAccountPeriod} from './company-account-period';
import {AloRequestDetSealed} from './alo-request-det-sealed';

export class AloRequestDetStock {
  requestDetStockId: number;
  aloRequests: AloRequest;
  companyAccountPeriod: CompanyAccountPeriod;
  inventoryBeginningPeriod: number;
  inventoryGoodsMade: number;
  inventoryGoodsUnderCostruct: number;
  inventoryRawMaterials: number;
  inventorySpareParts: number;
  inventorySupplies: number;
  manufacturingOrders: number;
  shippingCharges: number;
  totalSumStock: number;
  edited: string;
}
