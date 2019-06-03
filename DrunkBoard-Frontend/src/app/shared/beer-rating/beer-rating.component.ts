import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-beer-rating',
  templateUrl: './beer-rating.component.html',
  styleUrls: ['./beer-rating.component.scss']
})
export class BeerRatingComponent implements OnInit {

  @Input() public beerAmount = 5;
  @Input() public size = 32;
  @Output() public selectedIndexChanged = new EventEmitter<number>();

  private mBeerRange: number[];
  private mSelectedIndex: number;
  private hasClicked: boolean;

  public ngOnInit(): void {
    this.mBeerRange = new Array(this.beerAmount).fill(0).map((x, i) => i);
    this.selectedIndexChanged.emit(0);
  }

  get beerRange(): number[] {
    return this.mBeerRange;
  }

  get selectedIndex(): number {
    return this.mSelectedIndex;
  }

  set selectedIndex(index: number) {
    this.mSelectedIndex = index;
    this.selectedIndexChanged.emit(index);
  }

  public hooverBeer(beerIndex: number): void {
    if (!this.hasClicked) {
      this.selectedIndex = beerIndex;
    }
  }

  public clickBeer(beerIndex: number): void {
    this.hasClicked = true;
    this.selectedIndex = beerIndex;
  }
}
