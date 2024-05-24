import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Image } from '../model/Image';
import { ImageService } from '../image.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  images: Image[]=[];

  filter:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginatedImages: Image[] = [];
  pageSize = 15;
  currentPage = 0;

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.imageService.getImages().subscribe(
      images => {
        this.images = images;
        this.updatePaginatedImages();
      }
    );
  }

  getFilteredImages(filter:string){
    this.imageService.getImagesFiltered(filter).subscribe(
      images => {
        this.images = images;
      }
    );
  }

  updatePaginatedImages() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedImages = this.images.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedImages();
  }
}
