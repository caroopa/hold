import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaveCardComponent } from './components/wave.card/wave.card.component';

const routes: Routes = [
  { path: 'cards', component: WaveCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
