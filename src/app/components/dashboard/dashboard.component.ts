import { Component, inject } from '@angular/core';
import { StockService } from '../../services/stock/stock.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { StockMetaData } from '../../interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private stockService = inject(StockService);
  stockData!: any;

  ngOnInit() {
    // this.stockService.getLiveStockData('AAPL');
    // this.stockData = this.stockService.getStocks();
  }
}
