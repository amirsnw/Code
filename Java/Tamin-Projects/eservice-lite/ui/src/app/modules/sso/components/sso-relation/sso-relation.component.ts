import {Component, ViewChild, OnInit} from '@angular/core';
import {SearchParam} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {SsoRelationListComponent} from './sso-relation-list/sso-relation-list.component';

@Component({
  selector: 'app-sso-relation',
  templateUrl: './sso-relation.component.html',
  styleUrls: ['./sso-relation.component.css']
})
export class SsoRelationComponent implements OnInit {

  @ViewChild('relationlist') relationlist: SsoRelationListComponent;

  searchParams: SearchParam[];
  currentObject: any;
  personalImageSearchForm: FormGroup;
  isDisabled: boolean;
  private overlay: any;
  searchForm: FormGroup;
  formShowEnable: boolean;

  private _overlay: any;

  constructor() {
  }

  ngOnInit() {
  }

  initializePage() {
    this.isDisabled = false;
    this.formShowEnable = false;
    this._initializeFromGroup();
    // this._initializeFromGroupSearch();
    // this._initializeDataGrid();
  }

  private _initializeFromGroup() {
  }

  onSearch(params: any) {
    this.relationlist.initializeGrid(params);
    this.formShowEnable = true;
  }
}
