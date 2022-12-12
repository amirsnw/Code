import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConscriptionComponent } from './conscription.component';

describe('ConscriptionComponent', () => {
  let component: ConscriptionComponent;
  let fixture: ComponentFixture<ConscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
