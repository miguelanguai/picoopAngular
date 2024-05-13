import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Petition } from './model/Petition';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  constructor(
    private http: HttpClient
  ) { }

  getPetitions(): Observable<Petition[]> {
    return this.http.get<Petition[]>(environment.server+"/public/petitions");
  }

  savePetition(petition: Petition, token: string): Observable<Petition> {
    let url = environment.server+"/user/petitions";
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
