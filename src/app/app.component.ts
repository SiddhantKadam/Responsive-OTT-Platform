import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  moviesSearchedData: string = '';

  // Search movies to Parent data transfer
  receiveSearchData(data: string): void {
    this.moviesSearchedData = data;
  }

}
