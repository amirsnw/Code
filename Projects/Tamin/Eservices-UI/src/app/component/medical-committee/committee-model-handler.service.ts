import {Injectable} from '@angular/core';
import {CommitteeModel} from './committee-model';

@Injectable({
  providedIn: 'root'
})
export class CommitteeModelHandlerService {

  private _model: CommitteeModel;

  get model(): CommitteeModel {
    return this._model;
  }
  constructor() {
    this._model = new CommitteeModel();
  }

  resetModel(): CommitteeModel {
    this._model = new CommitteeModel();
    return this._model;
  }
}
