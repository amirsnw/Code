import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetWorkshopInfo} from '../../../models/alo-request-det-workshop-info.model';
import {AloRequestDetStackholders} from '../../../models/alo-request-det-stackholders';
import {BookletSsnModel} from '../../../../../models/booklet/bookletSsn.model';
import {AloRequest} from '../../../models/alo-request';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-sig-owner',
  templateUrl: './new-sig-owner.component.html',
  styleUrls: ['./new-sig-owner.component.css']
})
export class NewSigOwnerComponent  extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('sigOwnerCombobBox') sigOwnerCombobBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('positionCombobBox') positionCombobBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('nationalityCodeCombobBox') nationalityCodeCombobBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('characterCombobBox') characterCombobBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('movazafCombobBox') movazafCombobBox: TaminFieldComboBoxStaticComponent;

  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private modirFlg: any;
   setSahebeEmza: any;
   setMovazaf: any;
   buttonTitle: any;
  private theUrlValue: any;
   setStartDate: any;
   setPositiont: any;
   setEndDate: any;
  private detStackholdersId: any;
  columns: any;
  setEnableSave: any;
  nationality = [];
  private _subscription = new Subscription();
  private nationalCodeIsValid: any;
  nationalName: any;
  repeatedNationalCode: any;
  repeatedSigOwner: any;
  findNationCode: any;
  private nationCode: string;
  private birthDate: string;
  private newBirthDate: string;
  private position: string;
  private startDate: Date;
  private endDate: Date;
  private movazaf: string;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
     this.editForm = this.formBuilder.group({
      nationality: [''],
      workshopCharacter:  ['', [Validators.required]],
      nationCode: [''],
      birthDate:  [''],
      firstName: ['', [Validators.required]],
      lastName:  ['', [Validators.required]],
      position: [''],
      sigOwner: [''],
      requests: [''],
      findNationCode: [''],
      endDate: [''],
       startDate: ['', [Validators.required]],
      movazaf: [''],
      positionDesk: [''],
      detResponsiblesId: [''],
      character: [''],
       positiont: [''],
    });
    this.editForm.get('character').valueChanges.subscribe(value => {
      debugger;
      if (this.modirFlg === '1') {
        this.onChangPosition();
      }
    });
    this.characterCombobBox.dataItems = [
      {
        name: 'حقیقی',
        value: '1'
      }, {
        name: 'حقوقی',
        value: '2'
      }
    ];
    this.movazafCombobBox.dataItems = [
     {
      name: 'موظف',
        value: '1'
    }, {
      name: 'غیر موظف',
        value: '2'
    }
    ];
    this.nationalityCodeCombobBox.dataItems = [
      {
        name: 'ایرانی',
        value: '1'
      }, {
        name: 'تبعه خارجی',
        value: '2'
      }
      ];
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.modirFlg = this.route.snapshot.params['modirFlg'];
    this.nationalName = 'کد ملی';
    this.sigOwnerCombobBox.dataItems = [
      {
        name: 'مجاز  مشترک',
        value: '1'
      },
      {
        name:  'مجاز منفرد',
        value: '2'
      }
    ];
    this.positionCombobBox.dataItems = [
      {
        name: 'مدیرعامل',
        value: '1'
      },
      {
        name:  'رئیس هیئت مدیره',
        value: '2'
      },
      {
        name: 'نائب رئیس هیئت مدیره',
        value: '3'
      },
      {
        name:  'اعضاء هیئت مدیره',
        value: '4'
      },
      {
        name: 'بازرس',
        value: '5'
      },
      {
        name:  'بازرس علی البدل',
        value: '6'
      }
    ];
    debugger;
    if (this.modirFlg === '1') {
         this.setSahebeEmza = true;
      this.setEndDate = false;
      this.setMovazaf = false;
      this.setStartDate = false;
      this.buttonTitle = 'ثبت اطلاعات اعضاء هيئت مديره و مديرعامل ';
      //combo semat faal mishe
      this.setPositiont = true;
      // this.editForm.get('character').enable();
     } else {
      this.setEndDate = true;
      this.setMovazaf = true;
      this.setStartDate = true;
      this.setSahebeEmza = false;
      this.buttonTitle = ' ثبت صاحبان امضا ';
      this.setPositiont = false;
      // this.editForm.get('character').disable();
      //age edit SE bod hame be joz sahe emza disable shavad
      if ( this.editMode === '1') {
        // this.editForm.get('firstName').disable();
        // this.editForm.get('lastName').disable();
        this.editForm.get('position').disable();
      }
    }
    // this.setEnableSave = true;
    this._subscription.add(this.editForm.get('nationality').valueChanges.subscribe(value => {
      debugger;
      this.nationalCodeIsValid = true;
    if (value === '1' ) {
      this.nationalName = 'کد ملی';
    } else {
      this.nationalName = 'شماره فراگیر';
    }
    }));
    this._subscription.add(this.editForm.get('nationCode').valueChanges.subscribe(value => {
      debugger;
      this.nationCode = this.editForm.get('nationCode').value;
      if ( this.nationCode !== null && this.nationCode.length >= 10) {
        ///code meli dar grid bala check mishavad
       if (this.modirFlg === '1') {
          // dar mode edit paigham nade ke nat code tekrarie
          const theUrl = `${FacUrls.STACK_HOLDERS_BY_NAT}/` + this.requestId + '/' + this.editForm.get('nationCode').value;
            this.restService.getAll(theUrl)
              .then(values => {
                debugger;
                if (values.data.total !== '0') {
                  // if (this.editMode === '0') {
                  //   this.repeatedNationalCode = '1';
                  // }
                  if (  values.data.list[0].sigOwner === null && this.editMode === '0') {
                    this.showErrorMessageBox('خطا', 'این کد ملی قبلاً ثبت شده است.');
                    // this.setEnableSave = false;
                  } else if (values.data.list[0].sigOwner !== null) {
                    this.detStackholdersId = values.data.list[0].detStackholdersId;
                    // this.editForm.patchValue(values.data.list[0]);
                    this.editForm.get('birthDate').setValue(values.data.list[0].birthDate);
                    this.editForm.get('firstName').setValue(values.data.list[0].firstName);
                    this.editForm.get('lastName').setValue(values.data.list[0].lastName);
                    // this.editForm.get('nationality').setValue(1);
                    // this.editForm.get('character').setValue(2);
                    this.editForm.get('positionDesk').setValue(null);
                    this.repeatedNationalCode = true;
                    // this.repeatedSigOwner = true;
                  }
                }
             })
              .catch(error => {
                this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
              });
            return;
           } else {
          ///code meli dar grid paein check mishavad
          const theUrl = `${FacUrls.STACK_HOLDERS_BY_NAT}/` + this.requestId + '/' + this.editForm.get('nationCode').value;
          this.restService.getAll(theUrl)
            .then(values => {
              debugger;
              //dar new check shavad k nat code tekrari ast ya na
               if ( values.data.total !== '0' && values.data.list[0].sigOwner !== null && this.editMode === '0') {
                  this.showErrorMessageBox('خطا', 'با این کد ملی قبلاً صاحبان امضاء ثبت شده است.');
                  return;
                }
               if (values.data.total !== '0' ) {
                 // this.findNationCode = true;
                 this.detStackholdersId = values.data.list[0].detStackholdersId;
                 this.editForm.get('birthDate').setValue(values.data.list[0].birthDate);
                 this.editForm.get('firstName').setValue(values.data.list[0].firstName);
                 this.editForm.get('lastName').setValue(values.data.list[0].lastName);
                 // this.editForm.get('nationality').setValue(values.data.list[0].nationality);
                 // this.editForm.get('character').setValue(values.data.list[0].character);
                 this.editForm.get('movazaf').setValue(values.data.list[0].movazaf);
                 this.editForm.get('startDate').setValue(values.data.list[0].startDate);
                 this.editForm.get('endDate').setValue(values.data.list[0].endDate);
                 this.editForm.get('position').setValue(values.data.list[0].position);
                 this.editForm.get('positiont').setValue(values.data.list[0].position);
                 if (values.data.list[0].position !== null) {// در صورتی که اطلاعات قبلا در لیست بالا ثبت شده بود امکان اصلاح هنگام ورود در لیست پایین نباشد
                   this.editForm.get('birthDate').disable();
                   this.editForm.get('firstName').disable();
                   this.editForm.get('lastName').disable();
                   this.editForm.get('positionDesk').disable();
                 }
                 this.repeatedNationalCode = true;
                 switch (values.data.list[0].position) {
                   case '1':
                     this.editForm.get('positionDesk').setValue('مدیرعامل');
                     break;
                   case '2':
                     this.editForm.get('positionDesk').setValue('رئیس هیئت مدیره');
                     break;
                   case '3':
                     this.editForm.get('positionDesk').setValue('نائب رئیس هیئت مدیره');
                     break;
                   case '4':
                     this.editForm.get('positionDesk').setValue('اعضاء هیئت مدیره');
                     break;
                   case '5':
                     this.editForm.get('positionDesk').setValue('بازرس');
                     break;
                   case '6':
                     this.editForm.get('positionDesk').setValue('بازرس علی البدل');
                     break;
                   case '7':
                     this.editForm.get('positionDesk').setValue('کارفرما');
                     break;
                 }
               }
            })
            .catch(error => {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
          return;
        }
      }
    }));
    this._subscription.add(this.editForm.get('birthDate').valueChanges.subscribe(value => {
      debugger;
      if (this.editForm.get('birthDate')) {
      // this.birthDate = this.getPersianDate(this.editForm.get('birthDate').value);
      // if ( this.birthDate !== null && this.birthDate.length >= 10) {
      //   this.birthDate =  this.birthDate.substr(0, 4) + this.birthDate.substr(5, 2) +  this.birthDate.substr(8, 2);
      //   const theUrl = `${FacUrls.GET_IDENTIFICATION}/` + this.editForm.get('nationCode').value +
      //     '/' + this.birthDate;
      //   this.restService.getAll(theUrl)
      //     .then(values => {
      //       debugger;
      //       if (values.data.list.length > 0 && values.data.list[0].sigOwner === null) {
      //         this.showErrorMessageBox('خطا', 'این کد ملی قبلاً ثبت شده است.');
      //         // this.setEnableSave = false;
      //         this.repeatedNationalCode = false;
      //       }
      //       // } else {
      //       //   this.showErrorMessageBox('خطا', ' کد ملی یا تاریخ تولد اشتباه وارد شده است ');
      //       //   this.setEnableSave = true;
      //       // }
      //     })
      //     .catch(error => {
      //       this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      //     });
      // }
      }
    }));
    this.loadData();
  }

  loadData() {
    debugger;
    if (this.modirFlg === '1') {
      this.theUrlValue = `${FacUrls.STACK_HOLDERS}/` + this.requestId;
    } else {
      this.theUrlValue = `${FacUrls.SIG_OWNER}/` + this.requestId;
    }
    if (this.editMode === '1') {
    const theUrl = this.theUrlValue;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data ) {
          // this.editForm.patchValue(values.data.list[0]);
          this.detStackholdersId = values.data.list[0].detStackholdersId;
          switch (values.data.list[0].positionDesk) {
            case '1':
              this.editForm.get('positiont').setValue('مدیرعامل');
              break;
            case '2':
              this.editForm.get('positiont').setValue('رئیس هیئت مدیره');
              break;
            case '3':
              this.editForm.get('positiont').setValue('نائب رئیس هیئت مدیره');
              break;
            case '4':
              this.editForm.get('positiont').setValue('اعضاء هیئت مدیره');
              break;
            case '5':
              this.editForm.get('positiont').setValue('بازرس');
              break;
            case '6':
              this.editForm.get('positiont').setValue('بازرس علی البدل');
              break;
            case '7':
              this.editForm.get('positiont').setValue('کارفرما');
              break;
          }
        }
        if (values.data && this.editMode === '0') {
          this.editForm.get('nationality').setValue('1');
          this.editForm.get('character').setValue('2');
        }
        // this.repeatedNationalCode = '0';
        // this.editForm.patchValue(values.data.list[0]);
        debugger;
        ///0813 ezafe kardam
        if (this.modirFlg === '1') {
          this.editForm.get('position').setValue(values.data.list[0].position);
          this.editForm.get('startDate').setValue(values.data.list[0].startDate);
          this.editForm.get('endDate').setValue(values.data.list[0].endDate);
          this.editForm.get('movazaf').setValue(values.data.list[0].movazaf);
        } else {
          this.editForm.get('sigOwner').setValue(values.data.list[0].sigOwner);
          this.editForm.get('positiont').setValue(values.data.list[0].positiont);
        }
        this.editForm.get('firstName').setValue(values.data.list[0].firstName);
        this.editForm.get('lastName').setValue(values.data.list[0].lastName);
        this.editForm.get('birthDate').setValue(values.data.list[0].birthDate);
        this.editForm.get('startDate').setValue(values.data.list[0].startDate);
        this.editForm.get('startDate').setValue(values.data.list[0].startDate);
        this.editForm.get('nationality').setValue(values.data.list[0].nationality);
        this.editForm.get('character').setValue(values.data.list[0].character);
        this.editForm.get('nationCode').setValue(values.data.list[0].nationCode);
        this.detStackholdersId = values.data.list[0].detStackholdersId;
       //// ezafe bod 0813
        // const theUrls = `${FacUrls.STACK_HOLDERS_REQUEST}/` + this.requestId;
        // this.restService.getAll(theUrls)
        //   .then(value => {
        //     debugger;
        //     if (value.data.total > 0) {
        //       // jsondata.detResponsiblesId = value.data ;
        //       this.repeatedNationalCode = '1';
        //       this.position = value.data.list[0].position;
        //       this.editForm.get('firstName').setValue( value.data.list[0].firstName);
        //       this.editForm.get('lastName').setValue( value.data.list[0].lastName);
        //       this.editForm.get('birthDate').setValue(this.getPersianDate(value.data.list[0].birthDate));
        //       this.startDate = value.data.list[0].startDate;
        //       this.endDate = value.data.list[0].endDate;
        //       this.movazaf = value.data.list[0].movazaf;
        //
        //       this.detStackholdersId = value.data.list[0].detStackholdersId;
        //     }
        //   })
        //   .catch(error => {
        //     this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        //   });
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
    }
  saveFormValidation(): boolean {
    debugger;
    const result = this.editForm.get('birthDate').valid &&
      this.editForm.get('nationCode').valid &&
      this.editForm.get('firstName').valid &&
      this.editForm.get('lastName').valid &&
      this.editForm.get('startDate').valid &&
      this.editForm.get('endDate').valid;
    return result;
  }
  private _markFormGroupTouched() {
    (<any>Object).values(this.editForm.controls).forEach(control => control.markAsTouched());
  }

  onSave(values, valid) {
    debugger;
    if (this.modirFlg === '1') {
      if (values.endDate !== null) {
        if (values.endDate !== '' && values.endDate < values.startDate) {
          this.showErrorMessageBox('پیام سیستم','"دوره تصدی از" باید از "دوره تصدی تا" کوچکتر باشد .');
          return;
        }
      }
    }
    const jsondata = new AloRequestDetStackholders();
    jsondata.nationality = values.nationality;
    jsondata.character = values.character;
    jsondata.birthDate = values.birthDate;
    jsondata.firstName = values.firstName;
    jsondata.lastName = values.lastName;
    jsondata.nationCode = values.nationCode;
    if ( this.modirFlg === '1') {
      jsondata.position = values.position;
      jsondata.startDate = values.startDate;
      jsondata.endDate = values.endDate;
      jsondata.movazaf = values.movazaf;
      jsondata.sigOwner = '';
    } else {
      // jsondata.sigOwner = values.sigOwner;
      jsondata.positiont = values.positiont;
      jsondata.positionDesk = '2';
      jsondata.sigOwner = values.sigOwner;
    }
    // if ( this.modirFlg !== '1' && this.repeatedNationalCode === '1') {
    //   jsondata.position = this.position;
    //   jsondata.startDate = this.startDate;
    //   jsondata.endDate = this.endDate;
    //   jsondata.movazaf = this.movazaf;
    //   jsondata.positionDesk = '';
    //   jsondata.sigOwner = '2';
    // } else if ( this.modirFlg === '1' && this.repeatedNationalCode === '1') {
    //   jsondata.sigOwner = values.sigOwner;
    //   jsondata.positiont = values.positiont;
    //   jsondata.positionDesk = '';
    //   jsondata.sigOwner = '2';
    // }

    // jsondata.positionDesk = values.positionDesk;
    jsondata.requests = new (AloRequest);
    jsondata.requests.requestId =  this.requestId;
   if (this.repeatedNationalCode === true ) {
     // jsondata.nationality = this.editForm.get('nationality').value;
     // jsondata.character = this.editForm.get('character').value;
     jsondata.birthDate = this.editForm.get('birthDate').value;
     jsondata.firstName = this.editForm.get('firstName').value;
     jsondata.lastName = this.editForm.get('lastName').value;
     // jsondata.nationCode = this.editForm.get('nationCode').value;
     jsondata.sigOwner = '2';
     jsondata.positionDesk = '';
     if ( this.modirFlg !== '1' ) {
       jsondata.position =  this.editForm.get('position').value;
       jsondata.startDate =  this.editForm.get('startDate').value;
       jsondata.endDate =  this.editForm.get('endDate').value;
       jsondata.movazaf =  this.editForm.get('movazaf').value;
     } else {
       jsondata.positiont = values.positiont;
     }
    }
    if ( this.editMode === '1' || this.detStackholdersId !== undefined ) {
      jsondata.detStackholdersId = this.detStackholdersId ;
    }
     debugger;
    if (this.modirFlg === '1') {
      this.theUrlValue = FacUrls.Heyat_SAVE;
      // if (this.repeatedNationalCode === '0') {
      //   // age record tekrari nist in flaf set shavad
      //   jsondata.sigOwner = '';
      // }
    } else {
      this.theUrlValue = FacUrls.SIG_OWNER_SAVE;
      // if (this.repeatedNationalCode === '0') {
      //   jsondata.positionDesk = '1';
      // }
    }
    const theUrl = this.theUrlValue;
    if (this.detStackholdersId === undefined || this.detStackholdersId === '') {
      this.restService.create(theUrl, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/detStackholders/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.SIG_OWNER_EDIT, this.detStackholdersId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/detStackholders/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/detStackholders/' +  this.requestId);
  }
  onChangPosition() {
    debugger;
    if (this.editForm.controls.character.value === '1') {
      //age haghighi bod semat karfarma beshe
      this.setPositiont = false;
      this.editForm.get('positiont').setValue('کارفرما');
      this.editForm.get('positiont').disable();
      // this.editForm.get('positiont').enable();
      this.editForm.get('movazaf').setValue('');
      this.editForm.get('movazaf').disable();
    } else {
      this.setPositiont = true;
      this.editForm.get('movazaf').enable();
      // this.editForm.
      // this.setPositiont = true;
      // this.editForm.get('movazaf').enabled();
      // this.editForm.get('positiont').disabled;
    }
  }
}
