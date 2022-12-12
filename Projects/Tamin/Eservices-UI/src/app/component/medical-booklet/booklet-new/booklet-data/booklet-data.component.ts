import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {OverlayService, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent, TaminPersianService, TaminValidators} from 'tamin-framework';
import {Subscription} from 'rxjs';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {Urls} from '../../../../settings/urls';
import {BookletModel} from '../../../../models/booklet/booklet.model';
import {BookletSsnModel} from '../../../../models/booklet/bookletSsn.model';

@Component({
  selector: 'app-booklet-data',
  templateUrl: './booklet-data.component.html',
  styleUrls: ['./booklet-data.component.css']
})
export class BookletDataComponent extends TaminPageBaseComponent {
  newForm: FormGroup;
  @ViewChild('userPicture') userPicture: ElementRef;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('recieveDate') recieveDate: TaminFieldComboBoxStaticComponent;
  @ViewChild('bookletReciever') bookletReciever: ElementRef;
  @ViewChild('city') city: TaminFieldComboBoxStaticComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  private _subscription = new Subscription();
  requestTypes = [];
  printStatus = [];
  recieveTypes = [];
  recieveTimes = [];
  insuredAndSubdominants = [];
  showBranch: boolean;
  showRecieveTime: boolean;
  showAddress: boolean;
  showDate: boolean;
  branchQuatos = [];
  cities = [];
  branchCodes = [];
  provinces = [];
  private _overlay: any;
  private _overlay2: any;
  private persianService: TaminPersianService;
  private taminStaticDataService: TaminStaticDataService;
  private overlayService: OverlayService;
  hasPhoto = false;
  photoSource: any;
  recieverData: any;
  // recieverFullName: string;
  // recieverNationalId: string;

  constructor(injector: Injector) {
    super(injector);
    this.persianService = injector.get(TaminPersianService);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.overlayService = injector.get(OverlayService);
  }

  initialize(hasPhoto: boolean, photoSource: any, currentReciever: any) {
    this._initializeFormGroup();
    this._initializeProvince();
    // this._initializeOrganizationDataGrid();
    // this._initializeCity();
    this.loadData();





    this.hasPhoto = hasPhoto;
    this.photoSource = photoSource;
    this.recieverData = currentReciever;
    // this.recieverFullName = currentReciever.firstName + ' ' + currentReciever.lastName;
    // this.recieverNationalId = currentReciever.nationalId;
    this.newForm.get('bookletReciever').setValue(this.recieverData.firstName + ' ' + this.recieverData.lastName);
    this.newForm.get('nationalCode').setValue(this.recieverData.nationalId);
  }





