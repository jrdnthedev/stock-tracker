import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  watchlist = new BehaviorSubject<string[]>([
    'AAPL',
    'GOOGL',
    'MSFT',
    'AMZN',
    'TSLA',
  ]);
  constructor() {}

  addToWatchlist(stockSymbol: string) {
    const currentWatchlist = this.watchlist.getValue();
    if (!currentWatchlist.includes(stockSymbol)) {
      const updatedWatchlist = [...currentWatchlist, stockSymbol];
      this.watchlist.next(updatedWatchlist);
    } else {
      console.log('Stock already in watchlist');
    }
  }

  removeFromWatchlist(stockSymbol: string) {
    const currentWatchlist = this.watchlist.getValue();
    const updatedWatchlist = currentWatchlist.filter(
      (symbol) => symbol !== stockSymbol
    );
    this.watchlist.next(updatedWatchlist);
  }
}
