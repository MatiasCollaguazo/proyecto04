import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class MovieLogosService {
  private readonly DB_NAME = 'MoviesDBLogos';
  private readonly STORE_NAME = 'movie-logos';

  constructor(private http: HttpClient) {}

  private async getDB() {
    return openDB(this.DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('movie-logos')) {
          db.createObjectStore('movie-logos', { keyPath: 'key' });
        }
      },
    });
  }

  async getMovieLogo(movieId: number, language: string): Promise<string | null> {
    if (movieId <= 0) return null;

    const db = await this.getDB();
    const key = `${movieId}_${language}`;
    const cachedLogo = await db.get(this.STORE_NAME, key);

    if (cachedLogo) {
      return cachedLogo.path;
    }

    try {
      const url = `${environment.BASE_URL}/movie/${movieId}/images?api_key=${environment.API_KEY}`;
      const response: any = await this.http.get(url).toPromise();

      const logo =
        response.logos.find((l: { iso_639_1: string }) => l.iso_639_1 === language) ||
        response.logos.find((l: { iso_639_1: string }) => l.iso_639_1 === 'en') ||
        response.logos[0];

      if (logo?.file_path) {
        await db.put(this.STORE_NAME, { key, path: logo.file_path });
        return logo.file_path;
      }

      return null;
    } catch (error) {
      console.error('Error fetching movie logo:', error);
      return null;
    }
  }
}
