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
  watchlistService = inject(WatchlistService);
  list!: string[];

  ngOnInit() {
    this.watchlistService.watchlist$.subscribe((data) => {
      this.list = data;
    });
  }

  removeFromWatchlist(stock: string) {
    const updatedWatchlist = this.watchlistService
      .getList()
      .filter((symbol) => symbol !== stock);
    this.watchlistService.setList(updatedWatchlist);
  }
}
