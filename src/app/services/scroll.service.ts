import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private isTransitioningSubject = new BehaviorSubject<boolean>(false);

  isTransitioningSubject$ = this.isTransitioningSubject.asObservable();

  notifyIsNotTransitioning() {
    console.log("hola");
    
    this.isTransitioningSubject.next(false);
  }

  notifyIsTransitioning() {
    console.log("chau");
    
    this.isTransitioningSubject.next(true);
  }
}