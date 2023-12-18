import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private followColorSubject = new BehaviorSubject<string>('');
  public followColor$ = this.followColorSubject.asObservable();

  private helloColorSubject = new BehaviorSubject<string>('');
  public helloColor$ = this.helloColorSubject.asObservable();

  private menuColorSubject = new BehaviorSubject<string>('');
  public menuColor$ = this.menuColorSubject.asObservable();

  changeFollowColor(color: string): void {
    this.followColorSubject.next(color);
  }

  changeHelloColor(color: string): void {
    this.helloColorSubject.next(color);
  }

  changeMenuColor(color: string): void {
    this.menuColorSubject.next(color);
  }
}