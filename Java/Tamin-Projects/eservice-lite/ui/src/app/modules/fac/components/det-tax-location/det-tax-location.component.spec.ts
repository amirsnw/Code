import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetTaxLocationComponent } from './det-tax-location.component';

describe('DetTaxLocationComponent', () => {
  let component: DetTaxLocationComponent;
  let fixture: ComponentFixture<DetTaxLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetTaxLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetTaxLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
