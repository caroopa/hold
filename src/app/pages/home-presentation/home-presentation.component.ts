import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-presentation',
  templateUrl: './home-presentation.component.html',
  styleUrls: ['./home-presentation.component.scss']
})
export class HomePresentationComponent {
  constructor(private router: Router) { }

  goToMenuSec() {
    this.router.navigate(['/menu-sec']);
  }
}
