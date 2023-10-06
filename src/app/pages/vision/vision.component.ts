import { Component } from '@angular/core';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
})
export class VisionComponent {
  ngOnInit() {
    this.horizontalScroll();
  }

  horizontalScroll() {
    // Obtén el contenedor de desplazamiento horizontal
    const container = document.querySelector(
      '.vision-container'
    ) as HTMLElement;

    // Variables para el seguimiento de la dirección del desplazamiento
    let previousScrollY = 0;

    // Agrega un evento de desplazamiento al documento
    document.addEventListener('wheel', (e) => {
      // Verifica si el desplazamiento es hacia abajo
      if (e.deltaY > 0) {
        // Desplazamiento hacia la derecha
        container.scrollLeft += 20; // Ajusta la velocidad de desplazamiento según tus necesidades
      } else if (e.deltaY < 0) {
        // Desplazamiento hacia la izquierda
        container.scrollLeft -= 20; // Ajusta la velocidad de desplazamiento según tus necesidades
      }

      // Evita el comportamiento predeterminado de la rueda del mouse
    }); // Cambia la configuración a no pasivo

    // Detecta el desplazamiento vertical para cambiar la dirección
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > previousScrollY) {
        // Desplazamiento hacia abajo, cambia la dirección a la derecha
        container.scrollLeft += 20; // Ajusta la velocidad de desplazamiento según tus necesidades
      } else if (currentScrollY < previousScrollY) {
        // Desplazamiento hacia arriba, cambia la dirección a la izquierda
        container.scrollLeft -= 20; // Ajusta la velocidad de desplazamiento según tus necesidades
      }

      // Actualiza la posición anterior del desplazamiento vertical
      previousScrollY = currentScrollY;
    });
  }
}
