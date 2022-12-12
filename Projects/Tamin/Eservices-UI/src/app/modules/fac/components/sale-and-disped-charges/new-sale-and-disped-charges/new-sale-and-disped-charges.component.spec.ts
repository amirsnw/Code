import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaleAndDispedChargesComponent } from './new-sale-and-disped-charges.component';

describe('NewSaleAndDispedChargesComponent', () => {
  let component: NewSaleAndDispedChargesComponent;
  let fixture: ComponentFixture<NewSaleAndDispedChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSaleAndDispedChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSaleAndDispedChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
