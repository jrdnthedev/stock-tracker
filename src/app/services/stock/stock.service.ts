import { inject, Injectable } from '@angular/core';
import { envrionment } from '../../../../environments/environment';
import { COMPANY_PROFILE } from '../../types/stock.const';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  key = envrionment.stockApiKey;
  baseUrl = 'https://www.alphavantage.co/query';
  http = inject(HttpClient);
  private cache = new Map<string, any>();
  constructor() {}

  getStockData(symbol: string): Observable<any> {
    const cacheKey = `stock-${symbol}`;
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    return this.http
      .get(
        `${this.baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.key}`
      )
      .pipe(
        tap((data) => {
          this.cache.set(cacheKey, data); //cache the data
        })
      );
  }

  getCompanyDetails(symbol: string): Observable<any> {
    console.log(symbol);
    return this.http.get(
      `${this.baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${this.key}`
    );
  }

  getETF(symbol: string, profile: COMPANY_PROFILE): Observable<any> {
    return this.http.get(
      `${this.baseUrl}?function=${profile}&symbol=${symbol}&apikey=${this.key}`
    );
  }
}
