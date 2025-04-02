import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  
  
  constructor(private router: Router) {} 
  
  signUpUser() {
    if (this.firstName && this.lastName && this.email && this.password) {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const isEmailTaken = existingUsers.some((user: any) => user.email === this.email);

      if (isEmailTaken) {
        alert('Email is already registered');
        return;
      }

      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Registration successful');
      this.router.navigate(['/Login']);
    } else {
      alert('Form is Required');
    }
  }
}
