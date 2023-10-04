import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SecundariaComponent } from './pages/secundaria/secundaria.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'secundaria', component: SecundariaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
