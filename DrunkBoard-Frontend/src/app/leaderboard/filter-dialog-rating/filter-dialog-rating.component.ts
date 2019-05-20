import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog-rating',
  templateUrl: './filter-dialog-rating.component.html',
  styleUrls: ['./filter-dialog-rating.component.scss']
})
export class FilterDialogRatingComponent {

  public options = {
    floor: 0,
    ceil: 5,
    step: 1,
    minRange: 1,
    hideLimitLabels: true,
    hidePointerLabels: false,
    showSelectionBar: true
  };

  public sliderRange = new FormControl(this.options.minRange);

  public confirm(): void {

  }
}
