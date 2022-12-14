import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceListNewComponent } from './insurance-list-new.component';

describe('InsuranceListNewComponent', () => {
  let component: InsuranceListNewComponent;
  let fixture: ComponentFixture<InsuranceListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
