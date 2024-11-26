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
  watchlist$ = this.watchlist.asObservable();

  constructor() {}

  setList(data: any[]): void {
    this.watchlist.next(data);
  }

  getList() {
    return this.watchlist.value;
  }

  // addToWatchlist(stockSymbol: string) {
  //   const currentWatchlist = this.getList();
  //   if (!currentWatchlist.includes(stockSymbol)) {
  //     const updatedWatchlist = [...currentWatchlist, stockSymbol];
  //     this.setList(updatedWatchlist);
  //   } else {
  //     console.log('Stock already in watchlist');
  //   }
  // }

  removeFromWatchlist(stockSymbol: string) {
    const currentWatchlist = this.getList();
    const updatedWatchlist = currentWatchlist.filter(
      (symbol) => symbol !== stockSymbol
    );
    this.setList(updatedWatchlist);
  }
}
