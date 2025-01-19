import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss'],
  standalone: true,
  imports: [CommonModule], 
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() logoBuscar!: boolean;
  scrolled: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.scrolled = window.scrollY > 0;
  };

  handleSearchClick() {
    this.router.navigate(['/buscar']);
  }
}
