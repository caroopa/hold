import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CircleService {
  private changeSection = new Subject<{
    color: string;
    linkColor: string;
    index: number;
  }>();

  // Método para emitir eventos
  setProperties(color: string, linkColor: string, index: number) {
    this.changeSection.next({ color, linkColor, index });
  }

  // Método para suscribirse a eventos
  setTransition() {
    return this.changeSection.asObservable();
  }
}
