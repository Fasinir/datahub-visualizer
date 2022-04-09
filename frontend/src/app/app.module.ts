import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadConfigPageComponent } from './components/load-config-page/load-config-page.component';
import { LoadFileButtonComponent } from './components/load-file-button/load-file-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadConfigPageComponent,
    LoadFileButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
