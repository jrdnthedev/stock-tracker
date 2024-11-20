import { inject, Injectable } from '@angular/core';
import { StockService } from '../stock/stock.service';
import { map, switchMap } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stockService = inject(StockService);
  constructor() {}

  getLiveStockData(symbol: string) {
    return interval(1000).pipe(
      //emit every second
      switchMap(() => this.stockService.getStockData(symbol)),
      map((data) => {
        const timeSeries = data['Time Series (1min)'];
        const latestKey = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestKey];
        return {
          time: latestKey,
          open: latestData['1. open'],
          high: latestData['2. high'],
          low: latestData['3. low'],
          close: latestData['4. close'],
        };
      })
    );
  }
}
