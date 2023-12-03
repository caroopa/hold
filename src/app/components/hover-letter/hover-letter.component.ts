import { Component, Input } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hover-letter',
  templateUrl: './hover-letter.component.html',
  styleUrls: ['./hover-letter.component.scss'],
})
export class HoverLetterComponent {
  // @Input() text!: string;
  // @Input() color!: string;

  ngAfterViewInit() {
    this.hoverLetterAnimation();
  }

  hoverLetterAnimation() {
    // const container = document.getElementById('hover-container') as HTMLElement  ;

    document.body.addEventListener('mousemove', (evt) => {
      const mouseX = evt.clientX;
      const mouseY = evt.clientY;

      // gsap.set(".cursor", {
      //   x: mouseX,
      //   y: mouseY
      // })

      gsap.to('.shape', {
        x: mouseX,
        y: mouseY,
        stagger: -0.1,
      });
    });
  }
}
