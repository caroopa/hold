import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent {
  index!: number;
  container!: any;
  markers!: number[];
  isTransitioning!: boolean;
  body!: any;
  colors = ['var(--yellow)', 'var(--rose)', 'var(--esmerald)', 'var(--orange)'];

  ngOnInit() {
    this.index = 0;
    this.container = document.querySelectorAll('.services-container');
    this.markers = new Array(this.container.length);
    this.isTransitioning = false;
    this.body = document.querySelector('.services-body');
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (!this.isTransitioning) {
      console.log('qué onda');

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
    this.isTransitioning = true;

    currentContainer.classList.add('animateScroll');
    currentContainer.style.opacity = '0';
    currentMarker.classList.remove('current-marker');
    this.body.style.backgroundColor = this.colors[nextIndex];

    const onCurrentContainerTransitionEnd = () => {
      currentContainer.removeEventListener(
        'transitionend',
        onCurrentContainerTransitionEnd
      );

      currentContainer.classList.remove('animateScroll');
      currentContainer.classList.add('hidden');

      nextContainer.classList.remove('hidden');
      nextContainer.classList.add('animateScroll');
      nextContainer.style.opacity = '1';
      nextMarker.classList.add('current-marker');
    };

    currentContainer.addEventListener(
      'transitionend',
      onCurrentContainerTransitionEnd
    );

    const onNextContainerTransitionEnd = () => {
      console.log(nextContainer.innerHTML);
      nextContainer.removeEventListener(
        'transitionend',
        onNextContainerTransitionEnd
      );

      nextContainer.classList.remove('animateScroll');

      this.isTransitioning = false;
      this.index = nextIndex;
    };

    nextContainer.addEventListener(
      'transitionend',
      onNextContainerTransitionEnd
    );
  }

  currentClass(N: number) {
    return N === 0 ? 'current-marker' : '';
  }
}
