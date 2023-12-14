import { Component } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent {
  showFollow: boolean | null = null;
  showHello = false;

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
