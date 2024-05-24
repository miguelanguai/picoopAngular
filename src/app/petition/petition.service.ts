import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Petition } from './model/Petition';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  url = 'http://localhost:8080'

  constructor(
    private http: HttpClient
  ) { }

  getPetitions(): Observable<Petition[]> {
    return this.http.get<Petition[]>(this.url + "/public/petitions");
  }

  savePetition(petition: Petition, token: string): Observable<Petition> {
    let url = this.url + "/user/petitions";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (petition.petitionId != null) {
      url += `/${petition.petitionId}`;
    }

    return this.http.put<Petition>(url, petition, { headers });
  }


  deletePetition(petition: number): Observable<any> {
    return of(null);
  }

  hasImages(petitionId: number): Observable<boolean> {
    return this.http.get<boolean>(this.url + "/public/petitions/hasimages/"+petitionId);
  }
}
