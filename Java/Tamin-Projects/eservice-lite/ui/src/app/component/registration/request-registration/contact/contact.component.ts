import {Component, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {ContactEditComponent} from "./contact-edit/contact-edit.component";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent extends TaminPageBaseComponent {
  @ViewChild('contactedit') contactedit : ContactEditComponent;

}
  /*public restUrlContact;
  public personalId: string;
  public formcontactdata: FormGroup;
  public contactModel: ContactModel;
  @ViewChild('cityId') city: TaminFieldAutoCompleteDataGridComponent;
  private _overlay: any;
  private searchParams: SearchParam[];
  private id: number;

  initializePage() {
    this.createForm();
    this._initializecity();
  }

  private createForm() {
    this.formcontactdata = this.formBuilder.group({
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(15)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
      zipCode: ['', [Validators.required, Validators.maxLength(10)]],
      cityId: ['', [Validators.required]],
      dateOfStart: ['', [Validators.required]]
    });
  }

  get formValues() {
    return this.formcontactdata.getRawValue();
  }

  initialize(personalId) {
    this.loadDate(personalId);
  }


  private _initializecity() {
    this.city.valueField = 'cityCode';
    this.city.displayField = 'cityName';
    this.city.searchPattern = '*{term}*';
    this.city.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  confirmClick(values, valid) {
    if (!this.formcontactdata.valid) {
      this.markFormGroupAsTouched(this.formcontactdata);
      return;
    }
    if (new Date(values.dateOfStart).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ شروع از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    this._overlay = this.showOverlay();
    values.cityId = values.cityId;
    values.personal = new PersonalModel();

    values.personal.id = parseInt(this.personalId, 10);
    values.id = this.id;
    if (this.id == null) {
      this.restService.create(Urls.Contact, values)
        .then(resulttt => {
          this.contactModel = resulttt.data as ContactModel;
          this.id = this.contactModel.id;
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات تماس با موفقیت ثبت شد.');
        })
        .catch(result => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    } else {
      this.restService.update(Urls.Contact, this.id.toString(), values)
        .then(resulttt => {
          this.contactModel = resulttt.data as ContactModel;
          this.hideOverlay(this._overlay);
          this.id = this.contactModel.id;
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات تماس با موفقیت ثبت شد.');
        })
        .catch(result => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }
  }

  loadDate(personalId) {
    this.id = null;
    this.personalId = personalId;
    this._overlay = this.showOverlay();
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'personal.id';
    searchParam.value = personalId;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);
    this.restService.getPage(Urls.Contact, 1, 10, this.searchParams, [])
      .then(value => {
        this.hideOverlay(this._overlay);
        this.formcontactdata.patchValue(value.data.list[0]);
        if (value.data.list[0] !== undefined && value.data.list[0] != null) {
          this.id = value.data.list[0].id;
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });
  }
}*/
