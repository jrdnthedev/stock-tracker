import { Component, inject, Input } from '@angular/core';
import { StockService } from '../../services/stock/stock.service';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss',
})
export class StockDetailsComponent {
  @Input() stock: any;
  private stockService = inject(StockService);
  addToWatchlist(stock: any) {
    console.log(stock.Symbol);
    this.stockService.addToWatchlist(stock.Symbol);
  }
}
