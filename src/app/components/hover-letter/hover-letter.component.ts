import { Component, Input } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hover-letter',
  templateUrl: './hover-letter.component.html',
  styleUrls: ['./hover-letter.component.scss'],
})
export class HoverLetterComponent {
  secondShadeColor!: string

  ngAfterViewInit() {
    this.hoverLetterAnimation();
  }

  hoverLetterAnimation() {
    document.body.addEventListener('mousemove', (evt) => {
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
    });
  }
}
