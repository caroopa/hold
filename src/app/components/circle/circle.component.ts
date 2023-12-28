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
      'M393 203.604C402.5 313.355 279.5 398.5 196.5 392.855C157 398.855 -1.52588e-05 320.855 -1.52588e-05 203.604C-1.52588e-05 95.2005 47.5 -31.1445 196.5 7.31618C300.5 40.8555 372.5 100.355 393 203.604Z';
    const innerMorphPath =
      'M255.562 333.721C213.062 398.221 118.893 301.774 126.892 281.721C101.393 178.221 44.062 156.721 83.3925 126.721C217.562 77.7206 215 38 278.5 63.5C358.651 122.92 300.732 219.721 255.562 333.721Z';
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
