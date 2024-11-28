import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent {
  private watchlistService = inject(WatchlistService);
  list!: string[];

  ngOnInit() {
    this.watchlistService.watchlist$.subscribe((data) => {
      this.list = data;
    });
  }

  removeFromWatchlist(stock: string) {
    this.watchlistService.removeFromWatchlist(stock);
  }
}
