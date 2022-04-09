import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadConfigPageComponent } from './components/load-config-page/load-config-page.component';

const routes: Routes = [
  { path: 'loadConfig', component: LoadConfigPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
