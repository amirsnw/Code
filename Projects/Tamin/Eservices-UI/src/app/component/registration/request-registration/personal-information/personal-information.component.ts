import {Component, ViewChild} from '@angular/core';
import {AccountComponent} from '../account/account.component';
import {ContactComponent} from '../contact/contact.component';
import {EducationComponent} from '../education/education.component';
import {TaminPageBaseComponent} from 'tamin-framework';
import {AccountEditComponent} from "../account/account-edit/account-edit.component";
import {ContactEditComponent} from "../contact/contact-edit/contact-edit.component";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent extends TaminPageBaseComponent {

  @ViewChild('accountTab') accountTab: AccountEditComponent;
  @ViewChild('contactTab') contactTab: ContactEditComponent;
  @ViewChild('educationTab') educationTab: EducationComponent;
  private personalId: any;

  protected loadPageData(): void {
    this.accountTab.initialize(this.personalId);
    this.contactTab.initialize(this.personalId);
    this.educationTab.initialize(this.personalId);
  }


  initialize(personalId) {
    this.personalId = personalId;
  }
}
