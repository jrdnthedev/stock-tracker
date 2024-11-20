import { Component, inject } from '@angular/core';
import { StockService } from '../../services/stock/stock.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { StockMetaData } from '../../interfaces/interaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stockService = inject(StockService);
  stockData$!: Observable<StockMetaData>;

  ngOnInit() {
    this.stockData$ = this.stockService.getStockMetaData('AAPL');
  }
}
