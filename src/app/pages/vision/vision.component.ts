import { Component } from '@angular/core';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
})
export class VisionComponent {
  markers!: number[];

  ngOnInit() {
    this.horizontalScroll();
  }

  horizontalScroll() {    
    const container = document.querySelectorAll('.vision-container');
    this.markers = new Array(container.length);
    let index = 0;
    let isAnimating = false;
    let isTransitioning = false;

    // console.log(index);


    document.addEventListener('wheel', function (e) {
      if (!isAnimating && !isTransitioning) {
        let nextIndex!: number;

        if (e.deltaY > 0) {
          nextIndex = index + 1;
        } else if (e.deltaY < 0) {
          nextIndex = index - 1;
        }

        if (nextIndex >= 0 && nextIndex < container.length) {
          console.log(index);
          console.log(nextIndex);

          const currentContainer = container[index] as HTMLElement;
          const nextContainer = container[nextIndex] as HTMLElement;
          const markers = document.querySelectorAll('.marker');    
          console.log(markers);
          
          const currentMarker = document.querySelector(
            '.current-marker'
          ) as HTMLElement;
          const nextMarker = markers[nextIndex] as HTMLElement;
          isAnimating = true;
          isTransitioning = true;

          console.log(nextMarker);
          

          currentContainer.classList.add('animateScroll');
          currentContainer.style.opacity = '0';
          currentMarker.classList.remove('current-marker');

          currentContainer.addEventListener('transitionend', function () {
            currentContainer.classList.remove('animateScroll');
            currentContainer.classList.add('hidden');
            isTransitioning = false;
          });

          setTimeout(function () {
            nextContainer.classList.remove('hidden');
            nextContainer.classList.add('animateScroll');
            nextContainer.style.opacity = '1';
            nextMarker.classList.add('current-marker');

            nextContainer.addEventListener('transitionend', function () {
              nextContainer.classList.remove('animateScroll');
              isAnimating = false;
            });
          }, 700);

          index = nextIndex;
        }
      }
    });
  }

  markerType(N: number) {
    if (N == 0) {
      return 'current-marker marker';
    } else {
      return 'marker';
    }
  }
}
