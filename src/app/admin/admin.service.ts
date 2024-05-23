import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebData } from './model/WebData';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = 'http://localhost:8080'

  constructor(
    private http: HttpClient
  ) { }
  getWebData(): Observable<WebData>{
    let url = this.url + "/admin/data";
    const token = localStorage.getItem('token')||'';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<WebData>(url, {headers});
  }
}
