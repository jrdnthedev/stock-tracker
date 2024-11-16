import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { StockDetailsComponent } from '../../components/stock-details/stock-details.component';
import { WatchlistComponent } from '../../components/watchlist/watchlist.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, StockDetailsComponent, WatchlistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  handleSearch(searchString: string) {
    console.log(searchString);
  }
}
