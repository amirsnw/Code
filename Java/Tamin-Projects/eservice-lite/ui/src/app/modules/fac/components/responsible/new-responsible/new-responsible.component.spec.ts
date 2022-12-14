import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResponsibleComponent } from './new-responsible.component';

describe('NewResponsibleComponent', () => {
  let component: NewResponsibleComponent;
  let fixture: ComponentFixture<NewResponsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewResponsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
