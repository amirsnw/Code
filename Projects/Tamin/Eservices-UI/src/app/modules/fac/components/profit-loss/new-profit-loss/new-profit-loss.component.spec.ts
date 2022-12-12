import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfitLossComponent } from './new-profit-loss.component';

describe('NewProfitLossComponent', () => {
  let component: NewProfitLossComponent;
  let fixture: ComponentFixture<NewProfitLossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProfitLossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
