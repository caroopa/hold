import { Component, HostListener } from '@angular/core';
import { ColorTransitionService } from './../../services/color-transition.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { CircleService } from 'src/app/services/circle.service';
import { LinksService } from 'src/app/services/links.service';

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
  linksColor = 'var(--primary-dark)';

  constructor(
    private transService: ColorTransitionService,
    private scrollService: ScrollService,
    private circleService: CircleService,
    private linksService: LinksService
  ) {}

  ngOnInit() {
    this.index = 0;
    this.container = document.querySelectorAll('.services-container');
    this.markers = new Array(this.container.length);
    this.isTransitioning = false;
    this.body = document.querySelector('.services-body');

    this.scrollService.animationEnd$.subscribe((componentName) => {
      if (
        componentName === 'Cambiate' &&
        this.nextIndex < this.container.length
      ) {
        this.changeSection();
      }
    });

    this.linksService.changeFollowColor('var(--primary-dark)');
    this.linksService.changeHelloColor('var(--primary-dark)');
    this.linksService.changeMenuColor('var(--primary-dark)');

    this.circleService.changeServiceSection.subscribe((nextIndex) => {
      this.manualChange(nextIndex);
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
          null
        );
      } else if (this.nextIndex == this.container.length) {
        this.transService.setProperties(
          this.colors[this.nextIndex],
          window.innerWidth / 2,
          window.innerHeight / 2,
          'servicios/desc'
        );
      }
      this.isTransitioning = true;
    }
  }

  manualChange(index: number) {
    if (this.index != index) {
      this.transService.setProperties(
        this.colors[index],
        window.innerWidth / 2,
        window.innerHeight / 2,
        null
      );
      this.scrollService.animationEnd$.subscribe((componentName) => {
        if (componentName === 'Cambiate') {
          this.changeSection(index);
        }
      });
    }
  }

  changeSection(i: number = this.nextIndex) {
    if (i == 0 || i == 2) {
      this.linksColor = 'var(--primary-dark)';
    } else {
      this.linksColor = 'var(--primary-light)';
    }
    this.linksService.changeFollowColor(this.linksColor);
    this.linksService.changeHelloColor(this.linksColor);
    this.linksService.changeMenuColor(this.linksColor);

    this.circleService.setProperties(this.colors[i], this.linksColor, i);
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
