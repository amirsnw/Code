import {Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {TaminStaticDataService} from '../../../../../services/tamin-static-data.service/tamin-static-data.service';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';


@Component({
  selector: 'app-sso-request-response',
  templateUrl: './sso-request-response.component.html',
  styleUrls: ['./sso-request-response.component.css']
})
export class SsoRequestResponseComponent extends TaminPageBaseComponent {
  statusResult = [];
  @ViewChild('status') status: TaminFieldComboBoxStaticComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() datachanged: EventEmitter<void> = new EventEmitter<void>();

  private taminStaticDataService: TaminStaticDataService;
  editForm: FormGroup;
  private requestId = null;

  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);

  }

  initializePage() {
    this.editForm = this.formBuilder.group({
      comment: [''],
      status: [''],
    });
    this.statusResult = this.taminStaticDataService.getStatus();
  }

  saveForm(values) {
    const request = {
      id: this.requestId,
      status: values.status,
      comment: values.comment,
    };
debugger;
    this.restService.update(Urls.SSO_Request + '/response', this.requestId.toString(), request)
      .then(resulttt => {
        this.cloaseNewHeader();
        this.datachanged.emit();
      })
      .catch(result => {
        // alert("ttt");
      });


  }

  show(requestId: any) {
    this.requestId = requestId;
    this.theModal.show();
  }

  cloaseNewHeader() {
    this.theModal.hide();
  }

}

