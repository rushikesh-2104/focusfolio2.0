import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  @ViewChild('heroVideo')
  heroVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.heroVideo.nativeElement;

    video.muted = true;

    video.play().catch((error) => {
      console.log('Autoplay failed:', error);
    });
  }

  scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}