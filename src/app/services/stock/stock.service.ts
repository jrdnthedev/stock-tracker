import { inject, Injectable } from '@angular/core';
import { envrionment } from '../../../../environments/environment';
import { COMPANY_PROFILE } from '../../types/stock.const';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { StockMetaData } from '../../interfaces/interaces';

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

  getStockMetaData(symbol: string): Observable<StockMetaData> {
    return this.http
      .get(
        `${this.baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.key}`
      )
      .pipe(
        map((response: any) => {
          const metaData = response['Meta Data'];
          return {
            information: metaData['1. Information'],
            symbol: metaData['2. Symbol'],
            lastRefreshed: metaData['3. Last Refreshed'],
            outputSize: metaData['4. Output Size'],
            timeZone: metaData['5. Time Zone'],
          };
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
