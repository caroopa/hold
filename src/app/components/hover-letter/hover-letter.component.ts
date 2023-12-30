import { Component, OnDestroy } from '@angular/core';
import { ColorTransitionService } from 'src/app/services/color-transition.service';
import { MenuService } from 'src/app/services/menu.service';
import gsap from 'gsap';

@Component({
  selector: 'app-hover-letter',
  templateUrl: './hover-letter.component.html',
  styleUrls: ['./hover-letter.component.scss'],
})
export class HoverLetterComponent implements OnDestroy {
  shadeColor!: string;

  constructor(
    private transService: ColorTransitionService,
    private menuService: MenuService
  ) {}

  ngAfterViewInit() {
    this.hoverLetterAnimation();
  }

  ngOnDestroy() {
    document.body.removeEventListener('mousemove', this.handleMouseMove);
  }

  hoverLetterAnimation() {
    document.body.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = (evt: MouseEvent) => {
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;

    gsap.to('.shape', {
      x: mouseX,
      y: mouseY,
      stagger: -0.07,
    });

    var windowWidth = window.innerWidth;
    if (mouseX > windowWidth / 2) {
      this.shadeColor = 'var(--yellow)';
    } else {
      this.shadeColor = 'var(--blue)';
    }
  };

  changePage(
    which: string,
    color: string,
    particles: string,
    event: MouseEvent
  ) {
    this.transService.setProperties(
      color,
      particles,
      event.clientX,
      event.clientY,
      which
    );
  }
}
