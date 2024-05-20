import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly authService: AuthService) { }

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  username:string;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    if(this.isAuthenticated){

      this.authService.getUserUsername()
      .then((response: string) => {
        this.username = response;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }

  logout(): void {
    this.authService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }
}
