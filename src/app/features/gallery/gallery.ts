import {
  Component,
  OnInit,
  inject,
  HostListener
} from '@angular/core';
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
  currentPhotoIndex = 0;

  // Bookmarks
  bookmarks: number[] = [];

  // Initial visible photos
  visibleCount = window.innerWidth < 768 ? 10 : 20;

  ngOnInit(): void {

    const savedBookmarks = localStorage.getItem('bookmarks');

    if (savedBookmarks) {
      this.bookmarks = JSON.parse(savedBookmarks);
    }

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
        'Bookmarks',
        ...uniqueCategories
      ];

    });

  }

  filterCategory(category: string): void {

    this.selectedCategory = category;

    if (category === 'All') {

      this.filteredPhotos = this.photos;

    }
    else if (category === 'Bookmarks') {

      this.filteredPhotos = this.photos.filter(
        photo => this.bookmarks.includes(photo.id)
      );

    }
    else {

      this.filteredPhotos = this.photos.filter(
        photo => photo.category === category
      );

    }

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

    this.currentPhotoIndex = this.filteredPhotos.findIndex(
      p => p.id === photo.id
    );

    document.body.style.overflow = 'hidden';

  }

  closePhoto(): void {

    this.selectedPhoto = null;

    document.body.style.overflow = 'auto';

  }

  nextPhoto(): void {

    if (!this.filteredPhotos.length) return;

    this.currentPhotoIndex =
      (this.currentPhotoIndex + 1) %
      this.filteredPhotos.length;

    this.selectedPhoto =
      this.filteredPhotos[this.currentPhotoIndex];

  }

  prevPhoto(): void {

    if (!this.filteredPhotos.length) return;

    this.currentPhotoIndex =
      (this.currentPhotoIndex - 1 + this.filteredPhotos.length)
      % this.filteredPhotos.length;

    this.selectedPhoto =
      this.filteredPhotos[this.currentPhotoIndex];

  }

  toggleBookmark(photoId: number): void {

    const exists = this.bookmarks.includes(photoId);

    if (exists) {

      this.bookmarks = this.bookmarks.filter(
        id => id !== photoId
      );

    } else {

      this.bookmarks.push(photoId);

    }

    localStorage.setItem(
      'bookmarks',
      JSON.stringify(this.bookmarks)
    );

    // Refresh Bookmarks category if active
    if (this.selectedCategory === 'Bookmarks') {

      this.filteredPhotos = this.photos.filter(
        photo => this.bookmarks.includes(photo.id)
      );

      this.displayedPhotos = this.filteredPhotos.slice(
        0,
        this.visibleCount
      );

    }

  }

  isBookmarked(photoId: number): boolean {

    return this.bookmarks.includes(photoId);

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {

    if (!this.selectedPhoto) return;

    if (event.key === 'ArrowRight') {
      this.nextPhoto();
    }

    if (event.key === 'ArrowLeft') {
      this.prevPhoto();
    }

    if (event.key === 'Escape') {
      this.closePhoto();
    }

  }

}