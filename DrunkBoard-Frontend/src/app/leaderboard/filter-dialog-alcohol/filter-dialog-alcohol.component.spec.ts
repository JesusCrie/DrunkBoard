import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogAlcoholComponent } from './filter-dialog-alcohol.component';

describe('FilterDialogAlcoholComponent', () => {
  let component: FilterDialogAlcoholComponent;
  let fixture: ComponentFixture<FilterDialogAlcoholComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDialogAlcoholComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogAlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
