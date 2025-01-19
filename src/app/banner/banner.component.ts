import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { fetchMovieDetails, URL_IMAGE_BANNER,URL_IMAGE_lOGO } from '../app.component';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { language } from '../app.component';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone:true,
  imports:[CommonModule,NavBarComponent]
})
export class BannerComponent  implements OnInit {
  @Input() movie!: Movie;
  @Input() logoBuscar!:boolean

  openModal: boolean = false;
  constructor() { 

  }
  URL_IMAGE_BANNER:string=""
  URL_IMAGE_LOGO:string=""
  movieDetails:any = null
  logoPath:any=""
  async ngOnInit() {
    this.URL_IMAGE_BANNER=URL_IMAGE_BANNER
    this.URL_IMAGE_LOGO=URL_IMAGE_lOGO
    if (this.movie) {
      this.URL_IMAGE_BANNER = URL_IMAGE_BANNER;
      this.URL_IMAGE_LOGO = URL_IMAGE_lOGO;
      this.movieDetails = await fetchMovieDetails(this.movie.id);
      this.logoPath =
          this.movieDetails.images.logos.find((l: { iso_639_1: string }) => l.iso_639_1 === language) ||
          this.movieDetails.images.logos.find((l: { iso_639_1: string }) => l.iso_639_1 === "en") ||
          this.movieDetails.images.logos[0];
    } else {
      console.error('Movie not available');
    }
    console.log(this.movieDetails)
  }

  getSlicedOverview(): string {
    if (!this.movie?.overview) {
      return '';
    }
    return this.movie.overview.slice(0, this.movie.overview.indexOf(".") + 1);
  }
}
