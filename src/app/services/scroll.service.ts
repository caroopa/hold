import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private animationEndSubject = new Subject<string>();

  animationEnd$ = this.animationEndSubject.asObservable();

  notifyAnimationEnd(componentName: string) {
    this.animationEndSubject.next(componentName);
  }
}
