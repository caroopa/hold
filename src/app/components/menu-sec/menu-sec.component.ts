import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-sec',
  templateUrl: './menu-sec.component.html',
  styleUrls: ['./menu-sec.component.scss'],
})
export class MenuSecComponent {
  toggleMenu() {
    const leftCard = document.getElementById('left-card') as HTMLElement;
    const rightCard = document.getElementById('right-card') as HTMLElement;
    const icon = document.getElementById('menu-btn-icon') as HTMLElement;

    if (
      !leftCard.classList.contains('animateLeftEnter') &&
      !rightCard.classList.contains('animateRightEnter')
    ) {
      leftCard.classList.add('animateLeftEnter');
      rightCard.classList.add('animateRightEnter');
      leftCard.classList.remove('animateLeftOut');
      rightCard.classList.remove('animateRightOut');
      icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
      leftCard.classList.remove('animateLeftEnter');
      rightCard.classList.remove('animateRightEnter');
      leftCard.classList.add('animateLeftOut');
      rightCard.classList.add('animateRightOut');
      icon.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  }
}