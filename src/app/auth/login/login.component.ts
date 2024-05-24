import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) { }


  email: string = ''
  password: string = ''
  errorMessage: string = ''

  async handleSubmit() {

    if (!this.email || !this.password) {
      this.showError("Email and Password is required");
      return
    }

    try {
      const response = await this.authService.login(this.email, this.password);
      if (response.statusCode == 200) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('role', response.role)
        this.router.navigate(['/public/images'])

        //el setItem role del response.role no funciona, se añade con el metodo getRole creado
        let role = await this.authService.getRole();
        localStorage.setItem('role', role);

      } else {
        this.showError("Email or Password is not correct")
      }
    } catch (error: any) {
      this.showError(error.message)
    }

  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
