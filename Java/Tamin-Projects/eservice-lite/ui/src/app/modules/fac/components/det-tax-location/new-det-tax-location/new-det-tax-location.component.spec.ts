import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDetTaxLocationComponent } from './new-det-tax-location.component';

describe('NewDetTaxLocationComponent', () => {
  let component: NewDetTaxLocationComponent;
  let fixture: ComponentFixture<NewDetTaxLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDetTaxLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDetTaxLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
