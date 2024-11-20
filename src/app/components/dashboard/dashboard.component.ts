import { Component, inject } from '@angular/core';
import { StockService } from '../../services/stock/stock.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stockService = inject(StockService);
  stockData$: any;

  ngOnInit() {
    this.stockData$ = this.stockService.getStockData('AAPL');
  }
}
