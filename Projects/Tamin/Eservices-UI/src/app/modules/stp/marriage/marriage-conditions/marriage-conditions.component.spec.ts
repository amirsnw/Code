import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageConditionsComponent } from './marriage-conditions.component';

describe('MarriageConditionsComponent', () => {
  let component: MarriageConditionsComponent;
  let fixture: ComponentFixture<MarriageConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
