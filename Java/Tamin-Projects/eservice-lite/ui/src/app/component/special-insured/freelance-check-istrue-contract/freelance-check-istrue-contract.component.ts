import {Component, Input, ViewChild, Output, EventEmitter, Injector} from '@angular/core';
import {TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

declare var alertify: any;

@Component({
  selector: 'app-freelance-check-istrue-contract',
  templateUrl: './freelance-check-istrue-contract.component.html',
  styleUrls: ['./freelance-check-istrue-contract.component.css']
})

export class FreelanceCheckIstrueContractComponent extends TaminPageBaseComponent {
  public theForm: FormGroup;
  public commitment1 = false;
  public commitment2 = false;
  public alldisabled = false;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() approve = new EventEmitter();
  @Output() deapprove = new EventEmitter();
  public router: ActivatedRoute;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }


  initializePage() {
    this.theForm = this.formBuilder.group({
      commitment1: [''],
      commitment2: ['']
    });

    if (this.router.snapshot.params['status'] === 'rollbacke') {
      if (this.getSes('isAprovee') != null) {
        var state = this.getSes('isAprovee');
        if (state) {
          this.commitment1 = this.theForm.get('commitment1').value as boolean;
          this.theForm.get('commitment1').setValue(false);
          this.theForm.get('commitment2').setValue(true);
          this.commitment1 = false;
          this.commitment2 = true;
        } else {
          this.commitment2 = this.theForm.get('commitment2').value as boolean;
          this.theForm.get('commitment1').setValue(true);
          this.theForm.get('commitment2').setValue(false);
          this.commitment1 = true;
          this.commitment2 = false;
        }
      }
    }
    // this.theForm.get('commitment1').setValue(true);
    // this.commitment1=true;
  }

  onCommitment1() {
    this.commitment1 = this.theForm.get('commitment1').value as boolean;
    this.theForm.get('commitment2').setValue(false);
    this.commitment1 = true;
    this.commitment2 = false;
  }

  onCommitment2() {
    this.commitment2 = this.theForm.get('commitment2').value as boolean;
    this.theForm.get('commitment1').setValue(false);
    this.commitment1 = false;
    this.commitment2 = true;
  }

  onDeApprove() {
    this.deapprove.emit();

  }

  onApprove() {
    this.approve.emit();
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

}
