import { Component, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-wave-card',
  templateUrl: './wave.card.component.html',
  styleUrls: ['./wave.card.component.scss'],
})
export class WaveCardComponent {
  ngAfterViewInit() {
    paper.setup('whiteCanvas');
    paper.setup('blackCanvas');
  }

  waveCardAnimation(idCanvas: string) {
    const canvas = document.getElementById(idCanvas) as HTMLCanvasElement;
    paper.setup(idCanvas);

    var points = 8;
    var smooth = true;
    if (idCanvas == 'blackCanvas') {
      var path = new paper.Path({
        fillColor: 'black',
      });
    } else {
      var path = new paper.Path({
        fillColor: 'white',
      });
    }

    const width = paper.view.size.width;
    const widthRight = width / 8;
    const widthLeft = width - widthRight;
    const height = paper.view.size.height;
    path.segments = [];

    if (idCanvas == 'blackCanvas') {
      path.add(paper.view.bounds.topLeft);
      for (var i = 1; i < points; i++) {
        var point = new paper.Point(widthRight, (height / points) * i);
        path.add(point);
      }
      path.add(paper.view.bounds.bottomLeft);
    } else {
      path.add(paper.view.bounds.topRight);
      for (var i = 1; i < points; i++) {
        var point = new paper.Point(widthLeft, (height / points) * i);
        path.add(point);
      }
      path.add(paper.view.bounds.bottomRight);
    }

    paper.view.onFrame = function (event: any) {
      for (var i = 1; i < points; i++) {
        var sinSeed = event.time + (i + (i % 10)) * 100;
        var sinWidth, xPos;
        if (idCanvas == 'blackCanvas') {
          sinWidth = Math.sin(sinSeed / 200) * widthRight;
          xPos = Math.sin(sinSeed / 100) * sinWidth + widthRight;
        } else {
          sinWidth = Math.sin(sinSeed / 200) * widthLeft;
          xPos = Math.sin(sinSeed / 100) * sinWidth + widthLeft;
        }
        path.segments[i].point.x = xPos;
      }
      if (smooth) {
        path.smooth({ type: 'continuous' });
      }
    };

    setTimeout(() => {
      paper.project.clear();
    }, 3000);
  }
}
