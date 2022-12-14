import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {TaminLazyLoadService, TaminPageBaseComponent, TaminPersianService} from "tamin-framework";
// import {EmployeeSearchComponent} from "../../../../registration/employer/employee/employee-search/employee-search.component";
import {ActivatedRoute} from "@angular/router";
import {IntroListComponent} from "./intro-list/intro-list.component";


@Component({
  selector: 'app-introduction-list',
  templateUrl: './introduction-list.component.html',
  styleUrls: ['./introduction-list.component.css']
})
export class IntroductionListComponent extends TaminPageBaseComponent {
//  @ViewChild("employeeSearch") employeeSearch : EmployeeSearchComponent;
  @ViewChild("introList") introList : IntroListComponent;

  constructor(injector: Injector, private router: ActivatedRoute) {
    super(injector);
  }
  onSearchSubmit(params: any) {
    this.introList.loadData(params);

  }
}
