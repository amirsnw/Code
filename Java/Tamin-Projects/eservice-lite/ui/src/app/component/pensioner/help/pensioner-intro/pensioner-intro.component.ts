import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensioner-intro',
  templateUrl: './pensioner-intro.component.html',
  styleUrls: ['./pensioner-intro.component.css']
})
export class PensionerIntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
