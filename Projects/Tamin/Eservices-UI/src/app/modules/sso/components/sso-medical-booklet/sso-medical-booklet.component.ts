import { Component,  ElementRef, Injector, ViewChild, Input } from '@angular/core';
import {OverlayService, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminModalComponent, TaminPageBaseComponent, TaminPersianService, TaminValidators} from 'tamin-framework';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {FormGroup, Validators} from '@angular/forms';
import {BookletMapComponent} from '../../../../component/medical-booklet/booklet-map/booklet-map.component';
import {Subscription} from 'rxjs';
import {Urls} from '../../../../settings/urls';
import {BookletModel} from '../../../../models/booklet/booklet.model';
import {BookletSsnModel} from '../../../../models/booklet/bookletSsn.model';
import {SsoMedicalBookletMapComponent} from './sso-medical-booklet-map/sso-medical-booklet-map.component';
import {DeservedTreatmentModel} from '../../../../models/deserved-treatment/deservedTreatment.model';
import {BookletSsoModel} from '../../../../models/booklet/bookletSso.model';

@Component({
  selector: 'app-sso-medical-booklet',
  templateUrl: './sso-medical-booklet.component.html',
  styleUrls: ['./sso-medical-booklet.component.css']
})
export class SsoMedicalBookletComponent extends  TaminPageBaseComponent {

  newForm: FormGroup;
  validateParams: SearchParam[];
  private overlay: any;
  isDesabled: boolean;
  // @ViewChild('organizationDataGrid') organizationDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('userPicture') userPicture: ElementRef;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('helpModal') helpModal: TaminModalComponent;
  @ViewChild('recieveDate') recieveDate: TaminFieldComboBoxStaticComponent;
  // @ViewChild('bookletReciever') bookletReciever: ElementRef;
  @ViewChild('city') city: TaminFieldComboBoxStaticComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('bookletMap') bookletMap: SsoMedicalBookletMapComponent;
  // tslint:disable-next-line:comment-format
  //@ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
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
  @Input() deservedModel: DeservedTreatmentModel;

  constructor(injector: Injector) {
    super(injector);
    this.persianService = injector.get(TaminPersianService);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.overlayService = injector.get(OverlayService);
  }

  initializePage() {
    this._initializeFormGroup();
    this.requestTypes = this.taminStaticDataService.getBookletRequestTypes();
    this.printStatus = this.taminStaticDataService.getBookletPrintStatus();
    this.recieveTypes = this.taminStaticDataService.getBookletRecieveTypes();
    this.recieveTimes = this.taminStaticDataService.getBookletRecieveTimes();
    this.onChanges();
    this.showRecieveTime = false;
    this.showAddress = false;
    this.showDate = false;
    this.theModal.width = '252px';
    this._initializeProvince();

  }

