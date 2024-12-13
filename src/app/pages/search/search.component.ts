import { Component, Input, SimpleChanges } from '@angular/core';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { MOVIES_CONSTANTS } from 'src/app/constants';
import { Movie } from 'src/app/model';
import { MoviesService } from 'src/app/services/movies/movies.service';
declare var bootstrap: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() searchMovie: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  searchedText: string = "";
  searchedMovies: any[] = [];
  searchMoviesLoading: boolean = false;

  selectedMovieData: Movie = {};
  MOVIES_CONSTANTS: any = MOVIES_CONSTANTS;

  constructor(private moviesService: MoviesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchMovie']) {
      this.searchMoviesLoading = true;
      this.searchedMovies = [];
      this.searchedText = changes['searchMovie'].currentValue;
      this.searchSubject.next(this.searchMovie);
    }
  }

  ngOnInit() {
    // Subscribe to the subject to handle search logic with debounce
    this.searchSubject.pipe(
      debounceTime(500),  // Delay the request by 500ms after the user stops typing
      switchMap((query) => this.fetchMovies(query))
    ).subscribe({
      next: (movies) => {
        this.searchedMovies.push(movies);
      },
      error: (err) => {
        console.error('Error fetching movies', err);
      }
    });
  }

  fetchMovies(type: string, count: number = 10): any {
    return this.moviesService.searchMovies(type, count).pipe(
      switchMap((data) => {
        this.searchMoviesLoading = false;
        if (data.Search) {
          return [...data.Search];  // Return the search results
        } else {
          return [];
        }
      })
    );
  }

  // Open modal manually
  openPopup(movie: Movie): void {
    this.selectedMovieData = movie;
    const modal = new bootstrap.Modal(document.getElementById('movieModal')!);
    modal.show();
  }
}
