import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkshopEditNameListComponent } from './workshop-edit-name-list/workshop-edit-name-list.component';
import { TaminPageBaseComponent } from 'tamin-framework';

@Component({
  selector: 'app-workshop-edit-name',
  templateUrl: './workshop-edit-name.component.html',
  styleUrls: ['./workshop-edit-name.component.css']
})
export class WorkshopEditNameComponent extends TaminPageBaseComponent {
  @ViewChild('workshopList') workshopList: WorkshopEditNameListComponent;

  initializePage() {
    this.title = 'تغییر نام کارگاه';
  }

  onSearchSubmit(params: any) {
    this.workshopList.loadData(params);
  }
}
