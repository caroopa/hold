import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  toggleMenu() {
    const leftCard = document.getElementById('left-card') as HTMLElement;
    const rightCard = document.getElementById('right-card') as HTMLElement;
    const icon = document.getElementById('menu-btn-icon') as HTMLElement;
    const leftContent = document.getElementById('left-card-content') as HTMLElement;
    const rightContent = document.getElementById('right-card-content') as HTMLElement;

    if (
      !leftCard.classList.contains('animateEnter') &&
      !rightCard.classList.contains('animateEnter')
    ) {
      leftCard.classList.add('animateEnter');
      rightCard.classList.add('animateEnter');
      leftCard.classList.add('animateOpacity');
      rightCard.classList.add('animateOpacity');
      leftCard.classList.remove('animateOut');
      rightCard.classList.remove('animateOut');
      icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
      leftCard.classList.remove('animateEnter');
      rightCard.classList.remove('animateEnter');
      leftCard.style.right = "0";
      rightCard.style.left = "0";
      leftCard.classList.remove('animateOpacity');
      rightCard.classList.remove('animateOpacity');
      leftContent.style.opacity = "0";
      rightContent.style.opacity = "0";
      leftCard.classList.add('animateOut');
      rightCard.classList.add('animateOut');
      icon.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    leftCard.addEventListener("animationend", function() {
      if (leftCard.classList.contains('animateEnter')) {
        leftContent.style.opacity = "1";
      }
    })

    rightCard.addEventListener("animationend", function() {
      if (rightCard.classList.contains('animateEnter')) {
        rightContent.style.opacity = "1";
      }
    })
  }
}

interface AnimationOutElement {
  animationOut(): void;
}

class Menu implements AnimationOutElement {
  animationOut(): void {
    // TODO
  }
}
