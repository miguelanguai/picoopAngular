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
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.image.image = inputElement.files[0];
    }
  }

  // Modifica obtenerFormatoImagen para que devuelva el tipo de imagen en lugar de asignarlo directamente
obtenerFormatoImagen(file: File): string {
  // Estos son los formatos de imagen
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
    // Primeros bytes del archivo como una subcadena en formato hexadecimal
    const bytes = new Uint8Array(reader.result as ArrayBuffer);
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16);
    }

    for (const formato in formatosImagen) {
      const header = formato.toUpperCase();
      if (hex.startsWith(header)) {
        imageType= formatosImagen[formato]; // Devolvemos el tipo de imagen
        break;
      }
    }
  };

  // Leemos los primeros bytes del archivo como un ArrayBuffer
  reader.readAsArrayBuffer(file.slice(0, 8));
  return imageType;
}

// Modifica onSave para llamar a obtenerFormatoImagen y establecer image.img_type antes de enviar el formulario
onSave() {
  const formData = new FormData();
  // imagenes nuevas son seteadas a uploaded
  this.image.img_stage='uploaded';
  formData.append('file', this.image.image);
  formData.append('petition_id', this.petition.petitionId.toString());
  formData.append('imgTitle', this.image.imgTitle);
  formData.append('img_description', this.image.img_description);
  formData.append('img_type', this.image.img_type);
  //formData.append('img_uploadingDate',this.currentDate.toISOString());
  formData.append('img_stage', this.image.img_stage);
  formData.append('img_whyDenied', this.image.img_whyDenied);

  // Llamamos a obtenerFormatoImagen para obtener el tipo de imagen
  this.image.img_type = this.obtenerFormatoImagen(this.image.image);

  const token = localStorage.getItem('token') || '';

  this.imageService.saveImage(formData, token).subscribe(
    result => {
      // Manejar la respuesta como sea necesario, por ejemplo, redirigir a otra página
      this.router.navigate(['/public/images']);
    },
    error => {
      console.error('Error uploading image:', error);
      // Manejar el error apropiadamente
    }
  );
}

}
