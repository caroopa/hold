import { Component } from '@angular/core';
import * as paper from 'paper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wave-card',
  templateUrl: './wave-card.component.html',
  styleUrls: ['./wave-card.component.scss'],
})
export class WaveCardComponent {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.waveCardAnimation(this.router);
  }

  waveCardAnimation(router: Router) {
    const canvas = document.getElementById(
      'wave-card-canvas'
    ) as HTMLCanvasElement;

    paper.setup(canvas);

    const width = paper.view.size.width;
    const middle = width / 2;
    const widthWave = 100;
    const startWhite = middle - widthWave;
    const widthWhite = middle + widthWave;
    const height = paper.view.size.height;

    var rectBlack = new paper.Path.Rectangle({
      point: paper.view.bounds.topLeft,
      size: paper.view.bounds.bottomRight,
      fillColor: 'black',
    });

    var textBlack = new paper.PointText({
      point: [width * 0.75, height / 2],
      content: 'Servicios',
      fillColor: '#ffffff',
      justification: 'center',
      fontSize: 70,
      font: 'Poppins, sans-serif',
      letterSpacing: 2,
      fontWeight: 'bold',
    });
    paper.project.activeLayer.addChild(rectBlack);
    paper.project.activeLayer.addChild(textBlack);

    var rect = new paper.Path.Rectangle({
      point: paper.view.bounds.topLeft,
      size: [middle, height],
      fillColor: 'white',
    });
    var textWhite = new paper.PointText({
      point: rect.position,
      content: 'Visión',
      fillColor: '#000002',
      justification: 'center',
      fontSize: 70,
      font: 'Poppins, sans-serif',
      letterSpacing: 2,
      fontWeight: 'bold',
    });
    paper.project.activeLayer.addChild(textWhite);

    var path = new paper.Path({
      fillColor: 'white',
      strokeColor: 'white',
      strokeWidth: 2,
    });
    path.add([middle, 0]);
    const point = new paper.Point(middle + 1, height / 2);
    path.add(point);
    path.add([middle, height]);
    path.smooth({ type: 'continuous' });

    var isFollowingMouse = true;
    var isMouseInside = false;
    const speed = 6;

    // ------- ONFRAME -------

    const targetPos = new paper.Point(middle, height / 2);
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

    // ------- MOUSE MOVE -------

    function onMouseMoveWaveCardAnimation(event: any) {
      const mousePos = event.point;
      var isLeft;
      if (
        !isMouseInside &&
        mousePos.x < middle + 10 &&
        mousePos.x > middle - 10
      ) {
        isMouseInside = true;
        isLeft = mousePos.x < middle;
      }

      const isWaveInside =
        path.segments[1].point.x < widthWhite &&
        path.segments[1].point.x > startWhite;

      if (isFollowingMouse && isMouseInside) {
        isMouseInside = true;

        if (isWaveInside) {
          if (isLeft) {
            path.segments[1].point.x -=
              (mousePos.x - path.segments[1].point.x) / 25;
          } else {
            path.segments[1].point.x +=
              (mousePos.x - path.segments[1].point.x) / 25;
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
      rect.bounds.size = new paper.Size(middle, height);
      const union = rect.unite(path);
      const intersection = rect.intersect(path);
      paper.project.activeLayer.removeChildren();
      paper.project.activeLayer.addChild(rectBlack);
      paper.project.activeLayer.addChild(textBlack);
      if (intersection) {
        const result = union.subtract(intersection);
        paper.project.activeLayer.addChild(result);
        paper.project.activeLayer.addChild(textWhite);
      }
    }

    // ------- MOUSE LEAVE -------

    function onMouseLeaveWaveCardAnimation() {
      isFollowingMouse = false;
    }

    textBlack.onClick = function() {
      router.navigate(['/servicios']);
    };
    textWhite.onClick = function() {
      router.navigate(['/vision']);
    };

    paper.view.onMouseMove = onMouseMoveWaveCardAnimation;
    paper.view.onMouseLeave = onMouseLeaveWaveCardAnimation;
    paper.view.onFrame = onFrameWaveCardAnimation;
  }

  // ngOnDestroy() {
  //   paper.project.remove();
  // }
}
