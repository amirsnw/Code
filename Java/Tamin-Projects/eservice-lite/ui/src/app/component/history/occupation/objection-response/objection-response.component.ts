import {Component, Injector} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-objection-response',
  templateUrl: './objection-response.component.html',
  styleUrls: ['./objection-response.component.css']
})
export class ObjectionResponseComponent extends TaminPageBaseComponent {
  data = [];
  private _overlay: any;
  private id: string;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.loadData();
      } else {
        this.showErrorMessageBox('پیام سیستم', 'نتیجه اعتراض قابل مشاهده نمی باشد.', () => {
          this.redirectTo('/me');
        });
      }
    });
  }

  protected initializePage(): void {
  }

  loadData(): void {
    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.ObjectionResult + '/' + this.id)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.data = value.data.list;
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        });
      });
  }

  translateDate(date) {
    if (date !== undefined && date !== null && date.length > 8) {
      return date.substr(0, 4) + '/' + date.substr(4, 2) + '/' + date.substr(6, 2);
    }
    return '';
  }

}
