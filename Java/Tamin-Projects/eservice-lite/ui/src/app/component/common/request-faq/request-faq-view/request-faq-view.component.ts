import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-request-faq-view',
  templateUrl: './request-faq-view.component.html',
  styleUrls: ['./request-faq-view.component.css']
})
export class RequestFaqViewComponent extends TaminPageBaseComponent {

  private _requestType: string;
  private _requestStatus: string;
  private _isPublic = '1';
  private _subscription = new Subscription();
  data: any;
  @ViewChild('theModal') theModal: TaminModalComponent;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    // this._subscription.add(this.activeRoute.params.subscribe(params => {
    //   if (params['requestType']) {
    //     this._requestType = params['requestType'];
    //   }
    //   if (params['requestStatus']) {
    //     this._requestStatus = params['requestStatus'];
    //   }
    //   this.loadData();
    // }));
  }

  open(requestType: string, requestStatus: string) {
    this._requestType = requestType;
    this._requestStatus = requestStatus;
    this.loadData()
      .then(value => {
        this.theModal.show();
      })
      .catch(reason => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }


  close() {
    this.theModal.hide();
  }

  private loadData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const theUrl = `${Urls.REQUEST_FAQ_VIEW_LIMITATION}?requestType=${this._requestType}&requestStatus=${this._requestStatus}&isPublic=${this._isPublic}`; // string interpolation
      this.restService.getAll(theUrl)
        .then(value => {
          if (value.data.list.length !== 0) {
            this.data = value.data.list;
            resolve();

          } else {
            this.showErrorMessageBox('پیام سیستم', 'محدودیت دسترسی وجود دارد و یا راهنمایی هوشمندی ثبت نشده است!!');
          }

        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  protected destroyPage(): void {
    this._subscription.unsubscribe();
  }

  onAccordionClick(e) {
    e.srcElement.classList.toggle('active');
    const panel = e.srcElement.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
    // console.log(e);
  }
}
