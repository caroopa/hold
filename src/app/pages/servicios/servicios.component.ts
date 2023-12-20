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

      this.isTransitioning = true;
      this.setColor(this.nextIndex);

      if (this.nextIndex >= 0 && this.nextIndex < this.container.length) {
        this.circleService.setProperties(this.linksColor, this.nextIndex);
        this.changeSection();
      } else if (this.nextIndex == this.container.length) {
        this.transService.setProperties(
          Color.Dark,
          '#FFD44C',
          window.innerWidth / 2,
          window.innerHeight / 2,
          'servicios/desc'
        );
      }
    }
  }

  manualChange(index: number) {
    if (this.index != index) {
      this.isTransitioning = true;
      this.setColor(index);
      this.circleService.setProperties(this.linksColor, index);
      this.nextIndex = index;
      this.changeSection(index);
    }
  }

  setColor(i: number) {
    if (i == 0 || i == 2) {
      this.linksColor = Color.Light;
    } else {
      this.linksColor = Color.Dark;
    }
  }

  changeSection(i: number = this.nextIndex) {
    this.linksService.changeFollowColor(this.linksColor);
    this.linksService.changeHelloColor(this.linksColor);
    this.linksService.changeMenuColor(this.linksColor);
    this.index = i;
    this.scrollService.animationEnd$.subscribe((componentName) => {
      if (componentName === 'Change') {
        this.isTransitioning = false;
      }
    });
  }

  isCurrentIndex(i: number) {
    return i == this.index;
  }

  backgroundColor() {
    return opositeColor(this.linksColor);
  }
}
