import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.changeFollowColor('var(--primary-dark)');
    this.linksService.changeHelloColor('var(--primary-light)');
    this.linksService.changeMenuColor('var(--primary-light)');
  }
}
