import { Component } from '@angular/core';
import { CircleService } from 'src/app/services/circle.service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
})
export class CircleComponent {
  indexFilled = 0;
  otherColor = 'var(--yellow)';
  linkColor = 'var(--primary-dark)';

  constructor(private circleService: CircleService) {}

  ngOnInit() {
    this.circleService.setTransition().subscribe((e) => {
      this.moveCircles(e.color, e.linkColor, e.index);
    });
  }

  moveCircles(color: string, linkColor: string, index: number) {
    this.indexFilled = index;
    this.linkColor = linkColor;
    this.otherColor = color;
  }

  filled(index: number): string {
    if (index == this.indexFilled) {
      return this.linkColor;
    } else {
      return this.otherColor;
    }
  }

  isCurrentIndex(index: number) {
    return index == this.indexFilled;
  }

  onClick(index: number) {
    this.circleService.setServiceSection(index);
  }
}
