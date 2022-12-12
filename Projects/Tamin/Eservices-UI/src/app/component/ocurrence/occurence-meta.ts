import {FormGroup} from '@angular/forms';
import {TaminImageGalleryManagedComponent} from 'tamin-framework';
import {ViewChild} from '@angular/core';

export class OccurenceMeta {

  docTypeObject: any;
  docTypeList: any[];

  workshopList: any[];

  noWorkShopFound: boolean;

  constructor() {
    this.docTypeList = Array(0);
    this.workshopList = Array(0);
    this.noWorkShopFound = false;
  }
}
