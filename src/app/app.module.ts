import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PresentationComponent } from './components/presentation/presentation.component';
import { WaveCardComponent } from './components/wave-card/wave-card.component';
import { HomeComponent } from './pages/home/home.component';
import { HomePresentationComponent } from './pages/home-presentation/home-presentation.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuBtnComponent } from './components/menu-btn/menu-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    WaveCardComponent,
    HomeComponent,
    HomePresentationComponent,
    MenuComponent,
    MenuBtnComponent,
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
