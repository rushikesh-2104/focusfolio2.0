import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private http = inject(HttpClient);

  getPhotos() {
    return this.http.get<any[]>(
      'https://ff-backend-plum.vercel.app/photos'
    );
  }
}