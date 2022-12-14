import {Component, Injector, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {AccountModel} from 'src/app/models/registration/account.model';
import {PersonalModel} from 'src/app/models/registration/personal.model';
import {ActivatedRoute} from '@angular/router';
import {AccountEditComponent} from "./account-edit/account-edit.component";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends TaminPageBaseComponent {
  @ViewChild('accountedit') accountedit : AccountEditComponent;

}
