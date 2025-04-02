import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true, 
  imports:[FormsModule,RouterModule ],
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

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find((user: any) => user.email === this.email && user.password === this.password);

    if (!user) {
      alert('Invalid email or password');
      return;
    }

    const userData = {
      email: this.email,
      token: 'fake-jwt-token-' + Math.random().toString(36).substring(2)
    };

    console.log('Login successful', userData);
    localStorage.setItem('token', userData.token);

    if (this.email === 'admin@example.com' && this.password === 'Admin@12345') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/product']);
    }
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
