import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogCountryComponent } from './filter-dialog-country.component';

describe('FilterDialogCountryComponent', () => {
  let component: FilterDialogCountryComponent;
  let fixture: ComponentFixture<FilterDialogCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDialogCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
