import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReservesComponent } from './new-reserves.component';

describe('NewReservesComponent', () => {
  let component: NewReservesComponent;
  let fixture: ComponentFixture<NewReservesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReservesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
