import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Petition } from './model/Petition';
import { PETITION_DATA } from './model/mock-petitions';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  constructor(
    private http: HttpClient
  ) { }

  getPetitions(): Observable<Petition[]> {
    return this.http.get<Petition[]>('http://localhost:8080/public/petitions');
  }

  savePetition(petition: Petition, token: string): Observable<Petition> {
    let url = 'http://localhost:8080/user/petitions';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (petition.petitionId != null) {
      url += `/${petition.petitionId}`;
    }

    return this.http.put<Petition>(url, petition, { headers });
  }


  deletePetition(petition : number): Observable<any> {
    return of(null);
  }
}
