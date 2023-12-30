import { Component } from '@angular/core';
import { LinksService } from './../../services/links.service';
import { Color } from 'src/app/utils/color';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent {
  leftColor!: Color;
  rightColor!: Color;

  showFollow: boolean | null = null;
  showHello = false;

  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.leftColor$.subscribe((color) => {
      this.leftColor = color;
    });
    this.linksService.rightColor$.subscribe((color) => {
      this.rightColor = color;
    });
  }

  toggleFollowPopup() {
    this.showFollow = !this.showFollow;
  }

  helloPopup() {
    this.showHello = true;
    setTimeout(() => {
      this.showHello = false;
    }, 1850);
  }
}
