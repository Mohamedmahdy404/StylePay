import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true, 
  imports:[FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {} 

  loginUser() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Please enter email and password');
      return;
    }
    
    const userData = {
      email: this.email,
      token: 'fake-jwt-token-' + Math.random().toString(36).substring(2)
    };
    
    console.log('Login successful', userData);

  
    localStorage.setItem('token', userData.token);

    this.router.navigate(['/product']);
  }
}
