import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-wave-card',
  templateUrl: './wave.card.component.html',
  styleUrls: ['./wave.card.component.scss'],
})
export class WaveCardComponent {
  @Input() backgroundColor!: string;
  @ViewChild('canvasElement', { static: true })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.waveCardAnimation();
  }

  waveCardAnimation() {
    const canvas = this.canvasElement.nativeElement;
    canvas.style.backgroundColor = this.backgroundColor;

    // paper.setup(canvas);
    // const circle = new paper.Path.Circle(new paper.Point(500, 100), 10);
    // circle.fillColor = new paper.Color('red');
  }
}
