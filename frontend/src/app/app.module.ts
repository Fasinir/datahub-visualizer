import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { TileComponent } from './content/tile/tile.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './content/menu/menu.component';
import { MenuChartChoiceComponent } from './content/menu/menu-chart-choice/menu-chart-choice.component';
import { ChartComponent } from './content/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    TileComponent,
    FooterComponent,
    MenuComponent,
    MenuChartChoiceComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
