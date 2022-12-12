import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionAccountSearchComponent } from './pension-account-search.component';

describe('PensionAccountSearchComponent', () => {
  let component: PensionAccountSearchComponent;
  let fixture: ComponentFixture<PensionAccountSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionAccountSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionAccountSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
