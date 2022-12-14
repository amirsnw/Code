import {Component, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {SsoPersonalImageDetailComponent} from '../sso-personal-image/sso-personal-image-detail/sso-personal-image-detail.component';
import {SsoSpecificPersonDetailComponent} from './sso-specific-person-detail/sso-specific-person-detail.component';

@Component({
  selector: 'app-sso-specific-person',
  templateUrl: './sso-specific-person.component.html',
  styleUrls: ['./sso-specific-person.component.css']
})

  export class SsoSpecificPersonComponent extends TaminPageBaseComponent {
  @ViewChild('listComponent') listComponent: SsoSpecificPersonDetailComponent;
  onSearch(params: any) {
    this.listComponent.search(params);
  }

}
