import {Component, EventEmitter, Injector, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import * as momentNs from 'jalali-moment';
import {CommitteeModel} from '../committee-model';
import {Urls} from '../../../settings/urls';
import {StageOneFormGeneratorService} from '../stage-one/stage-one-form-generator.service';
import {StageThreeFormGeneratorService} from '../form-downloader.service';
import {AppHelper} from '../../../settings/app-helper';

@Component({
  selector: 'app-medical-committee-help',
  templateUrl: './committee-help.component.html',
  styleUrls: ['../main-committee/main-committee.component.css'],
})
export class CommitteeHelpComponent extends TaminPageBaseComponent implements OnDestroy {

  private overlay: any;
  guide: false;
  prevEl: any;

  /* Constructor */
  constructor(injector: Injector, public formGenerator: StageOneFormGeneratorService,
              private pdfFormGenerator: StageThreeFormGeneratorService) {
    super(injector);

    const UID = {
      _current: 0,
      getNew: function () {
        this._current++;
        return this._current;
      }
    };

    HTMLElement.prototype['committeeAccordStyle'] = function (propValue) {
      const _this_ = this;
      const _sheetId = 'committeeStyles';
      const _head = document.head || document.getElementsByTagName('head')[0];
      const _sheet = document.getElementById(_sheetId) || document.createElement('style');
      _sheet.id = _sheetId;
      const className = 'committeeAccord' + UID.getNew();

      // Add class to selected element
      _this_.className += ' ' + className;

      _sheet.innerHTML += ' .' + className + '{' + propValue + '}';
      _head.appendChild(_sheet);
      return this;
    };
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
  }

  /* Loads After Page Render */
  protected loadPageData(): void {
  }

  showGuide(event) {
    const srcElement = event.target || event.srcElement || event.currentTarget;
    const items = document.querySelectorAll('.accordion-body.active');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
    }

    if (!this.prevEl || this.prevEl.textContent !== srcElement.textContent) {
      const target = document.getElementById(srcElement.getAttribute('type'))
      target.className += ' active';
      this.prevEl = srcElement;
    } else {
      this.prevEl = null;
    }
  }

  showAnswer(evnet) {
    let flag = false;
    const srcElement: any = event.target || event.srcElement || event.currentTarget;
    let nextSibling = srcElement.nextSibling;
    while (nextSibling && nextSibling.nodeType !== 1) {
      nextSibling = nextSibling.nextSibling;
    }

    const items = document.querySelectorAll('.subitem-content.active');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
      if (items[i] === nextSibling) {
        flag = true;
      }
    }
    if (!flag) {
      nextSibling.classList.add('active');
    }
  }
}
