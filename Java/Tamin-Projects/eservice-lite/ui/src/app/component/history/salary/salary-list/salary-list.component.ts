import {Component, ElementRef, Injector, Input, ViewChild} from '@angular/core';
import {Urls} from '../../../../settings/urls';
import {TaminPageBaseComponent} from 'tamin-framework';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {CordovaHelper} from '../../../../helpers/cordova-helper';
import {AppHelper} from '../../../../settings/app-helper';

declare var alertify: any;

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})


export class SalaryListComponent extends TaminPageBaseComponent {
  data = [];
  hasError = false;
  private overlay: any;
  showDownloadButton = true;
  @ViewChild('panel') panel: ElementRef;
  renderMode: 'desktop' | 'mobile' = 'desktop';
  loadCompleted = false;

  constructor(injector: Injector, private breakpointObserver: BreakpointObserver) {
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
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.loadCompleted = false;
      this.hasError = false;
      this.overlay = this.showOverlay(this.panel.nativeElement);
      this.restService.getAll(Urls.SalaryRequest)
        .then(data => {
          this.loadCompleted = true;
          this.hideOverlay(this.overlay);
          this.data = data.data.list;
          resolve(data);
        })
        .catch(reason => {
          this.hasError = true;
          this.hideOverlay(this.overlay);
          reject(reason);
        });
    });
  }

  backToPanelClick() {
    this.redirectTo('/');
  }

  // downloadPdf() {
  //   this.overlay = this.showOverlay();
  //   this.restService.getBlob(Urls.downloadDastmozd).then(value => {
  //     this.hideOverlay(this.overlay);
  //     const a = document.createElement('a'),
  //       url = URL.createObjectURL(value);
  //     a.href = url;
  //     a.download = 'sabeghe_' + this.getPersianDate(new Date()) + '.pdf';
  //     document.body.appendChild(a);
  //     a.click();
  //     setTimeout(function() {
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     }, 0);
  //   }).catch(reason => {
  //     this.hideOverlay(this.overlay);
  //     this.showErrorMessageBox('پیام سیستم' , this.constants.getNetworkErrorMessage());
  //   });
  // }

  downloadPdf() {
    if (AppHelper.isWeb()) {
      this.downloadPdfDesktop();
    } else {
      this.downloadPdfMobile();
    }
  }

  downloadPdfMobile() {
    this.overlay = this.showOverlay();
    this.restService.getBlob(Urls.downloadDastmozd).then(value => {
      this.hideOverlay(this.overlay);
      const fileName = 'sabeghe_' + (new Date()).getTime().toString() + '.pdf';
      CordovaHelper.savePdf(fileName, value)
        .then(value1 => {
          const message = '<p>بارگذاری با موفقیت انجام شد و فایل در شاخه Downloads ذخیره شد.</p>';
          alertify.confirm('پیام سیستم', message, () => {
            CordovaHelper.openPdf(fileName);
          }, () => {
          }).set({labels: {ok: 'رویت', cancel: 'تایید'}, padding: false});
        })
        .catch(reason => {
          console.log(reason);
          this.showErrorMessageBox('پیام سیستم', 'سیستم قادر به ذخیره فایل نمی باشد.');
        });
    }).catch(reason => {
      this.hideOverlay(this.overlay);
      console.log(reason);
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    });
  }

  downloadPdfDesktop() {
    this.overlay = this.showOverlay();
    this.restService.getBlob(Urls.downloadDastmozd).then(value => {
      this.hideOverlay(this.overlay);
      const a = document.createElement('a'),
        url = URL.createObjectURL(value);
      a.href = url;
      a.download = 'sabeghe_' + this.getPersianDate(new Date()) + '.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }).catch(reason => {
      this.hideOverlay(this.overlay);
      this.showErrorMessageBox('پیام سیستم' , this.constants.getNetworkErrorMessage());
    });
  }



  sendToInbox() {
    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.HistorySendToEblagh,  null,  null, { type:  '3' })
      .then(value => {
        this.hideOverlay(this.overlay);
        if (value) {
          this.showInfoMessageBox('پیام مسیستم', 'ارسال سابقه بعد از سال 86 با موفقیت انجام شد');
        } else {
          this.showErrorMessageBox('پیام مسیستم', this.constants.getNetworkErrorMessage());
        }
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام مسیستم', this.constants.getNetworkErrorMessage());
      });

  }
}
