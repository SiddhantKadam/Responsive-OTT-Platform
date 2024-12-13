import { Component, ElementRef, ViewChild } from '@angular/core';
import { MOVIES_CONSTANTS } from 'src/app/constants';
import { Movie } from 'src/app/model';
import { MoviesService } from 'src/app/services/movies/movies.service';
declare var bootstrap: any;
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  @ViewChild('actionMoviesListContainer') actionMoviesListContainer!: ElementRef;
  @ViewChild('comedyMoviesListContainer') comedyMoviesListContainer!: ElementRef;

  allMovies: any[] = [];
  allActionMovies: any[] = [];
  allComedyMovies: any[] = [];

  allMoviesCurrentPage: number = 1;
  actionMoviesCurrentPage: number = 1;
  comedyMoviesCurrentPage: number = 1;

  actionMoviesLoading: boolean = false;
  comedyMoviesLoading: boolean = false;
  mainLoader: boolean = true;

  selectedMovieData: Movie = {};
  MOVIES_CONSTANTS: any = MOVIES_CONSTANTS;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.fetchMovies("all");
    this.fetchMovies("action");
    this.fetchMovies("comedy");
  }

  fetchMovies(type: string, count?: number): void {
    this.moviesService.searchMovies(type, count).subscribe({
      next: (data) => {
        if (data.Search) {
          if (type == "all") {
            this.allMovies = [...this.allMovies, ...data.Search];
            this.mainLoader = false;
          } else if (type == "action") {
            this.allActionMovies = [...this.allActionMovies, ...data.Search];
            if (count) {
              setTimeout(() => { // Scroll after movie load to DOM
                const container = this.actionMoviesListContainer.nativeElement;
                container.scrollLeft = container.scrollWidth;
                this.actionMoviesLoading = false;
              }, 100)
            }
          } else if (type == "comedy") {
            this.allComedyMovies = [...this.allComedyMovies, ...data.Search];
            if (count) {
              setTimeout(() => { // Scroll after movie load to DOM
                const container = this.comedyMoviesListContainer.nativeElement;
                container.scrollLeft = container.scrollWidth;
                this.comedyMoviesLoading = false;
              }, 100)
            }
          }
        }
      },
      error: (err) => {
        console.error('Error fetching movies', err);
      }
    });
  }

  // Load more movies with pagination
  loadMore(type: string): void {
    let count;
    if (type == "all") {
      this.allMoviesCurrentPage++;
      count = this.allMoviesCurrentPage;
    } else if (type == "action") {
      this.actionMoviesCurrentPage++;
      count = this.actionMoviesCurrentPage;
      this.actionMoviesLoading = true;
    } else if (type == "comedy") {
      this.comedyMoviesCurrentPage++;
      count = this.comedyMoviesCurrentPage;
      this.comedyMoviesLoading = true;
    }
    this.fetchMovies(type, count);
  }

  // Open modal manually
  openMoviePopup(movie: any): void {
    this.selectedMovieData = movie;
    const modal = new bootstrap.Modal(document.getElementById('movieModal')!);
    modal.show();
  }

}
