import { Component } from '@angular/core';
import { CircleService } from 'src/app/services/circle.service';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
})
export class CircleComponent {
  indexFilled = 0;
  otherColor = 'var(--primary-dark)';
  linkColor = 'var(--primary-light)';

  constructor(private circleService: CircleService) {}

  ngOnInit() {
    this.circleService.setTransition().subscribe((e) => {
      this.moveCircles(e.color, e.linkColor, e.index);
    });
  }

  ngAfterViewInit() {
    // Llama a smallCirclesAnimation después de que la vista se haya inicializado
    this.smallCirclesAnimation(0);
  }

  moveCircles(color: string, linkColor: string, index: number) {
    this.indexFilled = index;
    this.linkColor = linkColor;
    this.otherColor = color;
  }

  filled(index: number): string {
    if (index == this.indexFilled) {
      return this.linkColor;
    } else {
      return this.otherColor;
    }
  }

  isCurrentIndex(index: number) {
    return index == this.indexFilled;
  }

  onClick(index: number) {
    this.circleService.setServiceSection(index);
  }

  circleIndices: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  calculateTransform(index: number): string {
    const angle = (index - 1) * (360 / this.circleIndices.length);
    const radius = 200;
    const translateX =
      Math.round(Math.cos(this.degreesToRadians(angle)) * radius) - 3;
    const translateY =
      Math.round(Math.sin(this.degreesToRadians(angle)) * radius) - 3;
    return `translate(-50%, -50%) translate(${translateX + radius}px, ${
      translateY + radius
    }px)`;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  smallCirclesAnimation(index: number) {
    const smallCircles =
      document.querySelectorAll<HTMLElement>('.small-circle');
    const smallCirclesArray = Array.from(smallCircles);

    const length = 4;
    const beginnings = [0, 5, 10, 15];
    const beginning = beginnings[index];    
    const animatedCircles = smallCirclesArray.slice(
      beginning,
      beginning + length
    );

    animatedCircles.forEach((element, i) => {
      anime({
        targets: element,
        opacity: 1,
        scale: 2.5,
        easing: 'easeInOutQuad',
        duration: 150,
        delay: 150 * i,
      });
    });
  }
}
