import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlist = new BehaviorSubject<string[]>([]);
  watchlist$ = this.watchlist.asObservable();

  constructor() {}

  setList(data: any[]): void {
    this.watchlist.next(data);
  }

  getList() {
    return this.watchlist.value;
  }

  removeFromWatchlist(stock: string) {
    const updatedWatchlist = this.getList().filter(
      (symbol) => symbol !== stock
    );
    this.setList(updatedWatchlist);
  }

  addToWatchlist(stock: string) {
    const updatedWatchlist = this.getList().concat(stock);
    this.setList(updatedWatchlist);
  }
}
