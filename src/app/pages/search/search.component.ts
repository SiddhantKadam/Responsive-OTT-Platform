import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
declare var bootstrap: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() searchMovie: string = '';
  private searchSubject: Subject<string> = new Subject<string>();
  searchedText: any | undefined;
  searchedMovies: any[] = [];
  searchMoviesLoading = false;

  slides = [
    { image: 'https://via.placeholder.com/800x400?text=Slide+1', caption: 'Slide 1' },
    { image: 'https://via.placeholder.com/800x400?text=Slide+2', caption: 'Slide 2' },
    { image: 'https://via.placeholder.com/800x400?text=Slide+3', caption: 'Slide 3' }
  ];

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
      switchMap((query) => this.fetchMovies(query))  // Perform the API call with the debounced query
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

  selectedMovie: any;

  openPopup(movie: any): void {
    this.selectedMovie = movie;
    // Optionally, you can trigger the modal manually
    const modal = new bootstrap.Modal(document.getElementById('movieModal')!);
    modal.show();
  }
}
