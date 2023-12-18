import { Component } from '@angular/core';
import { LinksService } from './../../services/links.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent {
  followColor!: string;
  helloColor!: string;

  showFollow: boolean | null = null;
  showHello = false;

  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.followColor$.subscribe((color) => {
      this.followColor = color;
    });
    this.linksService.helloColor$.subscribe((color) => {
      this.helloColor = color;
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
