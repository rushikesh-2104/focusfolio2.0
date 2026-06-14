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

  // Fullscreen Modal
  selectedPhoto: any = null;

  // Initial visible photos
  visibleCount = window.innerWidth < 768 ? 10 : 20;

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

    // Reset count on category change
    this.visibleCount = window.innerWidth < 768 ? 10 : 20;

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

  openPhoto(photo: any): void {
    this.selectedPhoto = photo;

    // Prevent background scroll when modal opens
    document.body.style.overflow = 'hidden';
  }

  closePhoto(): void {
    this.selectedPhoto = null;

    // Restore scrolling
    document.body.style.overflow = 'auto';
  }

}