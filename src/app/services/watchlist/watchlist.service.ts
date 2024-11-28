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
}
