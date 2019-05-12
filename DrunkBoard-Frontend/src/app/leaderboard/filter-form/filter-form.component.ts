import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FilterService } from '../filter.service';
import { Filter, NameFilter } from '../filter';
import { FilterDialogCountryComponent } from '../filter-dialog-country/filter-dialog-country.component';
import { FilterDialogRatingComponent } from '../filter-dialog-rating/filter-dialog-rating.component';
import { FilterDialogAlcoholComponent } from '../filter-dialog-alcohol/filter-dialog-alcohol.component';

interface CreatorHolder {
  name: string;
  creator: any;
}

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

  public filtersCategories: CreatorHolder[] = [
    {name: 'Country', creator: FilterDialogCountryComponent},
    {name: 'Rating', creator: FilterDialogRatingComponent},
    {name: 'Alcohol', creator: FilterDialogAlcoholComponent}
  ];

  public separatorKeyCodes = [ENTER, COMMA];
  public filterControl = new FormControl();
  public autocompleteValues$: Observable<CreatorHolder[]>;

  @ViewChild('filterInput') private filterInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') private autocomplete: MatAutocomplete;

  constructor(
    private filterService: FilterService,
    private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.autocompleteValues$ = this.filterControl.valueChanges.pipe(
      startWith<string>(''),
      map(name => name ? this.completeFilters(name) : this.filtersCategories.slice())
    );
  }

  /**
   * Expose the filters to the view
   */
  get filters$(): Subject<Filter[]> {
    return this.filterService.filters$;
  }

  /**
   * Used to format a value from the autocomplete before rendering it
   */
  public displayAutocompleteValue(holder?: CreatorHolder): string | undefined {
    return holder ? holder.name : undefined;
  }

  /**
   * Triggered when typing in the input directly
   */
  public createFilter(event: MatChipInputEvent): void {
    if (!event.value || this.autocomplete.isOpen) {
      return;
    }

    this.filterService.addFilter(new NameFilter(event.value.trim()));
    this.cleanupInput();
  }

  /**
   * Triggered when selecting autocomplete
   */
  public autocompleteAddFilter(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      return;
    }

    const holder: CreatorHolder = event.option.value;

    this.dialog.open<{}, any, Filter>(holder.creator, {width: '400px'}).afterClosed().subscribe(res => {
      if (res) {
        this.filterService.addFilter(res);
      }
    });

    this.cleanupInput();
  }

  /**
   * Triggered when clicking the close button on a filter
   */
  public removeFilter(filter: Filter): void {
    this.filterService.removeFilter(filter);
  }

  private cleanupInput() {
    this.autocomplete.showPanel = false;
    this.filterInput.nativeElement.value = '';
    this.filterControl.setValue(null);
  }

  private completeFilters(value: any): CreatorHolder[] {
    // Filter only string values
    if (typeof value !== 'string') {
      return [];
    }

    const valueLow = value.toLowerCase();
    return this.filtersCategories.filter(holder => holder.name.toLowerCase().indexOf(valueLow) >= 0);
  }
}
