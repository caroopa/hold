import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorTransitionService {
  private activateTransition = new Subject<{
    color: string;
    posX: number;
    posY: number;
    zindex: number;
    page: string | null;
  }>();

  // Método para emitir eventos
  setProperties(
    color: string,
    posX: number,
    posY: number,
    zindex: number,
    page: string | null
  ) {
    this.activateTransition.next({ color, posX, posY, zindex, page });
  }

  // Método para suscribirse a eventos
  setTransition() {
    return this.activateTransition.asObservable();
  }
}
