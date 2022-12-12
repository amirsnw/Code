import {Component, OnInit, ViewChild} from '@angular/core';
import {SsoSubdominantListComponent} from "./sso-subdominant-list/sso-subdominant-list.component";
import {TaminPageBaseComponent} from "tamin-framework";

@Component({
  selector: 'app-sso-subdominant',
  templateUrl: './sso-subdominant.component.html',
  styleUrls: ['./sso-subdominant.component.css']
})
export class SsoSubdominantComponent extends TaminPageBaseComponent {
  @ViewChild('subdominantList') subdominantList: SsoSubdominantListComponent;

  onSearchSubmit(params: any) {
    this.subdominantList.loadData(params);
  }
}
