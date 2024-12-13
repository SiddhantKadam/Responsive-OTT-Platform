import { Component, Input, SimpleChanges } from '@angular/core';
import { MOVIES_CONSTANTS } from 'src/app/constants';
import { Movie } from 'src/app/model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() selectedMovie: Movie = {};
  selectedMovieData: Movie = {};
  relatedMovies: Movie[] = [];
  MOVIES_CONSTANTS: any = MOVIES_CONSTANTS;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedMovie']) {
      this.selectedMovieData = changes['selectedMovie'].currentValue;
      this.relatedMovies = Array(3).fill(this.selectedMovie);
    }
  }

}
