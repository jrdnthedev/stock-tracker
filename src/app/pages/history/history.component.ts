import { Component } from '@angular/core';
import { WatchlistComponent } from '../../components/watchlist/watchlist.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [WatchlistComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {}
