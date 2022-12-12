import {AloRequest} from './alo-request';
import {Branch} from './branch';
import {AloRefine} from './alorefine';
import {City} from './baseinfo/city';
import {Province} from './baseinfo/province';
import {AloLocation} from './alo-location';
import {AloReqDetNonComput} from './alo-req-det-non-comput';

export class AloReqDetCheckedPeriod {
  aloReqDetCheckedPeriodId: number;
  reportNo: string;
  reportDate: Date;
  reciveBranch: Branch;
  startDate: Date;
  endDate: Date;
  requests: AloRequest;
  workshopId: string;
  aloReqDetNonComput: Array<AloReqDetNonComput>;
}
