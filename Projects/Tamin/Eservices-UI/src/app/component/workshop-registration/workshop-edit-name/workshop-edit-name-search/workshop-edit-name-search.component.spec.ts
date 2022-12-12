import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditNameSearchComponent } from './workshop-edit-name-search.component';

describe('WorkshopEditNameSearchComponent', () => {
  let component: WorkshopEditNameSearchComponent;
  let fixture: ComponentFixture<WorkshopEditNameSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditNameSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditNameSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
