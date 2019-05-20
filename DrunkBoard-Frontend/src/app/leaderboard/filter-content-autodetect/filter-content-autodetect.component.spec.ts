import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterContentAutodetectComponent } from './filter-content-autodetect.component';

describe('FilterContentAutodetectComponent', () => {
  let component: FilterContentAutodetectComponent;
  let fixture: ComponentFixture<FilterContentAutodetectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterContentAutodetectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterContentAutodetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
