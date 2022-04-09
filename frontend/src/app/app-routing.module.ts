import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadFileButtonComponent } from './components/load-file-button/load-file-button.component';


const routes: Routes = [
  { path: 'loadConfig', component: LoadFileButtonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
