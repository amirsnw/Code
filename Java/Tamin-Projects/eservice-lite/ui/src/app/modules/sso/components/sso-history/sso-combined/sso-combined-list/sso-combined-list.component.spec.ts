import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCombinedListComponent } from './sso-combined-list.component';

describe('SsoCombinedListComponent', () => {
  let component: SsoCombinedListComponent;
  let fixture: ComponentFixture<SsoCombinedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoCombinedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCombinedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


