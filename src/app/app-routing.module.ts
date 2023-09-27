import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePresentationComponent } from './pages/home-presentation/home-presentation.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomePresentationComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
