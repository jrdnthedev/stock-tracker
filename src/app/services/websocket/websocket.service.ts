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
        return data['Time Series (Daily)'];
      })
    );
  }
}
