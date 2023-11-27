import { Component } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-wave-card',
  templateUrl: './wave-card.component.html',
  styleUrls: ['./wave-card.component.scss'],
})
export class WaveCardComponent {
  ngAfterViewInit() {
    this.waveCardAnimation();
  }

  waveCardAnimation() {
    const canvas = document.getElementById(
      'wave-card-canvas'
    ) as HTMLCanvasElement;

    paper.setup(canvas);

    const width = paper.view.size.width;
    const middle = width / 2;
    const height = paper.view.size.height;

    var white = new paper.Path.Rectangle({
      point: [0, 0],
      size: [middle, height],
      fillColor: '#ffffff',
    });

    var black = new paper.Path.Rectangle({
      point: [middle, 0],
      size: [width, height],
      fillColor: '#000002',
    });

    var path = new paper.Path({
      fillColor: '#ffffff',
      strokeColor: '#ffffff',
      strokeWidth: 2,
    });

    path.add([middle, 0]);
    const point = new paper.Point(middle + 1, height / 2);
    path.add(point);
    path.add([middle, height]);
    path.smooth({ type: 'continuous' });

    var isFollowingMouse = true;
    var isMouseInside = false;
    const targetPos = new paper.Point(middle, height / 2);
    const speed = 10;

    // ------- ONFRAME -------

    function onFrameWaveCardAnimation() {
      if (!isFollowingMouse) {
        const distance = targetPos.subtract(path.segments[1].point);
        if (distance.length > 1) {
          path.segments[1].point.x += distance.x / speed;
        } else {
          isFollowingMouse = true;
        }
        reanimate();
      }
    }

    // ------- MOUSEMOVE -------

    function onMouseMoveWaveCardAnimation(event: any) {
      const mousePos = event.point;
      var isLeft;
      if (!isMouseInside && mousePos.x < width && mousePos.x > 0) {
        isMouseInside = true;
        isLeft = mousePos.x < middle;
      }

      const isWaveInside =
        path.segments[1].point.x < width && path.segments[1].point.x > 0;

      if (isFollowingMouse && isMouseInside) {
        isMouseInside = true;

        if (isWaveInside) {
          if (isLeft) {
            path.segments[1].point.x -=
              (mousePos.x - path.segments[1].point.x) / 10;
          } else {
            path.segments[1].point.x +=
              (mousePos.x - path.segments[1].point.x) / 10;
          }
        } else {
          isFollowingMouse = false;
          isMouseInside = false;
        }
        reanimate();
      }
    }

    // ------- REANIMATE -------

    function reanimate() {
      white.bounds.size = new paper.Size(middle, height);
      const union = white.unite(path);
      const intersection = white.intersect(path);
      paper.project.activeLayer.removeChildren();
      paper.project.activeLayer.addChild(black);
      if (intersection) {
        const result = union.subtract(intersection);
        paper.project.activeLayer.addChild(result);
      }
    }

    // ------- MOUSELEAVE -------

    canvas.addEventListener('mouseleave', () => {
      isFollowingMouse = false;
    });

    paper.view.onMouseMove = onMouseMoveWaveCardAnimation;
    paper.view.onFrame = onFrameWaveCardAnimation;
  }
}
