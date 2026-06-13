import { Component, OnInit, inject } from '@angular/core';
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

  // Initial photos
  visibleCount = 10;

  ngOnInit(): void {

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

  filterCategory(category: string): void {

    this.selectedCategory = category;

    if (category === 'All') {
      this.filteredPhotos = this.photos;
    } else {
      this.filteredPhotos = this.photos.filter(
        photo => photo.category === category
      );
    }

    // Reset to first 10 photos
    this.visibleCount = 10;

    this.displayedPhotos = this.filteredPhotos.slice(
      0,
      this.visibleCount
    );

  }

  loadMore(): void {

    this.visibleCount += 10;

    this.displayedPhotos = this.filteredPhotos.slice(
      0,
      this.visibleCount
    );

  }

}