import {Component, OnInit, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from "tamin-framework";
import {WageAssignmentViewComponent} from "../../../../../component/pensioner/wage-assignment/wage-assignment-view/wage-assignment-view.component";
import {SubdominantInfoComponent} from "../../../../../component/pensioner/wage-assignment/subdominant-info/subdominant-info.component";
import {WageAssignmentModel} from "../../../../../models/pensioner/wageAssignment.model";
import {FormGroup} from "@angular/forms";
import {Urls} from "../../../../../settings/urls";
import {SsoSubdominantInfoComponent} from "./sso-subdominant-info/sso-subdominant-info.component";
import {SsoWageAssignmentViewComponent} from "./sso-wage-assignment-view/sso-wage-assignment-view.component";
import {WageAssignmentBranchModel} from "../../../../../models/pensioner/wageAssignmentBranch.model";
import {SsoWageAssignmentSearchComponent} from "./sso-wage-assignment-search/sso-wage-assignment-search.component";
import {SsoWageAssignmentListComponent} from "./sso-wage-assignment-list/sso-wage-assignment-list.component";

@Component({
  selector: 'app-sso-wage-assignment',
  templateUrl: './sso-wage-assignment.component.html',
  styleUrls: ['./sso-wage-assignment.component.css']
})
export class SsoWageAssignmentComponent extends TaminPageBaseComponent {
  @ViewChild('wageAssignmentList') wageAssignmentList: SsoWageAssignmentListComponent;

  onSearchSubmit(params: any) {
    this.wageAssignmentList.loadData(params);
  }
}
