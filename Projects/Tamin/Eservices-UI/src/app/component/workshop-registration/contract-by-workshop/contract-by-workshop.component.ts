import {Component, ViewChild} from '@angular/core';
import {ContractByWorkshopListComponent} from './contract-by-workshop-list/contract-by-workshop-list.component';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-contract-by-workshop',
  templateUrl: './contract-by-workshop.component.html',
  styleUrls: ['./contract-by-workshop.component.css']
})
export class ContractByWorkshopComponent extends TaminPageBaseComponent {
  @ViewChild('contractByWorkshopList') contractByWorkshopList: ContractByWorkshopListComponent;

  onSearchSubmit(params: any) {
    this.contractByWorkshopList.loadData(params);
  }

}
