import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { Color } from 'src/app/utils/color';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-servicios-desc',
  templateUrl: './servicios-desc.component.html',
  styleUrls: ['./servicios-desc.component.scss'],
})
export class ServiciosDescComponent {
  comunicacion = new ServiceWithLinksElement(
    '#FFF9F3',
    '#FFD44A',
    this.linksService,
    'left'
  );
  disenio = new ServiceElement('#050000', '#FF6348');
  campanias = new ServiceElement('#FFF9F3', '#FFB5F9');
  eventos = new ServiceWithLinksElement(
    '#050000',
    '#00A698',
    this.linksService,
    'right'
  );

  constructor(private linksService: LinksService) {}

  ngOnInit() {
    anime
      .timeline({
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
      })
      .add({
        targets: '#arrowLine',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1500,
      })
      .add({
        targets: '#arrow',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 500,
      });

    anime({
      targets: '#idea',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1500,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
    })

    this.linksService.changeLeftColor(Color.Light);
    this.linksService.changeRightColor(Color.Dark);
  }
}

class ServiceElement {
  constructor(public primary: string, public secondary: string) {}

  primaryFill = this.primary;
  secondaryFill = this.secondary;

  change() {
    this.primaryFill = '#050000';
    this.secondaryFill = '#050000';
  }

  unchange() {
    this.primaryFill = this.primary;
    this.secondaryFill = this.secondary;
  }
}

class ServiceWithLinksElement extends ServiceElement {
  constructor(
    primary: string,
    secondary: string,
    private linksService: LinksService,
    private direction: string
  ) {
    super(primary, secondary);
    this.linksService = linksService;
  }

  override change() {
    super.change();
    if (this.direction == 'left') {
      this.linksService.changeLeftColor(Color.Dark);
    } else {
      this.linksService.changeRightColor(Color.Light);
    }
  }

  override unchange() {
    super.unchange();
    if (this.direction == 'left') {
      this.linksService.changeLeftColor(Color.Light);
    } else {
      this.linksService.changeRightColor(Color.Dark);
    }
  }
}
