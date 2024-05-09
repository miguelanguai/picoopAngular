import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from './model/Image';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

  saveImage(image:FormData, token: String): Observable<Image>{
    let url = 'http://localhost:8080/user/image';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Image>(url, image, { headers });
  }
}
