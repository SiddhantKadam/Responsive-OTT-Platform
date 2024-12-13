import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  readonly apiKey: string = "f4a90158";

  private apiUrl = `https://www.omdbapi.com/?apikey=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}&s=${query}&page=${page}`);
  }
}
