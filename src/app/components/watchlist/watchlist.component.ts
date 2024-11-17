import { Component, inject } from '@angular/core';
import { StockService } from '../../services/stock/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent {
  private stockService = inject(StockService);
  list$ = this.stockService.watchlist;

  remove(symbol: string) {
    this.stockService.removeFromWatchlist(symbol);
  }
}
