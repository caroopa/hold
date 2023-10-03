import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  rootURL!: string;
  animationElement!: AnimationElement;

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.rootURL = this.getRootURL(event.url);
      }
    });
    this.rootURL = this.location.path();
  }

  private getRootURL(url: string): string {
    const parts = url.split('/');
    return parts[1];
  }

  elementByURL(
    leftCard: HTMLElement,
    rightCard: HTMLElement,
    icon: HTMLElement,
    leftContent: HTMLElement,
    rightContent: HTMLElement
  ): AnimationElement {
    // if (this.rootURL == "" || this.rootURL == "home") {
    return new Menu(leftCard, rightCard, icon, leftContent, rightContent);
    // }
  }

  toggleMenu() {
    const leftCard = document.getElementById('left-card') as HTMLElement;
    const rightCard = document.getElementById('right-card') as HTMLElement;
    const icon = document.getElementById('menu-btn-icon') as HTMLElement;
    const leftContent = document.getElementById(
      'left-card-content'
    ) as HTMLElement;
    const rightContent = document.getElementById(
      'right-card-content'
    ) as HTMLElement;

    this.animationElement = this.elementByURL(
      leftCard,
      rightCard,
      icon,
      leftContent,
      rightContent
    );
    this.animationElement.whichAnimationDo();
  }
}

abstract class AnimationElement {
  constructor(
    public leftCard: HTMLElement,
    public rightCard: HTMLElement,
    public icon: HTMLElement,
    public leftContent: HTMLElement,
    public rightContent: HTMLElement
  ) {}

  animationIn(): void {
    this.leftCard.classList.add('animateEnter');
    this.rightCard.classList.add('animateEnter');
    this.leftContent.classList.add('animateOpacity');
    this.rightContent.classList.add('animateOpacity');

    this.icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    this.leftCard.addEventListener('animationend', () => {
      if (this.leftCard.classList.contains('animateEnter')) {
        this.leftContent.style.opacity = '1';
      }
    });

    this.rightCard.addEventListener('animationend', () => {
      if (this.rightCard.classList.contains('animateEnter')) {
        this.rightContent.style.opacity = '1';
      }
    });
  }

  abstract animationOut(): void;

  whichAnimationDo(): void {
    if (
      !this.leftCard.classList.contains('animateEnter') &&
      !this.rightCard.classList.contains('animateEnter')
    ) {
      this.animationIn();
    } else {
      this.animationOut();
    }
  }
}

class Menu extends AnimationElement {
  constructor(
    leftCard: HTMLElement,
    rightCard: HTMLElement,
    icon: HTMLElement,
    leftContent: HTMLElement,
    rightContent: HTMLElement
  ) {
    super(leftCard, rightCard, icon, leftContent, rightContent);
  }

  animationOut(): void {
    this.icon.innerHTML = '<i class="fa-solid fa-bars"></i>';

    const leftMenuCard = document.createElement('div')
    leftMenuCard.classList.add("cardmenu-left")
    leftMenuCard.classList.add("animateEnter")
    this.leftCard.appendChild(leftMenuCard);

    const rightMenuCard = document.createElement('div');
    rightMenuCard.classList.add('cardmenu-right');
    rightMenuCard.classList.add("animateEnter")
    this.rightCard.appendChild(rightMenuCard);

    leftMenuCard.addEventListener('animationend', () => {
      if (leftMenuCard.classList.contains('animateEnter')) {
        this.leftCard.classList.remove('animateEnter');
        this.leftContent.classList.remove('animateOpacity');
        this.leftContent.style.opacity = "0";
        leftMenuCard.classList.add('animateOpacity')
        leftMenuCard.style.opacity = '0';
      }
    });

    rightMenuCard.addEventListener('animationend', () => {
      if (rightMenuCard.classList.contains('animateEnter')) {
        this.rightCard.classList.remove('animateEnter');
        this.rightContent.classList.remove('animateOpacity');
        this.rightContent.style.opacity = "0";
        rightMenuCard.classList.add('animateOpacity')
        rightMenuCard.style.opacity = '0';
      }
    });

    leftMenuCard.addEventListener('transitionend', () => {
      if (leftMenuCard.classList.contains('animateOpacity')) {
        this.leftCard.removeChild(leftMenuCard);
      }
    });

    rightMenuCard.addEventListener('transitionend', () => {
      if (rightMenuCard.classList.contains('animateOpacity')) {
        this.rightCard.removeChild(rightMenuCard);
      }
    });
  }
}
