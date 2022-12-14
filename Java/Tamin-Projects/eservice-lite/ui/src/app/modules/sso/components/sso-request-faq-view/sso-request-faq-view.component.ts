import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-sso-request-faq-view',
  templateUrl: './sso-request-faq-view.component.html',
  styleUrls: ['./sso-request-faq-view.component.css']
})

export class SsoRequestFaqViewComponent extends TaminPageBaseComponent {

  private _requestType: string;
  private _requestStatus: string;
  private _subscription = new Subscription();
  data: any;
  @ViewChild('theModal') theModal: TaminModalComponent;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
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
      const theUrl = `${Urls.REQUEST_FAQ_VIEW}?requestType=${this._requestType}&requestStatus=${this._requestStatus}`; // string interpolation
      this.restService.getAll(theUrl)
        .then(value => {
          this.data = value.data.list;
          resolve();
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
