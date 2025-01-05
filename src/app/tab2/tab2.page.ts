import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2Page implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2.5,
    spaceBetween: 10,
    loop: true, 
  };

  popularMovies: any[] = [];
  bestVotedMovies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const language = environment.LANGUAGE;
    const API_KEY = environment.API_KEY;
    const BASE_URL = environment.BASE_URL;

    this.fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${language}`, (movies) => {
      this.popularMovies = movies;
    });

    this.fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${language}`, (movies) => {
      this.bestVotedMovies = movies;
    });
  }

  fetchMovies(url: string, callback: (movies: any[]) => void) {
    this.http.get<any>(url).subscribe((response) => {
      callback(response.results);
    });
  }
}
