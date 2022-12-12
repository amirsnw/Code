import {Component, ViewChild, Injector, OnInit, Output, EventEmitter} from '@angular/core';
import {TaminPageBaseComponent, TaminModalComponent, SearchParam, OverlayService, SearchOperator} from 'tamin-framework';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Urls} from 'src/app/settings/urls';
import {WorkshopEditActivityListComponent} from '../../../../component/workshop-registration/workshop-edit-activity/workshop-edit-activity-list/workshop-edit-activity-list.component';
import {SsoPersonalImageDetailComponent} from './sso-personal-image-detail/sso-personal-image-detail.component';

@Component({
  selector: 'app-sso-personal-image',
  templateUrl: './sso-personal-image.component.html',
  styleUrls: ['./sso-personal-image.component.css']
})
export class SsoPersonalImageComponent implements OnInit {
  @ViewChild('personalImageDetail') personalImageDetail: SsoPersonalImageDetailComponent;



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

  // private _initializeFromGroupSearch() {
  //   this.personalImageSearchForm = this.fb.group({
  //     nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  //     ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
  //   });
  // }

  private _initializeFromGroup() {
  }

  onSearch(params: any) {
    debugger;
    this.personalImageDetail.searchSso(params);
    this.formShowEnable = true;
  }
}
