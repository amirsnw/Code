import {Component, OnInit} from '@angular/core';
import {GenericRestService, TaminMenuModel, TaminPageBaseComponent, TaminModalComponent} from 'tamin-framework';
import {AppHelper} from '../../settings/app-helper';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-portal-pensioner',
  templateUrl: './portal-pensioner.component.html',
  styleUrls: ['./portal-pensioner.component.css']
})
export class PortalPensionerComponent extends TaminPageBaseComponent {
  @ViewChild ("theModal") theModal:TaminModalComponent;
  public isWeb: boolean;
  accordionItems: Array<TaminMenuModel> = [];
  selectedSubMenu: Array<TaminMenuModel>;

  protected initializePage(): void {
    this.isWeb = AppHelper.isWeb();
    this.restService.getAll('assets/data/menu-data.json')
      .then(data => {
        this.accordionItems = data.data.items[3].items;
      })
      .catch(error => {
      });
  }

  clickGroupItem(item:TaminMenuModel) {
    this.theModal.title = item.caption;
    this.selectedSubMenu = item.items;
    this.theModal.show();
  }

  clickFavItem(item:TaminMenuModel) {
    if(item.disable) {
      alert('این منو به زودی فعال خواهد شد.');
      return;
    }
    this.theModal.hide();
    this.redirectTo(item.url);
  }

}
