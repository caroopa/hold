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
import { SecundariaComponent } from './pages/secundaria/secundaria.component';

@NgModule({
  declarations: [
    AppComponent,
    WaveCardComponent,
    HomeComponent,
    MenuComponent,
    LogoComponent,
    SecundariaComponent,
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
