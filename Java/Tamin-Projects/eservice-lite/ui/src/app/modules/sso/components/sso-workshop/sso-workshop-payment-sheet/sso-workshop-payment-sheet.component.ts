import {Component, OnInit, ViewChild, ChangeDetectorRef, Injector} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {WorkshopFullInfoListComponent} from '../../../../../component/workshop-registration/workshop-full-info/workshop-full-info-list/workshop-full-info-list.component';
import {SsoWorkshopPaymentSheetListComponent} from './sso-workshop-payment-sheet-list/sso-workshop-payment-sheet-list.component';

@Component({
  selector: 'app-sso-workshop-payment-sheet',
  templateUrl: './sso-workshop-payment-sheet.component.html',
  styleUrls: ['./sso-workshop-payment-sheet.component.css']
})
export class SsoWorkshopPaymentSheetComponent extends TaminPageBaseComponent {
  @ViewChild('workshopList') workshopList: WorkshopFullInfoListComponent;
  @ViewChild('paymentSheetList') paymentSheetList: SsoWorkshopPaymentSheetListComponent;

  protected initializePage(): void {
    window.sessionStorage.setItem('paramsSelected', null);
  }

  onSearchSubmit(params: any) {
    this.sSes('paramsSelected', null);
    this.workshopList.loadData(params);
  }

  onSearchPaymentSheetSubmit(params: any) {
    const paramsSelected = this.gSes('paramsSelected');
    if (paramsSelected != null && paramsSelected !== undefined) {
      params = params !== undefined ? params : {};
      params.ticketCode = paramsSelected.ticketCode;
      params.branchCode = paramsSelected.branchCode;
      params.workshopId = paramsSelected.workshopId;
      this.paymentSheetList.loadData(params);
    } else {
      this.showInfoMessageBox('توجه', 'لطفا کارگاه را انتخاب کنید!');
    }
  }


  onFilterList(params: any) {
    this.sSes('paramsSelected', params);
    this.paymentSheetList.loadData(params);
  }

  gSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  sSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
}
