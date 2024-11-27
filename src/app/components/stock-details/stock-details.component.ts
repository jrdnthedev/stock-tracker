import { Component, inject, Input } from '@angular/core';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [],
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
      const updatedWatchlist = [...this.watchlistService.getList(), stock];
      this.watchlistService.setList(updatedWatchlist);
    } else {
      console.log('Stock already in watchlist');
    }
  }
}
