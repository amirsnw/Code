import {Component, Injector, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {HistoryConflictModel} from '../../../../models/history/historyConflict.model';
import {ObjectionConflict} from '../../models/objection-conflict';
import * as momentNs from 'jalali-moment';

const moment = momentNs;

@Component({
  selector: 'app-objection-conflict',
  templateUrl: './objection-conflict.component.html',
  styleUrls: ['./objection-conflict.component.css']
})
export class ObjectionConflictComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('theDeleteModal') theDeleteModal: TaminModalComponent;
  private finalResult = [];
  private _overlay: any;
  conflictEditForm: FormGroup;
  noteForm: FormGroup;
  data: Array<ObjectionConflict> = [];
  renderMode: 'desktop' | 'mobile' = 'desktop';

  constructor(
    injector: Injector,
    private breakpointObserver: BreakpointObserver,
    /*private changeDetectorRef: ChangeDetectorRef*/) {
    super(injector);
  }

  initializePage() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        if (![Breakpoints.Small, Breakpoints.Handset]) {
          return;
        }
        if (state.matches) {
          if (this.renderMode !== 'mobile') {
            this.renderMode = 'mobile';
          }
        } else {
          if (this.renderMode !== 'desktop') {
            this.renderMode = 'desktop';
          }
        }
      });

    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.noteForm = this.formBuilder.group({
      note: ['']
    });
    this.conflictEditForm = this.formBuilder.group({
      rowNumber: -1,
      year: [''],
      historyTypeCode: [''],
      risuid: [''],
      isDeleted: [''],
      prow: [''],
      reqno: [''],
      reqtype: [''],
      rwshid: [''],
      branchCode: [''],
      om1: [''],
      om2: [''],
      om3: [''],
      om4: [''],
      om5: [''],
      om6: [''],
      om7: [''],
      om8: [''],
      om9: [''],
      om10: [''],
      om11: [''],
      om12: [''],
      mm1: ['', [Validators.max(31), Validators.min(0)]],
      mm2: ['', [Validators.max(31), Validators.min(0)]],
      mm3: ['', [Validators.max(31), Validators.min(0)]],
      mm4: ['', [Validators.max(31), Validators.min(0)]],
      mm5: ['', [Validators.max(31), Validators.min(0)]],
      mm6: ['', [Validators.max(31), Validators.min(0)]],
      mm7: ['', [Validators.max(30), Validators.min(0)]],
      mm8: ['', [Validators.max(30), Validators.min(0)]],
      mm9: ['', [Validators.max(30), Validators.min(0)]],
      mm10: ['', [Validators.max(30), Validators.min(0)]],
      mm11: ['', [Validators.max(30), Validators.min(0)]],
      mm12: ['', [Validators.max(30), Validators.min(0)]]
    });
  }

  loadPageData() {
    this._overlay = this.showOverlay();
    this.restService.getAll(Urls.CheckStatus)
      .then(value1 => {
        if (value1.data) {
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام سیستم', 'کاربر گرامی، در حال حاضر دارای یک درخواست در حال بررسی می باشید و امکان ثبت مجدد درخواست وجود ندارد.', () => {
            this.redirectTo('/');
          });
        } else {
          this.data = [];
          this.restService.getAll(Urls.ConflictObjectionGet).then(value => {
            value.data.list.forEach((item) => {
              const tmp = new ObjectionConflict();
              tmp.load(item);
              this.data.push(tmp);
              this.hideOverlay(this._overlay);
            });
          }).catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data) {
          if (typeof reason.error.data === 'string') {
            this.showErrorMessageBox('پیام سیستم', reason.error.data, () => {
              this.redirectTo('/');
            });
          } else {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
              this.redirectTo('/');
            });
          }
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
            this.redirectTo('/');
          });
        }
      });
  }

  exitconflictEditForm() {
    this.theModal.hide();
  }

  onConfirmChanges() {
    const correctTwoZeros = (val: string): string => {
      return val === '00' ? '0' : val;
    };

    const year = Number(this.conflictEditForm.get('year').value);
    const esfand = this.conflictEditForm.get('mm12').value;

    if (!this.isNullOrEmpty(this.conflictEditForm.get('mm12').value)) {
      const isLeapYear = moment.jIsLeapYear(year);
      if (!isLeapYear && Number(esfand) === 30) {
        this.showErrorMessageBox('پیام سیستم', 'اسفند ماه در این سال ۲۹ روزه است');
        return;
      }
    }


    const index = this.conflictEditForm.get('rowNumber').value;
    if (index >= 0) {
      this.data[index].data.mm1 = !this.isNullOrEmpty(this.conflictEditForm.get('mm1').value) ? this.conflictEditForm.get('mm1').value.toString() : this.conflictEditForm.get('mm1').value;
      this.data[index].data.mm2 = !this.isNullOrEmpty(this.conflictEditForm.get('mm2').value) ? this.conflictEditForm.get('mm2').value.toString() : this.conflictEditForm.get('mm2').value;
      this.data[index].data.mm3 = !this.isNullOrEmpty(this.conflictEditForm.get('mm3').value) ? this.conflictEditForm.get('mm3').value.toString() : this.conflictEditForm.get('mm3').value;
      this.data[index].data.mm4 = !this.isNullOrEmpty(this.conflictEditForm.get('mm4').value) ? this.conflictEditForm.get('mm4').value.toString() : this.conflictEditForm.get('mm4').value;
      this.data[index].data.mm5 = !this.isNullOrEmpty(this.conflictEditForm.get('mm5').value) ? this.conflictEditForm.get('mm5').value.toString() : this.conflictEditForm.get('mm5').value;
      this.data[index].data.mm6 = !this.isNullOrEmpty(this.conflictEditForm.get('mm6').value) ? this.conflictEditForm.get('mm6').value.toString() : this.conflictEditForm.get('mm6').value;
      this.data[index].data.mm7 = !this.isNullOrEmpty(this.conflictEditForm.get('mm7').value) ? this.conflictEditForm.get('mm7').value.toString() : this.conflictEditForm.get('mm7').value;
      this.data[index].data.mm8 = !this.isNullOrEmpty(this.conflictEditForm.get('mm8').value) ? this.conflictEditForm.get('mm8').value.toString() : this.conflictEditForm.get('mm8').value;
      this.data[index].data.mm9 = !this.isNullOrEmpty(this.conflictEditForm.get('mm9').value) ? this.conflictEditForm.get('mm9').value.toString() : this.conflictEditForm.get('mm9').value;
      this.data[index].data.mm10 = !this.isNullOrEmpty(this.conflictEditForm.get('mm10').value) ? this.conflictEditForm.get('mm10').value.toString() : this.conflictEditForm.get('mm10').value;
      this.data[index].data.mm11 = !this.isNullOrEmpty(this.conflictEditForm.get('mm11').value) ? this.conflictEditForm.get('mm11').value.toString() : this.conflictEditForm.get('mm11').value;
      this.data[index].data.mm12 = !this.isNullOrEmpty(this.conflictEditForm.get('mm12').value) ? this.conflictEditForm.get('mm12').value.toString() : this.conflictEditForm.get('mm12').value;
    }

    this.data[index].data.mm1 = this.data[index].data.mm1 === correctTwoZeros(this.data[index].data.om1) ? '' : this.data[index].data.mm1;
    this.data[index].data.mm2 = this.data[index].data.mm2 === correctTwoZeros(this.data[index].data.om2) ? '' : this.data[index].data.mm2;
    this.data[index].data.mm3 = this.data[index].data.mm3 === correctTwoZeros(this.data[index].data.om3) ? '' : this.data[index].data.mm3;
    this.data[index].data.mm4 = this.data[index].data.mm4 === correctTwoZeros(this.data[index].data.om4) ? '' : this.data[index].data.mm4;
    this.data[index].data.mm5 = this.data[index].data.mm5 === correctTwoZeros(this.data[index].data.om5) ? '' : this.data[index].data.mm5;
    this.data[index].data.mm6 = this.data[index].data.mm6 === correctTwoZeros(this.data[index].data.om6) ? '' : this.data[index].data.mm6;
    this.data[index].data.mm7 = this.data[index].data.mm7 === correctTwoZeros(this.data[index].data.om7) ? '' : this.data[index].data.mm7;
    this.data[index].data.mm8 = this.data[index].data.mm8 === correctTwoZeros(this.data[index].data.om8) ? '' : this.data[index].data.mm8;
    this.data[index].data.mm9 = this.data[index].data.mm9 === correctTwoZeros(this.data[index].data.om9) ? '' : this.data[index].data.mm9;
    this.data[index].data.mm10 = this.data[index].data.mm10 === correctTwoZeros(this.data[index].data.om10) ? '' : this.data[index].data.mm10;
    this.data[index].data.mm11 = this.data[index].data.mm11 === correctTwoZeros(this.data[index].data.om11) ? '' : this.data[index].data.mm11;
    this.data[index].data.mm12 = this.data[index].data.mm12 === correctTwoZeros(this.data[index].data.om12) ? '' : this.data[index].data.mm12;


    this.changeDetectorRef.detectChanges();
    this.theModal.hide();
  }

  showModal(item, index) {
    this.conflictEditForm.patchValue(item.data);
    this.conflictEditForm.get('rowNumber').setValue(index);
    this.theModal.show();
  }

  showModalRemove(item, index) {
    item.mm1 = '0';
    item.mm2 = '0';
    item.mm3 = '0';
    item.mm4 = '0';
    item.mm5 = '0';
    item.mm6 = '0';
    item.mm7 = '0';
    item.mm8 = '0';
    item.mm9 = '0';
    item.mm10 = '0';
    item.mm11 = '0';
    item.mm12 = '0';
    item.deleted = true;
    this.conflictEditForm.patchValue(item);
    this.conflictEditForm.get('rowNumber').setValue(index);
    this.theModal.show();
  }

  number(val) {
    const tmp = Number(val);
    return tmp.toString();
  }

  onSaveData() {
    const result = [];
    this.data.forEach((item) => {

      if (item.hasChanged()) {
        if (item.data.deleted === null) {
          item.data.deleted = false;
        }
        result.push(item.data);
      }
    });

    this._overlay = this.showOverlay();
    this.restService.create(Urls.ConflictObjectionSave, result)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
          this.loadPageData();
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showRetryBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.onSaveData();
        }, () => {
          // this.redirectTo('/');
        });
      });
  }

  onConfirmData() {
    this.finalResult = [];
    const data = new HistoryConflictModel();
    data.userDesc = this.noteForm.get('note').value;
    this.finalResult.push(data);
    this.restService.create(Urls.ConflictObjectionConfirm, this.finalResult)
      .then(value => {
        this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت تایید شد', () => {
          // this.redirectTo('/');
        });
      })
      .catch(reason => {
        this.showRetryBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.onSaveData();
        }, () => {
          // this.redirectTo('/');
        });
      });
  }

  // onCancelData() {
  //   this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
  //     this._overlay = this.showOverlay();
  //     this.restService.create(Urls.ConflictObjectionCancel, {})
  //       .then(value => {
  //         this.hideOverlay(this._overlay);
  //         this.showInfoMessageBox('پیام سیستم', 'انصراف از ثبت مغایرت با موفقیت انجام شد', () => {
  //           this.loadPageData();
  //         });
  //       })
  //       .catch(reason => {
  //         this.hideOverlay(this._overlay);
  //         this.showRetryBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
  //           this.onSaveData();
  //         }, () => {
  //           // this.redirectTo('/');
  //         });
  //       });
  //   }, () => {
  //   });
  // }

  clearChanges() {
    this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
      this.conflictEditForm.get('mm1').setValue('');
      this.conflictEditForm.get('mm2').setValue('');
      this.conflictEditForm.get('mm3').setValue('');
      this.conflictEditForm.get('mm4').setValue('');
      this.conflictEditForm.get('mm5').setValue('');
      this.conflictEditForm.get('mm6').setValue('');
      this.conflictEditForm.get('mm7').setValue('');
      this.conflictEditForm.get('mm8').setValue('');
      this.conflictEditForm.get('mm9').setValue('');
      this.conflictEditForm.get('mm10').setValue('');
      this.conflictEditForm.get('mm11').setValue('');
      this.conflictEditForm.get('mm12').setValue('');
      const index = this.conflictEditForm.get('rowNumber').value;
      if (index >= 0) {
        this.data[index].data.mm1 = !this.isNullOrEmpty(this.conflictEditForm.get('mm1').value) ? this.conflictEditForm.get('mm1').value.toString() : this.conflictEditForm.get('mm1').value;
        this.data[index].data.mm2 = !this.isNullOrEmpty(this.conflictEditForm.get('mm2').value) ? this.conflictEditForm.get('mm2').value.toString() : this.conflictEditForm.get('mm2').value;
        this.data[index].data.mm3 = !this.isNullOrEmpty(this.conflictEditForm.get('mm3').value) ? this.conflictEditForm.get('mm3').value.toString() : this.conflictEditForm.get('mm3').value;
        this.data[index].data.mm4 = !this.isNullOrEmpty(this.conflictEditForm.get('mm4').value) ? this.conflictEditForm.get('mm4').value.toString() : this.conflictEditForm.get('mm4').value;
        this.data[index].data.mm5 = !this.isNullOrEmpty(this.conflictEditForm.get('mm5').value) ? this.conflictEditForm.get('mm5').value.toString() : this.conflictEditForm.get('mm5').value;
        this.data[index].data.mm6 = !this.isNullOrEmpty(this.conflictEditForm.get('mm6').value) ? this.conflictEditForm.get('mm6').value.toString() : this.conflictEditForm.get('mm6').value;
        this.data[index].data.mm7 = !this.isNullOrEmpty(this.conflictEditForm.get('mm7').value) ? this.conflictEditForm.get('mm7').value.toString() : this.conflictEditForm.get('mm7').value;
        this.data[index].data.mm8 = !this.isNullOrEmpty(this.conflictEditForm.get('mm8').value) ? this.conflictEditForm.get('mm8').value.toString() : this.conflictEditForm.get('mm8').value;
        this.data[index].data.mm9 = !this.isNullOrEmpty(this.conflictEditForm.get('mm9').value) ? this.conflictEditForm.get('mm9').value.toString() : this.conflictEditForm.get('mm9').value;
        this.data[index].data.mm10 = !this.isNullOrEmpty(this.conflictEditForm.get('mm10').value) ? this.conflictEditForm.get('mm10').value.toString() : this.conflictEditForm.get('mm10').value;
        this.data[index].data.mm11 = !this.isNullOrEmpty(this.conflictEditForm.get('mm11').value) ? this.conflictEditForm.get('mm11').value.toString() : this.conflictEditForm.get('mm11').value;
        this.data[index].data.mm12 = !this.isNullOrEmpty(this.conflictEditForm.get('mm12').value) ? this.conflictEditForm.get('mm12').value.toString() : this.conflictEditForm.get('mm12').value;
        this.data[index].data.deleted = false;
      }
      this.changeDetectorRef.detectChanges();

    }, () => {
    });
  }

  isNullOrEmpty(val) {
    return val === undefined || val === null || val.trim() === '';
  }

  deleteRow(item: ObjectionConflict, index) {
    this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
      item.data.deleted = true;
      item.data.mm1 = '0';
      item.data.mm2 = '0';
      item.data.mm3 = '0';
      item.data.mm4 = '0';
      item.data.mm5 = '0';
      item.data.mm6 = '0';
      item.data.mm7 = '0';
      item.data.mm8 = '0';
      item.data.mm9 = '0';
      item.data.mm10 = '0';
      item.data.mm11 = '0';
      item.data.mm12 = '0';
      item.data.deleted = true;
      item.data.isDeleted = true;
    }, () => {
    });
  }

  undeleteRow(item: ObjectionConflict, index) {
    item.data.deleted = false;
    item.data.isDeleted = false;
    item.data.mm1 = '';
    item.data.mm2 = '';
    item.data.mm3 = '';
    item.data.mm4 = '';
    item.data.mm5 = '';
    item.data.mm6 = '';
    item.data.mm7 = '';
    item.data.mm8 = '';
    item.data.mm9 = '';
    item.data.mm10 = '';
    item.data.mm11 = '';
    item.data.mm12 = '';
  }

  confirmAndSendStep1(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const result = [];
      this.data.forEach((item) => {

        if (item.hasChanged()) {
          if (item.data.deleted === null) {
            item.data.deleted = false;
          }
          result.push(item.data);
        }
      });

      this.restService.create(Urls.ConflictObjectionSave, result)
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  confirmAndSendStep2(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.finalResult = [];
      const data = new HistoryConflictModel();
      data.userDesc = this.noteForm.get('note').value;
      this.finalResult.push(data);
      this.restService.create(Urls.ConflictObjectionConfirm, this.finalResult)
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  confirmAndSendStep3(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.restService.create(Urls.FinalConfirmConflictHistory, {})
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  hasPendingRequest() {
    return new Promise<any>((resolve, reject) => {
      this.restService.create(Urls.FinalConfirmConflictHistory, {})
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  confirmAndSend() {
    // This functionality (Sequential execution of Promises) could be implemented by using reduce(),
    // but for the sake of readability, I implemented it in this way.
    const handleCatch = (error) => {
      this.hideOverlay(this._overlay);
      if (error.error && error.error.data && error.error.data !== '') {
        this.showErrorMessageBox('پیام سیستم', error.error.data);
      } else {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      }
    };

    const handleThen = (refId) => {
      this.hideOverlay(this._overlay);
      const message = 'درخواست شما با شماره پیگیری ' + this.getPersianNumber(refId) + ' با موفقیت ارسال شد.';
      this.showInfoMessageBox('پیام سیستم', message, () => {
        this.redirectTo('/');
      });
    };

    this._overlay = this.showOverlay();
    this.confirmAndSendStep1().then(value => {
      this.confirmAndSendStep2().then(value1 => {
        this.confirmAndSendStep3().then(value2 => handleThen(value2.data)).catch(reason => handleCatch(reason));
      }).catch(reason => handleCatch(reason));
    }).catch(reason => handleCatch(reason));
  }
}
