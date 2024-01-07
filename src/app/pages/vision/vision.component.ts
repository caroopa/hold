import { Component } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { MenuService } from 'src/app/services/menu.service';
import { Color } from 'src/app/utils/color';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
})
export class VisionComponent {
  constructor(
    private linksService: LinksService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.linksService.changeLeftColor(Color.Light);
    this.linksService.changeRightColor(Color.Light);
    this.menuService.changeWallColor('#2974ED');
  }

  ngAfterViewInit() {
    anime({
      targets: '.roller',
      translateY: [
        { value: -83, duration: 1000, delay: 1500 },
        { value: -168, duration: 1000, delay: 1500 },
        { value: 0, duration: 1000, delay: 1500 },
      ],
      duration: 4000,
      easing: 'easeOutElastic(1, .5)',
      loop: true,
    });

    anime
      .timeline({
        easing: 'easeInOutSine',
      })
      .add({
        targets: '.up',
        translateY: [
          { value: -60, duration: 500 },
          { value: -120, duration: 500, delay: 100 },
        ],
      })
      .add({
        targets: '.down',
        translateY: 60,
        duration: 500,
      });
  }
}
