import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LinksService } from 'src/app/services/links.service';
import { Color } from 'src/app/utils/color';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  logoColor!: Color;

  constructor(private linksService: LinksService, private router: Router) {}

  ngOnInit() {
    this.linksService.leftColor$.subscribe((color) => {
      this.logoColor = color;
    });
  }

  goToHome() {
    this.linksService.changeLeftColor(Color.Dark);
    this.linksService.changeRightColor(Color.Light);
    this.router.navigate(['/']);
  }
}
