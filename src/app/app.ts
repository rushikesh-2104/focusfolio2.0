import { Component, signal } from '@angular/core';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { Gallery } from './features/gallery/gallery';
import { Home } from "./features/home/home";
import { About } from './features/about/about';


@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Gallery, Home,About],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('focusfolio');
}
