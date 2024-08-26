import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-concept-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './concept-list.component.html',
  styleUrl: './concept-list.component.scss',
})
export class ConceptListComponent {
  private router = inject(Router);
  navigateTo() {
    this.router.navigate(['/home/concepts/template-ref']);
  }
}
