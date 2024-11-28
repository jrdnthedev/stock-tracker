import { Component, inject, Input } from '@angular/core';
import { WatchlistService } from '../../services/watchlist/watchlist.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss',
})
export class StockDetailsComponent {
  @Input() stock: any;
  watchlistService = inject(WatchlistService);

  ngOnInit() {
    console.log('Stock details:', this.stock);
  }
  addToWatchlist(stock: string) {
    if (!this.watchlistService.getList().includes(stock)) {
      this.watchlistService.addToWatchlist(stock);
    } else {
      console.log('Stock already in watchlist');
    }
  }
}
