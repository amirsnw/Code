import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFledgedListNewComponent } from './full-fledged-list-new.component';

describe('FullFledgedListNewComponent', () => {
  let component: FullFledgedListNewComponent;
  let fixture: ComponentFixture<FullFledgedListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFledgedListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFledgedListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
