import { Component, OnDestroy } from '@angular/core';
import { TransitionService } from 'src/app/services/transition.service';
import { ScrollService } from 'src/app/services/scroll.service';
import gsap from 'gsap';

@Component({
  selector: 'app-hover-letter',
  templateUrl: './hover-letter.component.html',
  styleUrls: ['./hover-letter.component.scss'],
})
export class HoverLetterComponent implements OnDestroy {
  shadeColor!: string;

  constructor(
    private transService: TransitionService,
    private scrollService: ScrollService
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
    // this.scrollService.notifyIsTransitioning();
  }
}
