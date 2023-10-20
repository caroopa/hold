import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
})
export class VisionComponent {
  index!: number;
  container!: any;
  markers!: number[];
  isAnimating!: boolean;
  isTransitioning!: boolean;
  body!: any;
  colors = ['#82A0D8', '#8DDFCB', '#EDB7ED', '#ECEE81'];

  ngOnInit() {
    this.index = 0;
    this.container = document.querySelectorAll('.vision-container');
    this.markers = new Array(this.container.length);
    this.isAnimating = false;
    this.isTransitioning = false;
    this.body = document.querySelector('.vision-body');
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (!this.isAnimating && !this.isTransitioning) {
      let nextIndex!: number;

      if (e.deltaY > 0) {
        nextIndex = this.index + 1;
      } else if (e.deltaY < 0) {
        nextIndex = this.index - 1;
      }

      if (nextIndex >= 0 && nextIndex < this.container.length) {
        this.changeSection(nextIndex);
      }
    }
  }

  onClick(index: number) {
    if (this.index != index) {
      this.changeSection(index);
    }
  }

  changeSection(nextIndex: number) {
    const currentContainer = this.container[this.index] as HTMLElement;
    const nextContainer = this.container[nextIndex] as HTMLElement;
    const markers = document.querySelectorAll('.marker');
    const currentMarker = document.querySelector(
      '.current-marker'
    ) as HTMLElement;

    const nextMarker = markers[nextIndex] as HTMLElement;
    this.isAnimating = true;
    this.isTransitioning = true;

    currentContainer.classList.add('animateScroll');
    currentContainer.style.opacity = '0';
    currentMarker.classList.remove('current-marker');
    this.body.style.backgroundColor = this.colors[nextIndex];

    currentContainer.addEventListener('transitionend', () => {
      currentContainer.classList.remove('animateScroll');
      currentContainer.classList.add('hidden');
      this.isTransitioning = false;
    });

    setTimeout(() => {
      nextContainer.classList.remove('hidden');
      nextContainer.classList.add('animateScroll');
      nextContainer.style.opacity = '1';
      nextMarker.classList.add('current-marker');

      nextContainer.addEventListener('transitionend', () => {
        nextContainer.classList.remove('animateScroll');
        this.isAnimating = false;
      });
    }, 700);

    this.index = nextIndex;
  }

  currentClass(N: number) {
    return N === 0 ? 'current-marker' : '';
  }
}
