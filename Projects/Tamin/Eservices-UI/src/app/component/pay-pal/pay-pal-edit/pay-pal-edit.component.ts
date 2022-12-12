import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PayPalModel } from '../../../models/pay-pal/payPal.model';
import { Router } from '@angular/router';
import { GenericRestService } from 'tamin-framework';

@Component({
  selector: 'app-pay-pal-edit',
  templateUrl: './pay-pal-edit.component.html',
  styleUrls: ['./pay-pal-edit.component.css']
})
export class PayPalEditComponent implements OnInit {

  private restUrl;

  @Input()
  payPalModel: PayPalModel;

  editForm: FormGroup;

  constructor(private genericRestService: GenericRestService<PayPalModel>, private route: ActivatedRoute, public fb: FormBuilder, private router: Router) {
    this.restUrl = 'http://localhost:7001/erequest/webresources/requests';
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
        this.payPalModel = new PayPalModel();
        this.editForm.patchValue(this.payPalModel);
      } else {
        this.genericRestService.getById(id).then(result => {
          this.payPalModel = result.data;
          this.editForm.patchValue(this.payPalModel);
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
