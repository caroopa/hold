import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { Color } from 'src/app/utils/color';

@Component({
  selector: 'app-servicios-desc',
  templateUrl: './servicios-desc.component.html',
  styleUrls: ['./servicios-desc.component.scss'],
})
export class ServiciosDescComponent {
  colors = ['#FFD44C', '#FF6348', '#FFB5F9', '#00A698'];
  colorDark = Color.Dark;
  colorLight = Color.Light;

  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.changeLeftColor(Color.Light);
    this.linksService.changeRightColor(Color.Dark);
  }

  changeLeftLink(color: Color) {
    this.linksService.changeLeftColor(color);
  }

  changeRightLink(color: Color) {
    this.linksService.changeRightColor(color);
  }
}
