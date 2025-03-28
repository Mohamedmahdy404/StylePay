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
    console.log(this.firstName && this.lastName && this.email && this.password);
    if (this.firstName && this.lastName && this.email && this.password) {
     
      this.router.navigate(['/Login']);
    } else {
      alert('Form is Required');
    }
  }
}
