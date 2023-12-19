import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-servicios-desc',
  templateUrl: './servicios-desc.component.html',
  styleUrls: ['./servicios-desc.component.scss'],
})
export class ServiciosDescComponent {
  colors = ['#FFD44C', '#FF6348', '#FFB5F9', '#00A698'];

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