  private _initializeFormGroup() {
    this.newForm = this.formBuilder.group({
      nationalCode: ['', [TaminValidators.nationalId]],
      nationalCardSerial: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')]],
      requestType: ['', [Validators.required]],
      recieveType: ['', [Validators.required]],
      address: ['', [Validators.required]],
      recieveTime: ['', [Validators.required]],
      recieveDate: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]],
      bookletReciever: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
    });

    this._subscription.add(this.newForm.get('requestType').valueChanges.subscribe(value => {
      const val = this.newForm.get('requestType').value;
      if (val !== undefined && val === '1') {
        this.checkFirstBooklet()
          .then(data => {
            if (!data) {
              this.showErrorMessageBox('پیام سیستم', 'شما در شعبه بیمه پردازی خود قبلا دفترچه دریافت نموده اید و نمی توانید درخواست صدور دفترچه برای اولین بار را انتخاب نمایید.');
              this.newForm.get('requestType').setValue('');
            }
          })
          .catch(reason => {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
      }
    }));

    this._subscription.add(this.newForm.get('branchCode').valueChanges.subscribe(val => {
      if (val) {
        this.getBranchQuatos(val)
          .then(value => {
            // this.recieveDate.stopWaiting();
            const data = [];
            (value.data.list as Array<any>).forEach(item => {
              data.push(
                {
                  name: `${this.persianService.getPersianDate(new Date(item.quotaDate))} (${this.persianService.getPersianDayOfWeek(new Date(item.quotaDate))}) (ظرفیت: ${item.quota})`,
                  value: item.quotaDate
                });
            });
            this.branchQuatos = data;
          })
          .catch(reason => {
            // this.recieveDate.stopWaiting();
            this.branchQuatos = [];
          });
      } else {
        this.branchQuatos = [];
      }
    }));
    this._subscription.add(this.newForm.get('recieveType').valueChanges.subscribe(value => {
      const val = this.newForm.get('recieveType').value;
      if (val !== undefined && val === '2') {
        this.showInfoMessageBox('پیام سیستم', 'امکان ارسال توسط پیک به زودی فعال میگردد،لطفا در حال حاضر روش حضوری را انتخاب نمایید.');
        // this.newForm.get('recieveType').setValue('');
      }
    }));

    this._subscription.add(this.newForm.get('province').valueChanges.subscribe(value => {
      if (value) {
        this.getCities(value)
          .then(val => {
            const data = [];
            (val.data.list as Array<any>).forEach(item => {
              data.push(
                {
                  name: item.cityName,
                  value: item.cityCode
                });
            });
            this.cities = data;
          })
          .catch(reason => {
            this.cities = [];
          });
      } else {
        this.cities = [];
      }

    }));

    this._subscription.add(this.newForm.get('city').valueChanges.subscribe(value => {
      if (value) {
        this.getBranches(value)
          .then(val => {
            const data = [];
            (val.data.list as Array<any>).forEach(item => {
              data.push(
                {
                  // name: item.name + ' - ' + item.branchAddress !== null ? item.branchAddress : '',
                  name: `${item.name} ${'-'} ${item.branchAddress !== null ? item.branchAddress : ''}`,
                  value: item.code
                });
            });
            this.branchCodes = data;
          })
          .catch(reason => {
            this.branchCodes = [];
          });
      } else {
        this.branchCodes = [];
      }

    }));


  }

  private _initializeProvince() {
    this.province.valueField = 'provinceCode';
    this.province.displayField = 'provinceName';
    this.province.searchPattern = '*{term}*%';
    this.province.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.provinces)
      .setShowPager(true)
      .setFirstLoad(true)
      .setId('provinceCode')
      .addVisibleColumn({columnName: 'provinceCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'provinceName', columnCaption: 'نام', columnViewType: 'Label'})
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

  initializePage() {
    this.requestTypes = this.taminStaticDataService.getBookletRequestTypes();
    this.printStatus = this.taminStaticDataService.getBookletPrintStatus();
    this.recieveTypes = this.taminStaticDataService.getBookletRecieveTypes();
    this.recieveTimes = this.taminStaticDataService.getBookletRecieveTimes();
    this.onChanges();
    // this.showBranch = true;
    this.showRecieveTime = false;
    this.showAddress = false;
    this.showDate = false;
    this.theModal.width = '252px';
  }

  saveFormValidation(): boolean {
    let result = this.newForm.get('bookletReciever').valid &&
      this.newForm.get('nationalCode').valid &&
      this.newForm.get('mobileNumber').valid &&
      this.newForm.get('requestType').valid &&
      this.newForm.get('recieveType').valid &&
      this.newForm.get('branchCode').valid;

    if (this.newForm.get('recieveType').value === '2') {
      result = result &&
        this.newForm.get('recieveTime').valid &&
        this.newForm.get('zipCode').valid &&
        this.newForm.get('address').valid;
    }
    return result;
  }

  saveForm(values, valid) {
    this._markFormGroupTouched();
    if (!this.saveFormValidation()) {
      return;
    }
    const val = this.newForm.get('recieveType').value;
    if (val !== undefined && val === '2') {
      this.showInfoMessageBox('پیام سیستم', 'امکان ارسال توسط پیک به زودی فعال میگردد،لطفا در حال حاضر روش حضوری را انتخاب نمایید.');
      this.newForm.get('recieveType').setValue('');
      return;
    }


    const data = this.newForm.getRawValue();
    if (new Date().getHours() >= 11 && new Date(data.recieveDate).getDate() === new Date().getDate()) {
      this.showInfoMessageBox('پیام سیستم', 'با توجه به اينکه درخواست شما پس از ساعت 11 صبح ثبت شده است،امکان انتخاب امروز بعنوان روز تحويل وجود ندارد؛لطفا روز ديگري را انتخاب نماييد.');
      return;
    }
    const toBeSaved = new BookletModel();
    toBeSaved.requestType = data.requestType;
    toBeSaved.recieveType = data.recieveType;
    toBeSaved.recieveTime = new Date(data.recieveDate).getTime();
    toBeSaved.recieveTimeInterval = data.recieveTime;
    toBeSaved.bookletSsn = new BookletSsnModel();
    toBeSaved.bookletSsn.address = data.address;
    toBeSaved.bookletSsn.mobileNumber = data.mobileNumber;
    toBeSaved.bookletSsn.nationalCode = data.nationalCode;
    toBeSaved.bookletSsn.nationalCardSerial = data.nationalCardSerial;
    toBeSaved.bookletSsn.zipCode = data.zipCode;
    toBeSaved.bookletSsn.address = data.address;
    toBeSaved.organizationId = data.branchCode;
    const type = this.newForm.get('requestType').value;
    if (type !== undefined && type === '2') {
      this.showQuestionBox('پیام سیستم', 'پس از صدور و چاپ دفترچه،نسخ دفترچه قبلی که دارای دستور پزشک در روزهای پس از چاپ دفترچه جدید می باشند،ابطال و غیرقابل استفاده خواهد گردید؛ آیا مایل به ادامه ثبت درخواست می باشید؟ ', () => {
        this._overlay = this.overlayService.show();
        this.restService.create(Urls.BookletElectronicRequest, toBeSaved)
          .then(data1 => {
            this._overlay.hide();
            const message = (<any>data1).data;
            if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
              this.showInfoMessageBox('پیام سیستم', message);
              // this.recieveDate.startWaiting();
              // this.getBranchQuatos(toBeSaved.organizationId)
              //   .then(value => {
              //     this.recieveDate.stopWaiting();
              //     (value.data.list as Array<any>).forEach(item => {
              //       data.push(
              //         {
              //           name: `${this.getPersianDate(new Date(item.quotaDate))} (${this.persianService.getPersianDayOfWeek(new Date(item.quotaDate))}) (ظرفیت: ${item.quota})`,
              //           value: item.quotaDate
              //         });
              //     });
              //    this.branchQuatos = data;
              //   })
              //   .catch(reason => {
              //     this.recieveDate.stopWaiting();
              //     this.branchQuatos = [];
              //   });
            } else {
              this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
            }
          })
          .catch(error => {
            this._overlay.hide();
            this.showErrorMessageBox('پیام سیستم', error.error);
          });
      }, () => {
        return;
      });

    } else {
      this._overlay = this.overlayService.show();
      this.restService.create(Urls.BookletElectronicRequest, toBeSaved)
        .then(data1 => {
          this._overlay.hide();
          const message = (<any>data1).data;
          if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
            this.showInfoMessageBox('پیام سیستم', message);
            // this.recieveDate.startWaiting();
            // this.getBranchQuatos(toBeSaved.organizationId)
            //   .then(value => {
            //     this.recieveDate.stopWaiting();
            //     (value.data.list as Array<any>).forEach(item => {
            //       data.push(
            //         {
            //           name: `${this.getPersianDate(new Date(item.quotaDate))} (${this.persianService.getPersianDayOfWeek(new Date(item.quotaDate))}) (ظرفیت: ${item.quota})`,
            //           value: item.quotaDate
            //         });
            //     });
            //     this.branchQuatos = data;
            //   })
            //   .catch(reason => {
            //     this.recieveDate.stopWaiting();
            //     this.branchQuatos = [];
            //   });
          } else {
            this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
          }
        })
        .catch(error => {
          this._overlay.hide();
          this.showErrorMessageBox('پیام سیستم', error.error);
        });
    }


  }

  loadData() {
    this.restService.getAll(Urls.BookletElectronicInfo)
      .then(data => {
        if (data.data) {
          // data.data.bookletReciever = data.data.nationalCode;
          this.newForm.patchValue(data.data);
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  private _markFormGroupTouched() {
    (<any>Object).values(this.newForm.controls).forEach(control => control.markAsTouched());
  }

  // private _initializeOrganizationDataGrid() {
  //   this.organizationDataGrid.valueField = 'code';
  //   this.organizationDataGrid.displayField = 'name';
  //   this.organizationDataGrid.searchPattern = '%{term}%';
  //   this.organizationDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
  //     .clearActionColumns()
  //     .clearSearchParams()
  //     .clearSortParams()
  //     .clearVisibleColumns()
  //     .addUrl(Urls.BranchesAll)
  //     .setShowPager(true)
  //     .setFirstLoad(true)
  //     .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
  //     .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
  //     .addVisibleColumn({columnName: 'branchAddress', columnCaption: 'آدرس', columnViewType: DataColumnViewType.Label})
  //     .setPagerCurrentPage(1)
  //     .setPagerSize(10)
  //     .setRowDeletable(false)
  //     .setRowEditable(false)
  //     .setShowActionColumn(false)
  //     .setShowFooter(false)
  //     .setShowPager(true)
  //     .setViewType('GridView')
  //     .getData();
  // }

  onChanges() {
    this._subscription.add(this.newForm.get('recieveType').valueChanges.subscribe(val => {
      switch (val) {
        case '1': /* Hozuri */
          this.showRecieveTime = false;
          this.showAddress = false;
          this.showDate = false;
          // this.organizationDataGrid.theGrid.serviceUrl = Urls.BranchesAll;
          break;
        case '2': /* Peik */
          this.showRecieveTime = true;
          this.showAddress = true;
          this.showDate = true;
          // this.organizationDataGrid.theGrid.serviceUrl = Urls.BranchesLocal;
          break;
        default: /* Not specified */
          this.showRecieveTime = false;
          this.showAddress = false;
          this.showDate = false;
      }


    }));
  }

  onReturn() {
    this.redirectTo('/booklet');
  }

  onShowUserPicture(/*nationalId, serialNumber*/) {
    const nationalCode = this.newForm.get('nationalCode').value as string;
    const nationalCardSerial = this.newForm.get('nationalCardSerial').value as string;

    // if (nationalCode.trim() === '' || nationalCardSerial === null || nationalCardSerial.trim() === '') {
    //   this.showErrorMessageBox('پیام سیستم', 'کارت ملی و سریال آن می بایست مقدار داشته باشد');
    //   return;
    // }

    const theUrl = `${Urls.BookletPicture}?nationalId=${nationalCode}&serialNumber=${nationalCardSerial}`;
    this._overlay = this.overlayService.show();
    this.restService.getAll(theUrl)
      .then(data => {
        this._overlay.hide();
        this.userPicture.nativeElement.src = 'data:image/jpeg;base64,' + data.data;
        this.theModal.show();
      })
      .catch(error => {
        this._overlay.hide();
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  onGetAddress() {
    const zipCode = this.newForm.get('zipCode').value;
    if (zipCode === '') {
      return;
    }
    this._overlay = this.overlayService.show();
    // this._overlay = this.showOverlay();
    const theUrl = `${Urls.PostalAddress}/${zipCode}`;
    this.restService.getAll(theUrl)
      .then(data => {
        this._overlay.hide();
        this.newForm.patchValue({address: data.data});
      })
      .catch(error => {
        this._overlay.hide();
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  private checkFirstBooklet(): Promise<boolean> {
    const nationalId = this.newForm.get('nationalCode').value;
    return new Promise((resolve, reject) => {
      const theUrl = `${Urls.BookletFirst}?nationalId=${nationalId}`;
      this.restService.getAll(theUrl)
        .then(data => {
          if (data.data === true) {
            resolve(data as any);
          } else {
            this.showErrorMessageBox('پیام سیستم', 'شما در شعبه بیمه پردازی خود قبلا دفترچه دریافت نموده اید و نمی توانید درخواست صدور دفترچه برای اولین بار را انتخاب نمایید.');
            this.newForm.get('requestType').setValue(null);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private checkEligibleTo(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.restService.getAll(Urls.BookletEligibleTo)
        .then(data => {
          if (((data.data as any).list).length !== 0) {
            resolve(!data.data.list[0].healthBookletDate.startsWith('00') && !data.data.list[0].healthBookletDate.startsWith('11'));
          }
          // resolve(((data.data as any).list).length !== 0);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getBranchQuatos(code): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'branchCode';

      this.restService.getPage(Urls.BookletQuotas, 1, 10, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getInsuredAndSubdominants(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.restService.getAll(Urls.BookletNew)
        .then(data => {
          ((data as any).data.list).forEach(item => {
            this.insuredAndSubdominants.push({
              name: `${item.firstName} ${item.lastName}`,
              value: item.nationalId
            });
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // private _initializeCity() {
  //   this.city.valueField = 'cityCode';
  //   this.city.displayField = 'cityName';
  //   this.city.searchPattern = '*{term}*%';
  //   this.city.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
  //     .clearActionColumns()
  //     .clearSearchParams()
  //     .clearSortParams()
  //     .clearVisibleColumns()
  //     .addUrl(Urls.cities)
  //     .setShowPager(true)
  //     .setFirstLoad(true)
  //     .setId('cityCode')
  //     .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label'})
  //     .setPagerCurrentPage(1)
  //     .setPagerSize(10)
  //     .setRowDeletable(false)
  //     .setRowEditable(false)
  //     .setShowActionColumn(false)
  //     .setShowFooter(false)
  //     .setShowPager(true)
  //     .setViewType('GridView')
  //     .getData();
  // }


  private getCities(code): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'provincecode';

      this.restService.getPage(Urls.cities, 1, 40, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getBranches(cityCode): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = cityCode;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'cityCode';

      this.restService.getPage(Urls.CityBranches, 1, 100, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
