import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestModel } from '../../../models/dynamic-request/request.model';
import { Router } from '@angular/router';
import { GenericRestService } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  private restUrl;

  @Input()
  requestModel: RequestModel;

  editForm: FormGroup;

  constructor(private genericRestService: GenericRestService<RequestModel>, private route: ActivatedRoute, public fb: FormBuilder, private router: Router) {
    this.restUrl = Urls.baseurl;
    this.editForm = this.fb.group({
      id: ['', Validators.pattern('[0-9]*')],
      refCode: ['', Validators.pattern('[0-9]*')],
      title: [{ value: '', disabled: false },
        [Validators.required/*, Validators.pattern('[a-z]*')*/]]
    });
  }

  ngOnInit() {
    this.genericRestService.restUrl = this.restUrl;
    this.route.params.subscribe(params => {
      const id = params['id']; // +params['id'] converts value to number
      if (id === '-1') {
        this.requestModel = new RequestModel();
        this.editForm.patchValue(this.requestModel);
      } else {
        this.genericRestService.getById(id).then(result => {
          this.requestModel = result.data;
          this.editForm.patchValue(this.requestModel);
        });
      }
    });
  }

  resetForm() {
    this.editForm.reset();
  }

  backToListClick() {
    this.router.navigateByUrl('/request');
  }

  saveForm(values, valid) {
    this.genericRestService.restUrl = this.restUrl;
    if (!this.editForm.value['id']) {
      this.genericRestService.create(values).then(() => {
        // console.log('Entity created.');
        this.router.navigate(['/request']);
      });
    } else {
      this.genericRestService.update(values).then(() => {
        // console.log('Entity updated.');
        this.router.navigate(['/request']);
      });
    }

  }

}
