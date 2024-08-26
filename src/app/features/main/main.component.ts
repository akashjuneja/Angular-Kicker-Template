import { Component, inject } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private main = inject(MainService);
  private router = inject(Router);
  getProducts() {
    this.main.getProductsPage().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
  navigateTo() {
    this.router.navigate(['/home/concepts']);
  }
}
