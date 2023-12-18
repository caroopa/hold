import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CircleService {
  // CIRCLES
  private changeCircle = new Subject<{
    color: string;
    linkColor: string;
    index: number;
  }>();

  setProperties(color: string, linkColor: string, index: number) {
    this.changeCircle.next({ color, linkColor, index });
  }

  setTransition() {
    return this.changeCircle.asObservable();
  }

  // SECTIONS
  private serviceSection = new Subject<number>();

  setServiceSection(index: number) {
    this.serviceSection.next(index);
  }

  changeServiceSection = this.serviceSection.asObservable();
}
