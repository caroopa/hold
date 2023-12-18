import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-servicios-desc',
  templateUrl: './servicios-desc.component.html',
  styleUrls: ['./servicios-desc.component.scss'],
})
export class ServiciosDescComponent {
  colors = ['#FFD44C', '#EC644E', '#E5B7D6', '#00A698'];

  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.changeFollowColor('var(--primary-light)');
    this.linksService.changeHelloColor('var(--primary-dark)');
    this.linksService.changeMenuColor('var(--primary-dark)');
  }

  changeLeftLink(color: string) {
    this.linksService.changeFollowColor(color);
  }
}
