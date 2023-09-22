import { Component } from '@angular/core';
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
    canvas.style.opacity = '1';
    paper.setup(idCanvas);

    const width = paper.view.size.width;
    const middle = width / 2;
    const widthWave = 25;
    const startWhite = middle - widthWave;
    const widthWhite = middle + widthWave;
    const startBlack = middle + widthWave;
    const widthBlack = middle - widthWave;
    const height = paper.view.size.height;

    var rect = new paper.Path.Rectangle({
      point: paper.view.bounds.topLeft,
      size: [middle, height],
      fillColor: 'white',
    });

    const points = 5;
    const smooth = true;
    // if (idCanvas == 'blackCanvas') {
    //   var path = new paper.Path({
    //     fillColor: 'black',
    //   });
    // } else {
    //   var path = new paper.Path({
    //     fillColor: 'white',
    //   });
    // }
    var path = new paper.Path({
      fillColor: 'white',
    });
    path.segments = [];
    
    if (idCanvas == 'whiteCanvas') {
      path.add([middle, 0]);
      for (var i = 1; i < points; i++) {
        const point = new paper.Point(widthWhite, (height / points) * i);
        path.add(point);
      }
      path.add([middle, height]);
    } else {
      path.add([middle, 0]);
      for (var i = 1; i < points; i++) {
        const point = new paper.Point(widthBlack, (height / points) * i);
        path.add(point);
      }
      path.add([middle, height]);
    }

    function onFrame(event: any) {
      rect.bounds.size = new paper.Size(middle, height)

      for (var i = 1; i < points; i++) {
        const sinSeed = event.count + (i + (i % 10)) * 100;
        const sinWidth = Math.sin(sinSeed / 200) * 100;
        const xPos = Math.sin(sinSeed / 100) * sinWidth + widthWave * 2;
        
        if (idCanvas == 'whiteCanvas') {
          path.segments[i].point.x = startWhite + xPos;
        } else {
          path.segments[i].point.x = startBlack - xPos;
        }
      }

      const union = rect.unite(path);
      const intersection = rect.intersect(path);
      if (intersection) {
        const result = union.subtract(intersection);
        rect.remove()
        path.remove()
        result.smooth({ type: 'continuous' });
        paper.project.activeLayer.removeChildren();
        paper.project.activeLayer.addChild(result);
      }
    }

    const view = paper.view;
    view.onFrame = onFrame;

    setTimeout(() => {
      paper.project.clear();
      canvas.style.opacity = '0';
    }, 3000);
  }
}
