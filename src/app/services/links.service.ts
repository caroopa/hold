import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Color } from '../utils/color';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private leftColorSubject = new BehaviorSubject<Color>(Color.Dark);
  public leftColor$ = this.leftColorSubject.asObservable();

  private rightColorSubject = new BehaviorSubject<Color>(Color.Dark);
  public rightColor$ = this.rightColorSubject.asObservable();

  changeLeftColor(color: Color): void {
    this.leftColorSubject.next(color);
  }

  changeRightColor(color: Color): void {
    this.rightColorSubject.next(color);
  }
}