import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Color } from 'src/app/utils/color';

@Injectable({
  providedIn: 'root',
})
export class CircleService {
  // CIRCLES
  private changeCircle = new Subject<{
    filled: Color;
    m: number;
  }>();

  setProperties(filled: Color, m: number) {
    this.changeCircle.next({ filled, m });
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
