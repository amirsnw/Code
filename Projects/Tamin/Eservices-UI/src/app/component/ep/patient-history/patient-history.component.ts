import {Component, OnInit, ViewChild} from '@angular/core';
import { TaminPageBaseComponent} from 'tamin-framework';
import {PatientHistoryListComponent} from '../patient-history-list/patient-history-list.component';
import {PatientHistoryListDetailComponent} from '../patient-history-list-detail/patient-history-list-detail.component';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent extends TaminPageBaseComponent  {
  @ViewChild('patientHistoryList') patientHistoryList: PatientHistoryListComponent;
  @ViewChild('patientHistoryListDetail') patientHistoryListDetail: PatientHistoryListDetailComponent;
  onSearchSubmit(params: any) {
    this.patientHistoryList.loadData(params);
  }

}
