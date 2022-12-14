import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAndDispedChargesComponent } from './sale-and-disped-charges.component';

describe('SaleAndDispedChargesComponent', () => {
  let component: SaleAndDispedChargesComponent;
  let fixture: ComponentFixture<SaleAndDispedChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleAndDispedChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleAndDispedChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
