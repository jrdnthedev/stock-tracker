import { inject, Injectable } from '@angular/core';
import { envrionment } from '../../../../environments/environment';
import { COMPANY_PROFILE } from '../../types/stock.const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  key = envrionment.stockApiKey;
  http = inject(HttpClient);
  constructor() {}

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
