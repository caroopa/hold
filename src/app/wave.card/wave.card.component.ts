import { Component } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-wave.card',
  templateUrl: './wave.card.component.html',
  styleUrls: ['./wave.card.component.scss']
})
export class WaveCardComponent {
  ngAfterViewInit() {
    const canvas = document.getElementById(
      'canvas-wave-card'
    ) as HTMLCanvasElement;
    paper.setup(canvas);

    var myCircle = new paper.Path.Circle(new paper.Point(100, 70), 50);
    myCircle.fillColor = new paper.Color('red');
  }
}
