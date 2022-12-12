import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditNameComponent } from './workshop-edit-name.component';

describe('WorkshopEditNameComponent', () => {
  let component: WorkshopEditNameComponent;
  let fixture: ComponentFixture<WorkshopEditNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopEditNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
