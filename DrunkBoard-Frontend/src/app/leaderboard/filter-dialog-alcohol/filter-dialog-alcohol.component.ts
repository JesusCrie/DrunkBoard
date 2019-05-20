import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlcoholFilter } from '../filter';
import { MatDialogRef } from '@angular/material';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter-dialog-alcohol',
  templateUrl: './filter-dialog-alcohol.component.html',
  styleUrls: ['./filter-dialog-alcohol.component.scss']
})
export class FilterDialogAlcoholComponent implements OnInit {

  public options = {
    floor: 0,
    ceil: 15,
    step: 0.05,
    hideLimitLabels: true,
    hidePointerLabels: false
  };

  public sliderRange: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FilterDialogAlcoholComponent>,
    private filterService: FilterService
  ) {}

  public ngOnInit(): void {
    const filter = this.filterService.getFilter(f => f.constructor === AlcoholFilter) as AlcoholFilter;

    this.sliderRange = new FormGroup({
      minMaxControl: new FormControl([
        (filter && filter.min) ? filter.min : this.options.floor,
        (filter && filter.max) ? filter.max : this.options.ceil
      ])
    });
  }

  confirm(): void {
    const filter = new AlcoholFilter();

    if (this.sliderRange.value.minMaxControl[0] !== this.options.floor) {
      filter.putArg({min: this.sliderRange.value.minMaxControl[0]});
    }

    if (this.sliderRange.value.minMaxControl[1] !== this.options.ceil) {
      filter.putArg({max: this.sliderRange.value.minMaxControl[1]});
    }

    this.dialogRef.close(filter.empty() ? undefined : filter);
  }
}
