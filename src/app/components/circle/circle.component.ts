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

  constructor(
    private circleService: CircleService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.circleService.setTransition().subscribe((e) => {
      this.change(e.filled, e.m);
    });
    this.morphing();
  }

  isCurrentIndex(index: number) {
    return index == this.indexFilled;
  }

  filledColor(index: number): string {
    if (this.isCurrentIndex(index)) {
      return this.filled;
    } else {
      return this.notFilled;
    }
  }

  onClick(index: number) {
    this.circleService.setServiceSection(index);
  }

  change(filled: Color, i: number) {
    this.filled = filled;
    this.notFilled = opositeColor(filled);
    this.indexFilled = i;

    setTimeout(() => {
      this.scrollService.notifyAnimationEnd('Change');
    }, 700);
  }

  morphing() {
    const outerMorphPath =
      'M393 204.144C407 305 283.5 393.395 196.5 393.395C126.338 393.395 0 321.395 0 204.144C0 95.7399 47.5 -30.6052 196.5 7.85552C300.5 41.3948 378.5 116 393 204.144Z';
    const innerMorphPath =
      'M255.562 334.26C228.92 401.5 152.022 323.636 128 282C120.5 269 36.9995 144.203 83.3923 127.26C217.562 78.2598 225.166 24.5 278.5 64.0392C358.651 123.459 300.731 220.26 255.562 334.26Z';
    const duration = 2500;

    const timelineOuter = anime.timeline({
      duration: duration,
      loop: true,
      direction: 'alternate',
      targets: '#outer',
      easing: 'linear',
    });
    timelineOuter.add({
      d: [{ value: outerMorphPath }],
    });

    const timelineInner = anime.timeline({
      duration: duration,
      loop: true,
      direction: 'alternate',
      targets: '#inner',
      easing: 'linear',
    });
    timelineInner.add({
      d: [{ value: innerMorphPath }],
    });
  }

  outerColor() {
    if (this.indexFilled == 0 || this.indexFilled == 2) {
      return Color.Light;
    } else if (this.indexFilled == 1) {
      return '#FF6348';
    } else {
      return '#00A698';
    }
  }

  innerColor() {
    if (this.indexFilled == 1 || this.indexFilled == 3) {
      return Color.Dark;
    } else if (this.indexFilled == 0) {
      return '#FFD44A';
    } else {
      return '#FFB5F9';
    }
  }
}
