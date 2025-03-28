import { Component } from '@angular/core';
import {  RouterOutlet ,Router  } from '@angular/router';


import { NavbarComponent } from "./shared/NavBar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { CommonModule } from '@angular/common';



export class AppModule {}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent ,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'StylePay';
  
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showHeaderFooter = !['/Login', '/Register'].includes(this.router.url);
      console.log('Current URL:', this.router.url);
    });
}
}