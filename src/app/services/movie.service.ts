import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie';
import { openDB } from 'idb';


const DB_NAME = 'MoviesDB-details';
const STORE_NAME = 'movie-details';

@Injectable({
  providedIn: 'root',
})
export class MovieService {


  constructor(private http: HttpClient) {}

  private async getDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      },
    });
  }

  async getMovieDetails(movieId: number | undefined, language: string): Promise<Movie | null> {
    if (!movieId) return null;

    const db = await this.getDB();
    const key = `${movieId}_${language}`;
    const cachedMovie = await db.get(STORE_NAME, key);

    if (cachedMovie) {
      return cachedMovie.data;
    }

    return this.fetchMovieDetailsFromAPI(movieId, language, key, db);
  }

  private async fetchMovieDetailsFromAPI(movieId: number, language: string, key: string, db: any): Promise<Movie | null> {
    const url = `${environment.BASE_URL}/movie/${movieId}?api_key=${environment.API_KEY}&language=${language}&append_to_response=credits`;

    try {
      const response = await this.http.get<Movie>(url).toPromise();

      if (!response) {
        return null;
      }

      await db.put(STORE_NAME, { key, data: response });
      return response;
    } catch (error) {
      console.error('Error fetching movie details: ', error);
      return null;
    }
  }
}
