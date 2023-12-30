import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private isTransitioningSubject = new Subject<boolean>();

  isTransitioningSubject$ = this.isTransitioningSubject.asObservable();

  notifyIsNotTransitioning() {
    this.isTransitioningSubject.next(false);
  }

  notifyIsTransitioning() {
    this.isTransitioningSubject.next(true);
  }
}
