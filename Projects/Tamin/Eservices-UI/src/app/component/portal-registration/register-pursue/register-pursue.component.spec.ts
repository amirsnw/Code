import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPursueComponent } from './register-pursue.component';

describe('RegisterPursueComponent', () => {
  let component: RegisterPursueComponent;
  let fixture: ComponentFixture<RegisterPursueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPursueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPursueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
