import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSecComponent } from './menu-sec.component';

describe('MenuSecComponent', () => {
  let component: MenuSecComponent;
  let fixture: ComponentFixture<MenuSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuSecComponent]
    });
    fixture = TestBed.createComponent(MenuSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
