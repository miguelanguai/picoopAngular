import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from './model/Image';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url = 'http://localhost:8080'

  constructor(
    private http: HttpClient
  ) { }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.url+"/public/image");
  }

  getImagesFiltered(filter:string):Observable<Image[]> {
    const params = new HttpParams().set('text', filter);
    return this.http.get<Image[]>(`${this.url}/public/image/filtered`, { params });

  }

  saveImage(image:FormData, token: String): Observable<Image>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Image>(this.url+"/user/image", image, { headers });
  }
}
