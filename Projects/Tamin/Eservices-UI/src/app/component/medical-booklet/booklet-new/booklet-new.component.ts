import {Component, ElementRef, Injector, ViewChild, Input} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {OverlayService, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent, TaminPersianService, TaminValidators, SortDirection, SortParam, TaminImageGalleryManagedComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {TaminStaticDataService} from '../../../services/tamin-static-data.service/tamin-static-data.service';
import {Subscription} from 'rxjs';
import {BookletModel} from '../../../models/booklet/booklet.model';
import {BookletSsnModel} from '../../../models/booklet/bookletSsn.model';
import {BookletMapComponent} from '../booklet-map/booklet-map.component';
import {DocumentUiModel} from 'src/app/models/registration/documentUi.model';
import {BookletPaymentModel} from '../../../models/booklet/bookletPayment.model';


@Component({
  selector: 'app-booklet-new',
  templateUrl: './booklet-new.component.html',
  styleUrls: ['./booklet-new.component.css']
})
export class BookletNewComponent extends TaminPageBaseComponent {
  newForm: FormGroup;
  // @ViewChild('organizationDataGrid') organizationDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('userPicture') userPicture: ElementRef;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('helpModal') helpModal: TaminModalComponent;
  @ViewChild('recieveDate') recieveDate: TaminFieldComboBoxStaticComponent;
 // @ViewChild('bookletReciever') bookletReciever: ElementRef;
  @ViewChild('city') city: TaminFieldComboBoxStaticComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('bookletMap') bookletMap: BookletMapComponent;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  private _subscription = new Subscription();
  requestTypes = [];
  printStatus = [];
  recieveTypes = [];
  recieveTimes = [];
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
      zipCode: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]],
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

    this._subscription.add(this.newForm.get('bookletReciever').valueChanges.subscribe(val => {
      if (val !== null) {
        this.newForm.get('nationalCode').setValue(val);
        const theUrl = `${Urls.BookletElectronicInfo}?nationalId=${val}`;
        this.restService.getAll(theUrl)
          .then(data => {
            if (data.data) {
              this.newForm.patchValue(data.data);
            }
          })
          .catch(error => {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        this.showUploader = false;
        ((this.subdominantInfoList as any)).forEach(item => {
          if (item.nationalId === val) {
            if (item.olderThan19 === '1') {
              this.showQuestionBox('پیام سیستم', 'جهت صدور دفترچه برای این بیمه شده نیاز به آپلود گواهی تحصیلی می باشد،آیا مایل به بارگذاری سند و ادامه می باشید؟.', () => {
                try {
                  this.showUploader = true;
                  this.imageGallery.saveUrl = Urls.UploadImage;
                } catch (error) {
                  this.imageGallery.saveUrl = Urls.UploadImage;
                }
              }, () => {
                return;
              });
            }
          }

        });
      }

    }));

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
    this._subscription.add(this.newForm.get('recieveType').valueChanges.subscribe(value => {
      this.newForm.get('province').setValue('');
      this.newForm.get('city').setValue('');
      this.newForm.get('branchCode').setValue('');


    }));
    // this._subscription.add(this.newForm.get('recieveTime').valueChanges.subscribe(value => {
    //   const date = this.newForm.get('recieveDate').value;
    //   if (value === '1') {
    //     if (new Date().getHours() >= 11 && new Date(date).getDate() == new Date().getDate()) {
    //       this.newForm.get('recieveTime').setValue(null);
    //       this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
    //     }
    //   }else if (value === '2'){
    //     if (new Date().getHours() >= 12 && new Date(date).getDate() == new Date().getDate()) {
    //       this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
    //       this.newForm.get('recieveTime').setValue(null);
    //     }
    //   }else if (value === '3'){
    //     if (new Date().getHours() >= 14 && new Date(date).getDate() == new Date().getDate()) {
    //       this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
    //       this.newForm.get('recieveTime').setValue(null);
    //     }
    //   }

    // }));

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
      const val = this.newForm.get('recieveType').value;
      const valProv = this.newForm.get('province').value;
      if (val !== undefined && value !== '' && val === '2') {

        const theUrl = `${Urls.CheckPilotGeo}?provinceCode=${valProv}`;
        this.restService.getAll(theUrl)
          .then(data => {

            if (!data.data.isPilot) {
              this.showInfoMessageBox('پیام سیستم', 'امکان ارسال از طریق پیک در حال حاضر در استان مورد نظر شما فعال نمی باشد لطفا روش حضوری را انتخاب نمایید.');
              this._overlay.hide();
              return;

            } else if (data.data.isPilotType3) {
              this.showAddress = true;
              this.pilotType3 = true;
              this.showTimeDate = true;
            } else {
              this.showRecieveTime = true;
              this.showAddress = true;
              this.showDate = true;
              this.pilotType3 = false;
              this.showTimeDate = false;
              this.bookletMap.open(value);

            }
          })
          .catch(error => {
          });


        // if (valProv==='11' || valProv==='34' || valProv==='32') {
        //   this.bookletMap.open(value);
        // }else{
        //   this.showInfoMessageBox('پیام سیستم', 'امکان ارسال توسط پیک در حال حاضر برای غرب تهران،زنجان و البرز فعال می باشد،لطفا روش حضوری را انتخاب نمایید.');
        // }

      } else {
        if (value) {
          this.getBranches(value)
            .then(val => {
              const data = [];
              (val.data.list as Array<any>).forEach(item => {
                data.push(
                  {
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

      }


    }));


  }


  initializePage() {
    this._initializeFormGroup();
    this.requestTypes = this.taminStaticDataService.getBookletRequestTypes();
    this.printStatus = this.taminStaticDataService.getBookletPrintStatus();
    this.recieveTypes = this.taminStaticDataService.getBookletRecieveTypes();
    this.recieveTimes = this.taminStaticDataService.getBookletRecieveTimes();
    this.onChanges();
    // this.imageGallery.saveUrl=Urls.UploadImage;
    this._overlay = this.overlayService.showMessage(
      '</p>' +
      '<p>' + 'در حال دریافت اطلاعات مورد نیاز،لطفا منتظر بمانید ' + '</p>' +
      '<p>' + 'استعلام اطلاعات هویتی ...' + '</p>' +
      '<p>' + 'استعلام استحقاق درمان ...' + '</p>' +
      '<p>' + 'استعلام آخرین رابطه بیمه پردازی ...' + '</p>' +
      '<p>' + 'استعلام افراد تبعی ...' + '</p>'
    );

    this.checkEligibleTo()
      .then(value => {
        if (value) {
          this.getInsuredAndSubdominants().then(data => {
            this.loadData();
            this._overlay.hide();
          });
        } else {
          this._overlay.hide();
          this.showErrorMessageBox('پیام سیستم', 'شما شرایط لازم برای دریافت دفترچه را احراز ننموده اید');
        }
      })
      .catch(reason => {
        this._overlay.hide();
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
    this.showRecieveTime = false;
    this.showAddress = false;
    this.showDate = false;
    this.theModal.width = '252px';
    this._initializeProvince();

    // this.restUrlImages = Urls.UploadImage;
    // this.documenteditForm = this.formBuilder.group({
    //   id: ['', Validators.pattern('[0-9]*')],
    //   length: ['', Validators.pattern('[0-9]*')],
    //   width: ['', Validators.pattern('[0-9]*')],
    //   height: ['', Validators.pattern('[0-9]*')],
    //   title: [{value: '', disabled: false}, [Validators.required/*, Validators.pattern('[a-z]*')*/]],
    //   DesignGuid1: [{value: '', disabled: false}, [Validators.required, Validators.pattern('[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}')]],
    // });

  }

  resetForm() {
    this.newForm.reset();
  }

  saveFormValidation(): boolean {
    let result = this.newForm.get('bookletReciever').valid &&
      this.newForm.get('nationalCode').valid &&
      this.newForm.get('mobileNumber').valid &&
      this.newForm.get('requestType').valid &&
      this.newForm.get('recieveType').valid &&
      this.newForm.get('recieveDate').valid &&
      this.newForm.get('recieveTime').valid &&
      this.newForm.get('branchCode').valid;

    if (this.newForm.get('recieveType').value === '2') {
      result = result &&
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
    const data = this.newForm.getRawValue();
    const val = this.newForm.get('recieveType').value;
    const valSerial = this.newForm.get('nationalCardSerial').value;
    const province = this.newForm.get('province').value;
    const city = this.newForm.get('city').value;

    const date = this.newForm.get('recieveDate').value;
    const time = this.newForm.get('recieveTime').value;
    if (time === '1') {
      if (new Date().getHours() >= 11 && new Date(date).getDate() == new Date().getDate()) {
        this.newForm.get('recieveTime').setValue('');
        this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
        return;
      }
    } else if (time === '2') {
      if (new Date().getHours() >= 12 && new Date(date).getDate() == new Date().getDate()) {
        this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
        this.newForm.get('recieveTime').setValue('');
        return;
      }
    } else if (time === '3') {
      if (new Date().getHours() >= 14 && new Date(date).getDate() == new Date().getDate()) {
        this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
        this.newForm.get('recieveTime').setValue('');
        return;
      }
    }

    // if (new Date().getHours() >= 11 && new Date(data.recieveDate).getDate() == new Date().getDate()) {
    //   this.showInfoMessageBox('پیام سیستم', 'با توجه به اينکه درخواست شما پس از ساعت 11 صبح ثبت شده است،امکان انتخاب امروز بعنوان روز تحويل وجود ندارد؛لطفا روز ديگري را انتخاب نماييد.');
    //   return;
    // }
    const toBeSaved = new BookletModel();
    toBeSaved.cityCode = city;
    toBeSaved.provinceCode = province;
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
    if (this.source !== undefined && this.source !== null && this.source.length > 0) {
      toBeSaved.latitude1 = this.source[0];
      toBeSaved.longitude1 = this.source[1];
      toBeSaved.mapImage = this.image.split(',')[1];
      toBeSaved.distance = this.distance;
      toBeSaved.price = this.deliveryCost;
      toBeSaved.deliverType = this.deliverType;

    }

    if (this.imageGallery != null && this.imageGallery != undefined && this.imageGallery.images.length > 0) {
      this.imageGallery.images[0].tag = '01';
      toBeSaved.guid = this.imageGallery.images[0].guid;
      toBeSaved.docType = this.imageGallery.images[0].tag;
    }

    // if (this.getSession('guid1') != null) {
    //   toBeSaved.guid= this.getSession('guid1');
    //   toBeSaved.docType= this.getSession('guidType1');

    //   this.removeSession('guid1');
    //   this.removeSession('guidType1');
    // }
    const type = this.newForm.get('requestType').value;
    if (type !== undefined && type === '2') {
      let message = '';
      message = '';
      message += '<div>';
      message += '<ul>';
      message += '<li>لطفا هنگام تحويل گرفتن دفترچه،حتما دفترچه قبلي خود را به همراه داشته باشيد،در غير اينصورت دفترچه جديد به شما تحويل نخواهد شد.</li>';
      message += '<li> در صورتيکه دفترچه خود را گم کرده ايد در حال حاضر نمي توانيد بصورت غيرحضوري درخواست دفترچه دهيد و ميبايست به شعبه يا کارگزاري مراجعه نماييد</li>';
      message += '<li>پس از صدور و چاپ دفترچه،نسخ دفترچه قبلي که داراي دستور پزشک در روزهاي پس از چاپ دفترچه جديد مي باشند،ابطال و غيرقابل استفاده خواهد گرديد </li>';
      message += '</ul>';
      message += '<br/>';
      message += '<p>آيا مايل به ادامه ثبت درخواست مي باشيد؟</p>';
      message += '</div>';
      // this.showInfoMessageBox('یادآوری', 'لطفا هنگام تحویل گرفتن دفترچه،حتما دفترچه قبلی خود را به همراه داشته باشید،در غیر اینصورت دفترچه جدید به شما تحویل نخواهد شد؛همچنین در صورتیکه دفترچه خود را گم کرده اید در حال حاضر نمی توانید بصورت غیرحضوری درخواست دفترچه دهید و میبایست به شعبه یا کارگزاری مراجعه نمایید. ', () => {


      this.showQuestionBox('پیام سیستم', message, () => {
        this._overlay = this.overlayService.show();

        if (val !== undefined && val === '2') {
          // if (valSerial === undefined || valSerial === null) {
          const theUrl = `${Urls.CheckIamge}?identityCode=${data.nationalCode}&type=001&check=1`;
          this.restService.getAll(theUrl)
            .then(data => {
              if (!data.data) {
                this.showInfoMessageBox('پیام سیستم', 'استعلام عکس از پایگاه ثبت احوال و پرونده الکترونیک سازمان تامین اجتماعی نتیجه ای در برنداشت؛لطفا در صورت داشتن کارت ملی،سریال آن را طبق راهنما در قسمت مربوطه وارد نمایید و در غیر اینصورت گزینه حضوری را انتخاب نمایید.جهت فراهم شدن امکان ارسال از طریق پیک در اولین مراجعه به شعبه نسبت به اسکن عکس پرسنلی خود اقدام نمایید.');
                this._overlay.hide();
                return;

              } else {
                this.restService.create(Urls.BookletElectronicRequest, toBeSaved)
                  .then(data1 => {
                    this._overlay.hide();
                    const message = (<any>data1).data;
                    if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
                      this.showInfoMessageBox('پیام سیستم', message);
                    } else {
                      this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
                    }
                  })
                  .catch(error => {
                    this._overlay.hide();
                    this.showErrorMessageBox('پیام سیستم', error.error);
                  });

              }
            })
            .catch(error => {
            });
          // } else {
          //   this.restService.create(Urls.BookletElectronicRequest, toBeSaved)
          //     .then(data1 => {
          //       this._overlay.hide();
          //       const message = (<any>data1).data;
          //       if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
          //         this.showInfoMessageBox('پیام سیستم', message);
          //       } else {
          //         this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
          //       }
          //     })
          //     .catch(error => {
          //       this._overlay.hide();
          //       this.showErrorMessageBox('پیام سیستم', error.error);
          //     });
          // }
        } else {
          this.restService.create(Urls.BookletElectronicRequest, toBeSaved)
            .then(data1 => {
              this._overlay.hide();
              const message = (<any>data1).data;
              if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
                this.showInfoMessageBox('پیام سیستم', message);
              } else {
                this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
              }
            })
            .catch(error => {
              this._overlay.hide();
              this.showErrorMessageBox('پیام سیستم', error.error);
            });
        }


      }, () => {
        return;
      });

      // });

    } else {
      this._overlay = this.overlayService.show();

      if (val !== undefined && val === '2') {
        // if (valSerial === undefined || valSerial === null) {
        const theUrl = `${Urls.CheckIamge}?identityCode=${data.nationalCode}&type=001&check=1`;
        this.restService.getAll(theUrl)
          .then(data => {
            if (!data.data) {
              this.showInfoMessageBox('پیام سیستم', 'استعلام عکس از پایگاه ثبت احوال و پرونده الکترونیک سازمان تامین اجتماعی نتیجه ای در برنداشت؛لطفا در صورت داشتن کارت ملی،سریال آن را طبق راهنما در قسمت مربوطه وارد نمایید و در غیر اینصورت گزینه حضوری را انتخاب نمایید.جهت فراهم شدن امکان ارسال از طریق پیک در اولین مراجعه به شعبه نسبت به اسکن عکس پرسنلی خود اقدام نمایید.');
              this._overlay.hide();
              return;

            } else {
              this.restService.create(Urls.BookletElectronicRequest, toBeSaved)
                .then(data1 => {
                  this._overlay.hide();
                  const message = (<any>data1).data;
                  if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
                    this.showInfoMessageBox('پیام سیستم', message);
                  } else {
                    this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
                  }
                })
                .catch(error => {
                  this._overlay.hide();
                  this.showErrorMessageBox('پیام سیستم', error.error);
                });

            }
          })
          .catch(error => {
          });
        // } else {
        //   this.restService.create(Urls.BookletElectronicRequest, toBeSaved)
        //     .then(data1 => {
        //       this._overlay.hide();
        //       const message = (<any>data1).data;
        //       if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
        //         this.showInfoMessageBox('پیام سیستم', message);
        //       } else {
        //         this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
        //       }
        //     })
        //     .catch(error => {
        //       this._overlay.hide();
        //       this.showErrorMessageBox('پیام سیستم', error.error);
        //     });
        // }
      } else {
        this.restService.create(Urls.BookletElectronicRequest, toBeSaved)
          .then(data1 => {
            this._overlay.hide();
            const message = (<any>data1).data;
            if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
              this.showInfoMessageBox('پیام سیستم', message);
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
          this.pilotType3 = true;
          break;
        case '2': /* Peik */
          this.showRecieveTime = true;
          this.showAddress = true;
          this.showDate = true;
          this.pilotType3 = false;
          break;
        default: /* Not specified */
          this.showRecieveTime = false;
          this.showAddress = false;
          this.showDate = false;
          this.pilotType3 = true;
      }


    }));
  }

  onReturn() {
    this.redirectTo('/booklet');
  }

  onShowUserPicture(/*nationalId, serialNumber*/) {
    const nationalCode = this.newForm.get('nationalCode').value as string;
    const nationalCardSerial = this.newForm.get('nationalCardSerial').value as string;


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
        this.newForm.patchValue({address: data.data !== 'null' ? data.data : ''});
        if (data.data === 'null') {
          this.showErrorMessageBox('پیام سیستم', 'بنظر می رسد کد پستی را اشتباه وارد کرده باشید،لطفا مجددا کد پستی صحیح را وارد نموده و یا آدرس را بصورت دستی وارد نمایید.');
        }
      })
      .catch(error => {
        this._overlay.hide();
        this.newForm.patchValue({address: ''});
        this.showErrorMessageBox('پیام سیستم', 'امکان دریافت آدرس در این لحظه مقدور نمی باشد،لطفا آدرس را بصورت دستی وارد نمایید.');
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
            resolve((!data.data.list[0].healthBookletDate.startsWith('00') && !data.data.list[0].healthBookletDate.startsWith('11') && !data.data.list[0].healthBookletDate.startsWith('0')) || data.data.list[0].healthBookletDate.startsWith('02'));
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

  showSerialHelp() {
    this.helpModal.show();
  }

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

  // onImageGuidDeleted1(event) {
  //   this.removeSession('guid1');
  //   this.removeSession('guidType1');
  // }
  // removeSession(key: string): void {
  //   window.sessionStorage.removeItem(key);
  // }

  // onImageGuidUploaded1(event) {
  //   this.setSession('guid1', event);
  //   this.setSession('guidType1', '01');
  // }
  // setSession(key: string, value: any): void {
  //   const data = value === undefined ? null : JSON.stringify(value);
  //   window.sessionStorage.setItem(key, data);
  // }
  // getSession(key: string): any {
  //   const data = window.sessionStorage.getItem(key);
  //   return JSON.parse(data);
  // }

  onAddUniversityImage() {
    if (this.imageGallery.images.length >= 1) {
      this.showErrorMessageBox('پیام سیستم', 'سند بارگذاری شده است،در صورت نیاز به اصلاح ابتدا حذف و مجددا اضافه گردد.');
    } else {
      this.imageGallery.selectImage('گواهی تحصیلی');
    }
  }

  
  
}
