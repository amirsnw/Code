import { Component, OnInit, ViewChild, ChangeDetectorRef, Injector } from '@angular/core';
import { WorkshopFullInfoListComponent } from './workshop-full-info-list/workshop-full-info-list.component';
import { WorkshopFullInfoEmployerListComponent } from './workshop-full-info-employer-list/workshop-full-info-employer-list.component';
import { WorkshopFullInfoMembersListComponent } from './workshop-full-info-members-list/workshop-full-info-members-list.component';
import { TaminPageBaseComponent } from 'tamin-framework';

@Component({
  selector: 'app-workshop-full-info',
  templateUrl: './workshop-full-info.component.html',
  styleUrls: ['./workshop-full-info.component.css']
})
export class WorkshopFullInfoComponent extends TaminPageBaseComponent {
  @ViewChild('workshopList') workshopList: WorkshopFullInfoListComponent;
  @ViewChild('employerList') employerList: WorkshopFullInfoEmployerListComponent;
  @ViewChild('membersList') membersList: WorkshopFullInfoMembersListComponent;

  onSearchSubmit(params: any) {
    this.workshopList.loadData(params);
  }
  onSearchMemberSubmit(params: any) {
    var paramsSelected = this.gSes("paramsSelected");
    if (paramsSelected != null && paramsSelected != undefined) {
      params = params != undefined ? params : {};
      params.branchCode = paramsSelected.branchCode;
      params.workshopId = paramsSelected.workshopId;
      this.membersList.loadData(params);
    }
    else
      this.showInfoMessageBox('توجه', "لطفا کارگاه را انتخاب کنید!");
  }


  onFilterList(params: any) {
    this.sSes("paramsSelected", params);
    this.employerList.loadData(params);
    this.membersList.loadData(params);
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
