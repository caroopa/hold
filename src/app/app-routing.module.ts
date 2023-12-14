import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VisionComponent } from './pages/vision/vision.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ServiciosDescComponent } from './pages/servicios-desc/servicios-desc.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'servicios/desc', component: ServiciosDescComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
