import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private isTransitioningSubject = new BehaviorSubject<boolean>(false);

  isTransitioningSubject$ = this.isTransitioningSubject.asObservable();

  notifyIsNotTransitioning() {
    console.log("no transiciona");
    
    this.isTransitioningSubject.next(false);
  }

  notifyIsTransitioning() {
    console.log("transiciona");
    
    this.isTransitioningSubject.next(true);
  }
}