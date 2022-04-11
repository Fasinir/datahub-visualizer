import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
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
import { LoadFileButtonComponent } from './banner/load-file-button/load-file-button.component';
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    TileComponent,
    FooterComponent,
    MenuComponent,
    MenuChartChoiceComponent,
    ChartComponent,
    LoadFileButtonComponent
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
