import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-definicion-p',
  standalone: false,
  templateUrl: './definicion-p.html',
  styleUrls: ['./definicion-p.scss']
})
export class DefinicionProyecto {

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
