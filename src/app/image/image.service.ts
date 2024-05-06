import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from './model/Image';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>('http://localhost:8080/public/image');
  }
}
