import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GenericRestService, OverlayService, TaminModalComponent, TaminPageBaseComponent, TaminRestService} from 'tamin-framework';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent extends TaminPageBaseComponent {
  @ViewChild('iframe') iframe: ElementRef;
  @ViewChild('theModal') theModal: TaminModalComponent;
  data = [];
  private personalId: string;

  /* constructor(private taminRestService: TaminRestService,
               private http: HttpClient) { }*/

  initialize(personalId) {
    this.personalId = personalId;
    this.theModal.show();
    this.onShowReport();
  }

  onShowReport() {
    this.restService.getBlob(Urls.Questionnaire + '/' + this.personalId)
      .then((value) => {
        this.iframe.nativeElement.src = URL.createObjectURL(value);
      })
      .catch(reason => {

      });
  }
}
