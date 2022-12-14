import {Component} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-register-pursue',
  templateUrl: './register-pursue.component.html',
  styleUrls: ['./register-pursue.component.css']
})
export class RegisterPursueComponent extends TaminPageBaseComponent {
  onPursue() {
    this.redirectTo('registration-pursue');
  }

  onRegister() {
    this.redirectTo('registration');
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
