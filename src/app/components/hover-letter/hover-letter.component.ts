import { Component, OnDestroy } from '@angular/core';
import { ColorTransitionService } from './../../services/color-transition.service';
import gsap from 'gsap';

@Component({
  selector: 'app-hover-letter',
  templateUrl: './hover-letter.component.html',
  styleUrls: ['./hover-letter.component.scss'],
})
export class HoverLetterComponent implements OnDestroy {
  secondShadeColor!: string;

  constructor(private transService: ColorTransitionService) {}

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
      this.secondShadeColor = 'var(--esmerald)';
    } else {
      this.secondShadeColor = 'var(--rose)';
    }
  };

  activateTransition(which: string, color: string, event: MouseEvent) {
    this.transService.setProperties(color, event.clientX, event.clientY, 10, which);
  }
}
