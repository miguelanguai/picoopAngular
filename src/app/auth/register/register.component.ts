import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData: any = {
    name: '',
    email: '',
    password: '',
    role: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.role) {
      this.showError('Please fill in all fields.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Are you sure you want to register this user?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const response = await this.authService.register(this.formData);
      if (response.statusCode === 200) {
        this.router.navigate(['/auth/signin']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
