import {Component, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {InsuredPaymentSheetListComponent} from './insured-payment-sheet-list/insured-payment-sheet-list.component';
import {InsuredInfoComponent} from './insured-info/insured-info.component';

@Component({
  selector: 'app-show-payment-sheet',
  templateUrl: './show-payment-sheet.component.html',
  styleUrls: ['./show-payment-sheet.component.css']
})
export class ShowPaymentSheetComponent extends TaminPageBaseComponent {
  @ViewChild('paymentSheetList') paymentSheetList: InsuredPaymentSheetListComponent;
  @ViewChild('insuredForm') insuredForm: InsuredInfoComponent;

  protected initializePage(): void {
  }

  onSearchPaymentSheetSubmit(params: any) {
      this.paymentSheetList.loadData(params);
  }
}
