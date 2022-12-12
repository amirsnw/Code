import {Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import {OverlayService, TaminModalComponent, TaminPageBaseComponent, TaminPersianService} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {RequestFaqModel} from '../../../../models/faq/requestFaq.model';
// import {url} from 'inspector';
import {RequestFaqComponent} from '../request-faq.component';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';

@Component({
  selector: 'app-request-faq-new',
  templateUrl: './request-faq-new.component.html',
  styleUrls: ['./request-faq-new.component.css']
})
export class RequestFaqNewComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() closed = new EventEmitter<string>();
  private taminStaticDataService: TaminStaticDataService;
  theForm: FormGroup;
  requestTypes = [];
  requestStatus = [];
  isPublic = [];

  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      requestTypeNew: [''],
      requestStatusNew: [''],
      question: [''],
      reply: [''],
      isNew: [''],
      id: [''],
      isPublicNew: ['']
    });


  }

   loadPageData(): void {
    this.restService.getAll(Urls.RequestType).then(value => {
      (<Array<any>>value.data.list).forEach((item) => {
        this.requestTypes.push({
          name: item.title,
          value: item.id
        });
      });
    }).catch(reason => {
    });
    this.restService.getAll(Urls.RequestStatus).then(value => {
      (<Array<any>>value.data.list).forEach((item) => {
        this.requestStatus.push({
          name: item.requestDesc,
          value: item.requestCode
        });
      });
    }).catch(reason => {
    });
    this.isPublic = this.taminStaticDataService.getRequestFAQLimitation();
  }


  open(id) {
    if (id !== '' && id !== undefined) {
      this.restService.getById(Urls.REQUEST_FAQ, id.toString()).then(value => {
        this.theForm.get('question').setValue(value.data.question);
        this.theForm.get('reply').setValue(value.data.reply);
        this.theForm.get('requestTypeNew').setValue(value.data.requestType.id);
        this.theForm.get('requestStatusNew').setValue(value.data.requestStatus.requestCode);
        this.theForm.get('id').setValue(value.data.id);
        this.theForm.get('isNew').setValue('0');
        this.theForm.get('isPublicNew').setValue(value.data.isPublic);
        this.theModal.show();
      }).catch(reason => {
      });
    } else {
      this.theForm.reset();
      this.theModal.show();
    }
  }

  close() {
    this.theModal.hide();
    this.closed.emit();
  }

  private saveFormValidation(): boolean {
    const result = this.theForm.get('requestType').valid &&
      this.theForm.get('requestStatus').valid &&
      this.theForm.get('question').valid &&
      this.theForm.get('reply').valid;
    return result;
  }

   saveForm() {

    // if (!this.saveFormValidation()) {
    //   return;
    // }
    const toBeSaved = new RequestFaqModel();
    const data = this.theForm.getRawValue();
    toBeSaved.requestType = data.requestTypeNew;
    toBeSaved.requestStatus = data.requestStatusNew;
    toBeSaved.question = data.question;
    toBeSaved.reply = data.reply;
    toBeSaved.isPublic = data.isPublicNew;
    if (data.isNew !== '0') {

      this.restService.create(Urls.REQUEST_FAQ_SSO, toBeSaved)
        .then(data1 => {
          this.close();
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
        })
        .catch(error => {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    } else {
      toBeSaved.id = parseFloat(data.id.toString());
      this.restService.update(Urls.REQUEST_FAQ_SSO, data.id.toString(), toBeSaved)
        .then(data1 => {
          this.close();
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
        })
        .catch(error => {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }

  }


}
