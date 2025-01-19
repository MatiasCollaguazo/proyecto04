import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Movie } from '../interfaces/movie';
import { CommonModule } from '@angular/common';
import { fetchListMovies, URL_IMAGE_POSTER } from '../app.component';
@Component({
    selector: 'app-carouse-peliculas',
    templateUrl: 'carouse-peliculas.component.html',
    styleUrls: ['carouse-peliculas.component.scss'],
    standalone: true,
    imports: [CarouselModule, ButtonModule, TagModule,CommonModule],
})

export class CarousePeliculasComponent implements OnInit {
    @Input() url!: string;
    @Input() title: string | undefined;
   responsiveOptions: any[] | undefined;

    movies:Movie[]=[]
    constructor() {}
    

    
    URL_IMAGE_POSTER:string=""

    async ngOnInit() {

      this.movies = await fetchListMovies(this.url);
      console.log(this.title)
       this.responsiveOptions = [
            {
                breakpoint: '1200px',
                numVisible: 3,
                numScroll: 3
            }
        ]

        this.URL_IMAGE_POSTER=URL_IMAGE_POSTER
    }
}