import { Component, ElementRef, Injector, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { OverlayService, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent, TaminPersianService, TaminValidators, SortDirection, SortParam, TaminImageGalleryManagedComponent } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { TaminStaticDataService } from '../../../services/tamin-static-data.service/tamin-static-data.service';
import { Subscription } from 'rxjs';
import { BookletModel } from '../../../models/booklet/booklet.model';
import { BookletSsnModel } from '../../../models/booklet/bookletSsn.model';
import { BookletMapComponent } from '../booklet-map/booklet-map.component';
import { DocumentUiModel } from 'src/app/models/registration/documentUi.model';
import { BookletOrder } from '../../../models/booklet/booklet-order.model';
import { RequestDocumentModel } from '../../../models/request-document.model';
import { DocumentFileModel } from '../../../models/document-file.model';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.css']
})
export class ConfirmCartComponent extends TaminPageBaseComponent {

  newForm: FormGroup;
  // @ViewChild('organizationDataGrid') organizationDataGrid: TaminFieldAutoCompleteDataGridComponent;
  // @ViewChild('userPicture') userPicture: ElementRef;
  // @ViewChild('theModal') theModal: TaminModalComponent;
  // @ViewChild('helpModal') helpModal: TaminModalComponent;
  // @ViewChild('recieveDate') recieveDate: TaminFieldComboBoxStaticComponent;
  // @ViewChild('deliverType') deliverTypeCombo: TaminFieldComboBoxStaticComponent;
  // @ViewChild('bookletReciever') bookletReciever: ElementRef;
  @ViewChild('city') city: TaminFieldComboBoxStaticComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('bookletMap') bookletMap: BookletMapComponent;
  // @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  private _subscription = new Subscription();
  requestTypes = [];
  printStatus = [];
  recieveTypes = [];
  recieveTimes = [];
  deliverTypes = [];
  public showUploader: boolean;
  insuredAndSubdominants = [];
  showBranch: boolean;
  showRecieveTime: boolean;
  showAddress: boolean;
  showTimeDate: boolean;
  pilotType3: boolean;
  showDate: boolean;
  branchQuatos = [];
  cities = [];
  branchCodes = [];
  provinces = [];
  subdominantInfoList = [];
  private _overlay: any;
  private _overlay2: any;
  private persianService: TaminPersianService;
  private taminStaticDataService: TaminStaticDataService;
  private overlayService: OverlayService;
  image: string;
  selectedBranch: string;
  distance: string;
  deliveryCost: string;
  deliverType: string;
  insuranceMainNumebr: string;
  branchMainCode: string;
  nationalMainCode: string;
  source = [];
  public restUrlImages;


  // @Input()
  // documentModelUi: DocumentUiModel;
  // documenteditForm: FormGroup;


  constructor(injector: Injector) {
    super(injector);
    this.persianService = injector.get(TaminPersianService);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.overlayService = injector.get(OverlayService);
  }

  private _initializeFormGroup() {
    this.newForm = this.formBuilder.group({
      nationalCode: ['', [TaminValidators.nationalId]],
      nationalCardSerial: ['', [Validators.maxLength(10), Validators.minLength(9)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')]],
      requestType: ['', [Validators.required]],
      recieveType: ['', [Validators.required]],
      address: ['', [Validators.required]],
      recieveTime: ['', [Validators.required]],
      recieveDate: ['', [Validators.required]],
      deliverType: ['', [Validators.required]],
      zipCode: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]],
      bookletReciever: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
    });



    this._subscription.add(this.newForm.get('branchCode').valueChanges.subscribe(val => {
      if (val) {
        this.getBranchQuatos(val)
          .then(value => {
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
            this.branchQuatos = [];
          });
      } else {
        this.branchQuatos = [];
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
        ///get price
        debugger;
        this.getDeliverTypesPrices(value)
          .then(val => {
            const data = [];
            (val.data.list as Array<any>).forEach(item => {
              data.push(
                {
                  name: `${item.typeName} ${' - با مبلغ '} ${item.price} ${'ریال'}`,
                  value: item.price
                });
            });
            this.deliverTypes = data;
          })
          .catch(reason => {
            this.deliverTypes = [];
          });
      } else {
        this.cities = [];
      }

    }));

    this._subscription.add(this.newForm.get('city').valueChanges.subscribe(value => {
      debugger;
      const val = this.newForm.get('recieveType').value;
      const valProv = this.newForm.get('province').value;
      // if (val !== undefined && value !== '' && val === '2') {


      const theUrl = `${Urls.CheckPilotGeo}?provinceCode=${valProv}`;
      this.restService.getAll(theUrl)
        .then(data => {
          // if (!data.data) {
          //           //   this.showInfoMessageBox('پیام سیستم', 'امکان ارسال از طریق پیک در حال حاضر در استان مورد نظر شما فعال نمی باشد لطفا روش حضوری را انتخاب نمایید.');
          //           //   this._overlay.hide();
          //           //   return;
          //           //
          //           // } else {
          //           //   // this.bookletMap.open(value);
          //           // }
          if (!data.data.isPilot) {
            this.showInfoMessageBox('پیام سیستم', 'امکان ارسال از طریق پیک در حال حاضر در استان مورد نظر شما فعال نمی باشد لطفا روش حضوری را انتخاب نمایید.');
            this._overlay.hide();
            return;

          } else if (data.data.isPilotType3) {
            debugger;

            this.showAddress = true;
            this.pilotType3 = true;
            this.showTimeDate = true;


          } else {

            debugger;
            this.showRecieveTime = true;
            this.showAddress = true;
            this.showDate = true;
            this.pilotType3 = false;
            this.showTimeDate = false;
            this.bookletMap.open(value);

            // this.bookletMap.open(value);


          }
        })
        .catch(error => {
        });






    }));


  }


