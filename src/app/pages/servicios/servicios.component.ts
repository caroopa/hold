import { Component, HostListener } from '@angular/core';
import { TransitionService } from 'src/app/services/transition.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { CircleService } from 'src/app/services/circle.service';
import { LinksService } from 'src/app/services/links.service';
import { MenuService } from 'src/app/services/menu.service';
import { Color, opositeColor } from 'src/app/utils/color';
import { Subscription } from 'rxjs';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent {
  index!: number;
  nextIndex!: number;
  isTransitioning!: boolean;
  linksColor: Color = Color.Light;
  scrollSubscription!: Subscription;
  circleSubscription!: Subscription;
  lenght = 4;
  titles!: NodeListOf<HTMLElement>;
  numbers!: NodeListOf<HTMLElement>;

  constructor(
    private transService: TransitionService,
    private scrollService: ScrollService,
    private circleService: CircleService,
    private linksService: LinksService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.index = 0;

    this.linksService.changeLeftColor(this.linksColor);
    this.linksService.changeRightColor(this.linksColor);
    this.menuService.changeWallColor(Color.Dark);

    this.circleSubscription = this.circleService.changeServiceSection.subscribe(
      (nextIndex) => {
        this.manualChange(nextIndex);
      }
    );

    this.scrollSubscription =
      this.scrollService.isTransitioningSubject$.subscribe((state) => {
        this.isTransitioning = state;
      });
  }

  ngAfterViewInit() {
    this.titles = document.querySelectorAll<HTMLElement>('.title');
    this.numbers = document.querySelectorAll<HTMLElement>('.number');

    anime
      .timeline({
        loop: true,
        easing: 'easeInOutQuint',
        direction: 'alternate',
        duration: 1500,
        delay: 1000,
        endDelay: 1000,
      })
      .add({
        targets: '.services-desc-h1',
        translateY: -55,
      });
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
    if (this.circleSubscription) {
      this.circleSubscription.unsubscribe();
    }
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (!this.isTransitioning && this.isTransitioning != undefined) {
      if (e.deltaY > 0) {
        if (this.index + 1 <= this.lenght) {
          this.nextIndex = this.index + 1;
        } else {
          return;
        }
      } else if (e.deltaY < 0) {
        if (this.index - 1 >= 0) {
          this.nextIndex = this.index - 1;
        } else {
          return;
        }
      }

      this.scrollService.notifyIsTransitioning();
      this.setColor(this.nextIndex);
      const currentTitle = this.titles[this.index];
      const currentNumber = this.numbers[this.index];

      anime({
        targets: currentTitle,
        translateX: [0, -30],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 600,
      });
      anime({
        targets: currentNumber,
        translateY: [0, -30],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 600,
      });

      if (this.nextIndex >= 0 && this.nextIndex < this.lenght) {
        this.circleService.setProperties(this.linksColor, this.nextIndex);
        this.changeSection();
      } else if (this.nextIndex == this.lenght) {
        this.menuService.changeWallColor(Color.Dark);
        this.transService.setProperties(
          Color.Dark,
          '#FFD44C',
          window.innerWidth / 2,
          window.innerHeight / 2,
          '/servicios/desc'
        );
      }
    }
  }

  manualChange(index: number) {
    if (this.index != index) {
      const currentTitle = this.titles[this.index];
      const currentNumber = this.numbers[this.index];

      anime
        .timeline({ easing: 'easeInExpo', duration: 600 })
        .add({
          targets: currentTitle,
          translateX: [0, -30],
          opacity: [1, 0],
        })
        .add({
          targets: currentNumber,
          translateY: [0, -100],
        });

      this.scrollService.notifyIsTransitioning();
      this.setColor(index);
      this.circleService.setProperties(this.linksColor, index);
      this.nextIndex = index;
      this.changeSection(index);
    }
  }

  setColor(i: number) {
    if (i == 0 || i == 2) {
      this.linksColor = Color.Light;
    } else {
      this.linksColor = Color.Dark;
    }
  }

  changeSection(i: number = this.nextIndex) {
    this.linksService.changeLeftColor(this.linksColor);
    this.linksService.changeRightColor(this.linksColor);
    this.menuService.changeWallColor(this.backgroundColor());
    this.index = i;
    const currentTitle = this.titles[i];
    const currentNumber = this.numbers[i];

    anime({
      targets: currentTitle,
      translateX: [40, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 600,
      delay: 600,
    });
    anime({
      targets: currentNumber,
      translateY: [30, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 600,
      delay: 600,
    });
  }

  isCurrentIndex(i: number) {
    return i == this.index;
  }

  backgroundColor() {
    return opositeColor(this.linksColor);
  }

  markers() {
    return Array.from({ length: 4 }, (_, index) => index);
  }

  markerColor() {
    if (this.index == 1 || this.index == 3) {
      return '#B4AFAB';
    } else {
      return '#504B49';
    }
  }

  servicesContent = [
    {
      title: 'Data Comunicación',
      listElements: [
        'Comunicación Institucional',
        'Comunicación Corporativa',
        'Relaciones Públicas',
        'Estrategias de Contenidos y MKT',
      ],
      descElements: [
        {
          descBold: 'Análisis',
          desc: 'del estado de tu negocio',
        },
        {
          descBold: 'Control y medición',
          desc: 'de resultado',
        },
      ],
    },
    {
      title: 'Diseño gráfico y audiovisual',
      listElements: [
        'Identidad visual',
        'Identidad corporativa',
        'Marca. Branding',
        'Editorial',
      ],
      descElements: [
        {
          descBold: 'Desarrollos creativos',
          desc: 'e innovadores',
        },
        {
          descBold: 'Conversión',
          desc: 'de marca',
        },
      ],
    },
    {
      title: 'Campañas Publicitarias',
      listElements: [
        'Soluciones integrales on-line',
        'Asesoramiento y planificación para nuevas oportunidades de negocio',
        'Reportes de rendimiento de campañas',
      ],
      descElements: [
        {
          descBold: 'Estrategias creativas',
          desc: 'de marketing',
        },
        {
          descBold: 'Posicionamiento',
          desc: 'de marca',
        },
      ],
    },
    {
      title: 'Producción de Eventos',
      listElements: [
        'Eventos corporativos',
        ' Eventos masivos y/o privados',
        'Relaciones Públicas',
      ],
      descElements: [
        {
          descBold: 'Visibilización',
          desc: 'de marca',
        },
        {
          descBold: 'Crecimiento',
          desc: 'de tu negocio',
        },
      ],
    },
  ];

  serviceColor(i: number) {
    const colors = ['#FFD44A', '#FF6348', '#FFB5F9', '#00A698'];
    return colors[i];
  }

  serviceOpacity(i: number) {
    if (this.isCurrentIndex(i)) {
      return 1;
    } else {
      return 0;
    }
  }
}
