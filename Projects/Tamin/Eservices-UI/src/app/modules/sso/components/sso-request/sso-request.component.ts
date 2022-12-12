import {Component, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {SsoRequestSearchComponent} from './sso-request-search/sso-request-search.component';
import {SsoRequestListComponent} from './sso-request-list/sso-request-list.component';

@Component({
  selector: 'app-sso-request',
  templateUrl: './sso-request.component.html',
  styleUrls: ['./sso-request.component.css']
})
export class SsoRequestComponent extends TaminPageBaseComponent {

  @ViewChild('ssoRequestSearch') ssoRequestSearch: SsoRequestSearchComponent;
  @ViewChild('ssoRequestList') ssoRequestList: SsoRequestListComponent;

  protected loadPageData(): void {
    setTimeout(() => {
      const tmp = JSON.parse(window.sessionStorage.getItem('sso-request-search-param'));
      if (tmp) {
        window.sessionStorage.removeItem('sso-request-search-param');
        (tmp as any[]).forEach(value => {
          if (value.property) {
            switch (value.property) {
              case 'refCode' :
                this.ssoRequestSearch.searchForm.get('refCode').setValue(value.value);
                break;
              case 'status.requestCode' :
                this.ssoRequestSearch.searchForm.get('requestStatus').setValue(value.value);
                break;
              case 'requestType.id' :
                this.ssoRequestSearch.searchForm.get('requestType').setValue(value.value);
                break;
              case 'userName' :
                this.ssoRequestSearch.searchForm.get('userName').setValue(value.value);
                break;
              case 'organizationId' :
                this.ssoRequestSearch.searchForm.get('branch').setValue(value.value);
                break;
            }
          }
        });
        this.onSearch(tmp);
      }
    }, 1000);
  }

  onSearch(event: any) {
    this.ssoRequestList.search(event);
  }
}
