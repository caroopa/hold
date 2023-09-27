import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PresentationComponent } from './components/presentation/presentation.component';
import { WaveCardComponent } from './components/wave-card/wave-card.component';
import { HomeComponent } from './pages/home/home.component';
import { HomePresentationComponent } from './pages/home-presentation/home-presentation.component';
import { MenuComponent } from './components/menu/menu.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    WaveCardComponent,
    HomeComponent,
    HomePresentationComponent,
    MenuComponent,
    LogoComponent,
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
