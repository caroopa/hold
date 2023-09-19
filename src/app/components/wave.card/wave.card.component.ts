import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-wave-card',
  templateUrl: './wave.card.component.html',
  styleUrls: ['./wave.card.component.scss'],
})
export class WaveCardComponent {
  @ViewChild('canvasElement', { static: true })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.waveCardAnimation();
  }

  waveCardAnimation() {
    paper.setup("wave-card_canvas")
    var division = document.getElementById('container');
    division.addEventListener('mousemove', onMouseMove);

    // Define la función onMouseMove
    function onMouseMove(event) {
      // Calcula la posición horizontal del mouse dentro del contenedor
      var mouseX = event.clientX - division.getBoundingClientRect().left;
      var halfWidth = division.clientWidth / 2;

      // Calcula el desplazamiento vertical basado en la posición horizontal del mouse
      var offsetY = Math.sin((mouseX / halfWidth) * Math.PI) * 20;

      // Aplica la transformación a las mitades del contenedor
      document.getElementById(
        'white-half'
      ).style.transform = `translateY(${offsetY}px)`;
      document.getElementById(
        'black-half'
      ).style.transform = `translateY(${-offsetY}px)`;
    }
  }
}
