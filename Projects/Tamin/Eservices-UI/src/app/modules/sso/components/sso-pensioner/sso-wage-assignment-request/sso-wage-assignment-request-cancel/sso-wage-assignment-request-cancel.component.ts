import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {
  PersianNumberPipe,
  SearchOperator,
  SearchParam,
  TaminImageGalleryComponent, TaminImageGalleryManagedComponent,
  TaminPageBaseComponent
} from 'tamin-framework';
import {WageAssignmentBranchModel} from '../../../../../../models/pensioner/wageAssignmentBranch.model';
import {ActivatedRoute} from '@angular/router';
import {WageAssignmentModel} from '../../../../../../models/pensioner/wageAssignment.model';
import {Urls} from '../../../../../../settings/urls';
import {DocumentFileModel} from '../../../../../../models/document-file.model';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sso-wage-assignment-request-cancel',
  templateUrl: './sso-wage-assignment-request-cancel.component.html',
  styleUrls: ['./sso-wage-assignment-request-cancel.component.css']
})
export class SsoWageAssignmentRequestCancelComponent extends TaminPageBaseComponent {

  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  public viewForm: FormGroup;
  private _overlay: any;
  private router: ActivatedRoute;
  private wageAssignmentModel: WageAssignmentModel;
  private id: string;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  loadPageData() {
    if (this.router.snapshot.params['request-id'] !== null && this.router.snapshot.params['request-id'] !== undefined) {
      this.loadData(this.router.snapshot.params['request-id']);
    } else {
      this.wageAssignmentModel = new WageAssignmentModel();
    }
  }

  protected initializePage(): void {
    this.createForm();

    this.imageGallery.saveUrl = Urls.UploadImage;
    this.imageGallery.getUrl = Urls.UploadImage;
  }

  private createForm() {
    this.viewForm = this.formBuilder.group({
      id: [''],
      bank: [''],
      bankBranch: [''],
      installmentAmount: [''],
      installmentCount: [''],
      loanAmount: [''],
      guaranteeAmount: [''],
      pensionerId: [''],
      garanteeType: [''],
      pensionerNationalId: [''],
      userFirstName: [''],
      userLastName: [''],
      comment: ['', [Validators.required]],
    });

  }

  loadData(requestId) {
    this._overlay = this.showOverlay();
    this.restService.getById(Urls.WAGE_ASSIGNMENT + '/request', requestId.toString())
      .then(value => {

        this.hideOverlay(this._overlay);
        this.wageAssignmentModel = value.data;
        this.viewForm.patchValue(value.data);
        this.viewForm.get('bank').setValue(value.data.bank.bankName);

        this.imageGallery.downloadImage(value.data.documentFile.id, 'گواهی کسر اقساط', '0', '0', true);

      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        // this.modalError.show('خطا', 'امکان برقراری ارتباط با سرویس دهنده مرکزی وجود ندارد');
      });
  }

  addImage(title: string) {
    this.imageGallery.selectImage(title);
  }

  onDeleteClick() {
    if (!this.viewForm.valid) {
      this.markFormGroupAsTouched(this.viewForm);
      return;
    }
    const values = this.viewForm.getRawValue();

    this.showQuestionBox('پیام سیستم', 'آیا نسبت به ابطال کسر اقساط اطمینان دارید؟', () => {
        const document = new DocumentFileModel();
        this.imageGallery.images.forEach(value => {
          document.id = value.guid;
        });

        values.bank = null;
        values.documentFile = document;

        this._overlay = this.showOverlay();
        this.restService.update(Urls.SSO_WAGE_ASSIGNMENT + '/cancel', values.id.toString(), values)
          .then(resulttt => {
            this.hideOverlay(this._overlay);

            this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت ابطال شد.', () => {
              this.redirectTo('/sso/wage-assignment-request/list');
            });
          })
          .catch(result => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', result.error.data.message);
          });

      }
      , () => {

      });


  }
}
