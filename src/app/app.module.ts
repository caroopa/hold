import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// COMPONENTES
import { WaveCardComponent } from './components/wave-card/wave-card.component';
import { MenuComponent } from './components/menu/menu.component';
import { LogoComponent } from './components/logo/logo.component';

// PÁGINAS
import { HomeComponent } from './pages/home/home.component';
import { VisionComponent } from './pages/vision/vision.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { HoverLetterComponent } from './components/hover-letter/hover-letter.component';

@NgModule({
  declarations: [
    AppComponent,
    WaveCardComponent,
    HomeComponent,
    MenuComponent,
    LogoComponent,
    VisionComponent,
    ServiciosComponent,
    HoverLetterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
