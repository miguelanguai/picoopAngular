import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from './model/Image';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(environment.server+"/public/image");
  }

  saveImage(image:FormData, token: String): Observable<Image>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Image>(environment.server+"/user/image", image, { headers });
  }
}
