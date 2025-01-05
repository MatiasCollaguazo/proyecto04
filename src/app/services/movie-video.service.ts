import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Trailer } from '../interfaces/trailer';

const DB_NAME = 'MoviesDB-trailers';
const STORE_NAME = 'movie-trailers';

@Injectable({
  providedIn: 'root',
})
export class MovieVideoService {
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

  async fetchTrailer(movieId: number, language: string): Promise<Trailer | null> {
    if (!movieId) return null;

    const db = await this.getDB();
    const key = `${movieId}_${language}`;
    const cachedTrailer = await db.get(STORE_NAME, key);

    if (cachedTrailer) {
      return cachedTrailer.data;
    }

    try {
      const url = `${environment.BASE_URL}/movie/${movieId}`;
      const params = {
        api_key: environment.API_KEY,
        append_to_response: 'videos',
        language,
      };

      const data = await this.http.get<any>(url, { params }).toPromise();

      if (data.videos?.results) {
        const foundTrailer =
          data.videos.results.find((vid: any) => vid.name === 'Official Trailer') ||
          data.videos.results[0];

        if (foundTrailer) {
          await db.put(STORE_NAME, { key, data: foundTrailer });
          return foundTrailer;
        }
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }

    return null;
  }
}
