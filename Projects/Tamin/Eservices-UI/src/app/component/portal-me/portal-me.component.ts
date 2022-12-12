import {Component, OnInit} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-portal-me',
  templateUrl: './portal-me.component.html',
  styleUrls: ['./portal-me.component.css']
})
export class PortalMeComponent extends TaminPageBaseComponent {

  public isWeb: boolean;
  accordionItems: any[] = [
    {
      title: '', items: [
        {subtitle: '', url: ''}
      ]
    },
    {
      title: '', items: [
        {subtitle: '', url: ''}
      ]
    }
  ];


  // ngOnInit() {
  //   this.isWeb = AppHelper.isWeb();
  // }

  clickFavItem(item) {
    alert(item);
  }

  onAppRequest() {
    this.redirectTo('app-request');
  }

  onAppAnnouncement() {
    this.redirectTo('app-announcement');
  }

  onAppFeedback() {
    this.redirectTo('app-feedback');
  }
}
