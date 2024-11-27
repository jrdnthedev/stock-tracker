import { Component, inject } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { StockDetailsComponent } from '../../components/stock-details/stock-details.component';
import { WatchlistComponent } from '../../components/watchlist/watchlist.component';
import { StockService } from '../../services/stock/stock.service';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchComponent,
    StockDetailsComponent,
    WatchlistComponent,
    CommonModule,
    DashboardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private stockService = inject(StockService);
  private searchSubject = new Subject<string>();

  stockDetails: any;

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchItem) => {
        this.performSearch(searchItem);
      });
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
  }

  performSearch(term: string) {
    if (!term) {
      return;
    }
    this.stockService.getCompanyDetails(term).subscribe((data) => {
      console.log('Performing API call with:', term);
      this.stockDetails = data;
    });
  }
}
