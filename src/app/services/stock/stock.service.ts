import { inject, Injectable } from '@angular/core';
import { envrionment } from '../../../../environments/environment';
import { COMPANY_PROFILE, TIME_SERIES } from '../../types/stock.const';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  interval,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { StockMetaData } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  key = envrionment.stockApiKey;
  baseUrl = 'https://www.alphavantage.co/query';
  http = inject(HttpClient);
  private cache = new Map<string, any>();
  private stockSubject = new BehaviorSubject<any[]>([]);
  stocks$ = this.stockSubject.asObservable();

  constructor() {}

  private setStocks(data: any[]): void {
    this.stockSubject.next(data);
  }

  private getStocks() {
    return this.stockSubject.value;
  }

  getStockData(symbol: string): Observable<any> {
    const cacheKey = `stock-${symbol}`;
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http
      .get(
        `${this.baseUrl}?function=${TIME_SERIES.INTRADAY}&symbol=${symbol}&interval=5min&apikey=${this.key}`
      )
      .pipe(
        tap((data) => {
          this.cache.set(cacheKey, data); //cache the data
        }),
        map((data: any) => {
          const timeSeries = data['Time Series (5min)'];
          if (timeSeries) {
            const latest = Object.keys(timeSeries)[0];
            const stockUpdate = {
              symbol: symbol,
              price: timeSeries[latest]['1. open'],
              time: latest,
            };

            // Add the new update to the stockSubject
            const currentData = this.getStocks();
            this.setStocks([stockUpdate, ...currentData].slice(0, 10)); // Keep only the 10 latest updates
            return stockUpdate;
          }
          return null;
        })
      );
  }

  getLiveStockData(symbol: string) {
    // Poll the API every minute for new data
    return interval(60000)
      .pipe(switchMap(() => this.getStockData(symbol)))
      .subscribe((data) => {
        const timeSeries = data['Time Series (5min)'];
        if (timeSeries) {
          const latest = Object.keys(timeSeries)[0];
          const stockUpdate = {
            symbol: symbol,
            price: timeSeries[latest]['1. open'],
            time: latest,
          };

          // Add the new update to the stockSubject
          const currentData = this.getStocks();
          this.setStocks([stockUpdate, ...currentData].slice(0, 10)); // Keep only the 10 latest updates
        }
      });
  }

  getCompanyDetails(symbol: string): Observable<any> {
    const cacheKey = `stock-${symbol}`;
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached data');
      return of(cachedData);
    }
    return this.http
      .get(
        `${this.baseUrl}?function=${COMPANY_PROFILE.OVERVIEW}&symbol=${symbol}&apikey=${this.key}`
      )
      .pipe(
        tap((data) => {
          this.cache.set(cacheKey, data);
        })
      );
  }

  getETF(symbol: string, profile: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}?function=${profile}&symbol=${symbol}&apikey=${this.key}`
    );
  }
}
