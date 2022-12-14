import { Component, OnInit, ViewChild, ChangeDetectorRef, Injector } from '@angular/core';
import { SsoWorkshopInsuranceProcrastinationListComponent } from './sso-workshop-insurance-procrastination-list/sso-workshop-insurance-procrastination-list.component';
import { TaminPageBaseComponent } from 'tamin-framework';

@Component({
  selector: 'sso-app-workshop-insurance-procrastination',
  templateUrl: './sso-workshop-insurance-procrastination.component.html',
  styleUrls: ['./sso-workshop-insurance-procrastination.component.css']
})
export class SsoWorkshopInsuranceProcrastinationComponent extends TaminPageBaseComponent {
  @ViewChild('workshopList') workshopList: SsoWorkshopInsuranceProcrastinationListComponent;

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
