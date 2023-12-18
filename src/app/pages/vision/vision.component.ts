import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
})
export class VisionComponent {
  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.changeFollowColor('var(--primary-light)');
    this.linksService.changeHelloColor('var(--primary-light)');
    this.linksService.changeMenuColor('var(--primary-light)');
  }
}
