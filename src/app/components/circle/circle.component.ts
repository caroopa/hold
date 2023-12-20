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
      this.moveCircles(e.filled, e.m, this.smallCirclesAnimation(e.m));
    });
  }

  // LOGIC

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
    const angle = -90 - (index - 1) * (360 / this.circleIndices.length);
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

  // ANIMATIONS

  smallCirclesAnimation(nextIndex: number) {
    const smallCircles =
      document.querySelectorAll<HTMLElement>('.small-circle');
    const smallCirclesArray = Array.from(smallCircles);

    const length = 4 * Math.abs(nextIndex - this.indexFilled);
    let indexes: number[];
    let animatedCircles: HTMLElement[];
    let scale: number;
    let opacity: number;

    if (nextIndex > this.indexFilled) {
      indexes = [0, 5, 10, 15];
      const from = indexes[this.indexFilled];
      const to = indexes[nextIndex] - 1;
      smallCirclesArray.reverse();
      animatedCircles = smallCirclesArray.slice(from, to);
      scale = 2.5;
      opacity = 1;
    } else {
      indexes = [1, 16, 11, 6];
      const from = indexes[this.indexFilled];
      const to = indexes[nextIndex] - 1 == 0 ? 20 : indexes[nextIndex] - 1;
      animatedCircles = smallCirclesArray.slice(from, to);
      scale = 1;
      opacity = 0;
    }

    const animations = animatedCircles.map((element, i) => {
      return anime({
        targets: element,
        opacity: opacity,
        scale: scale,
        easing: 'easeInOutQuad',
        duration: 150,
        delay: 150 * i,
      });
    });

    const totalDuration = animations.reduce((acc, animation) => {
      return Math.max(acc, animation.duration + animation.delay);
    }, 0);
    console.log(totalDuration);
    
    return totalDuration;
  }

  moveCircles(filled: Color, m: number, duration: number) {
    this.filled = filled;
    this.notFilled = opositeColor(filled);
    this.stayColor = false;

    function time(duration: number): number | null {
      switch (duration) {
        case 1050:
          return 700;
        case 2550:
          return 1630;
        case 4050:
          return 2470;
        default:
          return null;
      }
    }

    setTimeout(() => {
      this.indexFilled = m;
      this.stayColor = true;
    }, time(duration)!);

    setTimeout(() => {
      this.scrollService.notifyAnimationEnd('Change');
    }, time(duration)! + 350);
  }
}
