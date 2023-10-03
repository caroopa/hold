import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePresentationComponent } from './pages/home-presentation/home-presentation.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';

const routes: Routes = [
  { path: '', component: HomePresentationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu-sec', component: MenuPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
