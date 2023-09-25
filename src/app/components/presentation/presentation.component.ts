import { Component } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent {
  // imageURL: string = '../../assets/img/logo.jpg';

  ngAfterViewInit() {
    this.presentationAnimation();
  }

  presentationAnimation() {
    const canvas = document.getElementById(
      'presentation-canvas'
    ) as HTMLCanvasElement;
    paper.setup(canvas);

    // const circle = new paper.Path.Circle(new paper.Point(80, 80), 50);
    // circle.fillColor = new paper.Color('black');

    // var raster = new paper.Raster('logo');
    // raster.position = paper.view.center;
    // raster.scale(0.1, 0.1)

    const circle = new paper.Path.Circle({
      center: new paper.Point(paper.view.center.x, paper.view.center.y),
      radius: paper.view.size.width,
      fillColor: 'black',
    });

    const text = new paper.PointText({
      content: 'HOLD',
      fillColor: 'white',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fontSize: 28,
    });
    text.position = circle.position;

    const finalPosition = new paper.Point(80, 80);
    const finalRadius = 50;
    let fontSize = 28;
    const finalFontSize = 14;
    let movementEnded = false;
    let resizedEnded = false;

    var startedAnimation = false;
    function onFramePresentationAnimation() {
      if (startedAnimation) {
        circle.scale(0.975);
        circle.position = circle.position.add(
          finalPosition.subtract(circle.position).divide(30)
        );

        if (fontSize > finalFontSize) {
          fontSize -= 0.1;
          text.fontSize = fontSize;
        }
        text.position = circle.position;

        if (circle.position.getDistance(finalPosition) < 1) {
          circle.position = finalPosition;
          text.position = circle.position;
          movementEnded = true;
        }

        if (circle.bounds.width < finalRadius * 2) {
          circle.scale((finalRadius * 2) / circle.bounds.width);
          text.fontSize = 14;
          resizedEnded = true;
        }

        if (movementEnded && resizedEnded) {
          paper.view.off('frame', onFramePresentationAnimation);
          canvas.style.display = 'none';
          const logo = document.getElementById('logo') as HTMLCanvasElement;
          logo.style.display = 'flex';
        }
      }
    }

    paper.view.onFrame = onFramePresentationAnimation;
    setTimeout(function () {
      startedAnimation = true;
    }, 1500);
  }
}
