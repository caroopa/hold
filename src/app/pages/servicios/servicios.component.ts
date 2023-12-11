import { Component, HostListener } from '@angular/core';
import { ColorTransitionService } from './../../services/color-transition.service';
import { ScrollService } from 'src/app/services/scroll.service';

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
  colors = ['#FFD44C', '#E5B7D6', '#00A698', '#EC644E'];

  constructor(
    private transService: ColorTransitionService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.index = 0;
    this.container = document.querySelectorAll('.services-container');
    this.markers = new Array(this.container.length);
    this.isTransitioning = false;
    this.body = document.querySelector('.services-body');

    this.scrollService.animationEnd$.subscribe((componentName) => {
      if (componentName === 'Cambiate') {
        this.isTransitioning = false;
      }
    });
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (!this.isTransitioning) {
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

    this.transService.setProperties(
      this.colors[nextIndex],
      window.innerWidth / 2,
      window.innerHeight / 2,
      3,
      null
    );

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
      nextContainer.removeEventListener(
        'transitionend',
        onNextContainerTransitionEnd
      );

      nextContainer.classList.remove('animateScroll');

      // this.isTransitioning = false;
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
