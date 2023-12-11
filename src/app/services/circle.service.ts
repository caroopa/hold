import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CircleService {
  private changeSection = new Subject<{
    color: string;
    index: number;
  }>();

  // Método para emitir eventos
  setProperties(color: string, index: number) {
    this.changeSection.next({ color, index });
  }

  // Método para suscribirse a eventos
  setTransition() {
    return this.changeSection.asObservable();
  }
}
