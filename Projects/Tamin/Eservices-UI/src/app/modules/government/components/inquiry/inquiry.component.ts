import {Component, ViewChild} from '@angular/core';
import {TaminDocumentViewerComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent extends TaminPageBaseComponent {
  title;
  searchForm: FormGroup;
  resultForm: FormGroup;
  showResult = false;
  showPdf = false;
  docCode: string;

  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.resultForm = this.formBuilder.group({
      id: [''],
      title: [''],
    });
  }

  search() {
    this.showResult = false;
    this.showPdf = false;
    if (!this.searchForm.valid) {
      this.markFormGroupAsTouched(this.searchForm);
      return;
    }
    const theUrl = `${Urls.AnnouncementShare}/${this.searchForm.get('code').value}/${this.searchForm.get('password').value}`;
    this.restService.getAll(theUrl)
      .then(value => {
        if (value.list.length === 0) {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعاتی برای نمایش وجود ندارد');
          return;
        }
        this.showResult = true;
        this.resultForm.get('title').setValue(value.list[0].subType.typeDesc);
        this.resultForm.get('id').setValue(value.list[0].id);
        this.docCode = value.list[0].subType.typeCode;

        if (value.list[0].hasPDF) {
          this.showPdf = true;
        }
        this.showDocument();
      })
      .catch(reason => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  showDocument() {
    const pdfUrl = `${Urls.AnnouncementShare}/${this.searchForm.get('code').value}/${this.searchForm.get('password').value}/pdf`;
    this.restService.getAll(pdfUrl)
      .then(value => {
        this.documentViewer.loadPdfBased64(value.list[0].pdf);
      })
      .catch(reason => {
      });
  }
}
