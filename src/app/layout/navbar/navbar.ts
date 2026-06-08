import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone:true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
isMenuOpen = false;
toggleMenu(){
  this.isMenuOpen = !this.isMenuOpen;
}
closeMenu() {
  this.isMenuOpen = false;
}

scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
}

}
