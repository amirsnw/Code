import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessStartersIndicatorComponent } from './business-starters-indicator.component';

describe('BusinessStartersIndicatorComponent', () => {
  let component: BusinessStartersIndicatorComponent;
  let fixture: ComponentFixture<BusinessStartersIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessStartersIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessStartersIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
