import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { PayPalListComponent } from 'src/app/component/pay-pal/pay-pal-list/pay-pal-list.component';
import { TaminPageBaseComponent } from 'tamin-framework';

@Component({
  selector: 'app-pay-pal',
  templateUrl: './pay-pal.component.html',
  styleUrls: ['./pay-pal.component.css']
})
export class PayPalComponent extends TaminPageBaseComponent {

  @ViewChild('payPalListComponent') payPalListComponent: PayPalListComponent;

  onSearchSubmit(param: any) {
    this.payPalListComponent.taminDataGrid.searchParams = param;
    this.payPalListComponent.taminDataGrid.refreshData();
  }
}
