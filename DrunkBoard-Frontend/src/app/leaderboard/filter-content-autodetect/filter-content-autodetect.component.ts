import { Component, Input } from '@angular/core';
import { AlcoholFilter, CountryFilter, Filter, NameFilter, RatingFilter } from '../filter';

@Component({
  selector: 'app-filter-content-autodetect',
  templateUrl: './filter-content-autodetect.component.html',
  styleUrls: ['./filter-content-autodetect.component.scss']
})
export class FilterContentAutodetectComponent {

  @Input() filter: Filter;

  public isCountryFilter(): boolean {
    return this.filter instanceof CountryFilter;
  }

  get countryFilter(): CountryFilter {
    return this.filter as CountryFilter;
  }

  public isRatingFilter(): boolean {
    return this.filter instanceof RatingFilter;
  }

  get ratingFilter(): RatingFilter {
    return this.filter as RatingFilter;
  }

  get ratingRange(): number[] {
    return new Array(this.ratingFilter.minRating + 1);
  }

  public isAlcoholFilter(): boolean {
    return this.filter instanceof AlcoholFilter;
  }

  get alcoholFilter(): AlcoholFilter {
    return this.filter as AlcoholFilter;
  }

  public isNameFilter(): boolean {
    return this.filter instanceof NameFilter;
  }

  get nameFilter(): NameFilter {
    return this.filter as NameFilter;
  }
}
