import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent implements OnInit, OnDestroy {
  countdown: number = 3;
  private countdownInterval: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.navigateToLogin();
      }
    }, 1000);
  }

  navigateToLogin() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
