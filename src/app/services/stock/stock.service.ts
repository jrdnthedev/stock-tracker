import { Injectable } from '@angular/core';
import { envrionment } from '../../../../environments/environment';
import { COMPANY_PROFILE } from '../../types/stock.const';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  key = envrionment.stockApiKey;

  constructor() {}

  getCompanyDetails(symbol: string) {
    return fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${this.key}`
    );
  }

  getETF(symbol: string, profile: COMPANY_PROFILE) {
    return fetch(
      `https://www.alphavantage.co/query?function=${profile}&symbol=${symbol}&apikey=${this.key}`
    );
  }
}
