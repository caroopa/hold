import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
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
