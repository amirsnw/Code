import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPolompFormComponent } from './new-polomp-form.component';

describe('NewPolompFormComponent', () => {
  let component: NewPolompFormComponent;
  let fixture: ComponentFixture<NewPolompFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPolompFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPolompFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
