import { Component } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent {
  showFollow = false;
  hideFollow = true;
  showHello = false;

  toggleFollowPopup() {
    this.showFollow = !this.showFollow;
    this.hideFollow = !this.hideFollow;
  }

  helloPopup() {
    this.showHello = true;
    setTimeout(() => {
      this.showHello = false;
    }, 1850);
  }
}
