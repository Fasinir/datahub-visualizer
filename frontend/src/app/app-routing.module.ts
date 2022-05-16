import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FileErrorPageComponent } from './file-error-page/file-error-page.component';

const routes: Routes = [
{ path: 'fileError', component: FileErrorPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
