import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { openDB } from 'idb';
import { Movie } from '../interfaces/Movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly DB_NAME = 'MoviesDB';
  private readonly STORE_NAME = 'movies';

  constructor(private http: HttpClient) {}

  private async getDB() {
    return openDB(this.DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'key' });
        }
      },
    });
  }

  async fetchMovies(url: string, totalPages: number, language: string): Promise<Movie[]> {
    const db = await this.getDB();
    const key = `${url}_${language}`;
    const cachedMovies = await db.get(this.STORE_NAME, key);

    if (cachedMovies) {
      return cachedMovies.data;
    }

    try {
      const fetchPromises = Array.from({ length: totalPages }, (_, i) =>
        this.http.get<any>(`${url}&page=${i + 1}`).toPromise()
      );

      const results = await Promise.all(fetchPromises);
      const allMovies: Movie[] = results.flatMap((result) => result.results);

      await db.put(this.STORE_NAME, { key, data: allMovies });
      return allMovies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }
}
