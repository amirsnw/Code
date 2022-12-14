import {Component, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';
import { AppHelper } from 'src/app/settings/app-helper';

@Component({
  selector: 'app-portal-login',
  templateUrl: './portal-login.component.html',
  styleUrls: ['./portal-login.component.css']
})
export class PortalLoginComponent extends TaminPageBaseComponent {

  public restUrlLogin;
  formLogin: FormGroup;
  public loginTypes;
  private _overlay = null;
  public isWeb: boolean;

  initializePage() {
    // document.body.parentElement.style.backgroundImage = "url('/assets/images/places/eram-garden-shiraz.jpg')";
    // document.body.parentElement.style.backgroundSize = "cover";
    // document.body.parentElement.style.backgroundRepeat = "no-repeat";
    // document.body.parentElement.style.backgroundPosition = "center";

    this.isWeb = AppHelper.isWeb();

    this.loginTypes = [
      {id: 'F', name: 'نام کاربری و کلمه عبور'},
      {id: 'M', name: 'کارت هوشمند'}
    ];

    this.formLogin = this.formBuilder.group({
      id: ['', Validators.pattern('[0-9]*')],
      loginType: [{value: ''}, Validators.required],
      userName: [{value: '', disabled: false}, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: [{value: '', disabled: false},
        [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,30}$')]]
    });

    this.formLogin.controls['loginType'].setValue(this.loginTypes[0].id);
  }

  public onLoginTypeSelect(item: any) {
    //alert(item.name);
  }

  public returnButtonClick() {
  }

  public loginButtonClicked() {
    if (!this.formLogin.valid) {
      this.markFormGroupAsTouched(this.formLogin);
      return;
    }
    this._overlay = this.showOverlay();
    this.securityService
      .mobileLogin(this.formLogin.get('userName').value,
        this.formLogin.get('password').value,
        '1c13370e0148031d1546242f2448152e',
        '22333c0c0a40413f0f36241721411d15162f153e193017111a424b4801330833')
      .then(value => {
        this.hideOverlay(this._overlay);
        this.redirectTo('/');
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        // this.showErrorMessageBox('پیام سیستم', 'نام کاربری یا گذرواژه نادرست است');
        this.showErrorMessageBox('پیام سیستم', reason);
      });
  }

  public onButtonClicked(buttonName) {
    this.redirectTo('/' + buttonName);
  }

  public onAlertClicked() {
    alert('hi');
  }

  downloadPdf() {
    const a = document.createElement('a');
    const url = 'assets/pdfs/helpRegistration.pdf';
    a.href = url;
    a.download = 'راهنمای ثبت نام.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
