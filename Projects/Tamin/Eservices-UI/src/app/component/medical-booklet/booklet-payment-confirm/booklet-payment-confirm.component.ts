import { Component, ElementRef, Injector, ViewChild, Input } from '@angular/core';
import { OverlayService, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent, TaminPersianService, TaminValidators, SortDirection, SortParam, TaminImageGalleryManagedComponent } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { TaminStaticDataService } from '../../../services/tamin-static-data.service/tamin-static-data.service';
import { BookletOrder } from '../../../models/booklet/booklet-order.model';
import { BookletOrderHead } from 'src/app/models/booklet/booklet-order-head.model';

@Component({
  selector: 'app-booklet-payment-confirm',
  templateUrl: './booklet-payment-confirm.component.html',
  styleUrls: ['./booklet-payment-confirm.component.css']
})
export class BookletPaymentConfirmComponent extends TaminPageBaseComponent {

  private persianService: TaminPersianService;
  private taminStaticDataService: TaminStaticDataService;
  private overlayService: OverlayService;
  routeData: string;
  private _overlay: any;

  constructor(injector: Injector) {
    super(injector);
    this.persianService = injector.get(TaminPersianService);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
    this.overlayService = injector.get(OverlayService);
  }

  initializePage() {
    this._overlay = this.overlayService.show();
    debugger;
    // const url = window.location.hash;
    const url = "https://eservices.tamin.ir/booklet?refId=4943&msg=عملیات+با+موفقیت+انجام+شد&success=true&time=1398/10/12-19:52&amount=1000";
    const str = url.split("?")[1];
    const refId = str.split("&")[0];
    const message = str.split("&")[1];
    const success = str.split("&")[2];
    const time = str.split("&")[3];
    const amnount = str.split("&")[4];

    console.log("bank data is: " + refId + " " + message + " " + success + " " + time + " " + amnount);
    const theUrl = `${Urls.BookletOrder}` + "/submit";
    const theUrl1 = `${Urls.BookletOrder}` + '/tipax-info'+'?'+refId;
    const order = new BookletOrder();
    const head = new BookletOrderHead();
    head.paymentMessage=message.split("=")[1];
    head.paymentRefid=refId.split("=")[1];
    head.paymentTime=time.split("=")[1];
    head.paymentsuccess=success.split("=")[1];
    order.orderHead = head;
    if (success === 'success=true') {
      debugger;

      this.restService.getAll(theUrl1).then(data => {
        debugger
        if (data.data !== null && data.data== true) {
          this.restService.create(theUrl, order).then(data1 => {
            this._overlay.hide();
            const message = (<any>data1).data;
            debugger
            if ((<any>data1).data !== null && (<any>data1).data !== undefined && (<any>data1).data !== '') {
              debugger
              this._overlay.hide();
              this.showInfoMessageBox('پیام سیستم', message);
            } else {
              this._overlay.hide();
              debugger
              this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
            }
          })
            .catch(error => {
              this._overlay.hide();
              this.showErrorMessageBox('پیام سیستم', error.error);
            });
        }else{
          debugger
          this._overlay.hide();
          this.showErrorMessageBox('پیام سیستم', 'پرداخت انجام نشده است.');
        }
      })
        .catch(error => {
          debugger
          this._overlay.hide();
          this.showErrorMessageBox('پیام سیستم', error.error.reason);
        });

    }

  }


}
