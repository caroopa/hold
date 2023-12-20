import { Component } from '@angular/core';
import { CircleService } from 'src/app/services/circle.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { Color, opositeColor } from 'src/app/utils/color';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
})
export class CircleComponent {
  indexFilled = 0;
  filled = Color.Light;
  notFilled = Color.Dark;
  stayColor = true;

  constructor(
    private circleService: CircleService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.circleService.setTransition().subscribe((e) => {
      this.moveCircles(e.filled, e.m);
      this.smallCirclesAnimation(e.m);
    });
  }

  moveCircles(filled: Color, m: number) {
    this.filled = filled;
    this.notFilled = opositeColor(filled);
    this.stayColor = false;

    setTimeout(() => {
      this.indexFilled = m;
      this.stayColor = true;
    }, 700);

    setTimeout(() => {
      this.scrollService.notifyAnimationEnd('Cambiate');
    }, 850);
  }

  isCurrentIndex(index: number) {
    return index == this.indexFilled;
  }

  filledColor(index: number): string {
    if (this.isCurrentIndex(index) && this.stayColor) {
      return this.filled;
    } else {
      return this.notFilled;
    }
  }

  onClick(index: number) {
    this.circleService.setServiceSection(index);
  }

  circleIndices: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  calculateTransform(index: number): string {
    const angle = (index - 1) * (360 / this.circleIndices.length);
    const radius = 200;
    const translateX =
      Math.round(Math.cos(this.degreesToRadians(angle)) * radius) - 6;
    const translateY =
      Math.round(Math.sin(this.degreesToRadians(angle)) * radius) - 6;
    return `translate(-50%, -50%) translate(${translateX + radius}px, ${
      translateY + radius
    }px)`;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  smallCirclesAnimation(nextIndex: number) {
    const smallCircles =
      document.querySelectorAll<HTMLElement>('.small-circle');
    const smallCirclesArray = Array.from(smallCircles);

    const length = 4;
    let indexes: number[]
    let animatedCircles: HTMLElement[];

    if (nextIndex > this.indexFilled) {
      indexes = [11, 16, 1, 6];
      const beginning = indexes[nextIndex]; 
      animatedCircles = smallCirclesArray.slice(beginning, beginning + length);

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
    } else {
      indexes = [5, 0, 15, 10];
      const beginning = indexes[this.indexFilled];
      smallCirclesArray.reverse();
      animatedCircles = smallCirclesArray.slice(beginning, beginning + length);
      
      animatedCircles.forEach((element, i) => {
        anime({
          targets: element,
          opacity: 0,
          scale: 1,
          easing: 'easeInOutQuad',
          duration: 150,
          delay: 150 * i,
        });
      });
    }
  }
}
