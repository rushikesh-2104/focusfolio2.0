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
  displayedPhotos: any[] = [];

  categories: string[] = [];
  selectedCategory = 'All';

  visibleCount = window.innerWidth < 768 ? 10 : 9999;

  ngOnInit() {

    this.galleryService.getPhotos().subscribe(data => {

      this.photos = data;
      this.filteredPhotos = data;
      this.displayedPhotos = data.slice(0, this.visibleCount);

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

    if (category === 'All') {
      this.filteredPhotos = this.photos;
    } else {
      this.filteredPhotos = this.photos.filter(
        photo => photo.category === category
      );
    }

    this.displayedPhotos = this.filteredPhotos.slice(
      0,
      this.visibleCount
    );

  }

  loadMore() {

    this.visibleCount += 10;

    this.displayedPhotos = this.filteredPhotos.slice(
      0,
      this.visibleCount
    );

  }

}