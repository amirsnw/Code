import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDebitInvestigationComponent } from './edit-debit-investigation.component';

describe('EditDebitInvestigationComponent', () => {
  let component: EditDebitInvestigationComponent;
  let fixture: ComponentFixture<EditDebitInvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDebitInvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDebitInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
