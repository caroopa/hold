import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { Color } from 'src/app/utils/color';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.changeLeftColor(Color.Dark);
    this.linksService.changeRightColor(Color.Light);
  }
}
