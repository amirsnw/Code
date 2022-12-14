import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroreListModalComponent } from './errore-list-modal.component';

describe('ErroreListModalComponent', () => {
  let component: ErroreListModalComponent;
  let fixture: ComponentFixture<ErroreListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErroreListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroreListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
