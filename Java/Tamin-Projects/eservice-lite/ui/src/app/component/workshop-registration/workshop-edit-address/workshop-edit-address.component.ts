import {Component, ViewChild} from '@angular/core';
import {WorkshopEditAddressListComponent} from './workshop-edit-address-list/workshop-edit-address-list.component';
import {TaminPageBaseComponent} from 'tamin-framework';


@Component({
  selector: 'app-workshop-edit-address',
  templateUrl: './workshop-edit-address.component.html',
  styleUrls: ['./workshop-edit-address.component.css']
})
export class WorkshopEditAddressComponent extends TaminPageBaseComponent {
  @ViewChild('workshopList') workshopList: WorkshopEditAddressListComponent;

  onSearchSubmit(params: any) {
    this.workshopList.loadData(params);
  }
}
