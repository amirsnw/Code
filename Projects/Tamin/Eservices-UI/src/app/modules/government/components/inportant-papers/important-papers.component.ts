import { Component, OnInit, ViewChild, ChangeDetectorRef, Injector } from '@angular/core';
import { ImportantPapersListComponent } from './important-papers-list/important-papers-list.component';
import { TaminPageBaseComponent } from 'tamin-framework';

@Component({
  selector: 'app-important-papers',
  templateUrl: './important-papers.component.html',
  styleUrls: ['./important-papers.component.css']
})
export class ImportantPapersComponent extends TaminPageBaseComponent {
  @ViewChild('workshopList') workshopList: ImportantPapersListComponent;

  onSearchSubmit(params: any) {
    if (params != null) {
      this.setSes("oragObject", params);
      this.workshopList.loadData(params.ourag_id);
    } else
      this.workshopList.setDesable();
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
}