  initializePage() {
    this._initializeFormGroup();
    this.requestTypes = this.taminStaticDataService.getBookletRequestTypes();
    this.printStatus = this.taminStaticDataService.getBookletPrintStatus();
    this.recieveTypes = this.taminStaticDataService.getBookletRecieveTypes();
    this.recieveTimes = this.taminStaticDataService.getBookletRecieveTimes();
    // this.deliverTypes = this.taminStaticDataService.getBookletِDeliverTypes();
    this.onChanges();



    this.showRecieveTime = false;
    this.showAddress = false;
    this.showDate = false;
    // this.theModal.width = '252px';
    this._initializeProvince();



  }

  resetForm() {
    this.newForm.reset();
  }

  saveFormValidation(): boolean {

    let result =
      this.newForm.get('zipCode').valid &&
      this.newForm.get('address').valid;

    return result;
  }


  saveForm(values, valid) {
    debugger;
    this._markFormGroupTouched();
    if (!this.saveFormValidation()) {
      return;
    }
    const data1 = this.newForm.getRawValue();
    const val = this.newForm.get('recieveType').value;
    const valSerial = this.newForm.get('nationalCardSerial').value;
    const date = this.newForm.get('recieveDate').value;
    const time = this.newForm.get('recieveTime').value;
    const theUrl = `${Urls.BookletOrder}`;
    const theUrl2 = `${Urls.BookletQuota}`;
    const orderList = [];
    const doc = new RequestDocumentModel();
    const file = new DocumentFileModel();
    const city = data1.city;

    this.restService.getAll(theUrl2 + '?cityCode=' + city)
      .then(data => {
        if (data.data !== null) {
          this.branchMainCode = data.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
    if (this.branchMainCode !== null) {
      this.restService.getAll(theUrl + '/head')
        .then(data => {
          if (data.data !== null) {
            ////code order set 
            ((data as any).data.list).forEach(item => {
              item.price = data1.deliverType;
              item.address = data1.address;
              item.status = '1';
              item.organizationId = this.branchMainCode;
              this.restService.update(theUrl, item.id, item).then(res => {
                if (res.data !== null) {
                  const data = this.newForm.getRawValue();
                  (<HTMLInputElement>document.getElementById('amount')).value = '1000';//item.price;
                  (<HTMLInputElement>document.getElementById('key')).value = item.id;
                  (<HTMLInputElement>document.getElementById('username')).value = item.mobileNumber;
                  (<HTMLInputElement>document.getElementById('callback')).value = 'https://eservices.tamin.ir/confirm-payment';
                  // @ts-ignore
                  document.getElementById('form').submit();
                }
              }).catch(error => {
                console.log(error);
              });
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  loadData() {
    this.restService.getAll(Urls.BookletElectronicInfo)
      .then(data => {
        if (data.data) {
          data.data.bookletReciever = data.data.nationalCode;
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



  onChanges() {
    this._subscription.add(this.newForm.get('recieveType').valueChanges.subscribe(val => {
      switch (val) {
        case '1': /* Hozuri */
          this.showRecieveTime = false;
          this.showAddress = false;
          this.showDate = false;
          break;
        case '2': /* Peik */
          this.showRecieveTime = true;
          this.showAddress = true;
          this.showDate = true;
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



  onGetAddress() {
    debugger;
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
        this.newForm.patchValue({ address: data.data !== "null" ? data.data : "" });
        if (data.data === "null") {
          this.showErrorMessageBox('پیام سیستم', "بنظر می رسد کد پستی را اشتباه وارد کرده باشید،لطفا مجددا کد پستی صحیح را وارد نموده و یا آدرس را بصورت دستی وارد نمایید.");
        }
      })
      .catch(error => {
        this._overlay.hide();
        this.newForm.patchValue({ address: "" });
        this.showErrorMessageBox('پیام سیستم', "امکان دریافت آدرس در این لحظه مقدور نمی باشد،لطفا آدرس را بصورت دستی وارد نمایید.");
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
            this.insuranceMainNumebr = data.data.list[0].risuid;
            this.branchMainCode = data.data.list[0].brhCode;
            this.nationalMainCode = data.data.list[0].natCode;
            resolve(!data.data.list[0].healthBookletDate.startsWith('00') && !data.data.list[0].healthBookletDate.startsWith('11') && !data.data.list[0].healthBookletDate.startsWith('0'));
          }

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
      this.restService.getAll(Urls.BookletNew + '?nationalId=' + this.nationalMainCode + '&insuranceId=' + this.insuranceMainNumebr + '&branchCode=' + this.branchMainCode)
        .then(data => {
          if (data.data !== null) {
            ((data as any).data.list).forEach(item => {
              this.insuredAndSubdominants.push({
                name: `${item.firstName} ${item.lastName} - شماره بیمه ${item.risuid}`,
                value: item.nationalId
              });
              this.subdominantInfoList.push({
                nationalId: item.nationalId,
                olderThan19: item.olderThan19
              });
            });
            resolve();
          } else {
            this._overlay.hide();
            this.showErrorMessageBox('پیام سیستم', 'مشکلی در دریافت اطلاعات از سیستم نامنویسی متمرکز رخ داده است.لطفا با مراجعه به منوی بیمه شدگان/خدمات نامنویسی/استعلام اطلاعات هویتی و شماره تامین اجتماعی، اطمینان حاصل فرمایید شماره تامین اجتماعی به شما اختصاص داده شده است.');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }


  private _initializeProvince() {
    this.province.valueField = 'provinceCode';
    this.province.displayField = 'provinceName';
    this.province.searchPattern = '*{term}*%';
    const searchParam = new SearchParam();
    searchParam.value = '1';
    searchParam.operator = SearchOperator.EQ;
    searchParam.property = 'operation';
    this.province.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.provinces)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('provinceCode')
      .addVisibleColumn({ columnName: 'provinceCode', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'provinceName', columnCaption: 'نام', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .addSearchParam(searchParam)
      .getData();
  }

  private getCities(code): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'provincecode';

      this.restService.getPage(Urls.BookletCities, 1, 100, [searchParam])
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
  // showSerialHelp() {
  //   this.helpModal.show();
  // }

  mapConfirmed(data) {
    this.selectedBranch = data.selectedBranch;
    this.image = data.image;
    this.source = data.source;
    this.distance = data.distance;
    this.deliveryCost = data.deliveryCost;
    this.deliverType = data.deliveryCompany;
    this.newForm.get('branchCode').setValue(this.selectedBranch);
    console.log(data);
  }

  onGetUserPicture() {
    const nationalCode = this.newForm.get('nationalCode').value as string;
    const nationalCardSerial = this.newForm.get('nationalCardSerial').value as string;

    if (nationalCode !== '' && nationalCardSerial !== null && nationalCardSerial !== '' && this.newForm.get('nationalCardSerial').valid) {
      const theUrl = `${Urls.BookletPicture}?nationalId=${nationalCode}&serialNumber=${nationalCardSerial}`;
      this.restService.getAll(theUrl)
        .then(data => {
        })
        .catch(error => {
        });
    }

  }


  // onAddUniversityImage() {
  //   if (this.imageGallery.images.length >= 1) {
  //     this.showErrorMessageBox('پیام سیستم', 'سند بارگذاری شده است،در صورت نیاز به اصلاح ابتدا حذف و مجددا اضافه گردد.');
  //   } else {
  //     this.imageGallery.selectImage("گواهی تحصیلی");
  //   }
  // }
  onRedirectToCart() {
    this.redirectTo('/cart');
  }

  private getDeliverTypesPrices(code): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'provinceCode';

      this.restService.getPage(Urls.BookletDeliverTypes, 1, 10, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}
