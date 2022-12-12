import {Component, ElementRef, Injector, Input, ViewChild} from '@angular/core';
import {Urls} from '../../../../../../settings/urls';
import {TaminPageBaseComponent , SearchParam , SearchOperator } from 'tamin-framework';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {CordovaHelper} from '../../../../../../helpers/cordova-helper';
import {AppHelper} from '../../../../../../settings/app-helper';

declare var alertify: any;

@Component({
  selector: 'app-sso-salary-list',
  templateUrl: './sso-salary-list.component.html',
  styleUrls: ['./sso-salary-list.component.css']
})


export class SsoSalaryListComponent extends TaminPageBaseComponent {
  data = [];
  hasError = false;
  private overlay: any;
  showDownloadButton = true;
  @ViewChild('panel') panel: ElementRef;
  renderMode: 'desktop' | 'mobile' = 'desktop';
  loadCompleted = false;
  searchParams: SearchParam[];

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

  loadData(param: any) {
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: param.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'ticketCode',
      value: param.ticketCode,
      operator: SearchOperator.EQ
    });
    return new Promise((resolve, reject) => {
      this.data = [];
      this.loadCompleted = false;
      this.hasError = false;
      this.overlay = this.showOverlay(this.panel.nativeElement);
            this.restService.getAll(Urls.SalaryRequestAdmin ,  this.searchParams)
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
    this.redirectTo('/sso/sso-history');
  }
}
