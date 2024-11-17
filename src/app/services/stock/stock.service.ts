import { inject, Injectable } from '@angular/core';
import { envrionment } from '../../../../environments/environment';
import { COMPANY_PROFILE } from '../../types/stock.const';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  key = envrionment.stockApiKey;
  http = inject(HttpClient);
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

  getCompanyDetails(symbol: string): Observable<any> {
    console.log(symbol);
    return this.http.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${this.key}`
    );
  }

  getETF(symbol: string, profile: COMPANY_PROFILE) {
    return fetch(
      `https://www.alphavantage.co/query?function=${profile}&symbol=${symbol}&apikey=${this.key}`
    );
  }
}
