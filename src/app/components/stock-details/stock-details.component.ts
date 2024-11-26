import { Component, inject, Input } from '@angular/core';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss',
})
export class StockDetailsComponent {
  @Input() stock: any;
  watchlistService = inject(WatchlistService);
}
