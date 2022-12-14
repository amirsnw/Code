import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkshopEditActivityListComponent } from './workshop-edit-activity-list/workshop-edit-activity-list.component';

@Component({
  selector: 'app-workshop-edit-activity',
  templateUrl: './workshop-edit-activity.component.html',
  styleUrls: ['./workshop-edit-activity.component.css']
})
export class WorkshopEditActivityComponent implements OnInit {
  @ViewChild('workshopList') workshopList: WorkshopEditActivityListComponent;

  constructor() { }

  ngOnInit() {
  }

  onSearchSubmit(params: any) {
    this.workshopList.loadData(params);
  }

}
