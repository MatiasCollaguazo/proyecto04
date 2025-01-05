import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { openDB } from 'idb';
import { Movie } from '../interfaces/movie';

// Nombre de la base de datos y la tienda de objetos
const DB_NAME = 'MoviesDB';
const STORE_NAME = 'movies';

@Injectable({
  providedIn: 'root', // Asegúrate de que 'providedIn: root' esté configurado para inyectarlo a nivel global
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  // Método para obtener la base de datos IndexedDB
  private async getDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      },
    });
  }

  // Método para obtener las películas desde la API o la base de datos si están cacheadas
  async fetchMovies(url: string, totalPages: number, language: string): Promise<Movie[]> {
    const db = await this.getDB();
    const key = `${url}_${language}`;
    const cachedMovies = await db.get(STORE_NAME, key);

    // Si hay datos cacheados, retornarlos
    if (cachedMovies) {
      return cachedMovies.data;
    }

    try {
      // Obtener las películas de la API, con múltiples páginas si es necesario
      const fetchPromises = Array.from({ length: totalPages }, (_, i) =>
        this.http.get<any>(`${url}&page=${i + 1}`).toPromise()
      );

      const results = await Promise.all(fetchPromises);
      const allMovies: Movie[] = [].concat(...results.map((result) => result.results));

      // Guardar los resultados en la base de datos IndexedDB
      await db.put(STORE_NAME, { key, data: allMovies });
      return allMovies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }
}
