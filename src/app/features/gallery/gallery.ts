import { Component, inject, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements OnInit {

  private galleryService = inject(GalleryService);

  photos: any[] = [];
  filteredPhotos: any[] = [];

  categories: string[] = [];
  selectedCategory = 'All';

  ngOnInit() {

    this.galleryService.getPhotos().subscribe(data => {

      this.photos = data;
      this.filteredPhotos = data;

      const uniqueCategories = [
        ...new Set(
          data.map(photo => photo.category)
        )
      ];

      this.categories = [
        'All',
        ...uniqueCategories
      ];

    });

  }

  filterCategory(category: string) {

    this.selectedCategory = category;

    if(category === 'All'){
      this.filteredPhotos = this.photos;
      return;
    }

    this.filteredPhotos = this.photos.filter(
      photo => photo.category === category
    );

  }

}