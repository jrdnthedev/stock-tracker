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
}
