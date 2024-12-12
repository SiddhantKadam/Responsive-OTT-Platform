import { Component, ElementRef, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
declare var bootstrap: any;
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  @ViewChild('actionMoviesListContainer') actionMoviesListContainer!: ElementRef;
  @ViewChild('comedyMoviesListContainer') comedyMoviesListContainer!: ElementRef;

  slides = [
    { image: 'https://via.placeholder.com/800x400?text=Slide+1', caption: 'Slide 1' },
    { image: 'https://via.placeholder.com/800x400?text=Slide+2', caption: 'Slide 2' },
    { image: 'https://via.placeholder.com/800x400?text=Slide+3', caption: 'Slide 3' }
  ];


  allMovies: any[] = [];
  allActionMovies: any[] = [];
  allComedyMovies: any[] = [];

  allMoviesCurrentPage = 1;
  actionMoviesCurrentPage = 1;
  comedyMoviesCurrentPage = 1;

  actionMoviesLoading = false;
  comedyMoviesLoading = false;
  mainLoader = true;

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
          } else if (type == "comedy") {
            this.allComedyMovies = [...this.allComedyMovies, ...data.Search];
          }
        }
      },
      error: (err) => {
        console.error('Error fetching movies', err);
      }
    });
  }

  loadMore(type: string): void {
    let count;
    if (type == "all") {
      this.allMoviesCurrentPage++;
      count = this.allMoviesCurrentPage;
    } else if (type == "action") {
      this.actionMoviesCurrentPage++;
      count = this.actionMoviesCurrentPage;
      this.actionMoviesLoading = true;
      setTimeout(() => {
        const container = this.actionMoviesListContainer.nativeElement;
        container.scrollLeft = container.scrollWidth;
        this.actionMoviesLoading = false;
      }, 2000);
    } else if (type == "comedy") {
      this.comedyMoviesCurrentPage++;
      count = this.comedyMoviesCurrentPage;
      this.comedyMoviesLoading = true;
      setTimeout(() => {
        const container = this.comedyMoviesListContainer.nativeElement;
        container.scrollLeft = container.scrollWidth;
        this.comedyMoviesLoading = false;
      }, 2000);
    }
    this.fetchMovies(type, count);
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollLeft += 200; // Adjust scroll amount as needed
  }

  selectedMovie: any;

  openPopup(movie: any): void {
    this.selectedMovie = movie;
    // Optionally, you can trigger the modal manually
    const modal = new bootstrap.Modal(document.getElementById('movieModal')!);
    modal.show();
  }

}