  private _initializeFormGroup() {
    this.newForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, TaminValidators.nationalId]],
      ticketCode: ['' , [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      reciever: ['', [ Validators.required]],
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
    //
    this._subscription.add(this.newForm.get('nationalCode').valueChanges.subscribe(val => {
      if (val !== null ) {
        const ticketCode = this.newForm.get('ticketCode').value;
        if (val.length !== 10 && this.showUploader === false) {
          this.showUploader = true;
          this.resetForm();
          this.newForm.get('ticketCode').setValue(val);
        }
        if ( val.length === 10 && this.showUploader !== false && ticketCode.toString().length === 6 ) {
          const theUrl = `${Urls.BookletElectronicInfoSso}?nationalId=${val}&ticketCode=${ticketCode}`;
          this.restService.getAll(theUrl)
            .then(data => {
              if (data.data) {
                this.newForm.get('reciever').setValue(data.data.firstName + ' ' + data.data.lastName + ' - ' + data.data.insuranceId);
                this.newForm.patchValue(data.data);
              }
            })
            .catch(error => {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
          this.showUploader = false;
          this._overlay = this.overlayService.showMessage(
            '</p>' +
            '<p>' + 'در حال دریافت اطلاعات مورد نیاز،لطفا منتظر بمانید ' + '</p>' +
            '<p>' + 'استعلام اطلاعات هویتی ...' + '</p>' +
            '<p>' + 'استعلام استحقاق درمان ...' + '</p>'
          );
          this.checkDeserve(val)
            .then(value => {
              if (value) {
                // this.getInsuredAndSubdominants().then(data => {
                //   this.loadData();
                this._overlay.hide();
                // });
              } else {
                this._overlay.hide();
                this.showErrorMessageBox('پیام سیستم', 'بیمه شده شرایط لازم برای دریافت دفترچه را احراز ننموده است.');
              }
            })
            .catch(reason => {
              this._overlay.hide();
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
        }
      }
    }));
    this._subscription.add(this.newForm.get('ticketCode').valueChanges.subscribe(val => {

      if (val !== null ) {
        const nationalId = this.newForm.get('nationalCode').value;
        if ( val.length !== 6 && this.showUploader === false) {
                this.showUploader = true;
                this.resetForm();
                this.newForm.get('ticketCode').setValue(val);
             }
        if ( val.length === 6 && this.showUploader !== false && nationalId.toString().length === 10 ) {
          const theUrl = `${Urls.BookletElectronicInfoSso}?nationalId=${nationalId}&ticketCode=${val}`;
          this.restService.getAll(theUrl)
            .then(data => {
              if (data.data) {
                this.newForm.get('reciever').setValue(data.data.firstName + ' ' + data.data.lastName + ' - ' + data.data.insuranceId);
                this.newForm.patchValue(data.data);
              }
            })
            .catch(error => {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
          this.showUploader = false;
          this._overlay = this.overlayService.showMessage(
            '</p>' +
            '<p>' + 'در حال دریافت اطلاعات مورد نیاز،لطفا منتظر بمانید ' + '</p>' +
            '<p>' + 'استعلام اطلاعات هویتی ...' + '</p>' +
            '<p>' + 'استعلام استحقاق درمان ...' + '</p>'
          );
          this.checkDeserve(nationalId)
            .then(value => {
                  if (value) {
                    // this.getInsuredAndSubdominants().then(data => {
                    //   this.loadData();
                      this._overlay.hide();
                    // });
                  } else {
                    this._overlay.hide();
                    this.showErrorMessageBox('پیام سیستم', 'بیمه شده شرایط لازم برای دریافت دفترچه را احراز ننموده است.');
                  }
                })
                .catch(reason => {
                  this._overlay.hide();
                  this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
                });
          // ((this.subdominantInfoList as any)).forEach(item => {
          //   if (item.nationalId === val) {
          //     if (item.olderThan19 === '1') {
          //       this.showQuestionBox('پیام سیستم', 'جهت صدور دفترچه برای این بیمه شده نیاز به آپلود گواهی تحصیلی می باشد،آیا مایل به بارگذاری سند و ادامه می باشید؟.', () => {
          //         try {
          //           this.showUploader = true;
          //           this.imageGallery.saveUrl = Urls.UploadImage;
          //         } catch (error) {
          //           this.imageGallery.saveUrl = Urls.UploadImage;
          //         }
          //       }, () => {
          //         return;
          //       });
          //     }
          //   }
          //
          // });
        }
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

        const theUrl = `${Urls.CheckPilotGeoSso}?provinceCode=${valProv}`;
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
            // tslint:disable-next-line:no-shadowed-variable
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

  resetForm() {
    this.newForm.reset();
  }

  saveFormValidation(): boolean {
    let result = this.newForm.get('nationalCode').valid &&
      this.newForm.get('reciever').valid &&
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
      if (new Date().getHours() >= 11 && new Date(date).getDate() === new Date().getDate()) {
        this.newForm.get('recieveTime').setValue('');
        this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
        return;
      }
    } else if (time === '2') {
      if (new Date().getHours() >= 12 && new Date(date).getDate() === new Date().getDate()) {
        this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
        this.newForm.get('recieveTime').setValue('');
        return;
      }
    } else if (time === '3') {
      if (new Date().getHours() >= 14 && new Date(date).getDate() === new Date().getDate()) {
        this.showInfoMessageBox('پیام سیستم', 'امکان انتخاب این بازه زمانی وجود ندارد.');
        this.newForm.get('recieveTime').setValue('');
        return;
      }
    }

    // if (new Date().getHours() >= 11 && new Date(data.recieveDate).getDate() == new Date().getDate()) {
    //   this.showInfoMessageBox('پیام سیستم', 'با توجه به اينکه درخواست شما پس از ساعت 11 صبح ثبت شده است،امکان انتخاب امروز بعنوان روز تحويل وجود ندارد؛لطفا روز ديگري را انتخاب نماييد.');
    //   return;
    // }
    const toBeSaved = new BookletSsoModel();
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

    // if (this.imageGallery != null && this.imageGallery !== undefined && this.imageGallery.images.length > 0) {
    //   this.imageGallery.images[0].tag = '01';
    //   toBeSaved.guid = this.imageGallery.images[0].guid;
    //   toBeSaved.docType = this.imageGallery.images[0].tag;
    // }

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
      message += '<li>لطفا هنگام تحويل گرفتن دفترچه،حتما دفترچه قبلي خود را به همراه داشته باشند،در غير اينصورت دفترچه جديد به بیمه شده تحويل نخواهد شد.</li>';
      message += '<li> در صورتيکه دفترچه بیمه شده گم شده است در حال حاضر نمي توانيد برای بیمه شده بصورت غيرحضوري درخواست دفترچه دهيد و ميبايست بیمه شده به شعبه يا کارگزاري مراجعه نمايد</li>';
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
          const theUrl = `${Urls.CheckIamgeSso}?identityCode=${data.nationalCode}&type=001&check=1`;
          this.restService.getAll(theUrl)
            // tslint:disable-next-line:no-shadowed-variable
            .then(data => {
              if (!data.data) {
                this.showInfoMessageBox('پیام سیستم', 'استعلام عکس از پایگاه ثبت احوال و پرونده الکترونیک سازمان تامین اجتماعی نتیجه ای در برنداشت؛لطفا در صورت داشتن اطلاعات کارت ملی بیمه شده ،سریال آن را طبق راهنما در قسمت مربوطه وارد نمایید و در غیر اینصورت گزینه حضوری را انتخاب نمایید.جهت فراهم شدن امکان ارسال از طریق پیک در اولین مراجعه بیمه شده به شعبه نسبت به اسکن عکس پرسنلی اقدام شود.');
                this._overlay.hide();
                return;

              } else {
                this.restService.create(Urls.BookletElectronicRequestSso, toBeSaved)
                  .then(data1 => {
                    this._overlay.hide();
                    // tslint:disable-next-line:no-shadowed-variable
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
          this.restService.create(Urls.BookletElectronicRequestSso, toBeSaved)
            .then(data1 => {
              this._overlay.hide();
              // tslint:disable-next-line:no-shadowed-variable
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
        const theUrl = `${Urls.CheckIamgeSso}?identityCode=${data.nationalCode}&type=001&check=1`;
        this.restService.getAll(theUrl)
          // tslint:disable-next-line:no-shadowed-variable
          .then(data => {
            if (!data.data) {
              this.showInfoMessageBox('پیام سیستم', 'استعلام عکس از پایگاه ثبت احوال و پرونده الکترونیک سازمان تامین اجتماعی نتیجه ای در برنداشت؛لطفا در صورت داشتن اطلاعات کارت ملی بیمه شده ،سریال آن را طبق راهنما در قسمت مربوطه وارد نمایید و در غیر اینصورت گزینه حضوری را انتخاب نمایید.جهت فراهم شدن امکان ارسال از طریق پیک در اولین مراجعه بیمه شده به شعبه نسبت به اسکن عکس پرسنلی اقدام شود.');
              this._overlay.hide();
              return;

            } else {
              this.restService.create(Urls.BookletElectronicRequestSso, toBeSaved)
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
        this.restService.create(Urls.BookletElectronicRequestSso, toBeSaved)
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

  private _markFormGroupTouched() {
    (<any>Object).values(this.newForm.controls).forEach(control => control.markAsTouched());
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

      this.restService.getPage(Urls.BookletCitiesSso, 1, 100, [searchParam])
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


      this.restService.getPage(Urls.CityBranchesSso, 1, 100, [searchParam])
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
      const theUrl = `${Urls.BookletPictureSso}?nationalId=${nationalCode}&serialNumber=${nationalCardSerial}`;
      this.restService.getAll(theUrl)
        .then(data => {
        })
        .catch(error => {
        });
    }

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
    this.redirectTo('/sso/main');
  }

  private checkFirstBooklet(): Promise<boolean> {
    const nationalId = this.newForm.get('nationalCode').value;
    return new Promise((resolve, reject) => {
      const theUrl = `${Urls.BookletFirstSso}?nationalId=${nationalId}`;
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
  private getBranchQuatos(code): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'branchCode';

      this.restService.getPage(Urls.BookletQuotasSso, 1, 10, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  onShowUserPicture(/*nationalId, serialNumber*/) {
    const nationalCode = this.newForm.get('nationalCode').value as string;
    const nationalCardSerial = this.newForm.get('nationalCardSerial').value as string;


    const theUrl = `${Urls.BookletPictureSso}?nationalId=${nationalCode}&serialNumber=${nationalCardSerial}`;
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
  private checkDeserve(nationalCode): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const theUrl =  `${Urls.DeserveSso}?nationalId=${nationalCode}`;
      this.restService.getAll(theUrl)
        .then(data => {
          this.deservedModel = data.data.list[0];
          resolve((!data.data.list[0].healthBookletDate.startsWith('00') && !data.data.list[0].healthBookletDate.startsWith('11') && !data.data.list[0].healthBookletDate.startsWith('0')) || data.data.list[0].healthBookletDate.startsWith('02'));
          // if (((data.data as any).list).length !== 0) {
          //   this.insuranceMainNumebr = data.data.list[0].risuid;
          //   this.branchMainCode = data.data.list[0].brhCode;
          //   this.nationalMainCode = data.data.list[0].natCode;
          //   resolve((!data.data.list[0].healthBookletDate.startsWith('00') && !data.data.list[0].healthBookletDate.startsWith('11') && !data.data.list[0].healthBookletDate.startsWith('0')) || data.data.list[0].healthBookletDate.startsWith('02'));
          // }

        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // onAddUniversityImage() {
  //   if (this.imageGallery.images.length >= 1) {
  //     this.showErrorMessageBox('پیام سیستم', 'سند بارگذاری شده است،در صورت نیاز به اصلاح ابتدا حذف و مجددا اضافه گردد.');
  //   } else {
  //     this.imageGallery.selectImage('گواهی تحصیلی');
  //   }
  // }
  sendUserTicket() {
    debugger;
    const values = this.newForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10 ) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.validateParams = [];
    this.validateParams.push({
      property: 'nationalCode',
      value: values.nationalCode,
      operator: SearchOperator.EQ

    });
    this.validateParams.push({
      property: 'serviceName',
      value: 'medical',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.TicketAdminSso , this.validateParams)
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

}
