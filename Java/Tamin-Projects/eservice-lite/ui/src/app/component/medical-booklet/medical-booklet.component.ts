import {Component, OnInit, ViewChild} from '@angular/core';
import {BookletListComponent} from 'src/app/component/medical-booklet/booklet-list/booklet-list.component';

@Component({
  selector: 'app-medical-booklet',
  templateUrl: './medical-booklet.component.html',
  styleUrls: ['./medical-booklet.component.css']
})
export class MedicalBookletComponent implements OnInit {

  @ViewChild('bookletListComponent') bookletListComponent: BookletListComponent;

  constructor() {
  }

  ngOnInit() {
  }

  onSearchSubmit(params) {
    this.bookletListComponent.loadData(params);
  }
}
