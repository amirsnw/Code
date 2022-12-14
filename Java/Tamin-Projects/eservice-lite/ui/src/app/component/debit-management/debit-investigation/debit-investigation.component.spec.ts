import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitInvestigationComponent } from './debit-investigation.component';

describe('DebitInvestigationComponent', () => {
  let component: DebitInvestigationComponent;
  let fixture: ComponentFixture<DebitInvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitInvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
