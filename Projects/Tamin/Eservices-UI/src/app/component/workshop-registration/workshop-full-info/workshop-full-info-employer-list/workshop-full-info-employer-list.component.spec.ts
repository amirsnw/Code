import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopFullInfoEmployerListComponent } from './workshop-full-info-employer-list.component';

describe('WorkshopFullInfoEmployerListComponent', () => {
  let component: WorkshopFullInfoEmployerListComponent;
  let fixture: ComponentFixture<WorkshopFullInfoEmployerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopFullInfoEmployerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopFullInfoEmployerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
