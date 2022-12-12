import {Component, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {SsoAnnouncementsSearchComponent} from './sso-announcements-search/sso-announcements-search.component';
import {SsoAnnouncementsListComponent} from './sso-announcements-list/sso-announcements-list.component';

@Component({
  selector: 'app-sso-announcements',
  templateUrl: './sso-announcements.component.html',
  styleUrls: ['./sso-announcements.component.css']
})
export class SsoAnnouncementsComponent extends TaminPageBaseComponent {

  @ViewChild('ssoAnnouncementsSearch') ssoAnnouncementsSearch: SsoAnnouncementsSearchComponent;
  @ViewChild('ssoAnnouncementsList') ssoAnnouncementsList: SsoAnnouncementsListComponent;

  onSearch(filter) {
    this.ssoAnnouncementsList.search(filter);
  }
}
