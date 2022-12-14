import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopFullInfoComponent } from './workshop-full-info.component';

describe('WorkshopFullInfoComponent', () => {
  let component: WorkshopFullInfoComponent;
  let fixture: ComponentFixture<WorkshopFullInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopFullInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
