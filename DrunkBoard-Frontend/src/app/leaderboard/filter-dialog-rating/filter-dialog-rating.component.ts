import { Component } from '@angular/core';
import { RatingFilter } from '../filter';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-filter-dialog-rating',
  templateUrl: './filter-dialog-rating.component.html',
  styleUrls: ['./filter-dialog-rating.component.scss']
})
export class FilterDialogRatingComponent {

  public minRating: number;

  constructor(private dialogRef: MatDialogRef<FilterDialogRatingComponent>) {}

  onRateChange(event: number) {
    this.minRating = event;
  }

  public confirm(): void {
    const filter = new RatingFilter(this.minRating);
    this.dialogRef.close(filter);
  }
}
