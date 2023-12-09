import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorTransitionService {
  private activateTransition = new Subject<{which: string, posX: number, posY: number }>();

  // Método para emitir eventos
  whichAnimationDo(which: string, posX: number, posY: number) {
    this.activateTransition.next({ which, posX, posY });
  }

  // Método para suscribirse a eventos
  setTransition() {
    return this.activateTransition.asObservable();
  }
}
