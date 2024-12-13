export class Movie {
    Title?: string;
    Year?: string;
    imdbID?: string;
    Type?: string;
    Poster?: string;

    constructor(title?: string, year?: string, imdbID?: string, type?: string, poster?: string) {
        this.Title = title || '';
        this.Year = year || '';
        this.imdbID = imdbID || '';
        this.Type = type || '';
        this.Poster = poster || '';
    }
}