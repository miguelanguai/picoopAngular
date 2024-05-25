import { Component, OnInit } from '@angular/core';
import { Image } from '../model/Image';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { Petition } from 'src/app/petition/model/Petition';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  image: Image = new Image();
  currentDate: Date = new Date();
  petition: Petition;

  maxSize: number = 1043794; //file with 1020kb, tested to upload
  errorMessage: string = '';

  constructor(
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentPetition = localStorage.getItem('currentPetition');
    if (currentPetition) {
      this.petition = JSON.parse(currentPetition);
    }
  }

  onFileSelected(event: Event): void {
    //when selecting a file in the image-upload page
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.image.image = file;

      if (file.size > this.maxSize) {
        this.showError("El tamaño de la imagen es mayor al posible. Por favor, elija otra(max: 1mb)")
      }
    }
  }

  obtenerFormatoImagen(file: File): string {
    // Image Formats
    const formatosImagen: { [header: string]: string } = {
      "89504E47": "PNG",
      "47494638": "GIF",
      "FFD8": "JPEG",
      "25504446": "PDF",
      "49492A00": "TIFF",
      "424D": "BMP",
      "52494646": "WEBP",
      "3C737667": "SVG"
    };

    const reader = new FileReader();

    let imageType = "";

    reader.onloadend = function (): void {
      // First bytes of the file as a subchain in hexadecimal format
      const bytes = new Uint8Array(reader.result as ArrayBuffer);
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += bytes[i].toString(16);
      }

      for (const formato in formatosImagen) {
        const header = formato.toUpperCase();
        if (hex.startsWith(header)) {
          imageType = formatosImagen[formato]; // Return image type
          break;
        }
      }
    };

    // Read firsts bytes of the file as ArrayBuffer
    reader.readAsArrayBuffer(file.slice(0, 8));
    return imageType;
  }

  onSave() {
    const formData = new FormData();
    // new images are setted to uploaded
    this.image.img_stage = 'uploaded';
    formData.append('file', this.image.image);
    formData.append('petition_id', this.petition.petitionId.toString());
    formData.append('imgTitle', this.image.imgTitle);
    formData.append('img_description', this.image.img_description);
    formData.append('img_type', this.image.img_type);
    formData.append('img_stage', this.image.img_stage);
    formData.append('img_whyDenied', this.image.img_whyDenied);

    // Obtain image format
    this.image.img_type = this.obtenerFormatoImagen(this.image.image);

    const token = localStorage.getItem('token') || '';

    this.imageService.saveImage(formData, token).subscribe(
      result => {
        this.router.navigate(['/public/images']);
      },
      error => {
        this.showError("El tamaño de la imagen es mayor al posible. Por favor, elija otra(max: 1mb)");
      }
    );
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 6000)
  }

}
