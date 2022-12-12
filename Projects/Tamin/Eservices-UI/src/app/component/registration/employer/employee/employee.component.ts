import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {TaminLazyLoadService, TaminPageBaseComponent, TaminPersianService} from "tamin-framework";
import {EmployeeSearchComponent} from "./employee-search/employee-search.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {ActivatedRoute} from "@angular/router";
import {WorkshopFullInfoMembersListComponent} from "../../../workshop-registration/workshop-full-info/workshop-full-info-members-list/workshop-full-info-members-list.component";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent  extends TaminPageBaseComponent  {
// @ViewChild("employeeSearch") employeeSearch : EmployeeSearchComponent;
  @ViewChild("employeeList") employeeList : EmployeeListComponent;
  // @ViewChild('memberList') memberList: WorkshopFullInfoMembersListComponent;
  constructor(injector: Injector, private router: ActivatedRoute) {
    super(injector);
  }
  onSearchSubmit(params: any) {
    this.employeeList.loadData(params);
    // this.memberList.loadData(params);
  }

}
