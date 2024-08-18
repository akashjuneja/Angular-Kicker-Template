import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  // private router = Inject(Router);
  constructor(private router: Router) {}
  login() {
    this.router.navigate(['login']);
  }
}
