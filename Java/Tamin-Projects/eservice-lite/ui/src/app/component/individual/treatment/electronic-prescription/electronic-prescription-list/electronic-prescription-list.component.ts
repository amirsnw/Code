import {Component, ElementRef, EventEmitter, Input, Output, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataColumn, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';
import {FormGroup} from '@angular/forms';
import {reject, resolve} from 'q';
import {HttpClient} from '@angular/common/http';

declare var alertify: any;

@Component({
  selector: 'app-electronic-prescription-list',
  templateUrl: './electronic-prescription-list.component.html',
  styleUrls: ['./electronic-prescription-list.component.css']
})


export class ElectronicPrescriptionListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  private _overlay: any;
  @Output() dataLoaded = new EventEmitter<any>();
  selectedItem: any;
  calculateDataForm: FormGroup;

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
  }

  protected initializePage(): void {
    this.calculateDataForm = this.formBuilder.group({
      nationalId: [''],
      insuranceNumber: [''],
      firstName: [''],
      lastName: [''],
    });
    this.initializeDataGrid();
  }

  private initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.ElectronicPrescription)
      // .addSearchParam(searchParam)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'requestId', columnCaption: 'شناسه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'registerDate', columnCaption: 'تاریخ ارایه خدمت ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellUserTranslator})
      // .addVisibleColumn({columnName: 'patientNationalCode', columnCaption: 'دریافت کننده خدمت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'customerType', columnCaption: 'نوع خدمت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'customerName', columnCaption: 'نام مرکز درمانی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorId', columnCaption: 'شماره نظام پزشک', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorFirstName', columnCaption: 'نام پزشک', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorLastName', columnCaption: 'نام خانوادگی پزشک', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'isNotePatient', columnCaption: 'سهم سازمان', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceNameTranslator })
      .addVisibleColumn({columnName: 'notePatient', columnCaption: 'سهم بیمار', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceNameTranslator })
      .addVisibleColumn({columnName: 'requsetPrice', columnCaption: 'مبلغ خدمت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceNameTranslator  })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(true)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  gridCellUserTranslator(item) {
    if (item !== undefined && item !== null && item !== '' && item.trim() !== '') {
      return `${item.toString().substring(0, 4)}/${item.toString().substring(4, 6)}/${item.toString().substring(6, 8)} `;
    } else {
      return '';
    }
  }


  gridCellServiceNameTranslator(item) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  backToPanelClick() {
    this.redirectTo('/main');
  }


  loadData() {
    // return new Promise((resolve, reject) => {
    //   this._overlay = this.showOverlay();
    //   const theUrl = 'http://172.16.13.176:7001/erequest/api/electronicPrescription';
    //   const me = this;
    //   this.restService.getAll(theUrl)
    //     .then(value => {
    //       this.hideOverlay(this._overlay);
    //       if (value === undefined || value === null || value.data === undefined || value.data === null || value.data.list[0] === undefined || value.data.list[0] === null) {
    //         alertify.alert('پیام سیستم', 'کاربر گرامی، درخواست حمایت کوتاه مدتی تاکنون برای شما ثبت نشده است.');
    //         reject(false);
    //       } else {
    //         resolve(true);
    //         // me.calculateDataForm.get('nationalId').setValue(value.data.list[0].nationalId);
    //         // me.calculateDataForm.get('insuranceNumber').setValue(value.data.list[0].risuid);
    //         // me.calculateDataForm.get('firstName').setValue(value.data.list[0].firstName);
    //         // me.calculateDataForm.get('lastName').setValue(value.data.list[0].lastName);
    //       }
    //     }).catch(error => {
    //     this.hideOverlay(this._overlay);
    //     this.showErrorMessageBox('پیام سیستم', error.error.data.message);
    //   });
    // });
  }

  // backToPanelClick() {
  //   this.redirectTo('/');
  // }


}
