import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { Color } from 'src/app/utils/color';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
})
export class VisionComponent {
  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.changeLeftColor(Color.Light);
    this.linksService.changeRightColor(Color.Light);
  }
}
