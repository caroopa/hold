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
    console.log(paper.project);    

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
    paper.project.activeLayer.addChild(rectBlack);

    var rect = new paper.Path.Rectangle({
      point: paper.view.bounds.topLeft,
      size: [middle, height],
      fillColor: 'white',
    });

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
    const speed = 10;    

    // ------- ONFRAME -------

    const targetPos = new paper.Point(middle, height / 2);
    function onFrameWaveCardAnimation() {
      // console.log("AAAA");
      
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

    // ------- ONMOUSEMOVE -------

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
      if (intersection) {
        const result = union.subtract(intersection);
        paper.project.activeLayer.addChild(result);
      }
    }

    paper.view.onMouseMove = onMouseMoveWaveCardAnimation;
    paper.view.onFrame = onFrameWaveCardAnimation;
  }

  // ngOnDestroy() {
  //   paper.project.remove();
  // }
}
