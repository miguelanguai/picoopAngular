import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Image } from '../model/Image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  dataSource = new MatTableDataSource<Image>();
  displayedColumns: string[] = ['imgTitle', 'img_type', 'img_description', 'img_uploadingDate', 'img_stage', 'image','name', 'id'];

  images: Image[];
  imageTest: string;

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getImagesForTable();
  }

  getImagesForTable(){
    this.imageService.getImages().subscribe(
      images => this.dataSource.data = images
    );
  }

  getImages(){
    this.imageTest=this.stringToImage();
  }

  stringToImage():string{
    return "hello";
  }
}