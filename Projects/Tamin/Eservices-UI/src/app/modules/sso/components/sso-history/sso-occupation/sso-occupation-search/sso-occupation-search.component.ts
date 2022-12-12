import {Component, EventEmitter, ViewChild , OnInit, Output , Injector , ElementRef} from '@angular/core';
import {PersianNumberPipe, OverlayService , TaminPersianService , DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent , TaminDataGridComponent} from 'tamin-framework';
import {FormBuilder, FormGroup , Validators} from '@angular/forms';
import {Urls} from '../../../../../../settings/urls';
import {TaminStaticDataService} from '../../../../../../services/tamin-static-data.service/tamin-static-data.service';

@Component({
  selector: 'app-sso-occupation-search',
  templateUrl: './sso-occupation-search.component.html',
  styleUrls: ['./sso-occupation-search.component.css']
})

export class SsoOccupationSearchComponent  extends TaminPageBaseComponent {
  @Output() Submitt = new EventEmitter<any>();
  @Output() ClearForm = new EventEmitter<any>();
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
 // private persianService: TaminPersianService;
 // private overlayService: OverlayService;
  searchForm: FormGroup;
  searchParams: SearchParam[];
  isDesabled: boolean;
  private overlay: any;


  // constructor(public formBuilder: FormBuilder,
  //    private taminStaticDataService: TaminStaticDataService) {
  // }

  // ngOnInit() {
  //   this._initializeFromGroup();
  // }

  initializePage() {
    this._initializeFromGroup();
    this.isDesabled = false;
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ticketCode: ['' , [Validators.minLength(6), Validators.maxLength(6)]]
    });
  }
  sendUserTicket() {
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10 ) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: values.nationalCode,
      operator: SearchOperator.EQ

    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'historyJob',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.RequestTicketAdmin , this.searchParams)
        .then(result => {
          this.isDesabled = true;
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
    });
  }


  resetForm() {
    this.isDesabled = false;
    this.searchForm.reset();
    this.ClearForm.emit();
    // this.Submitt.emit(this.searchForm.getRawValue());
  }

  searchFormSubmit() {
    const values = this.searchForm.value;
    if (values.ticketCode.length === 0 || values.ticketCode.length !== 6 ) {
    // if (value.nationalCode.length === 0 || value.nationalCode.length !== 10 ) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.Submitt.emit(values);
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      insuranceNumber: [''],
      nationalCode: ['']
    });
  }

  }
