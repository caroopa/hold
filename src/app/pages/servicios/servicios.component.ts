import { Component, HostListener } from '@angular/core';
import { ColorTransitionService } from './../../services/color-transition.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { CircleService } from 'src/app/services/circle.service';
import { LinksService } from 'src/app/services/links.service';
import { Color, opositeColor } from 'src/app/utils/color';

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
  linksColor: Color = Color.Light;

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

    this.linksService.changeFollowColor(this.linksColor);
    this.linksService.changeHelloColor(this.linksColor);
    this.linksService.changeMenuColor(this.linksColor);

    this.circleService.changeServiceSection.subscribe((nextIndex) => {
      this.manualChange(nextIndex);
    });
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (!this.isTransitioning) {
      if (e.deltaY > 0) {
        if (this.index + 1 <= this.container.length) {
          this.nextIndex = this.index + 1;
        } else {
          return;
        }
      } else if (e.deltaY < 0) {
        if (this.index - 1 >= 0) {
          this.nextIndex = this.index - 1;
        } else {
          return;
        }
      }

      if (this.nextIndex >= 0 && this.nextIndex < this.container.length) {
        this.circleService.setProperties(
          opositeColor(this.linksColor),
          this.nextIndex
        );
      } else if (this.nextIndex == this.container.length) {
        this.transService.setProperties(
          Color.Dark,
          '#FFD44C',
          window.innerWidth / 2,
          window.innerHeight / 2,
          'servicios/desc'
        );
      }

      this.isTransitioning = true;
      this.changeSection();

      this.scrollService.animationEnd$.subscribe((componentName) => {
        if (
          componentName === 'Cambiate' &&
          this.nextIndex < this.container.length
        ) {
          this.isTransitioning = false;
        }
      });
    }
  }

  manualChange(index: number) {
    if (this.index != index) {
      this.isTransitioning = true;
      this.circleService.setProperties(
        opositeColor(this.linksColor),
        this.nextIndex
      );
      this.nextIndex = index;
    }
  }

  changeSection(i: number = this.nextIndex) {
    if (i == 0 || i == 2) {
      this.linksColor = Color.Light;
    } else {
      this.linksColor = Color.Dark;
    }
    this.linksService.changeFollowColor(this.linksColor);
    this.linksService.changeHelloColor(this.linksColor);
    this.linksService.changeMenuColor(this.linksColor);
    this.index = i;
  }

  isCurrentIndex(i: number) {
    return i == this.index;
  }

  backgroundColor() {
    return opositeColor(this.linksColor);
  }
}
