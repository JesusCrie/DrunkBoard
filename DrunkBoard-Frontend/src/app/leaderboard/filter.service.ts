import { Injectable } from '@angular/core';
import { Filter } from './filter';
import { Subject } from 'rxjs';
import { LeadData } from './leaderboard/leaderboard.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filters: Filter[] = [];
  public filters$: Subject<Filter[]>;

  constructor() {
    this.filters$ = new Subject();
  }

  public filter(data: LeadData[]): LeadData[] {
    return data.filter(item => {
      return this.filters.filter(f => !f.check(item)).length <= 0;
    });
  }

  /**
   * Get the first filter that matches the predicate.
   * This function is unsafe, if the predicate didn't match anything,
   * an out-of-bound exception can occur.
   */
  public getFilter(predicate: (filter: Filter) => boolean): Filter | null {
    const view = this.filters.filter(predicate);
    if (view.length) {
      return view[0];
    }

    return null;
  }

  /**
   * Register a filter.
   */
  public addFilter(filter: Filter): void {
    this.mergeOne(filter);
    this.filters.push(filter);

    // Notify that the list of filters has changed
    this.filters$.next(this.filters);
  }

  /**
   * Unregister a filter.
   */
  public removeFilter(filter: Filter): void {
    this.filters.splice(this.filters.indexOf(filter), 1);

    // The list of filters have changed
    this.filters$.next(this.filters);
  }

  /**
   * Merge and compile the filters into a query param receivable by the API.
   */
  public compileToQueryParams(): string {
    if (!this.filters) {
      return '';
    }

    this.mergeFilters();
    return 'filters=' + this.filters.map(filter => filter.compile()).join(',');
  }

  private mergeOne(rootFilter: Filter): void {
    const mergeable = this.filters.filter(f => rootFilter.canMerge(f));

    mergeable.forEach(filter => {
      this.filters.splice(this.filters.indexOf(filter));
      rootFilter.merge(filter);
    });
  }

  private mergeFilters(): void {
    const newFilters = [];

    while (this.filters.length) {
      const rootFilter = this.filters.pop();
      this.mergeOne(rootFilter);
      newFilters.push(rootFilter);
    }

    this.filters = newFilters;
  }
}
