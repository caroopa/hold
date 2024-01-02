import { Component, HostListener } from '@angular/core';
import { TransitionService } from 'src/app/services/transition.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { CircleService } from 'src/app/services/circle.service';
import { LinksService } from 'src/app/services/links.service';
import { MenuService } from 'src/app/services/menu.service';
import { Color, opositeColor } from 'src/app/utils/color';
import { Subscription } from 'rxjs';

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
  }

  isCurrentIndex(i: number) {
    return i == this.index;
  }

  backgroundColor() {
    return opositeColor(this.linksColor);
  }

  markers(): number[] {
    return Array.from({ length: 4 }, (_, index) => index);
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
      descBold: 'Análisis',
      desc: 'del estado de tu negocio',
    },
    {
      title: 'Diseño gráfico y audiovisual',
      listElements: [
        'Identidad visual',
        'Identidad corporativa',
        'Marca. Branding',
        'Editorial',
      ],
      descBold: 'Desarrollos creativos',
      desc: 'e innovadores',
    },
    {
      title: 'Campañas Publicitarias',
      listElements: [
        'Soluciones integrales on-line',
        'Asesoramiento y planificación para nuevas oportunidades de negocio',
        'Reportes de rendimiento de campañas',
      ],
      descBold: 'Estrategias creativas',
      desc: 'de marketing',
    },
    {
      title: 'Producción de Eventos',
      listElements: [
        'Eventos corporativos',
        ' Eventos masivos y/o privados',
        'Relaciones Públicas',
      ],
      descBold: 'Visibilización',
      desc: 'de marca',
    },
  ];

  serviceColor(i: number) {
    const colors = ['#FFD44A', '#FF6348', '#FFB5F9', '#00A698'];
    return colors[i];
  }
}
