import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Petition } from './model/Petition';
import { PETITION_DATA } from './model/mock-petitions';
import { HttpClient } from '@angular/common/http';

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

  savePetition(petition: Petition): Observable<Petition> {
    let url = 'http://localhost:8080/user/petitions';
        if (petition.petitionId != null) url += '/'+petition.petitionId;

        return this.http.put<Petition>(url, petition);

  }

  deletePetition(petition : number): Observable<any> {
    return of(null);
  }
}
