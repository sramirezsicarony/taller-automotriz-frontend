import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Controla si se muestra la tarjeta de definición del proyecto
  selectedSection: 'none' | 'definition' = 'none';

  constructor(private router: Router) {}

  goToCrud(): void {
    this.router.navigate(['/crud']);
  }

  goToConsultas(): void {
    this.router.navigate(['/consultas']);
  }

  showDefinition(): void {
    this.selectedSection = 'definition';
  }
}
