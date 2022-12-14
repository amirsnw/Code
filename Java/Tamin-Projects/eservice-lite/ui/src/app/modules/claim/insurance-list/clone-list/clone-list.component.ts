import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CloneListListComponent } from './clone-list-list/clone-list-list.component';
import { TaminPageBaseComponent } from 'tamin-framework';

@Component({
  selector: 'app-clone-list',
  templateUrl: './clone-list.component.html',
  styleUrls: ['./clone-list.component.css']
})
export class CloneListComponent extends TaminPageBaseComponent {

  @ViewChild('CloneListListComponent') CloneListListComponent: CloneListListComponent;

  onSearchSubmit(param: any) {
    this.CloneListListComponent.taminDataGrid.searchParams = param;
    this.CloneListListComponent.taminDataGrid.refreshData();
  }
}
