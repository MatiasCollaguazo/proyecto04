import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { fetchURLs } from '../app.component';
import { fetchListMovies } from '../app.component';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie';
import { BannerComponent } from '../banner/banner.component';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule,BannerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2Page implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2.5,
    spaceBetween: 10,
    loop: true, 
  };

  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  randomIndex:number=0
  movieRandom:any=null
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.popularMovies=await fetchListMovies(fetchURLs[0].popularMovies)
    this.topRatedMovies=await fetchListMovies(fetchURLs[0].topRatedMovies)
    this.randomIndex = Math.floor(Math.random() * this.popularMovies.length);
    this.movieRandom = this.popularMovies[this.randomIndex]
  }

  fetchMovies(url: string, callback: (movies: any[]) => void) {
    this.http.get<any>(url).subscribe((response) => {
      callback(response.results);
    });
  }
}
