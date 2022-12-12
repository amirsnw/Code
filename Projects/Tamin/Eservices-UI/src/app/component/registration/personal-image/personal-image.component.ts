import {Component, Injector, Output, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {
  SearchOperator, SearchParam,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent, TaminValidators
} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {variable} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-personal-image',
  templateUrl: './personal-image.component.html',
  styleUrls: ['./personal-image.component.css']
})
export class PersonalImageComponent extends TaminPageBaseComponent {
  private router: ActivatedRoute;
  theForm: FormGroup;
  private _overlay: any;
  userImage: any;
  userImageSub: any;
  private _subscription = new Subscription();
  branchCode: any;
  insuranceId: any;
  data: any;
  @Output() subdominant: Array<any> = [];

  protected initializePage(): void {
    this._initializeForm();
    this._initializeFormGroup();
  }

  private _initializeForm() {
    this.theForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      nationalCode: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      serialId: [''],
      insuranceId: [''],
      nationalCodeSub: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      serialIdSub: [''],
    });


  }

  protected loadPageData(): void {
    this.loadData();
    // this.initializesubdominantAutoComplete();
  }

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  private loadData() {
    debugger;
    const messagebox = null;
    this._overlay = this.showOverlay();
    this.userImage = 'assets/images/icons/user.png';
    this.userImageSub = 'assets/images/icons/user.png';
    this.restService.getAll(Urls.Subdominant)
      .then(value1 => {
        if (value1.data) {
          this.data = value1.data;
          (<Array<any>>value1.data.list).forEach(value11 => {
            const gendercode = value11.relationWithTamin.personal.gender.genderCode;
            var relation = null;
            debugger;
            var relationCode = value11.relationWithTamin.relationWithTamin.baseTendency.tendencyCode;
            switch (value11.relationWithTamin.relationWithTamin.baseTendency.tendencyCode) {

              case '100' : {
                relation = 'همسر';
                break;
              }
              case '101' : {
                relation = 'فرزند پسر';
                break;
              }
              case '102' : {
                relation = 'دختر';
                break;
              }
              case '103' : {
                relation = 'همسر';
                break;
              }
              case '104' : {
                relation = 'فرزند پسر';
                break;
              }
              case '105' : {
                relation = 'دختر';
                break;
              }
              case '106' : {
                if (gendercode === '02') {
                  relation = 'مادر';
                } else if (gendercode === '01') {
                  relation = 'پدر';
                }
                else {
                  relation = 'والدین';
                }
                break;
              }
              case '107' : {
                relation = 'همسر';
                break;
              }
              case '108' : {
                relation = 'همسر';
                break;
              }
              case '109' : {
                relation = 'همسر';
                break;
              }
              case '110' : {
                if (gendercode === '02') {
                  relation = 'مادر';
                } else if (gendercode === '01') {
                  relation = 'پدر';
                } else {
                  relation = 'والدین';
                }
                break;
              }
              case '111' : {
                if (gendercode === '01') {
                  relation = 'فرزند پسر';
                } else if (gendercode === '02') {
                  relation = 'فرزند دختر';
                } else {
                  relation = 'فرزند';
                }
                break;
              }
              case '112' : {
                if (gendercode === '01') {
                  relation = 'فرزند پسر';
                } else if (gendercode === '02') {
                  relation = 'فرزند دختر';
                } else {
                  relation = 'فرزند';
                }
                break;
              }
              case '117' : {
                if (gendercode === '01') {
                  relation = 'فرزند پسر';
                } else if (gendercode === '02') {
                  relation = 'فرزند دختر';
                } else {
                  relation = 'فرزند';
                }
                break;
              }
              case '123' : {
                relation = 'فرزند خوانده';
                break;
              }
              case '124' : {
                relation = 'بازمانده';
                break;
              }
              case '118' : {
                relation = 'فرزند خوانده';
                break;
              }
              case '133' : {
                relation = 'فرزند خوانده';
                break;
              }
            }
            this.subdominant.push({

              name: this.getPersianNumber(value11.relationWithTamin.personal.nationalId + ' - ' + value11.relationWithTamin.personal.firstName + ' - ' + value11.relationWithTamin.personal.lastName + ' - ' + relation),
              value: value11.relationWithTamin.personal.nationalId
            });
          });
        }
      })
      .catch(reason => {
        // this.hideOverlay(this._overlay);
      });
    this.restService.getAll(Urls.PersonalRelation)
      .then(value1 => {
          if (value1.data) {
            if (value1.data.brhCode !== '0000') {
              const data1 = {
                firstName: value1.data.firstName,
                lastName: value1.data.lastName,
                nationalCode: value1.data.nationalId,
                insuranceId: value1.data.insuranceId,
              };
              this.hideOverlay(this._overlay);
              this.insuranceId = value1.data.insuranceId;
              this.branchCode = value1.data.brhCode;
              this.theForm.patchValue(data1);
            }
          } else {
            this.showInfoMessageBox('', 'اطلاعات مورد نظر شما در پايگاه اطلاعات هويتي سازمان تامين اجتماعي موجود نيست');
          }
        }
      )
      .catch(reason => {
        // this.hideOverlay(this._overlay);
        // We don't care if there is no image for the user.
      });
    const theUrl = Urls.PersonalImage + '/' + this.branchCode;
    this.restService.getAll(theUrl)
      .then(value1 => {
        this.hideOverlay(this._overlay);
        if (value1.data) {
          this.userImage = 'data:image/png;base64,' + value1.data;
        } else {
          this.userImage = 'assets/images/icons/user.png';
          // this.showInfoMessageBox('', 'تصویری برای کد ملی شما یافت نشد.جهت دریافت عکس شماره سریال پشت کارت ملی را در قسمت مربوطه وارد کنید و سپس دکمه دریافت اطلاعات را بزنید');

        }
      })
      .catch(reason => {
        // this.hideOverlay(this._overlay);
        // this.showInfoMessageBox('', 'تصویری برای کد ملی شما یافت نشد.جهت دریافت عکس شماره سریال پشت کارت ملی را در قسمت مربوطه وارد کنید و سپس دکمه دریافت اطلاعات را بزنید');
      });

  }

  private doSearch() {
    const values = this.theForm.value;
    if (values.serialId === '') {
      this.showErrorMessageBox('', 'سریال پشت کارت ملی / کد رهگیری ثبت نشده است');
      return;
    }
    this.showQuestionBox('پیام سیستم', 'در ثبت سریال پشت کارت ملی/ کد رهگیری دقت کنید.از صحت اطلاعات خود اطمینان دارید؟', () => {
      const searchParams = new Array<SearchParam>();
      let searchParam = new SearchParam();
      searchParam = new SearchParam();
      searchParam.property = 'serialId';
      searchParam.value = values.serialId;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
      this._overlay = this.showOverlay();
      if (this.branchCode !== 'null') {
        const theUrl = Urls.PersonalImage + '/' + this.branchCode;
        this.restService
          .getAll(theUrl, searchParams)
          .then(value1 => {
            if (value1.data) {
              this.userImage = 'data:image/png;base64,' + value1.data;
              this.hideOverlay(this._overlay);
            } else {
              this.userImage = 'assets/images/icons/user.png';
              this.showErrorMessageBox('', 'درخواست شما ثبت شد، حداکثر تا 48 ساعت عکس شما از پایگاه ثبت احوال دریافت می گردد.');
              this.hideOverlay(this._overlay);
            }
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('خطا', reason.error.data);
          });
      } else {
        this.showErrorMessageBox('', 'اطلاعات شعبه شما یافت نشد. لطفا مجددا به سیستم وارد شوید.');
      }
    }, () => {
    });
  }

  private doSearchSub() {
    const values = this.theForm.value;
    if (values.serialIdSub === '') {
      this.showErrorMessageBox('', 'سریال پشت کارت ملی / کد رهگیری ثبت نشده است');
      return;
    }
    this.showQuestionBox('پیام سیستم', 'در ثبت سریال پشت کارت ملی/ کد رهگیری دقت کنید.از صحت اطلاعات خود اطمینان دارید؟', () => {
      const values = this.theForm.value;
      const searchParams = new Array<SearchParam>();
      let searchParam = new SearchParam();
      searchParam = new SearchParam();
      searchParam.property = 'serialId';
      searchParam.value = values.serialIdSub;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
      let searchParamnationalCode = new SearchParam();
      searchParamnationalCode = new SearchParam();
      searchParamnationalCode.property = 'nationalId';
      searchParamnationalCode.value = values.nationalCodeSub;
      searchParamnationalCode.operator = SearchOperator.EQ;
      searchParams.push(searchParamnationalCode);
      this._overlay = this.showOverlay();
      const theUrl = Urls.PersonalImageSubdominant + '/' + this.branchCode;
      this.restService
        .getAll(theUrl, searchParams)
        .then(value1 => {
          if (value1.data) {
            this.userImageSub = 'data:image/png;base64,' + value1.data;
            this.hideOverlay(this._overlay);
          } else {
            this.userImage = 'assets/images/icons/user.png';
            this.showErrorMessageBox('', 'درخواست شما ثبت شد، حداکثر تا 48 ساعت عکس شما از پایگاه ثبت احوال دریافت می گردد.');
            this.hideOverlay(this._overlay);
          }
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          if (reason.error == 'Forbidden') {
            this.showErrorMessageBox('خطا','خطا در دسترسی اطلاعات: کد ملی تبعی وارد شده در لیست تبعی های شما نیست.');
          }
          this.showErrorMessageBox('خطا', reason.error.data);
        });
    }, () => {
    });
  }

  private _initializeFormGroup() {
    debugger;
    this._subscription.add(this.theForm.get('nationalCodeSub').valueChanges.subscribe(value => {
      const values = this.theForm.value;
      const searchParams = new Array<SearchParam>();
      let searchParam = new SearchParam();
      searchParam = new SearchParam();
      searchParam.property = 'serialId';
      searchParam.value = values.serialIdSub;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
      let searchParamnationalCode = new SearchParam();
      searchParamnationalCode = new SearchParam();
      searchParamnationalCode.property = 'nationalId';
      searchParamnationalCode.value = value;
      searchParamnationalCode.operator = SearchOperator.EQ;
      searchParams.push(searchParamnationalCode);
      this._overlay = this.showOverlay();
      const theUrl = Urls.PersonalImageSubdominant + '/' + this.branchCode;
      this.restService
        .getAll(theUrl, searchParams)
        .then(value1 => {
          if (value1.data) {
            this.userImageSub = 'data:image/png;base64,' + value1.data;
            this.hideOverlay(this._overlay);
          } else {
            this.userImageSub = 'assets/images/icons/user.png';
            this.showInfoMessageBox('', 'تصویری برای کد ملی شما یافت نشد.به جهت دریافت عکس شماره سریال پشت کارت ملی را در قسمت مربوطه وارد کنید و سپس دکمه دریافت اطلاعات را بزنید');
            this.hideOverlay(this._overlay);
          }
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('خطا', 'عکسی برای این تبعی یافت نشد');
        });
    }));
  }

  // private selectSubdominant() {
  //   debugger;
  //   const value = this.theForm.getRawValue();
  //   this.theForm.get('nationalCodeSub').setValue(this.subdominant);
  // }

}
