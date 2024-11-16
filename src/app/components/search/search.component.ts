import { Component, output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchString = output<string>();

  search(searchString: Event) {
    const target = searchString.target as HTMLInputElement;
    this.searchString.emit(target.value);
  }
}
