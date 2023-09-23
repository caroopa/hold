import { Component } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-wave-card',
  templateUrl: './wave.card.component.html',
  styleUrls: ['./wave.card.component.scss'],
})
export class WaveCardComponent {
  ngAfterViewInit() {
    this.waveCardAnimation();
  }

  waveCardAnimation() {
    const canvas = document.getElementById('whiteCanvas') as HTMLCanvasElement;
    canvas.style.opacity = '1';
    paper.setup('whiteCanvas');

    const width = paper.view.size.width;
    const middle = width / 2;
    const widthWave = 25;
    const startWhite = middle - widthWave;
    const widthWhite = middle + widthWave;
    const height = paper.view.size.height;
    var mousePos

    var rectBlack = new paper.Path.Rectangle({
      point: paper.view.bounds.topLeft,
      size: paper.view.bounds.bottomRight,
      fillColor: 'black',
    });
    paper.project.activeLayer.addChild(rectBlack);

    var rect = new paper.Path.Rectangle({
      point: paper.view.bounds.topLeft,
      size: [middle, height],
      fillColor: 'white',
    });

    var path = new paper.Path({
      fillColor: 'white',
    });
    path.add([middle, 0]);
    const point = new paper.Point(widthWhite, height / 2);
    path.add(point);
    path.add([middle, height]);
    path.smooth({ type: 'continuous' });

    var isFollowingMouse = true;
    setTimeout(function () {
      isFollowingMouse = false;
    }, 2000);

    // ------- ONFRAME -------
    const targetPos = new paper.Point(middle, height / 2);
    // ------
    const punto1 = new paper.Path.Circle(targetPos, 5);
    punto1.fillColor = new paper.Color('red');
    paper.project.activeLayer.addChild(punto1);
    // ------

    function onFrame() {
      if (!isFollowingMouse) {
        const distance = targetPos.subtract(path.segments[1].point);
        const speed = 50;
        if (distance.length > 1) {
          path.segments[1].point.x += distance.x / speed;
        }
        reanimate();
      }
    }

    // ------- ONMOUSEMOVE -------

    function onMouseMove(event: any) {
      if (isFollowingMouse) {
        const mousePos = event.point;
        path.segments[1].point.x +=
          (mousePos.x - path.segments[1].point.x) / 50;
        path.segments[1].point.y +=
          (mousePos.y - path.segments[1].point.y) / 50;
        reanimate();
      }
    }

    // ------- REANIMATE -------

    function reanimate() {
      rect.bounds.size = new paper.Size(middle, height);
      const union = rect.unite(path);
      const intersection = rect.intersect(path);
      paper.project.activeLayer.removeChildren();
      paper.project.activeLayer.addChild(rectBlack);
      if (intersection) {
        const result = union.subtract(intersection);
        paper.project.activeLayer.addChild(result);
      }
      // ------
      const punto2 = new paper.Path.Circle(path.segments[1].point, 5);
      paper.project.activeLayer.addChild(punto1);
      paper.project.activeLayer.addChild(punto2);
      // ------
    }

    paper.view.onMouseMove = onMouseMove;
    paper.view.onFrame = onFrame;
  }
}
