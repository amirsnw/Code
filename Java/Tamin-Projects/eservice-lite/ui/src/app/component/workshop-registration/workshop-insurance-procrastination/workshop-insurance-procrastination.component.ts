import { Component, OnInit, ViewChild, ChangeDetectorRef, Injector } from '@angular/core';
import { WorkshopInsuranceProcrastinationListComponent } from './workshop-insurance-procrastination-list/workshop-insurance-procrastination-list.component';
import { TaminPageBaseComponent } from 'tamin-framework';

@Component({
  selector: 'app-workshop-insurance-procrastination',
  templateUrl: './workshop-insurance-procrastination.component.html',
  styleUrls: ['./workshop-insurance-procrastination.component.css']
})
export class WorkshopInsuranceProcrastinationComponent extends TaminPageBaseComponent {
  @ViewChild('workshopList') workshopList: WorkshopInsuranceProcrastinationListComponent;

  onSearchSubmit(params: any) {
    this.workshopList.loadData(params);
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
