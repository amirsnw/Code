import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictDetailsComponent } from './edict-details.component';

describe('EdictDetailsComponent', () => {
  let component: EdictDetailsComponent;
  let fixture: ComponentFixture<EdictDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdictDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
