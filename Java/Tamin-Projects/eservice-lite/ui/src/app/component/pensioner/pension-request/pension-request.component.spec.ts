import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionRequestComponent } from './pension-request.component';

describe('PensionRequestComponent', () => {
  let component: PensionRequestComponent;
  let fixture: ComponentFixture<PensionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
