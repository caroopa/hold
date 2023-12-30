import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { MenuService } from 'src/app/services/menu.service';
import { Color } from 'src/app/utils/color';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
})
export class VisionComponent {
  constructor(
    private linksService: LinksService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.linksService.changeLeftColor(Color.Light);
    this.linksService.changeRightColor(Color.Light);
    this.menuService.changeWallColor('#2974ED');
  }
}
