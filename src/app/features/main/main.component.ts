import { Component, inject } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private main = inject(MainService);
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
}
