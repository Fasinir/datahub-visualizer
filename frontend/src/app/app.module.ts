import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { TileComponent } from './content/tile/tile.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './content/menu/menu.component';
import { MenuChartChoiceComponent } from './content/menu/menu-chart-choice/menu-chart-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    TileComponent,
    FooterComponent,
    MenuComponent,
    MenuChartChoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
