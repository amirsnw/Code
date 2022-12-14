import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GenericRestService, TaminMenuModel, TaminRestService, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../settings/app-helper';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-portal-insured',
  templateUrl: './portal-insured.component.html',
  styleUrls: ['./portal-insured.component.css']
})
export class PortalInsuredComponent extends TaminPageBaseComponent {
  @ViewChild ("theModal") theModal:TaminModalComponent;
  public isWeb: boolean;
  accordionItems: Array<TaminMenuModel> = [];
  selectedSubMenu: Array<TaminMenuModel>;

  protected initializePage(): void {
    this.isWeb = AppHelper.isWeb();
    this.restService.getAll('assets/data/menu-data.json')
      .then(data => {
        this.accordionItems = data.data.items[1].items;
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

  onButtonClicked(param){
  }
  
}
