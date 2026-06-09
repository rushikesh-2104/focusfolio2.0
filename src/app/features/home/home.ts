import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
}
}
