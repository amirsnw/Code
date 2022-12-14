import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PursueListComponent } from './Pursue-listComponent';

describe('pursue-listComponent', () => {
  let component: PursueListComponent;
  let fixture: ComponentFixture<PursueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PursueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PursueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
