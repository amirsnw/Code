import {Component, OnInit, ViewChild} from '@angular/core';
import {SsoWageAssignmentRequestListComponent} from "./sso-wage-assignment-request-list/sso-wage-assignment-request-list.component";
import {TaminPageBaseComponent} from "tamin-framework";

@Component({
  selector: 'app-sso-wage-assignment-request',
  templateUrl: './sso-wage-assignment-request.component.html',
  styleUrls: ['./sso-wage-assignment-request.component.css']
})
export class SsoWageAssignmentRequestComponent extends TaminPageBaseComponent {
  @ViewChild('wageAssignmentList') wageAssignmentList: SsoWageAssignmentRequestListComponent;

  onSearchSubmit(params: any) {
    this.wageAssignmentList.loadData(params);
  }
}
