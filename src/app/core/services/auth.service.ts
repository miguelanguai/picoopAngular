import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) { }

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  async login(email: string, password: string): Promise<any> {
    try {
      const response = this.http.post<any>(environment.url+"/auth/signin", { email, password }).toPromise()
      this.setAuthenticated(true);
      return response;

    } catch (error) {
      throw error;
    }
  }

  async register(userData: any): Promise<any> {
    try {
      const response = this.http.post<any>(environment.url+"/auth/signup", userData).toPromise()
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(token: string): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try {
      const response = this.http.get<any>(environment.url+"/admin/get-all-users", { headers }).toPromise()
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getYourProfile(token:string):Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(environment.url+"/adminuser/get-profile", {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getUsersById(userId: string, token:string):Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(environment.url+"/admin/get-users/${userId}", {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async deleteUser(userId: string, token:string):Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.delete<any>(environment.url+"/admin/delete/${userId}", {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateUSer(userId: string, userData: any, token:string):Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.put<any>(environment.url+"/admin/update/${userId}", userData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  /***AUTHENTICATION METHODS */
  logOut():void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      this.setAuthenticated(true);

    }
  }

  isAuthenticated(): boolean {
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;

  }

  isAdmin(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'ADMIN'
    }
    return false;

  }

  isUser(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'USER'
    }
    return false;

  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  //UTILS
  async getUserUsername(): Promise<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get(`${environment.url}/auth/username`, { headers, responseType: 'text' }).toPromise();
      if (response === undefined || response === null) {
        throw new Error('No username received');
      }
      return response;
    } catch (error) {
      console.error('Error fetching username:', error);
      throw error;
    }
  }

  async getRole(): Promise<string> {
    try {
      const email = await this.getUserUsername();
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${environment.url}/auth/adminuser/getrole/${email}`, { headers, responseType: 'text' }).toPromise();
      if (response === undefined || response === null) {
        throw new Error('No role received');
      }
      return response;
    } catch (error) {
      console.error('Error fetching role:', error);
      throw error;
    }
  }


}
