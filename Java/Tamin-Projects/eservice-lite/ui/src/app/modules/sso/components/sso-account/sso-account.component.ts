import {Component, OnInit, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from "tamin-framework";
import {SsoAnnouncementsSearchComponent} from "../sso-announcements/sso-announcements-search/sso-announcements-search.component";
import {SsoAnnouncementsListComponent} from "../sso-announcements/sso-announcements-list/sso-announcements-list.component";
import {SsoAccountSearchComponent} from "./sso-account-search/sso-account-search.component";
import {SsoAccountListComponent} from "./sso-account-list/sso-account-list.component";

@Component({
  selector: 'app-sso-account',
  templateUrl: './sso-account.component.html',
  styleUrls: ['./sso-account.component.css']
})
export class SsoAccountComponent extends TaminPageBaseComponent {

  @ViewChild('SsoAccountSearchComponent') ssoAccountSearchComponent : SsoAccountSearchComponent ;
  @ViewChild('ssoAccountListComponent') ssoAccountListComponent: SsoAccountListComponent;

  onSearch(filter) {
    this.ssoAccountListComponent.search(filter);
  }
}
