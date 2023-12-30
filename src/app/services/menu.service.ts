import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private wallColorSubject = new BehaviorSubject<string>('');
  public wallColor$ = this.wallColorSubject.asObservable();

  changeWallColor(color: string): void {
    this.wallColorSubject.next(color);
  }
}
