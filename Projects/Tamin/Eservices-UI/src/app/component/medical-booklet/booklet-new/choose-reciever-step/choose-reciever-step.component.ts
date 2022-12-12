import {Component, EventEmitter, Output} from '@angular/core';
import {TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-choose-reciever-step',
  templateUrl: './choose-reciever-step.component.html',
  styleUrls: ['./choose-reciever-step.component.css']
})
export class ChooseRecieverStepComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  insuredAndSubdominants = [];
  private _subscription = new Subscription();
  @Output() nextStep = new EventEmitter<any>();

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      nationalCode: ['', [TaminValidators.nationalId]],
      bookletReciever: ['', [Validators.required]],
    });

    this._subscription.add(this.theForm.get('bookletReciever').valueChanges.subscribe(value => {
      this.theForm.get('nationalCode').setValue(value);
    }));
  }

  protected loadPageData(): void {
    this.getInsuredAndSubdominants();
  }

  private getInsuredAndSubdominants(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.restService.getAll(Urls.BookletNew)
        .then(data => {
          ((data as any).data.list).forEach(item => {
            this.insuredAndSubdominants.push({
              name: `${item.firstName} ${item.lastName}`,
              value: item.nationalId,
              data: item
            });
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private checkFirstBooklet(): Promise<boolean> {
    const nationalId = this.theForm.get('nationalCode').value;
    return new Promise((resolve, reject) => {
      const theUrl = `${Urls.BookletFirst}?nationalId=${nationalId}`;
      this.restService.getAll(theUrl)
        .then(data => {
          if (data.data === true) {
            resolve(data as any);
          } else {
            this.showErrorMessageBox('پیام سیستم', 'شما در شعبه بیمه پردازی خود قبلا دفترچه دریافت نموده اید و نمی توانید درخواست صدور دفترچه برای اولین بار را انتخاب نمایید.');
            this.theForm.get('requestType').setValue(null);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  onNextStep() {
    this.nextStep.emit(this.insuredAndSubdominants.find(c => c.value === this.theForm.get('nationalCode').value).data
    );
  }
}
