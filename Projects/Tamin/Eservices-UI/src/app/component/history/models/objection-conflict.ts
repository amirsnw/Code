export class ObjectionConflict {
  private original: ObjectionConflictData;
  data: ObjectionConflictData;

  load(data: any) {
    this.data = new ObjectionConflictData();
    this.original = new ObjectionConflictData();
    Object.assign(this.data, data);
    Object.assign(this.original, data);
  }

  hasChanged(): boolean {
    const original = JSON.stringify(this.original);
    const data = JSON.stringify(this.data);
    return original !== data;
  }
}

export class ObjectionConflictData {
  branchCode: string;
  branchname: string;
  confirmed: boolean;
  deleted: boolean;
  historyTypeCode: string;
  historyTypeName: string;
  isDeleted: boolean;
  mm1: string;
  mm2: string;
  mm3: string;
  mm4: string;
  mm5: string;
  mm6: string;
  mm7: string;
  mm8: string;
  mm9: string;
  mm10: string;
  mm11: string;
  mm12: string;
  om1: string;
  om2: string;
  om3: string;
  om4: string;
  om5: string;
  om6: string;
  om7: string;
  om8: string;
  om9: string;
  om10: string;
  om11: string;
  om12: string;
  prow: string;
  reqno: string;
  reqtype: string;
  risuid: string;
  rwshid: string;
  userDesc: string;
  workShopName: string;
  year: string;
}
