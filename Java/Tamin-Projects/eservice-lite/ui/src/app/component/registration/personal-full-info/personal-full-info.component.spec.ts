import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFullInfoComponent } from './personal-full-info.component';

describe('PersonalFullInfoComponent', () => {
  let component: PersonalFullInfoComponent;
  let fixture: ComponentFixture<PersonalFullInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalFullInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
