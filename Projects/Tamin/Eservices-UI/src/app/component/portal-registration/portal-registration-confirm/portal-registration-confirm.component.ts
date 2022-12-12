import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-portal-registration-confirm',
  templateUrl: './portal-registration-confirm.component.html',
  styleUrls: ['./portal-registration-confirm.component.css']
})
export class PortalRegistrationConfirmComponent implements OnInit {

  @Input()
  userModel: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
