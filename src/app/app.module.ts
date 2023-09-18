import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PresentationComponent } from './components/presentation/presentation.component';
import { WaveCardComponent } from './components/wave.card/wave.card.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    WaveCardComponent,
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
