import {Injectable} from '@angular/core';
import {TaminRestService} from 'tamin-framework';
import {Urls} from '../../settings/urls';

@Injectable({
  providedIn: 'root'
})
export class GuardianInitializeService {

  private guardianPromise: Promise<any>;
  private infoPromise: Promise<any>;

  activeBranchFail: boolean;
  insuranceRequestFail: boolean;

  constructor(private restService: TaminRestService) {
    this.activeBranchFail = true;
    this.insuranceRequestFail = true;
  }

  get guardianResult() {
    if (this.activeBranchFail) {
      this.guardianPromise = this.restService.getAll(Urls.GetActiveBranch);
    }
    return this.guardianPromise.then(value => {
      this.activeBranchFail = false;
      const branchWorkshop = [];
      (<Array<any>>value.data).forEach(item => {
        branchWorkshop.push({
          name: item.branchName,
          value: item.branchCode
        });
      });
      return branchWorkshop;
    }).catch(reason => {
      this.activeBranchFail = true;
      throw reason;
    });
  }

  get infoResult() {
    if (this.insuranceRequestFail) {
      this.infoPromise = this.restService.getAll(Urls.InsuranceRequest);
    }
    return this.infoPromise.then(data => {
        this.insuranceRequestFail = false;
        return data;
      })
      .catch(error => {
        this.insuranceRequestFail = true;
        throw error;
      });
  }
}
