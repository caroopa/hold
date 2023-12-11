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

  constructor(private circleService: CircleService) {}

  ngOnInit() {
    this.circleService.setTransition().subscribe((e) => {
      this.moveCircles(e.color, e.index);
    });
  }

  moveCircles(color: string, index: number) {
    this.indexFilled = index;
    this.otherColor = color;
  }

  filled(index: number): string {
    if (index == this.indexFilled) {
      return 'var(--primary-dark)';
    } else {
      return this.otherColor;
    }
  }
}
