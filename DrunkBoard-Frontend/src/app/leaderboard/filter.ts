import { COUNTRIES, Country } from '../country';
import { LeadData } from './leaderboard/leaderboard.component';

export interface Filter {

  /**
   * Check whether the data is valid for this filter.
   * @param item - The item to pass.
   */
  check(item: LeadData): boolean;

  /**
   * Check whether this filter is considered empty and cant't affect anything.
   */
  empty(): boolean;

  /**
   * Compile this filter to a certain format acceptable by the remote API.
   * This function will assume the filter isn't empty.
   */
  compile(): string;

  /**
   * Tell the filter to process add register a raw argument and apply it.
   * @param arg The filter to process and register.
   */
  putArg(arg: any): void;

  /**
   * Check whether this filter can be merge with the other one.
   * The reverse of this method should give the same result.
   * AKA filter1.canMerge(filter2) === filter2.canMerge(filter1)
   * @param other The other filter to compare to.
   */
  canMerge(other: Filter): boolean;

  /**
   * Merge the other filter into this one.
   * It is not defined if this function alter this filter or return a copy of it.
   * @param other A filter containing the arguments of the other one. Can be itself.
   */
  merge(other: Filter): Filter;
}

export class CountryFilter implements Filter {
  public countries: Country[] = [];

  constructor(arg?: Country) {
    this.countries.push(arg);
  }

  check(item: LeadData): boolean {
    for (const country of this.countries) {
      if (country.isoCode.toLowerCase() === item.country_iso.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  empty(): boolean {
    return this.countries.length === 0;
  }

  compile(): string {
    return 'country|' + this.countries.map(country => country.isoCode).join('|');
  }

  putArg(arg: string): void {
    const country = COUNTRIES.get(arg.toUpperCase());
    if (!country) {
      this.pushCountry(country);
    }
  }

  private pushCountry(country: Country): void {
    if (this.countries.indexOf(country) === -1) {
      this.countries.push(country);
    }
  }

  canMerge(other: Filter): boolean {
    return other.constructor === CountryFilter;
  }

  merge(other: CountryFilter): CountryFilter {
    other.countries.forEach(c => this.pushCountry(c));
    return this;
  }
}

export class RatingFilter implements Filter {
  public minRating: number;

  constructor(arg?: number) {
    this.putArg(arg);
  }

  check(item: LeadData): boolean {
    return item.votes_average >= (this.minRating + 1);
  }

  empty(): boolean {
    return this.minRating == null || this.minRating === 0;
  }

  compile(): string {
    return `avg_vote|${this.minRating.toFixed(0)}`;
  }

  putArg(arg: number): void {
    this.minRating = arg;
  }

  canMerge(other: Filter): boolean {
    return other.constructor === RatingFilter;
  }

  // I am the source of truth
  merge(other: RatingFilter): RatingFilter {
    return this;
  }
}

export class AlcoholFilter implements Filter {
  public min: number;
  public max: number;

  constructor(min?: number, max?: number) {
    this.putArg({min, max});
  }

  check(item: LeadData): boolean {

    return item.alcohol >= (this.min || 0) && item.alcohol <= (this.max || 15);
  }

  empty(): boolean {
    return this.min == null && this.max == null;
  }

  compile(): string {
    let template = 'alcohol|';

    if (this.min) {
      template += this.min.toFixed(2);
    }

    if (this.max) {
      template += '|';
      template += this.max.toFixed(2);
    }

    return template;
  }

  putArg(arg: { min?: number, max?: number }): void {
    if (arg.min) {
      this.min = arg.min;
    }

    if (arg.max) {
      this.max = arg.max;
    }
  }

  canMerge(other: Filter): boolean {
    return other.constructor === AlcoholFilter;
  }

  // The root (this) is always the source of truth.
  // Because the only time it is merge is when an
  // updated version of the filter is registered and merged.
  merge(other: AlcoholFilter): AlcoholFilter {
    return this;
  }
}

export class NameFilter implements Filter {
  public name: string;

  constructor(arg?: string) {
    this.putArg(arg.toLowerCase());
  }

  check(item: LeadData): boolean {
    return item.first_name.toLowerCase().indexOf(this.name) !== -1
      || item.last_name.toLowerCase().indexOf(this.name) !== -1
      || item.story.toLowerCase().indexOf(this.name) !== -1;
  }

  empty(): boolean {
    return this.name == null;
  }

  compile(): string {
    return `name|${name}`;
  }

  putArg(arg: string): void {
    this.name = arg;
  }

  canMerge(other: Filter): boolean {
    return other.constructor === NameFilter;
  }

  merge(other: NameFilter): NameFilter {
    this.putArg(other.name);
    return this;
  }
}
