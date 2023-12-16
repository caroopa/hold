import { Component, HostListener } from '@angular/core';
import { ColorTransitionService } from './../../services/color-transition.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { CircleService } from 'src/app/services/circle.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent {
  index!: number;
  nextIndex!: number;
  container!: any;
  markers!: number[];
  isTransitioning!: boolean;
  body!: any;
  colors = ['#FFD44C', '#EC644E', '#E5B7D6', '#00A698', '#030202'];

  constructor(
    private transService: ColorTransitionService,
    private scrollService: ScrollService,
    private circleService: CircleService
  ) {}

  ngOnInit() {
    this.index = 0;
    this.container = document.querySelectorAll('.services-container');
    this.markers = new Array(this.container.length);
    this.isTransitioning = false;
    this.body = document.querySelector('.services-body');

    this.scrollService.animationEnd$.subscribe((componentName) => {
      if (componentName === 'Cambiate' && this.nextIndex < this.container.length) {
        this.changeSection();
      }
    });
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (!this.isTransitioning) {
      if (e.deltaY > 0) {
        this.nextIndex = this.index + 1;
      } else if (e.deltaY < 0) {
        this.nextIndex = this.index - 1;
      }
      if (this.nextIndex >= 0 && this.nextIndex < this.container.length) {
        this.transService.setProperties(
          this.colors[this.nextIndex],
          window.innerWidth / 2,
          window.innerHeight / 2,
          3,
          null
        );
      } else if (this.nextIndex == this.container.length) {
        console.log("aaa");
        
        this.transService.setProperties(
          this.colors[this.nextIndex],
          window.innerWidth / 2,
          window.innerHeight / 2,
          3,
          'servicios/desc'
        );
      }
      this.isTransitioning = true;
    }
  }

  onClick(index: number) {
    if (this.index != index) {
      this.transService.setProperties(
        this.colors[index],
        window.innerWidth / 2,
        window.innerHeight / 2,
        3,
        null
      );
      this.changeSection(index);
    }
  }

  changeSection(i: number = this.nextIndex) {
    const currentContainer = this.container[this.index] as HTMLElement;
    const nextContainer = this.container[i] as HTMLElement;
    currentContainer.classList.add('hiden');
    nextContainer.classList.remove('hiden');

    this.circleService.setProperties(this.colors[i], i);
    this.isTransitioning = false;
    this.index = i;
  }

  isCurrentIndex(i: number) {
    return i == this.index;
  }

  backgroundColor() {
    return this.colors[this.index];
  }
}
