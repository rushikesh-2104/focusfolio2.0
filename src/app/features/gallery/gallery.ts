import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  standalone:true,
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
photos = [
    { id: 1, url: 'photos/photo1.jpg', title: 'Photo 1' },
    { id: 2, url: 'photos/photo2.jpg', title: 'Photo 2' },
    { id: 3, url: 'photos/photo3.jpg', title: 'Photo 3' },
    { id: 4, url: 'photos/photo4.jpg', title: 'Photo 4' },
    { id: 5, url: 'photos/photo5.jpg', title: 'Photo 5' },
    { id: 6, url: 'photos/photo6.jpg', title: 'Photo 6' },
  ];
}
